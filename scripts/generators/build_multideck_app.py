# -*- coding: utf-8 -*-
"""
Build the Executive Venture Selection Hub (Menu) exactly matching the user's uploaded reference image:
- Top Tag: | 3i BAIRD LAB
- Headline: Presentación Ejecutiva (Executive Presentation)
- Subtitle: Venture Selection Hub (Gradient cyan/purple)
- Divider line
- Description: Evaluación estratégica de oportunidades en AI EdTech, FoodTech QSR y Web3 & IoT
- 3 Interactive Glowing Pills:
    [ 🧠 AI EDTECH ] -> Expert Multi-Agent Tutor
    [ 🍽️ FOODTECH QSR ] -> Smart Fast-Food Franchise
    [ 🔒 WEB3 & IOT ] -> Arcana Trust Network
- Right Visual: Glowing Isometric Cyber Diamond Hologram with vertical light beam and cyber wave streams.
- Full bilingual (ES/EN) and dark/light theme support.
"""

import json

ICONS = {
    "brain": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/><path d="M7 10h10"/><path d="M7 14h10"/></svg>',
    "dish": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11h.01"/><path d="M12 15h.01"/><path d="M16 16h.01"/><path d="M2 19h20"/><path d="M20 15a8 8 0 0 0-16 0"/><path d="M12 4v3"/></svg>',
    "cubes": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/><path d="m3.27 6.96 8.73 4.88 8.73-4.88"/><path d="M12 22.08V12"/></svg>',
    "sparkles": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    "target": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    "route": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
    "zap": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    "shield": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    "database": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>',
    "chart": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    "layers": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    "cpu": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>',
    "globe": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    "sun": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    "grid": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    "file": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
    "expand": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>',
    "search": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    "arrow_right": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    "arrow_left": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    "close": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    "menu": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
    "users": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "alert": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    "home": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
}

def render_deck_slides(deck_id, slides):
    html_slides = []
    for s in slides:
        sid = s['id']
        cat_en = s.get('category_en', s.get('tag_en', ''))
        cat_es = s.get('category_es', s.get('tag_es', ''))
        num = s.get('num', f"{sid:02d}")
        title_en = s.get('title_en', '')
        title_es = s.get('title_es', '')
        lead_en = s.get('lead_en', '')
        lead_es = s.get('lead_es', '')
        punch_en = s.get('punchline_en', '')
        punch_es = s.get('punchline_es', '')
        img_src = s.get('image', '')

        active_class = " active" if sid == 1 else ""

        # Hero Slide
        if s.get('category') == 'hero':
            badge_en = s.get('badge_en', '')
            badge_es = s.get('badge_es', '')
            subtitle_en = s.get('subtitle_en', '')
            subtitle_es = s.get('subtitle_es', '')
            flow_en = s.get('flow_en', [])
            flow_es = s.get('flow_es', [])
            icons_flow = [ICONS['target'], ICONS['route'], ICONS['brain'], ICONS['chart'], ICONS['zap'], ICONS['cubes']]

            flow_items = []
            for i in range(len(flow_en)):
                ico = icons_flow[i % len(icons_flow)]
                flow_items.append(f'''
                  <div class="flow-step-pill">
                    <span class="pill-icon">{ico}</span>
                    <span class="lang-en">{flow_en[i]}</span>
                    <span class="lang-es">{flow_es[i]}</span>
                  </div>''')
                if i < len(flow_en) - 1:
                    flow_items.append(f'<div class="flow-arrow">{ICONS["arrow_right"]}</div>')
            flow_html = ''.join(flow_items)

            slide_html = f'''
            <section class="slide{active_class}" id="{deck_id}-slide-{sid}" data-slide="{sid}" data-deck="{deck_id}">
              <div class="hero-cover">
                <div class="hero-brand-top">| 3i BAIRD LAB · VENTURES</div>
                <div class="hero-glow-badge">
                  <span class="pill-icon">{ICONS['sparkles']}</span>
                  <span class="lang-en">{badge_en}</span>
                  <span class="lang-es">{badge_es}</span>
                </div>
                <h1 class="hero-title">
                  <span class="lang-en">{title_en}</span>
                  <span class="lang-es">{title_es}</span>
                </h1>
                <p class="hero-subtitle">
                  <span class="lang-en">{subtitle_en}</span>
                  <span class="lang-es">{subtitle_es}</span>
                </p>
                <div class="hero-flow-ribbon">
                  {flow_html}
                </div>
              </div>
            </section>'''

        # Quote / Closing Slide
        elif 'quote_en' in s:
            pillars_en = s.get('pillars_en', [])
            pillars_es = s.get('pillars_es', [])
            icons_closing = [ICONS['target'], ICONS['route'], ICONS['brain'], ICONS['chart'], ICONS['zap'], ICONS['cubes']]
            p_html = []
            for i, (pen, pes) in enumerate(zip(pillars_en, pillars_es)):
                p_html.append(f'''
                  <div class="flow-step-pill">
                    <span class="pill-icon">{icons_closing[i % len(icons_closing)]}</span>
                    <span class="lang-en">{pen}</span>
                    <span class="lang-es">{pes}</span>
                  </div>''')

            slide_html = f'''
            <section class="slide{active_class}" id="{deck_id}-slide-{sid}" data-slide="{sid}" data-deck="{deck_id}">
              <div class="slide-top-meta">
                <div class="slide-tag-group">
                  <span class="slide-number-pill">{num}</span>
                  <span class="slide-category-title">
                    <span class="lang-en">{cat_en}</span>
                    <span class="lang-es">{cat_es}</span>
                  </span>
                </div>
                <div class="slide-meta-brand">| 3i BAIRD LAB</div>
              </div>
              <div class="slide-body" style="justify-content: center; align-items: center; text-align: center;">
                <div class="quote-box">
                  <p>
                    <span class="lang-en">{s.get('quote_en', '')}</span>
                    <span class="lang-es">{s.get('quote_es', '')}</span>
                  </p>
                </div>
                <div class="hero-flow-ribbon" style="margin-top: 24px;">
                  {''.join(p_html)}
                </div>
              </div>
              <div class="slide-footer" style="justify-content: center;">
                <div class="punchline-badge closing-badge">
                  <span class="pill-icon">{ICONS['sparkles']}</span>
                  <span class="lang-en">{punch_en}</span>
                  <span class="lang-es">{punch_es}</span>
                </div>
              </div>
            </section>'''

        # Comparison Table Slide
        elif 'comparison' in s:
            comp = s.get('comparison', [])
            rows_html = []
            for c in comp:
                rows_html.append(f'''
                  <tr>
                    <td class="aspect"><span class="lang-en">{c['aspect_en']}</span><span class="lang-es">{c['aspect_es']}</span></td>
                    <td class="bad"><span class="status-cross">✕</span><span class="lang-en">{c['bot_en']}</span><span class="lang-es">{c['bot_es']}</span></td>
                    <td class="good"><span class="status-check">✓</span><span class="lang-en">{c['tutor_en']}</span><span class="lang-es">{c['tutor_es']}</span></td>
                  </tr>''')

            slide_html = f'''
            <section class="slide{active_class}" id="{deck_id}-slide-{sid}" data-slide="{sid}" data-deck="{deck_id}">
              <div class="slide-top-meta">
                <div class="slide-tag-group">
                  <span class="slide-number-pill">{num}</span>
                  <span class="slide-category-title"><span class="lang-en">{cat_en}</span><span class="lang-es">{cat_es}</span></span>
                </div>
                <div class="slide-meta-brand">| 3i BAIRD LAB</div>
              </div>
              <div class="slide-header">
                <h2><span class="lang-en">{title_en}</span><span class="lang-es">{title_es}</span></h2>
                <p class="slide-lead"><span class="lang-en">{lead_en}</span><span class="lang-es">{lead_es}</span></p>
              </div>
              <div class="slide-body">
                <div class="comparison-table-wrapper">
                  <table class="comparison-table">
                    <thead>
                      <tr>
                        <th><span class="lang-en">Dimension / Vector</span><span class="lang-es">Dimensión / Vector</span></th>
                        <th><span class="lang-en">Traditional / Alternative</span><span class="lang-es">Tradicional / Alternativa</span></th>
                        <th class="col-tutor"><span class="lang-en">3i Solution</span><span class="lang-es">Solución 3i</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {''.join(rows_html)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="slide-footer">
                <div class="punchline-badge">
                  <span class="pill-icon">{ICONS['target']}</span>
                  <span class="lang-en">{punch_en}</span>
                  <span class="lang-es">{punch_es}</span>
                </div>
                {f'<button class="btn-hud" onclick="openLightbox(\'{img_src}\')"><span class="pill-icon">{ICONS["search"]}</span><span class="lang-en">Diagram View</span><span class="lang-es">Ver Diagrama</span></button>' if img_src else ''}
              </div>
            </section>'''

        # Split Layout with Image / Diagram
        elif img_src and ('pillars_en' in s or 'cards_en' in s or 'teams_en' in s or 'features_en' in s or 'stack_en' in s or 'layers_en' in s or 'streams_en' in s or 'risks_en' in s or 'phases_en' in s):
            left_content_html = ""

            if 'pillars_en' in s:
                p_items = []
                p_icons = [ICONS['target'], ICONS['route'], ICONS['database'], ICONS['chart']]
                for i, (pen, pes) in enumerate(zip(s['pillars_en'], s['pillars_es'])):
                    p_items.append(f'''
                      <div class="feature-card compact">
                        <div class="card-icon-wrapper cyan">{p_icons[i % len(p_icons)]}</div>
                        <div class="card-text-group">
                          <div class="card-title"><span class="lang-en">{pen['title']}</span><span class="lang-es">{pes['title']}</span></div>
                          <div class="card-desc"><span class="lang-en">{pen['desc']}</span><span class="lang-es">{pes['desc']}</span></div>
                        </div>
                      </div>''')
                left_content_html = f'<div class="cards-grid-2-vertical">{"".join(p_items)}</div>'

            elif 'cards_en' in s:
                c_items = []
                c_icons = [ICONS['zap'], ICONS['target'], ICONS['shield'], ICONS['chart'], ICONS['cubes']]
                for i, (cen, ces) in enumerate(zip(s['cards_en'], s['cards_es'])):
                    c_items.append(f'''
                      <div class="feature-card compact">
                        <div class="card-icon-wrapper purple">{c_icons[i % len(c_icons)]}</div>
                        <div class="card-text-group">
                          <div class="card-title"><span class="lang-en">{cen['title']}</span><span class="lang-es">{ces['title']}</span></div>
                          <div class="card-desc"><span class="lang-en">{cen['desc']}</span><span class="lang-es">{ces['desc']}</span></div>
                        </div>
                      </div>''')
                left_content_html = f'<div class="cards-grid-2-vertical">{"".join(c_items)}</div>'

            elif 'teams_en' in s:
                t_items = []
                t_icons = [ICONS['route'], ICONS['brain'], ICONS['chart'], ICONS['shield']]
                for i, (ten, tes) in enumerate(zip(s['teams_en'], s['teams_es'])):
                    agents_html = ''.join([f'<li class="agent-item"><span class="bullet-dot"></span> <span class="lang-en">{aen}</span><span class="lang-es">{aes}</span></li>' for aen, aes in zip(ten['agents'], tes['agents'])])
                    t_items.append(f'''
                      <div class="team-card" style="padding: 16px;">
                        <div class="team-header">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="team-mini-icon">{t_icons[i % len(t_icons)]}</div>
                            <span class="team-name"><span class="lang-en">{ten['name']}</span><span class="lang-es">{tes['name']}</span></span>
                          </div>
                        </div>
                        <div class="team-role"><span class="lang-en">{ten['role']}</span><span class="lang-es">{tes['role']}</span></div>
                        <ul class="agent-list">{agents_html}</ul>
                      </div>''')
                left_content_html = f'<div style="display: flex; flex-direction: column; gap: 10px;">{"".join(t_items)}</div>'

            elif 'features_en' in s and 'diagram_en' in s:
                d_items = []
                d_icons = [ICONS['database'], ICONS['zap'], ICONS['sparkles'], ICONS['target']]
                for i, (den, des) in enumerate(zip(s['diagram_en'], s['diagram_es'])):
                    d_items.append(f'''
                      <div class="feature-card compact">
                        <div class="card-icon-wrapper purple">{d_icons[i % len(d_icons)]}</div>
                        <div class="card-text-group">
                          <div class="card-title"><span class="lang-en">{den['label']}</span><span class="lang-es">{des['label']}</span></div>
                          <div class="card-desc"><span class="lang-en">{den['detail']}</span><span class="lang-es">{des['detail']}</span></div>
                        </div>
                      </div>''')
                f_items = ''.join([f'<li class="feature-bullet"><span class="bullet-glow">✦</span> <div><span class="lang-en">{fen}</span><span class="lang-es">{fes}</span></div></li>' for fen, fes in zip(s['features_en'], s['features_es'])])
                left_content_html = f'''
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; flex-direction: column; gap: 8px;">{"".join(d_items)}</div>
                    <ul class="features-bullet-list">{"".join(f_items)}</ul>
                  </div>'''

            elif 'stack_en' in s:
                st_items = []
                st_icons = [ICONS['brain'], ICONS['cpu'], ICONS['layers'], ICONS['database']]
                for i, (sten, stes) in enumerate(zip(s['stack_en'], s['stack_es'])):
                    st_items.append(f'''
                      <div class="feature-card compact">
                        <div class="card-icon-wrapper purple">{st_icons[i % len(st_icons)]}</div>
                        <div class="card-text-group">
                          <div class="card-title"><span class="lang-en">{sten['layer']}</span><span class="lang-es">{stes['layer']}</span></div>
                          <div class="card-desc"><span class="lang-en">{sten['desc']}</span><span class="lang-es">{stes['desc']}</span></div>
                        </div>
                      </div>''')
                left_content_html = f'<div style="display: flex; flex-direction: column; gap: 10px;">{"".join(st_items)}</div>'

            elif 'layers_en' in s:
                l_items = []
                l_icons = [ICONS['database'], ICONS['layers'], ICONS['brain']]
                for i, (len_l, les_l) in enumerate(zip(s['layers_en'], s['layers_es'])):
                    l_items.append(f'''
                      <div class="feature-card compact">
                        <div class="card-icon-wrapper cyan">{l_icons[i % len(l_icons)]}</div>
                        <div class="card-text-group">
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div class="card-title"><span class="lang-en">{len_l['type']}</span><span class="lang-es">{les_l['type']}</span></div>
                            <span class="tech-badge">{len_l.get('tech', '')}</span>
                          </div>
                          <div class="card-desc"><span class="lang-en">{len_l['desc']}</span><span class="lang-es">{les_l['desc']}</span></div>
                        </div>
                      </div>''')
                left_content_html = f'<div style="display: flex; flex-direction: column; gap: 10px;">{"".join(l_items)}</div>'

            elif 'risks_en' in s:
                for ren, res in zip(s['risks_en'], s['risks_es']):
                    left_content_html += f'''
                      <div class="feature-card risk-card">
                        <div class="risk-title">
                          <span class="risk-icon">{ICONS['alert']}</span>
                          <span class="lang-en">{ren['risk']}</span>
                          <span class="lang-es">{res['risk']}</span>
                        </div>
                        <div class="risk-solution">
                          <span class="solution-tag">MITIGATION</span>
                          <span class="lang-en">{ren['solution']}</span>
                          <span class="lang-es">{res['solution']}</span>
                        </div>
                      </div>'''
                left_content_html = f'<div style="display: flex; flex-direction: column; gap: 10px;">{left_content_html}</div>'

            slide_html = f'''
            <section class="slide{active_class}" id="{deck_id}-slide-{sid}" data-slide="{sid}" data-deck="{deck_id}">
              <div class="slide-top-meta">
                <div class="slide-tag-group">
                  <span class="slide-number-pill">{num}</span>
                  <span class="slide-category-title"><span class="lang-en">{cat_en}</span><span class="lang-es">{cat_es}</span></span>
                </div>
                <div class="slide-meta-brand">| 3i BAIRD LAB</div>
              </div>
              <div class="slide-header">
                <h2><span class="lang-en">{title_en}</span><span class="lang-es">{title_es}</span></h2>
                <p class="slide-lead"><span class="lang-en">{lead_en}</span><span class="lang-es">{lead_es}</span></p>
              </div>
              <div class="slide-body">
                <div class="split-layout">
                  {left_content_html}
                  <div class="diagram-preview-box" onclick="openLightbox('{img_src}')">
                    <img src="{img_src}" alt="{title_en}">
                    <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Zoom High-Res Architecture</span><span class="lang-es">Ampliar Arquitectura HD</span></div>
                  </div>
                </div>
              </div>
              <div class="slide-footer">
                <div class="punchline-badge">
                  <span class="pill-icon">{ICONS['sparkles']}</span>
                  <span class="lang-en">{punch_en}</span>
                  <span class="lang-es">{punch_es}</span>
                </div>
              </div>
            </section>'''

        # General Card Grid Slides
        else:
            cards_html = []
            if 'segments_en' in s:
                m_icons = [ICONS['users'], ICONS['target'], ICONS['brain'], ICONS['chart']]
                for i, (sen, ses) in enumerate(zip(s['segments_en'], s['segments_es'])):
                    cards_html.append(f'''
                      <div class="feature-card">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <div style="display: flex; align-items: center; gap: 10px;">
                            <div class="card-icon-wrapper cyan">{m_icons[i % len(m_icons)]}</div>
                            <div class="card-title"><span class="lang-en">{sen['title']}</span><span class="lang-es">{ses['title']}</span></div>
                          </div>
                          <span class="slide-number-pill">{sen['target']}</span>
                        </div>
                        <div class="card-desc"><span class="lang-en">{sen['desc']}</span><span class="lang-es">{ses['desc']}</span></div>
                      </div>''')
                body_content = f'<div class="cards-grid-2">{"".join(cards_html)}</div>'

            elif 'phases_en' in s:
                p_icons = [ICONS['zap'], ICONS['globe'], ICONS['chart']]
                for i, (pen, pes) in enumerate(zip(s['phases_en'], s['phases_es'])):
                    miles_html = ''.join([f'<li class="roadmap-mile-item"><span class="mile-dot"></span> <div><span class="lang-en">{men}</span><span class="lang-es">{mes}</span></div></li>' for men, mes in zip(pen['milestones'], pes['milestones'])])
                    cards_html.append(f'''
                      <div class="feature-card">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <span class="slide-number-pill"><span class="lang-en">{pen['phase']}</span><span class="lang-es">{pes['phase']}</span></span>
                          <div class="card-icon-wrapper purple">{p_icons[i % len(p_icons)]}</div>
                        </div>
                        <div class="card-title"><span class="lang-en">{pen['focus']}</span><span class="lang-es">{pes['focus']}</span></div>
                        <ul class="roadmap-milestones-list">{miles_html}</ul>
                      </div>''')
                body_content = f'<div class="cards-grid-3">{"".join(cards_html)}</div>'

            elif 'streams_en' in s:
                s_icons = [ICONS['users'], ICONS['brain'], ICONS['chart']]
                for i, (sen, ses) in enumerate(zip(s['streams_en'], s['streams_es'])):
                    cards_html.append(f'''
                      <div class="feature-card">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="card-icon-wrapper cyan">{s_icons[i % len(s_icons)]}</div>
                            <div class="card-title"><span class="lang-en">{sen['type']}</span><span class="lang-es">{ses['type']}</span></div>
                          </div>
                          <span class="slide-number-pill">{sen['tier']}</span>
                        </div>
                        <div class="card-desc"><span class="lang-en">{sen['desc']}</span><span class="lang-es">{ses['desc']}</span></div>
                      </div>''')
                moat_html = ""
                if 'moat_en' in s:
                    moat_html = f'''
                      <div class="feature-card highlight-card" style="margin-top: 12px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <div class="card-icon-wrapper purple">{ICONS['sparkles']}</div>
                          <div class="card-title"><span class="lang-en">Proprietary Advantage</span><span class="lang-es">Ventaja Propietaria</span></div>
                        </div>
                        <div class="card-desc" style="font-size: 1rem; color: var(--text-primary);">
                          <span class="lang-en">{s.get("moat_en", "")}</span><span class="lang-es">{s.get("moat_es", "")}</span>
                        </div>
                      </div>'''
                body_content = f'<div class="cards-grid-3">{"".join(cards_html)}</div>{moat_html}'

            elif 'cards_en' in s:
                c_icons = [ICONS['brain'], ICONS['zap'], ICONS['target'], ICONS['shield'], ICONS['chart']]
                for i, (cen, ces) in enumerate(zip(s['cards_en'], s['cards_es'])):
                    cards_html.append(f'''
                      <div class="feature-card">
                        <div class="card-icon-wrapper purple">{c_icons[i % len(c_icons)]}</div>
                        <div class="card-title"><span class="lang-en">{cen['title']}</span><span class="lang-es">{ces['title']}</span></div>
                        <div class="card-desc"><span class="lang-en">{cen['desc']}</span><span class="lang-es">{ces['desc']}</span></div>
                      </div>''')
                body_content = f'<div class="cards-grid-{len(cards_html)}">{"".join(cards_html)}</div>'

            else:
                body_content = '<div class="feature-card"><p>Slide content</p></div>'

            slide_html = f'''
            <section class="slide{active_class}" id="{deck_id}-slide-{sid}" data-slide="{sid}" data-deck="{deck_id}">
              <div class="slide-top-meta">
                <div class="slide-tag-group">
                  <span class="slide-number-pill">{num}</span>
                  <span class="slide-category-title"><span class="lang-en">{cat_en}</span><span class="lang-es">{cat_es}</span></span>
                </div>
                <div class="slide-meta-brand">| 3i BAIRD LAB</div>
              </div>
              <div class="slide-header">
                <h2><span class="lang-en">{title_en}</span><span class="lang-es">{title_es}</span></h2>
                <p class="slide-lead"><span class="lang-en">{lead_en}</span><span class="lang-es">{lead_es}</span></p>
              </div>
              <div class="slide-body">
                {body_content}
              </div>
              <div class="slide-footer">
                <div class="punchline-badge">
                  <span class="pill-icon">{ICONS['sparkles']}</span>
                  <span class="lang-en">{punch_en}</span>
                  <span class="lang-es">{punch_es}</span>
                </div>
              </div>
            </section>'''

        html_slides.append(slide_html)

    return ''.join(html_slides)

# Load the 3 curated 15-slide datasets
with open('deck_tutor_15.json', 'r', encoding='utf-8') as f:
    tutor_slides = json.load(f)

with open('deck_fastfood_15.json', 'r', encoding='utf-8') as f:
    fastfood_slides = json.load(f)

with open('deck_arcana_15.json', 'r', encoding='utf-8') as f:
    arcana_slides = json.load(f)

tutor_html = render_deck_slides('tutor', tutor_slides)
fastfood_html = render_deck_slides('fastfood', fastfood_slides)
arcana_html = render_deck_slides('arcana', arcana_slides)

def render_overview_thumbs(deck_id, slides):
    thumbs = []
    for s in slides:
        sid = s['id']
        title_en = s.get('title_en', '')
        title_es = s.get('title_es', '')
        cat_en = s.get('category_en', s.get('tag_en', ''))
        cat_es = s.get('category_es', s.get('tag_es', ''))
        thumbs.append(f'''
          <div class="overview-thumb-card" data-deck="{deck_id}" onclick="goToSlide({sid})">
            <div class="thumb-num">SLIDE {sid:02d} / 15 · <span class="lang-en">{cat_en}</span><span class="lang-es">{cat_es}</span></div>
            <div class="thumb-title">
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </div>
          </div>''')
    return ''.join(thumbs)

tutor_thumbs = render_overview_thumbs('tutor', tutor_slides)
fastfood_thumbs = render_overview_thumbs('fastfood', fastfood_slides)
arcana_thumbs = render_overview_thumbs('arcana', arcana_slides)

full_html = f'''<!DOCTYPE html>
<html lang="es" data-theme="dark" data-lang="es" data-deck="hub">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentación Ejecutiva · Venture Selection Hub · 3i BAIRD LAB</title>
  <meta name="description" content="3i BAIRD LAB Presentación Ejecutiva: Venture Selection Hub para AI EdTech, FoodTech QSR y Web3 & IoT.">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Futuristic Cyber Watermark & Ambient Tech Background -->
  <div class="ambient-bg">
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="ambient-orb orb-3"></div>
    <div class="cyber-grid-overlay"></div>
    <div class="brand-watermark-container">
      <div class="brand-watermark-text">3i BAIRD LAB</div>
      <div class="brand-watermark-sub">VENTURE ARCHITECTURE & DEEPTECH PLATFORM</div>
      <div class="tech-crosshairs">
        <span class="crosshair-item top-l">+</span>
        <span class="crosshair-item top-r">+</span>
        <span class="crosshair-item bot-l">+</span>
        <span class="crosshair-item bot-r">+</span>
      </div>
    </div>
  </div>

  <!-- Main Application Wrapper -->
  <div class="app-container">

    <!-- Top Floating Futuristic HUD Bar -->
    <header class="top-hud">
      <!-- 3i BAIRD LAB Brand Badge & Deck Selector -->
      <div class="hud-brand-deck-group">
        <button class="brand-hud-badge" onclick="openExecutiveHub()" title="Volver al Menú Principal (M)">
          <span class="brand-hud-glow-dot"></span>
          <span class="brand-hud-name">3i BAIRD LAB</span>
        </button>

        <button class="btn-deck-selector" id="deckSelectorBtn" onclick="openExecutiveHub()" title="Cambiar Presentación (M)">
          <div class="deck-current-icon" id="deckIcon">{ICONS['sparkles']}</div>
          <div class="deck-current-meta">
            <span class="deck-label-mini"><span class="lang-en">VENTURE HUB</span><span class="lang-es">VENTURE HUB</span></span>
            <span class="deck-current-title" id="deckCurrentTitle">Selección Ejecutiva</span>
          </div>
          <span class="deck-arrow">▼</span>
        </button>
      </div>

      <div class="deck-progress-wrapper" id="deckProgressWrapper" style="opacity: 0; pointer-events: none;">
        <div class="progress-bar-container">
          <div class="progress-bar-fill" id="progressBar"></div>
        </div>
        <div class="slide-counter" id="slideCounter">01 / 15</div>
      </div>

      <div class="hud-actions">
        <!-- Hub Home Button -->
        <button class="btn-hud hub-home-btn" onclick="openExecutiveHub()" title="Menú Principal (M)">
          <span class="pill-icon">{ICONS['home']}</span>
          <span class="lang-en">Hub Menu</span>
          <span class="lang-es">Menú Hub</span>
        </button>

        <!-- Language Switcher Toggle -->
        <button class="btn-hud lang-toggle" id="langToggleBtn" onclick="toggleLanguage()" title="Cambiar Idioma (L)">
          <span class="pill-icon">{ICONS['globe']}</span>
          <span id="langLabel">ESPAÑOL</span>
        </button>

        <!-- Theme Toggle -->
        <button class="btn-hud" onclick="toggleTheme()" title="Modo Claro/Oscuro (T)">
          <span id="themeIcon" class="pill-icon">{ICONS['sun']}</span>
        </button>

        <!-- Overview Grid Button -->
        <button class="btn-hud" id="gridToggleBtn" onclick="toggleOverview()" title="Ver Cuadrícula de 15 Diapositivas (G)">
          <span class="pill-icon">{ICONS['grid']}</span>
          <span class="lang-en">Grid</span>
          <span class="lang-es">Cuadrícula</span>
        </button>

        <!-- Print PDF Button -->
        <button class="btn-hud" onclick="window.print()" title="Exportar a PDF / Imprimir">
          <span class="pill-icon">{ICONS['file']}</span>
          <span class="lang-en">PDF</span>
          <span class="lang-es">PDF</span>
        </button>

        <!-- Fullscreen Button -->
        <button class="btn-hud" onclick="toggleFullscreen()" title="Pantalla Completa (F)">
          <span id="fsIcon" class="pill-icon">{ICONS['expand']}</span>
        </button>
      </div>
    </header>

    <!-- Main Deck Presentation Stage -->
    <main class="deck-stage">
      <div class="slide-viewport" id="slideViewport">

        <!-- ===================================================================
             EXECUTIVE VENTURE SELECTION HUB (MATCHING USER'S EXACT REFERENCE)
             =================================================================== -->
        <div class="deck-container active" id="deck-hub">
          <section class="slide active executive-hub-slide" id="hub-landing-slide" data-deck="hub" data-slide="1">
            <div class="executive-hub-layout">

              <!-- Left Column: Typography, Details, and 3 Glowing Venture Pills -->
              <div class="hub-left-content">
                <div class="hub-brand-kicker">
                  <span class="kicker-bar">|</span> <span class="kicker-text">3i &nbsp; BAIRD &nbsp; LAB</span>
                </div>

                <h1 class="hub-hero-headline">
                  <span class="lang-en">Executive<br>Presentation</span>
                  <span class="lang-es">Presentación<br>Ejecutiva</span>
                </h1>

                <div class="hub-hero-subtitle-gradient">
                  Venture Selection Hub
                </div>

                <div class="hub-hairline-divider"></div>

                <p class="hub-hero-description">
                  <span class="lang-en">Strategic evaluation of investment opportunities in AI EdTech, FoodTech QSR and Web3 &amp; IoT</span>
                  <span class="lang-es">Evaluación estratégica de oportunidades en AI EdTech, FoodTech QSR y Web3 &amp; IoT</span>
                </p>

                <!-- 3 Glowing Venture Pills Exactly as in Image -->
                <div class="hub-venture-pills-row">
                  <!-- Pill 1: AI EDTECH -->
                  <button class="venture-pill-btn pill-edtech" onclick="launchDeck('tutor')">
                    <span class="pill-btn-icon cyan">{ICONS['brain']}</span>
                    <span class="pill-btn-label">AI EDTECH</span>
                  </button>

                  <!-- Pill 2: FOODTECH QSR -->
                  <button class="venture-pill-btn pill-foodtech" onclick="launchDeck('fastfood')">
                    <span class="pill-btn-icon emerald">{ICONS['dish']}</span>
                    <span class="pill-btn-label">FOODTECH QSR</span>
                  </button>

                  <!-- Pill 3: WEB3 & IOT -->
                  <button class="venture-pill-btn pill-web3" onclick="launchDeck('arcana')">
                    <span class="pill-btn-icon purple">{ICONS['cubes']}</span>
                    <span class="pill-btn-label">WEB3 &amp; IOT</span>
                  </button>
                </div>
              </div>

              <!-- Right Column: Glowing Isometric Holographic Diamond Prism -->
              <div class="hub-right-visual">
                <div class="hologram-prism-wrapper">
                  <!-- Vertical Light Beam -->
                  <div class="vertical-light-beam"></div>

                  <!-- Stacked Isometric Prism Layers -->
                  <div class="prism-diamond-layer layer-outer"></div>
                  <div class="prism-diamond-layer layer-mid"></div>
                  <div class="prism-diamond-layer layer-core"></div>
                  <div class="prism-glowing-center"></div>

                  <!-- Glowing Holographic Waves -->
                  <svg class="hologram-cyber-waves" viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 420 C 150 410, 300 440, 450 360 C 550 300, 600 240, 700 180" stroke="url(#cyberGrad1)" stroke-width="2.5" stroke-opacity="0.8" />
                    <path d="M0 440 C 180 430, 320 460, 480 370 C 580 310, 620 250, 700 200" stroke="url(#cyberGrad2)" stroke-width="1.8" stroke-opacity="0.6" />
                    <path d="M0 460 C 200 450, 340 475, 510 380 C 600 320, 640 260, 700 220" stroke="url(#cyberGrad1)" stroke-width="1.2" stroke-opacity="0.4" />
                    <path d="M0 480 C 220 465, 360 485, 540 390 C 620 330, 660 270, 700 240" stroke="url(#cyberGrad2)" stroke-width="0.8" stroke-opacity="0.3" />
                    <defs>
                      <linearGradient id="cyberGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.2"/>
                        <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.9"/>
                        <stop offset="100%" stop-color="#a855f7" stop-opacity="1"/>
                      </linearGradient>
                      <linearGradient id="cyberGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.1"/>
                        <stop offset="70%" stop-color="#6366f1" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#ec4899" stop-opacity="0.9"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

            </div>
          </section>
        </div>

        <!-- DECK 1: EXPERT MULTI-AGENT TUTOR (15 Slides) -->
        <div class="deck-container" id="deck-tutor">
          {tutor_html}
        </div>

        <!-- DECK 2: SMART FAST-FOOD FRANCHISE (15 Slides) -->
        <div class="deck-container" id="deck-fastfood">
          {fastfood_html}
        </div>

        <!-- DECK 3: ARCANA TRUST NETWORK (15 Slides) -->
        <div class="deck-container" id="deck-arcana">
          {arcana_html}
        </div>
      </div>
    </main>

    <!-- Bottom Controls HUD -->
    <footer class="bottom-controls">
      <div class="nav-buttons-group">
        <button class="btn-nav" id="prevBtn" onclick="prevSlide()" style="display: none;">
          <span class="pill-icon">{ICONS['arrow_left']}</span>
          <span class="lang-en">Previous</span>
          <span class="lang-es">Anterior</span>
        </button>
        <button class="btn-nav" id="nextBtn" onclick="nextSlide()" style="display: none;">
          <span class="lang-en">Next</span>
          <span class="lang-es">Siguiente</span>
          <span class="pill-icon">{ICONS['arrow_right']}</span>
        </button>
        <button class="btn-nav" id="hubReturnBtn" onclick="openExecutiveHub()">
          <span class="pill-icon">{ICONS['home']}</span>
          <span class="lang-en">Venture Selection Hub</span>
          <span class="lang-es">Menú Selección Hub</span>
        </button>
      </div>

      <div class="brand-footer-signature">
        <span>3i BAIRD LAB</span> · <span class="lang-en">CONFIDENTIAL INVESTOR PRESENTATION</span><span class="lang-es">PRESENTACIÓN CONFIDENCIAL PARA INVERSORES</span>
      </div>

      <div class="keyboard-hints">
        <span><kbd class="kbd-badge">M</kbd> <span class="lang-en">Hub Menu</span><span class="lang-es">Menú Hub</span></span>
        <span><kbd class="kbd-badge">L</kbd> <span class="lang-en">Lang</span><span class="lang-es">Idioma</span></span>
        <span><kbd class="kbd-badge">G</kbd> <span class="lang-en">Grid</span><span class="lang-es">15 Slides</span></span>
        <span><kbd class="kbd-badge">F</kbd> <span class="lang-en">Full</span><span class="lang-es">Pantalla</span></span>
      </div>
    </footer>

  </div>

  <!-- Overview Slide Drawer Modal (15 Slides Navigator) -->
  <div class="overview-drawer" id="overviewDrawer">
    <div class="overview-header">
      <div>
        <div class="deck-modal-tag">| 3i BAIRD LAB · EXECUTIVE NAVIGATOR</div>
        <div class="overview-title">
          <span class="lang-en">Executive Slide Navigator (15 Slides)</span>
          <span class="lang-es">Navegador Ejecutivo (15 Diapositivas)</span>
        </div>
      </div>
      <button class="lightbox-close-btn" onclick="toggleOverview()">{ICONS['close']}</button>
    </div>
    <div class="overview-grid" id="overviewGrid-tutor">
      {tutor_thumbs}
    </div>
    <div class="overview-grid" id="overviewGrid-fastfood" style="display: none;">
      {fastfood_thumbs}
    </div>
    <div class="overview-grid" id="overviewGrid-arcana" style="display: none;">
      {arcana_thumbs}
    </div>
  </div>

  <!-- Lightbox Zoom Modal for Diagrams -->
  <div class="lightbox-modal" id="lightboxModal" onclick="closeLightbox(event)">
    <button class="lightbox-close-btn" onclick="closeLightboxDirect()">{ICONS['close']}</button>
    <div class="lightbox-img-wrapper">
      <img id="lightboxImg" src="" alt="Zoomed Diagram">
    </div>
  </div>

  <!-- Presentation Logic Script -->
  <script src="app.js"></script>
</body>
</html>
'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print("Generated exact Executive Venture Selection Hub index.html successfully.")
