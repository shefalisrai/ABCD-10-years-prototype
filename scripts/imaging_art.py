"""Draws the four Brain Imaging illustrations (task fMRI, resting-state fMRI, diffusion MRI,
structural MRI) in the style of the mental health jar: beige background, colored labels,
and smooth black arrows. The brain is scripts/art/Greybrain.svg and the nodes are the theme
bubbles (src/assets/bubble.svg), ringed in each label's color.

Run from the abcd-demo folder:  python3 scripts/imaging_art.py
Writes src/assets/imaging-*.svg. Edit the labels, points and colors below and run it again."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRAIN_SRC = ROOT / 'scripts/art/Greybrain.svg'
BUBBLE_SRC = ROOT / 'src/assets/bubble.svg'
OUT = ROOT / 'src/assets'

W, H = 1200, 740
BG = '#f2f1ec'  # the jar image's background
COLOR = {'pink': '#e6357c', 'mauve': '#b02f84', 'purple': '#7d63b3', 'vivid': '#7f1cee'}  # the jar's label colors
GLOW = {'pink': '#f3a3c3', 'mauve': '#dd9cc4', 'purple': '#c3b4e6', 'vivid': '#c7a6fb'}
LOBE_TINT = {'pink': '#f7b0cc', 'purple': '#b9a8e8', 'vivid': '#b48af7', 'mauve': '#d27db0', 'cereb': '#cfc3f2'}

# Overlays are drawn in "brain units" (the grey brain as it sits in brain-rainbow.svg, facing
# left) and mapped to the canvas by S, X0, Y0. Greybrain.svg is the same drawing cropped to
# the brain, which spans brain units (40, 124) to (539, 538).
S, X0, Y0 = 1.12, 271, 18
BRAIN_BOX = (X0 + S * 40, Y0 + S * 124, S * 499, S * 414)


def P(bx, by):
    return round(X0 + S * bx), round(Y0 + S * by)


def namespaced(text, prefix):
    """Prefix an Illustrator export's ids and class names so two of them can share a file."""
    text = re.sub(r'<metadata>.*?</metadata>', '', text, flags=re.S)
    text = text[text.index('>', text.index('<svg')) + 1:text.rindex('</svg>')]
    text = re.sub(r'class="([^"]+)"', lambda m: 'class="%s"' % ' '.join(prefix + c for c in m.group(1).split()), text)
    text = re.sub(r'\.([a-z]{1,2})(\s*[{,])', lambda m: '.' + prefix + m.group(1) + m.group(2), text)
    text = re.sub(r'id="([^"]+)"', lambda m: f'id="{prefix}{m.group(1)}"', text)
    return re.sub(r'#([a-z]{1,2})\)', lambda m: f'#{prefix}{m.group(1)})', text)


BRAIN = namespaced(BRAIN_SRC.read_text(encoding='utf8'), 'br-')
BUBBLE = namespaced(BUBBLE_SRC.read_text(encoding='utf8'), 'bu-')
BRAIN_VIEWBOX = re.search(r'viewBox="([^"]+)"', BRAIN_SRC.read_text(encoding='utf8')).group(1)


def defs():
    glows = ''.join(
        f'<radialGradient id="glow-{n}"><stop offset="0" stop-color="{c}" stop-opacity="1"/>'
        f'<stop offset="0.55" stop-color="{c}" stop-opacity="0.7"/>'
        f'<stop offset="1" stop-color="{c}" stop-opacity="0"/></radialGradient>' for n, c in GLOW.items())
    x, y, w, h = BRAIN_BOX
    return ('<defs>'
            '<filter id="soft"><feGaussianBlur stdDeviation="7"/></filter>'
            '<filter id="white"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>'
            '<marker id="ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">'
            '<path d="M1,1 L8.5,5 L1,9" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>'
            '<marker id="ah0" viewBox="0 0 10 10" refX="1.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">'
            '<path d="M8.5,1 L1.5,5 L8.5,9" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>'
            f'<svg id="brain" x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" viewBox="{BRAIN_VIEWBOX}">{BRAIN}</svg>'
            f'<symbol id="bubble" viewBox="0 0 400 407.66">{BUBBLE}</symbol>'
            f'<mask id="inbrain" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}">'
            '<use href="#brain" filter="url(#white)"/></mask>'
            f'{glows}</defs>')


def on_brain(content, blend=True):
    """Overlay drawn in brain units, kept inside the brain's outline."""
    mode = ' style="mix-blend-mode:multiply"' if blend else ''
    return f'<g mask="url(#inbrain)"{mode}><g transform="translate({X0} {Y0}) scale({S})">{content}</g></g>'


def glow(color, bx, by, r):
    return f'<circle cx="{bx}" cy="{by}" r="{r}" fill="url(#glow-{color})"/>'


def node(color, bx, by, r=24):
    x, y = P(bx, by)
    return (f'<use href="#bubble" x="{x - r}" y="{y - r}" width="{2 * r}" height="{2 * r}"/>'
            f'<circle cx="{x}" cy="{y}" r="{r + 1}" fill="none" stroke="{COLOR[color]}" stroke-width="4.5"/>')


def link(points, color, dashed=False):
    dash = ' stroke-dasharray="2 12"' if dashed else ''
    lines = ''.join(f'<line x1="{P(*a)[0]}" y1="{P(*a)[1]}" x2="{P(*b)[0]}" y2="{P(*b)[1]}"/>'
                    for a, b in zip(points, points[1:] + points[:1]))
    return f'<g stroke="{COLOR[color]}" stroke-width="5" stroke-linecap="round"{dash} opacity="0.8">{lines}</g>'


def label(color, x, y, lines, size=30):
    spans = ''.join(f'<tspan x="{x}" dy="{0 if i == 0 else round(size * 1.25)}">{t}</tspan>' for i, t in enumerate(lines))
    return (f'<text x="{x}" y="{y}" fill="{COLOR[color]}" font-family="Arial, Helvetica, sans-serif" '
            f'font-size="{size}" text-anchor="middle">{spans}</text>')


def arrow(d, both=False):
    start = ' marker-start="url(#ah0)"' if both else ''
    return f'<path d="{d}" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" marker-end="url(#ah)"{start}/>'


def note(text):
    return (f'<text x="{W / 2}" y="714" fill="#5a5a5a" font-family="Arial, Helvetica, sans-serif" '
            f'font-size="24" font-style="italic" text-anchor="middle">{text}</text>')


def bundle(d, color, offsets, width=6):
    """A white-matter tract: parallel strands of one curve, with a light sheen."""
    strands = ''.join(f'<path d="{d}" transform="translate({dx} {dy})"/>' for dx, dy in offsets)
    sheen = ''.join(f'<path d="{d}" transform="translate({dx - 1.2} {dy - 1.2})"/>' for dx, dy in offsets)
    return (f'<g fill="none" stroke="{COLOR[color]}" stroke-width="{width}" stroke-linecap="round" opacity="0.85">{strands}</g>'
            f'<g fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity="0.5">{sheen}</g>')


def svg(title, *parts):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">'
            f'<title>{title}</title>{defs()}<rect width="{W}" height="{H}" fill="{BG}"/>'
            f'<use href="#brain"/>{"".join(parts)}</svg>')


# Task fMRI: where each ABCD task's activity shows up.
FRONT, PARIETAL, DEEP, LOW_FRONT, CEREB = (140, 228), (420, 215), (268, 300), (112, 322), (415, 466)
task = svg(
    'Task fMRI: brain areas that become more active during each task',
    on_brain(glow('pink', *FRONT, 62) + glow('pink', *PARIETAL, 62) + glow('vivid', *DEEP, 66)
             + glow('mauve', *LOW_FRONT, 52) + glow('mauve', *CEREB, 48)),
    node('pink', *FRONT), node('pink', *PARIETAL), node('vivid', *DEEP, 27),
    node('mauve', *LOW_FRONT, 21), node('mauve', *CEREB, 20),
    label('pink', 600, 58, ['Memory task', '(remembering pictures)']),
    arrow('M535,112 C500,160 450,210 433,236'), arrow('M665,112 C700,150 728,195 738,226'),
    label('vivid', 1075, 300, ['Reward task', '(winning money)']),
    arrow('M945,330 C860,330 700,345 604,353'),
    label('mauve', 160, 520, ['Stopping task', '(stopping an action)']),
    arrow('M238,482 C300,440 350,405 378,388'),
    note('Glowing areas of the same color become more active during that task.'),
)

# Resting-state fMRI: broad areas that rise and fall together while resting.
PINK_NET = [(128, 245), (428, 262), (300, 392)]
PURPLE_NET = [(305, 158), (505, 322), (180, 305)]
rest = svg(
    'Resting-state fMRI: brain areas that work in sync while resting',
    on_brain(''.join(glow('pink', x, y, 92) for x, y in PINK_NET) + ''.join(glow('purple', x, y, 84) for x, y in PURPLE_NET)),
    link(PINK_NET, 'pink'), link(PURPLE_NET, 'purple', dashed=True),
    *[node('pink', x, y) for x, y in PINK_NET], *[node('purple', x, y, 22) for x, y in PURPLE_NET],
    label('pink', 160, 236, ['Brain areas in sync', '(one network)']),
    arrow('M250,290 C320,296 360,294 385,292'),
    label('purple', 1060, 470, ['Another network', '(also in sync)']),
    arrow('M985,430 C930,410 880,392 860,385'),
    note('Areas that glow in the same color share the same pattern of brain activity, even without a task.'),
)

# Diffusion MRI: white-matter tracts.
diffusion = svg(
    'Diffusion MRI: the pathways that connect brain areas',
    on_brain(
        bundle('M128,252 C220,168 420,170 460,262 C482,322 420,380 338,392', 'pink', [(0, -12), (0, -4), (0, 4), (0, 12)])
        + bundle('M108,334 C140,382 190,406 244,396', 'mauve', [(0, -6), (0, 2), (0, 10)], 5)
        + bundle('M292,140 C302,262 330,402 338,528', 'purple', [(-15, 0), (-5, 0), (5, 0), (15, 0)]),
        blend=False),
    label('pink', 160, 150, ['Pathway linking the', 'front and back areas']),
    arrow('M246,204 C320,236 380,262 412,284'),
    label('purple', 1040, 562, ['Pathway down', 'to the body']),
    arrow('M930,584 C840,604 720,590 668,560'),
    label('mauve', 160, 548, ['Short pathway', '(links nearby areas)']),
    arrow('M246,510 C320,476 380,452 410,436'),
    note("Diffusion MRI follows how water moves along the brain's wiring, called white matter."),
)

# Structural MRI: the brain's parts and overall size.
LOBES = {
    'pink': 'M0,90 L292,90 C276,170 266,240 244,300 C204,314 162,322 120,346 L0,362 Z',  # frontal
    'purple': 'M292,90 L470,90 C472,180 462,232 442,282 C382,292 302,296 244,300 C266,240 276,170 292,90 Z',  # parietal
    'vivid': 'M470,90 L590,90 L590,430 L476,404 C484,352 462,306 442,282 C462,232 472,180 470,90 Z',  # occipital
    'mauve': ('M120,346 C162,322 204,314 244,300 C302,296 382,292 442,282 C462,306 486,352 476,392 '
              'C468,420 404,432 302,446 C240,450 180,446 140,436 Z'),  # temporal
}
LEFT, RIGHT = P(40, 0)[0], P(539, 0)[0]
structural = svg(
    'Structural MRI: the size, thickness, and shape of brain areas',
    on_brain('<g filter="url(#soft)">' + ''.join(f'<path d="{d}" fill="{LOBE_TINT[c]}" opacity="0.85"/>' for c, d in LOBES.items())
             + f'<ellipse cx="418" cy="463" rx="88" ry="48" fill="{LOBE_TINT["cereb"]}" opacity="0.95"/></g>'),
    f'<path d="M{LEFT},116 L{RIGHT},116" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" '
    'marker-end="url(#ah)" marker-start="url(#ah0)"/>',
    f'<g stroke="#111" stroke-width="4" stroke-linecap="round" opacity="0.55"><line x1="{LEFT}" y1="126" x2="{LEFT}" y2="300"/>'
    f'<line x1="{RIGHT}" y1="126" x2="{RIGHT}" y2="330"/></g>',
    label('vivid', 600, 78, ['Brain volume (overall size)']),
    label('pink', 160, 236, ['Frontal lobe']), arrow('M250,244 C300,256 345,266 388,272'),
    label('purple', 1055, 200, ['Parietal lobe']), arrow('M955,212 C890,214 820,220 760,226'),
    label('vivid', 1065, 380, ['Occipital lobe']), arrow('M950,392 C920,394 895,394 868,394'),
    label('mauve', 160, 560, ['Temporal lobe']), arrow('M262,552 C340,524 430,494 476,476'),
    label('purple', 1060, 580, ['Cerebellum']), arrow('M960,572 C900,562 830,552 800,546'),
    note('Structural MRI measures the size, thickness, and shape of brain areas.'),
)

for name, content in [('task-fmri', task), ('resting-fmri', rest), ('diffusion-mri', diffusion), ('structural-mri', structural)]:
    (OUT / f'imaging-{name}.svg').write_text(content, encoding='utf8')
    print('wrote', f'src/assets/imaging-{name}.svg', f'{len(content) // 1024} KB')
