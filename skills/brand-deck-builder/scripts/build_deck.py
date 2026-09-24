#!/usr/bin/env python3
"""
Assembles a .pptx from a directory of rendered slide backgrounds (from
render_slides.mjs). Each background PNG becomes a full-bleed picture on its
own slide; each entry in the matching .json sidecar becomes a real,
editable PowerPoint text box placed at the exact pixel position/size/font
the HTML had for that element before its text was hidden for the screenshot.

Usage:
  build_deck.py <rendered_dir> <output.pptx> [--font "Inter"]
                [--embed-fonts <font_dir>]

<rendered_dir> must contain pairs like 01-title.png / 01-title.json,
02-agenda.png / 02-agenda.json, etc. (exactly what render_slides.mjs writes).

--embed-fonts <dir> does two things, and both matter for fidelity:

  1. It reads the real family name and weight class out of every .ttf/.otf in
     the directory and maps each overlay's CSS font-weight onto the matching
     FACE. Without this, python-pptx can only say bold/not-bold, so a
     300-weight title and a 500-weight label both come out as Regular -- and
     since light titles are this deck style's voice, that is a visible loss.
  2. It embeds those font files in the .pptx, so a viewer without the font
     installed still sees the right typeface. Note that PowerPoint for Mac
     ignores embedded fonts and needs the font installed locally; Windows
     PowerPoint honours them.

An element in the HTML carrying data-animate="move-x:<px>" is excluded from the
background PNG by the renderer and arrives here as an entry in the sidecar's
"animates" list, paired with a <slide>-anim-<id>.png. This script places that
PNG as its own picture and gives it a real PowerPoint motion-path animation
that runs once, on a click, after the slide is shown.
"""
import argparse
import copy
import json
import sys
from pathlib import Path

from pptx import Presentation
from pptx.opc.package import Part
from pptx.opc.packuri import PackURI
from pptx.oxml.ns import nsmap, qn
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from lxml import etree

EMU_PER_IN = 914400
RT_FONT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font"
CT_FONTDATA = "application/x-fontdata"

ALIGN_MAP = {
    "left": PP_ALIGN.LEFT,
    "center": PP_ALIGN.CENTER,
    "right": PP_ALIGN.RIGHT,
    "justify": PP_ALIGN.JUSTIFY,
}


def px_to_pt(px, px_per_in):
    return px * 72.0 / px_per_in


# ---------------------------------------------------------------- font faces


def load_faces(font_dir: Path):
    """Read every font file and return {weight: (family, is_bold)} plus the
    per-family file map needed for embedding."""
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        sys.exit("--embed-fonts needs fonttools: pip install fonttools")

    by_weight, by_family = {}, {}
    for f in sorted(list(font_dir.glob("*.ttf")) + list(font_dir.glob("*.otf"))):
        try:
            ft = TTFont(str(f), lazy=True)
        except Exception as exc:  # noqa: BLE001
            print(f"  skipping {f.name}: {exc}", file=sys.stderr)
            continue
        # A variable font would claim one weight while covering many, so it is
        # not a usable face here -- static instances only.
        if "fvar" in ft:
            ft.close()
            continue
        family = ft["name"].getDebugName(1)
        weight = int(getattr(ft["OS/2"], "usWeightClass", 400))
        is_bold = bool(ft["head"].macStyle & 1)
        ft.close()
        by_weight[weight] = (family, is_bold)
        by_family.setdefault(family, {})["bold" if is_bold else "regular"] = f
    return by_weight, by_family


def pick_face(weight, by_weight, fallback_name):
    if not by_weight:
        return fallback_name, weight >= 600
    nearest = min(by_weight, key=lambda w: abs(w - weight))
    return by_weight[nearest]


def embed_fonts(prs, by_family):
    """Add the font files as package parts and declare them in presentation.xml."""
    pres_part = prs.part
    lst = etree.SubElement(pres_part._element, qn("p:embeddedFontLst"))
    n = 0
    for family, files in sorted(by_family.items()):
        ef = etree.SubElement(lst, qn("p:embeddedFont"))
        font_el = etree.SubElement(ef, qn("p:font"))
        font_el.set("typeface", family)
        font_el.set("pitchFamily", "34")
        font_el.set("charset", "0")
        for kind in ("regular", "bold"):
            path = files.get(kind)
            if path is None:
                continue
            n += 1
            part = Part(
                PackURI(f"/ppt/fonts/font{n}.fntdata"),
                CT_FONTDATA,
                pres_part.package,
                path.read_bytes(),
            )
            rid = pres_part.relate_to(part, RT_FONT)
            child = etree.SubElement(ef, qn(f"p:{kind}"))
            child.set(qn("r:id"), rid)

    # embeddedFontLst has a fixed position in the CT_Presentation sequence:
    # after notesSz, before custShowLst/defaultTextStyle. Appending puts it at
    # the end, which PowerPoint rejects, so move it into place.
    # Take the LAST-permitted preceding sibling that is actually present, so
    # stop at the first hit walking the sequence backwards.
    after = None
    for tag in ("p:notesSz", "p:sldSz", "p:sldIdLst"):
        found = pres_part._element.find(qn(tag))
        if found is not None:
            after = found
            break
    if after is not None:
        pres_part._element.remove(lst)
        after.addnext(lst)
    return n


# ------------------------------------------------------------- animation XML


def motion_timing_xml(spid, dx_frac, dy_frac, dur_ms=2000):
    """A single click-triggered motion path, run once. `origin="layout"` with
    pathEditMode="relative" makes the path coordinates fractions of the slide,
    so dx of 0.1 travels a tenth of the slide width."""
    path = f"M 0 0 L {dx_frac:.6f} {dy_frac:.6f}"
    return (
        '<p:timing xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
        "<p:tnLst><p:par>"
        '<p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
        '<p:seq concurrent="1" nextAc="seek">'
        '<p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
        '<p:par><p:cTn id="3" fill="hold">'
        '<p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst>'
        '<p:par><p:cTn id="4" fill="hold">'
        '<p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>'
        '<p:par><p:cTn id="5" presetID="0" presetClass="path" presetSubtype="0"'
        ' accel="30000" decel="30000" fill="hold" nodeType="clickEffect">'
        '<p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>'
        f'<p:animMotion origin="layout" path="{path}" pathEditMode="relative" ptsTypes="AA">'
        f'<p:cBhvr><p:cTn id="6" dur="{dur_ms}" fill="hold"/>'
        f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
        "<p:attrNameLst><p:attrName>ppt_x</p:attrName><p:attrName>ppt_y</p:attrName></p:attrNameLst>"
        "</p:cBhvr></p:animMotion>"
        "</p:childTnLst></p:cTn></p:par>"
        "</p:childTnLst></p:cTn></p:par>"
        "</p:childTnLst></p:cTn></p:par>"
        "</p:childTnLst></p:cTn>"
        '<p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
        '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst>'
        "</p:seq>"
        "</p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>"
    )


def attach_timing(slide, xml):
    sld = slide._element
    timing = etree.fromstring(xml)
    # CT_Slide sequence: cSld, clrMapOvr, transition, timing, extLst
    anchor = None
    for tag in ("p:transition", "p:clrMapOvr", "p:cSld"):
        found = sld.find(qn(tag))
        if found is not None:
            anchor = found
            break
    if anchor is None:
        sld.append(timing)
    else:
        anchor.addnext(timing)


# --------------------------------------------------------------------- build


def build(rendered_dir: Path, out_path: Path, font_name: str, font_dir: Path | None):
    json_files = sorted(rendered_dir.glob("*.json"))
    if not json_files:
        sys.exit(f"No rendered slides (.json/.png pairs) found in {rendered_dir}")

    by_weight, by_family = ({}, {})
    if font_dir:
        by_weight, by_family = load_faces(font_dir)
        if by_weight:
            print("Font faces: " + ", ".join(
                f"{w}={by_weight[w][0]}{' Bold' if by_weight[w][1] else ''}"
                for w in sorted(by_weight)))

    first = json.loads(json_files[0].read_text())
    canvas_w = first["canvas"]["width"]
    canvas_h = first["canvas"]["height"]

    # Standard 16:9 pptx canvas (13.333in x 7.5in) -- matches a 2560x1440 render at 192 DPI.
    slide_width_in = 13.333
    slide_height_in = 7.5
    px_per_in_x = canvas_w / slide_width_in
    px_per_in_y = canvas_h / slide_height_in

    prs = Presentation()
    prs.slide_width = Emu(int(slide_width_in * EMU_PER_IN))
    prs.slide_height = Emu(int(slide_height_in * EMU_PER_IN))
    blank_layout = prs.slide_layouts[6]

    n_anim = 0
    for jf in json_files:
        data = json.loads(jf.read_text())
        png_path = jf.with_suffix(".png")
        if not png_path.exists():
            print(f"WARNING: missing {png_path.name}, skipping", file=sys.stderr)
            continue

        slide = prs.slides.add_slide(blank_layout)
        slide.shapes.add_picture(str(png_path), 0, 0, width=prs.slide_width, height=prs.slide_height)

        # animated elements sit above the background and below the text
        for anim in data.get("animates", []):
            asset = rendered_dir / f"{jf.stem}-anim-{anim['id']}.png"
            if not asset.exists():
                print(f"WARNING: no asset {asset.name} for {anim['id']}", file=sys.stderr)
                continue
            pic = slide.shapes.add_picture(
                str(asset),
                Emu(int(anim["x"] / px_per_in_x * EMU_PER_IN)),
                Emu(int(anim["y"] / px_per_in_y * EMU_PER_IN)),
                width=Emu(int(anim["w"] / px_per_in_x * EMU_PER_IN)),
                height=Emu(int(anim["h"] / px_per_in_y * EMU_PER_IN)),
            )
            spec = anim.get("spec", "")
            dx = dy = 0.0
            for part in spec.split(";"):
                if part.startswith("move-x:"):
                    dx = float(part.split(":", 1)[1]) / canvas_w
                elif part.startswith("move-y:"):
                    dy = float(part.split(":", 1)[1]) / canvas_h
            attach_timing(slide, motion_timing_xml(pic.shape_id, dx, dy))
            n_anim += 1

        for ov in data["overlays"]:
            x = Emu(int(ov["x"] / px_per_in_x * EMU_PER_IN))
            y = Emu(int(ov["y"] / px_per_in_y * EMU_PER_IN))
            w = Emu(int(ov["w"] / px_per_in_x * EMU_PER_IN))
            h = Emu(int(ov["h"] / px_per_in_y * EMU_PER_IN))

            box = slide.shapes.add_textbox(x, y, w, h)
            tf = box.text_frame
            tf.word_wrap = True
            tf.auto_size = MSO_AUTO_SIZE.NONE
            tf.vertical_anchor = MSO_ANCHOR.TOP
            tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

            lines = ov["text"].split("\n") or [""]
            align = ALIGN_MAP.get(ov.get("align", "left"), PP_ALIGN.LEFT)
            face, is_bold = pick_face(ov["fontWeight"], by_weight, font_name)
            for i, line in enumerate(lines):
                p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
                p.alignment = align
                p.line_spacing = Pt(px_to_pt(ov["lineHeightPx"], px_per_in_y))
                run = p.add_run()
                run.text = line
                run.font.size = Pt(px_to_pt(ov["fontSizePx"], px_per_in_y))
                run.font.bold = is_bold
                run.font.name = face
                run.font.color.rgb = RGBColor.from_string(ov["color"])

    n_embedded = embed_fonts(prs, by_family) if by_family else 0

    out_path.parent.mkdir(parents=True, exist_ok=True)
    prs.save(out_path)
    extra = []
    if n_embedded:
        extra.append(f"{n_embedded} embedded font files")
    if n_anim:
        extra.append(f"{n_anim} click animation{'s' if n_anim > 1 else ''}")
    suffix = (", " + ", ".join(extra)) if extra else ""
    print(f"Wrote {out_path} ({len(json_files)} slides{suffix})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("rendered_dir", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--font", default="Inter", help="Fallback font name when --embed-fonts is not used")
    parser.add_argument("--embed-fonts", type=Path, default=None, metavar="DIR",
                        help="Directory of static .ttf/.otf faces to map by weight and embed")
    args = parser.parse_args()
    build(args.rendered_dir, args.output, args.font, args.embed_fonts)
