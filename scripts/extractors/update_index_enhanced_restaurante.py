# -*- coding: utf-8 -*-
from pathlib import Path

root = Path('.')
html = (root / 'index.html').read_text(encoding='utf-8')
deck_frag = (root / 'deck_restaurante_fragment.html').read_text(encoding='utf-8')
thumbs_frag = (root / 'deck_restaurante_thumbs.html').read_text(encoding='utf-8')

# 1. Replace deck-restaurante container
start_marker = '<!-- DECK: ARCANA RESTAURANTE (10 Slides) -->'
if start_marker in html:
    idx_start = html.find(start_marker)
    idx_end = html.find('      </div>\n    </main>', idx_start)
    if idx_end > 0:
        html = html[:idx_start] + deck_frag.strip() + '\n' + html[idx_end:]
        print('Updated deck container in index.html!')
    else:
        print('Could not find end marker')
else:
    print('Start marker not found')

# 2. Replace overview grid
grid_marker = '<div class="overview-grid" id="overviewGrid-restaurante"'
if grid_marker in html:
    idx_gstart = html.find(grid_marker)
    idx_gend = html.find('</div>\n    </div>\n', idx_gstart)
    if idx_gend > 0:
        # Find closing tag of this grid
        idx_close = html.find('</div>', idx_gstart)
        # Find the next </div> that closes overviewGrid-restaurante
        # Looking for the closing tag before overviewGrid-comparativo or video-theater
        next_section = html.find('<div class="overview-grid" id="overviewGrid-comparativo"', idx_gstart)
        if next_section < 0:
            next_section = html.find('<div class="video-theater"', idx_gstart)
        if next_section > 0:
            html = html[:idx_gstart] + thumbs_frag.strip() + '\n\n    ' + html[next_section:]
            print('Updated overview grid in index.html!')

(root / 'index.html').write_text(html, encoding='utf-8')
print('Update complete!')
