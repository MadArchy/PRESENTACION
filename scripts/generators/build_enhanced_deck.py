# -*- coding: utf-8 -*-
"""
Build Enhanced Presentation Deck with:
1. Professional inline SVG vector icons (no emojis).
2. Ultra-high contrast typography for both Dark Mode and Light Mode.
3. Rich contextual diagrams, infographics, and interactive visual widgets across ALL slides.
4. Smooth theme transition and perfectly tuned text legibility.
"""

import json

# SVG Icon Library (Modern, minimalist, high-tech)
ICONS = {
    "brain": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/><path d="M7 10h10"/><path d="M7 14h10"/></svg>',
    "agents": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/><path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/><rect width="8" height="8" x="2" y="14" rx="2"/><path d="M14 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/><path d="M20 14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/></svg>',
    "network": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>',
    "target": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    "route": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
    "database": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>',
    "shield": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    "check": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    "zap": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    "layers": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    "cpu": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>',
    "chart": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    "sparkles": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    "users": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "scale": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
    "link": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    "flag": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>',
    "alert": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    "globe": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    "sun": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    "grid": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    "file": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
    "expand": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>',
    "search": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    "arrow_right": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    "arrow_left": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    "close": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
}

with open('deck_data.json', 'r', encoding='utf-8') as f:
    slides = json.load(f)

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

    active_class = " active" if sid == 1 else ""

    # Slide 1: Hero
    if s.get('category') == 'hero':
        badge_en = s.get('badge_en', '')
        badge_es = s.get('badge_es', '')
        subtitle_en = s.get('subtitle_en', '')
        subtitle_es = s.get('subtitle_es', '')
        flow_en = s.get('flow_en', [])
        flow_es = s.get('flow_es', [])
        icons_flow = [ICONS['target'], ICONS['route'], ICONS['brain'], ICONS['chart'], ICONS['zap']]

        flow_items = []
        for i in range(len(flow_en)):
            flow_items.append(f'''
              <div class="flow-step-pill">
                <span class="pill-icon">{icons_flow[i]}</span>
                <span class="lang-en">{flow_en[i]}</span>
                <span class="lang-es">{flow_es[i]}</span>
              </div>''')
            if i < len(flow_en) - 1:
                flow_items.append(f'<div class="flow-arrow">{ICONS["arrow_right"]}</div>')
        flow_html = ''.join(flow_items)

        slide_html = f'''
        <!-- SLIDE 1: HERO -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="hero-cover">
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
            <div class="hero-context-preview" style="margin-top: 32px; display: flex; gap: 16px; justify-content: center;">
              <div class="hero-badge-item"><span class="badge-dot cyan"></span> <span class="lang-en">12 Specialized Agents</span><span class="lang-es">12 Agentes Especializados</span></div>
              <div class="hero-badge-item"><span class="badge-dot purple"></span> <span class="lang-en">Tri-Layer Persistent Memory</span><span class="lang-es">Memoria Tri-Capa Persistente</span></div>
              <div class="hero-badge-item"><span class="badge-dot emerald"></span> <span class="lang-en">Anti-Hallucination Triad</span><span class="lang-es">Tríada Anti-Alucinaciones</span></div>
            </div>
          </div>
        </section>'''
    
    # Slide 2: The Problem (Split with contextual image)
    elif sid == 2:
        pillars_en = s.get('pillars_en', [])
        pillars_es = s.get('pillars_es', [])
        pillars_html = []
        icons = [ICONS['target'], ICONS['route'], ICONS['database'], ICONS['chart']]
        for i, (pen, pes) in enumerate(zip(pillars_en, pillars_es)):
            pillars_html.append(f'''
              <div class="feature-card compact">
                <div class="card-icon-wrapper cyan">{icons[i]}</div>
                <div class="card-text-group">
                  <div class="card-title">
                    <span class="lang-en">{pen['title']}</span>
                    <span class="lang-es">{pes['title']}</span>
                  </div>
                  <div class="card-desc">
                    <span class="lang-en">{pen['desc']}</span>
                    <span class="lang-es">{pes['desc']}</span>
                  </div>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 2: THE PROBLEM -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div class="cards-grid-2-vertical">
                {''.join(pillars_html)}
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media/image1.png')">
                <img src="extracted_media/image1.png" alt="Chatbot vs Tutor Architecture">
                <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click to Zoom Diagram</span><span class="lang-es">Clic para Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['zap']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 3: Timing / Why Now
    elif sid == 3:
        cards_en = s.get('cards_en', [])
        cards_es = s.get('cards_es', [])
        icons_timing = [ICONS['brain'], ICONS['agents'], ICONS['network']]
        cards_html = []
        for i, (cen, ces) in enumerate(zip(cards_en, cards_es)):
            cards_html.append(f'''
              <div class="feature-card">
                <div class="card-icon-wrapper purple">{icons_timing[i]}</div>
                <div class="card-title">
                  <span class="lang-en">{cen['title']}</span>
                  <span class="lang-es">{ces['title']}</span>
                </div>
                <div class="card-desc">
                  <span class="lang-en">{cen['desc']}</span>
                  <span class="lang-es">{ces['desc']}</span>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 3: TIMING -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="cards-grid-3">
              {''.join(cards_html)}
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

    # Slide 4: The Solution (Split Layout with diagram)
    elif sid == 4:
        steps_en = s.get('steps_en', [])
        steps_es = s.get('steps_es', [])
        steps_html = []
        for sen, ses in zip(steps_en, steps_es):
            steps_html.append(f'''
              <div class="agent-step-badge">
                <span class="step-dot"></span>
                <span class="lang-en">{sen}</span>
                <span class="lang-es">{ses}</span>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 4: THE SOLUTION -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div class="feature-card highlight-card">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="card-icon-wrapper purple">{ICONS['agents']}</div>
                    <div class="card-title">
                      <span class="lang-en">Autonomous AI Agent Role</span>
                      <span class="lang-es">Definición de Agente de IA</span>
                    </div>
                  </div>
                  <div class="card-desc">
                    <span class="lang-en">{s.get('definition_en', '')}</span>
                    <span class="lang-es">{s.get('definition_es', '')}</span>
                  </div>
                </div>
                <div class="steps-flow-grid">
                  {''.join(steps_html)}
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media/image2.png')">
                <img src="extracted_media/image2.png" alt="Solution Overview">
                <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click to Zoom UI View</span><span class="lang-es">Clic para Ampliar Interfaz</span></div>
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

    # Slide 5: Experience Closed Loop
    elif sid == 5:
        loop_en = s.get('loop_en', [])
        loop_es = s.get('loop_es', [])
        loop_html = []
        for i, (len_item, les_item) in enumerate(zip(loop_en, loop_es), 1):
            loop_html.append(f'''
              <div class="agent-item-card">
                <div class="step-header">
                  <span class="step-num-pill">{i:02d}</span>
                  <span class="step-name">
                    <span class="lang-en">{len_item['step']}</span>
                    <span class="lang-es">{les_item['step']}</span>
                  </span>
                </div>
                <div class="step-desc">
                  <span class="lang-en">{len_item['desc']}</span>
                  <span class="lang-es">{les_item['desc']}</span>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 5: EXPERIENCE -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div class="experience-steps-grid">
                {''.join(loop_html)}
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media/image3.png')">
                <img src="extracted_media/image3.png" alt="Learning Cycle">
                <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click to Zoom Cycle</span><span class="lang-es">Clic para Ampliar Ciclo</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['zap']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 6: Positioning & Comparison Table
    elif sid == 6:
        comp = s.get('comparison', [])
        rows_html = []
        for c in comp:
            rows_html.append(f'''
              <tr>
                <td class="aspect">
                  <span class="lang-en">{c['aspect_en']}</span>
                  <span class="lang-es">{c['aspect_es']}</span>
                </td>
                <td class="bad">
                  <span class="status-cross">✕</span>
                  <span class="lang-en">{c['bot_en']}</span>
                  <span class="lang-es">{c['bot_es']}</span>
                </td>
                <td class="good">
                  <span class="status-check">✓</span>
                  <span class="lang-en">{c['tutor_en']}</span>
                  <span class="lang-es">{c['tutor_es']}</span>
                </td>
              </tr>''')

        slide_html = f'''
        <!-- SLIDE 6: POSITIONING -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="comparison-table-wrapper">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>
                      <span class="lang-en">Capability / Dimension</span>
                      <span class="lang-es">Capacidad / Dimensión</span>
                    </th>
                    <th>
                      <span class="lang-en">Generic Educational Chatbot</span>
                      <span class="lang-es">Chatbot Educativo Genérico</span>
                    </th>
                    <th class="col-tutor">
                      <span class="lang-en">Expert Multi-Agent Tutor</span>
                      <span class="lang-es">Tutor Experto Multi-Agente</span>
                    </th>
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
          </div>
        </section>'''

    # Slide 7: Governance 4 Teams (With Diagram side-by-side)
    elif sid == 7:
        teams_en = s.get('teams_en', [])
        teams_es = s.get('teams_es', [])
        teams_html = []
        team_icons = [ICONS['route'], ICONS['brain'], ICONS['chart'], ICONS['shield']]
        for i, (ten, tes) in enumerate(zip(teams_en, teams_es)):
            agents_html = ''.join([f'<li class="agent-item"><span class="bullet-dot"></span> <span class="lang-en">{aen}</span><span class="lang-es">{aes}</span></li>' for aen, aes in zip(ten['agents'], tes['agents'])])
            teams_html.append(f'''
              <div class="team-card">
                <div class="team-header">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="team-mini-icon">{team_icons[i]}</div>
                    <span class="team-name">
                      <span class="lang-en">{ten['name']}</span>
                      <span class="lang-es">{tes['name']}</span>
                    </span>
                  </div>
                  <span class="team-num">TEAM 0{ten['num']}</span>
                </div>
                <div class="team-role">
                  <span class="lang-en">{ten['role']}</span>
                  <span class="lang-es">{tes['role']}</span>
                </div>
                <ul class="agent-list">
                  {agents_html}
                </ul>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 7: GOVERNANCE -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="teams-grid">
              {''.join(teams_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['scale']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
            <button class="btn-hud" onclick="openLightbox('extracted_media/image4.png')">
              <span class="pill-icon">{ICONS['search']}</span>
              <span class="lang-en">Inspect 4 Teams Topology</span>
              <span class="lang-es">Ver Topología de los 4 Equipos</span>
            </button>
          </div>
        </section>'''

    # Slide 8: Learning Through Connections
    elif sid == 8:
        feats_en = s.get('features_en', [])
        feats_es = s.get('features_es', [])
        feats_html = ''.join([f'<li class="feature-bullet"><span class="bullet-glow">✦</span> <div><span class="lang-en">{fen}</span><span class="lang-es">{fes}</span></div></li>' for fen, fes in zip(feats_en, feats_es)])

        diagram_en = s.get('diagram_en', [])
        diagram_es = s.get('diagram_es', [])
        diag_html = []
        diag_icons = [ICONS['database'], ICONS['link'], ICONS['sparkles']]
        for i, (den, des) in enumerate(zip(diagram_en, diagram_es)):
            diag_html.append(f'''
              <div class="feature-card compact">
                <div class="card-icon-wrapper purple">{diag_icons[i]}</div>
                <div class="card-text-group">
                  <div class="card-title">
                    <span class="lang-en">{den['label']}</span>
                    <span class="lang-es">{des['label']}</span>
                  </div>
                  <div class="card-desc">
                    <span class="lang-en">{den['detail']}</span>
                    <span class="lang-es">{des['detail']}</span>
                  </div>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 8: CONNECTIONS -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div class="cards-grid-3-compact">
                  {''.join(diag_html)}
                </div>
                <ul class="features-bullet-list">
                  {feats_html}
                </ul>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media/image5.png')">
                <img src="extracted_media/image5.png" alt="Connections Diagram">
                <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click to Zoom Bridge Diagram</span><span class="lang-es">Clic para Ampliar Puentes</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['link']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 9: Structured Memory
    elif sid == 9:
        layers_en = s.get('layers_en', [])
        layers_es = s.get('layers_es', [])
        layer_icons = [ICONS['database'], ICONS['network'], ICONS['layers']]
        layers_html = []
        for i, (len_l, les_l) in enumerate(zip(layers_en, layers_es)):
            layers_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="card-icon-wrapper cyan">{layer_icons[i]}</div>
                    <div class="card-title">
                      <span class="lang-en">{len_l['type']}</span>
                      <span class="lang-es">{les_l['type']}</span>
                    </div>
                  </div>
                  <span class="tech-badge">{len_l['tech']}</span>
                </div>
                <div class="card-desc">
                  <span class="lang-en">{len_l['desc']}</span>
                  <span class="lang-es">{les_l['desc']}</span>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 9: STRUCTURED MEMORY -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                {''.join(layers_html)}
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media/image6.png')">
                <img src="extracted_media/image6.png" alt="Structured Memory Tri-Layer">
                <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click to Zoom Architecture</span><span class="lang-es">Clic para Ampliar Arquitectura</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['database']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 10: Trust & Sources
    elif sid == 10:
        pipe_en = s.get('pipeline_en', [])
        pipe_es = s.get('pipeline_es', [])
        pipe_icons = [ICONS['search'], ICONS['shield'], ICONS['layers']]
        pipe_html = []
        for i, (pen, pes) in enumerate(zip(pipe_en, pipe_es)):
            pipe_html.append(f'''
              <div class="feature-card compact">
                <div class="card-icon-wrapper emerald">{pipe_icons[i]}</div>
                <div class="card-text-group">
                  <div class="card-title">
                    <span class="lang-en">{pen['step']}</span>
                    <span class="lang-es">{pes['step']}</span>
                  </div>
                  <div class="card-desc">
                    <span class="lang-en">{pen['desc']}</span>
                    <span class="lang-es">{pes['desc']}</span>
                  </div>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 10: TRUST -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                {''.join(pipe_html)}
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media/image7.png')">
                <img src="extracted_media/image7.png" alt="Trust Pipeline">
                <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click to Zoom Pipeline</span><span class="lang-es">Clic para Ampliar Pipeline</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['shield']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 11: Decoupled Architecture
    elif sid == 11:
        stack_en = s.get('stack_en', [])
        stack_es = s.get('stack_es', [])
        stack_icons = [ICONS['brain'], ICONS['cpu'], ICONS['layers'], ICONS['database']]
        stack_html = []
        for i, (sten, stes) in enumerate(zip(stack_en, stack_es)):
            stack_html.append(f'''
              <div class="feature-card compact">
                <div class="card-icon-wrapper purple">{stack_icons[i]}</div>
                <div class="card-text-group">
                  <div class="card-title">
                    <span class="lang-en">{sten['layer']}</span>
                    <span class="lang-es">{stes['layer']}</span>
                  </div>
                  <div class="card-desc">
                    <span class="lang-en">{sten['desc']}</span>
                    <span class="lang-es">{stes['desc']}</span>
                  </div>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 11: ARCHITECTURE -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 10px;">
                {''.join(stack_html)}
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media/image8.png')">
                <img src="extracted_media/image8.png" alt="Decoupled Architecture">
                <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click to Zoom Architecture</span><span class="lang-es">Clic para Ampliar Arquitectura</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['cpu']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 12: Target Market
    elif sid == 12:
        segs_en = s.get('segments_en', [])
        segs_es = s.get('segments_es', [])
        market_icons = [ICONS['users'], ICONS['target'], ICONS['brain'], ICONS['chart']]
        segs_html = []
        for i, (sen, ses) in enumerate(zip(segs_en, segs_es)):
            segs_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="card-icon-wrapper cyan">{market_icons[i]}</div>
                    <div class="card-title">
                      <span class="lang-en">{sen['title']}</span>
                      <span class="lang-es">{ses['title']}</span>
                    </div>
                  </div>
                  <span class="slide-number-pill">{sen['target']}</span>
                </div>
                <div class="card-desc">
                  <span class="lang-en">{sen['desc']}</span>
                  <span class="lang-es">{ses['desc']}</span>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 12: MARKET -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="cards-grid-2">
              {''.join(segs_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['target']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 13: MVP Demo
    elif sid == 13:
        stages_en = s.get('demo_steps_en', [])
        stages_es = s.get('demo_steps_es', [])
        stage_icons = [ICONS['target'], ICONS['brain'], ICONS['chart']]
        stages_html = []
        for i, (sten, stes) in enumerate(zip(stages_en, stages_es)):
            items_html = ''.join([f'<li><span class="bullet-check">✓</span> <span><span class="lang-en">{ien}</span><span class="lang-es">{ies}</span></span></li>' for ien, ies in zip(sten['items'], stes['items'])])
            stages_html.append(f'''
              <div class="demo-stage-card">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div class="stage-badge">
                    <span class="lang-en">{sten['badge']}</span>
                    <span class="lang-es">{stes['badge']}</span>
                  </div>
                  <div class="stage-icon-pill">{stage_icons[i]}</div>
                </div>
                <div class="stage-title">
                  <span class="lang-en">{sten['title']}</span>
                  <span class="lang-es">{stes['title']}</span>
                </div>
                <ul class="demo-item-list">
                  {items_html}
                </ul>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 13: DEMO -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="demo-stages-grid">
              {''.join(stages_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['chart']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 14: Roadmap
    elif sid == 14:
        phases_en = s.get('phases_en', [])
        phases_es = s.get('phases_es', [])
        phase_icons = [ICONS['flag'], ICONS['zap'], ICONS['globe']]
        phases_html = []
        for i, (pen, pes) in enumerate(zip(phases_en, phases_es)):
            miles_html = ''.join([f'<li class="roadmap-mile-item"><span class="mile-dot"></span> <div><span class="lang-en">{men}</span><span class="lang-es">{mes}</span></div></li>' for men, mes in zip(pen['milestones'], pes['milestones'])])
            phases_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="slide-number-pill">
                    <span class="lang-en">{pen['phase']}</span>
                    <span class="lang-es">{pes['phase']}</span>
                  </span>
                  <div class="card-icon-wrapper purple">{phase_icons[i]}</div>
                </div>
                <div class="card-title">
                  <span class="lang-en">{pen['focus']}</span>
                  <span class="lang-es">{pes['focus']}</span>
                </div>
                <ul class="roadmap-milestones-list">
                  {miles_html}
                </ul>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 14: ROADMAP -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="cards-grid-3">
              {''.join(phases_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['route']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 15: Value Model & Moat
    elif sid == 15:
        streams_en = s.get('streams_en', [])
        streams_es = s.get('streams_es', [])
        stream_icons = [ICONS['users'], ICONS['brain'], ICONS['chart']]
        streams_html = []
        for i, (sen, ses) in enumerate(zip(streams_en, streams_es)):
            streams_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="card-icon-wrapper cyan">{stream_icons[i]}</div>
                    <div class="card-title">
                      <span class="lang-en">{sen['type']}</span>
                      <span class="lang-es">{ses['type']}</span>
                    </div>
                  </div>
                  <span class="slide-number-pill">{sen['tier']}</span>
                </div>
                <div class="card-desc">
                  <span class="lang-en">{sen['desc']}</span>
                  <span class="lang-es">{ses['desc']}</span>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 15: VALUE MODEL -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="cards-grid-3">
              {''.join(streams_html)}
            </div>
            <div class="feature-card highlight-card">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="card-icon-wrapper purple">{ICONS['network']}</div>
                <div class="card-title">
                  <span class="lang-en">Proprietary Cognitive Data Moat</span>
                  <span class="lang-es">Moat de Datos Cognitivo Propietario</span>
                </div>
              </div>
              <div class="card-desc" style="font-size: 1rem; color: var(--text-primary);">
                <span class="lang-en">{s.get('moat_en', '')}</span>
                <span class="lang-es">{s.get('moat_es', '')}</span>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['chart']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 16: Risk & Control
    elif sid == 16:
        risks_en = s.get('risks_en', [])
        risks_es = s.get('risks_es', [])
        risks_html = []
        for ren, res in zip(risks_en, risks_es):
            risks_html.append(f'''
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
              </div>''')

        slide_html = f'''
        <!-- SLIDE 16: RISKS -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="cards-grid-3">
              {''.join(risks_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['shield']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 17: Investment Ask
    elif sid == 17:
        miles_en = s.get('milestones_en', [])
        miles_es = s.get('milestones_es', [])
        ask_icons = [ICONS['target'], ICONS['agents'], ICONS['users'], ICONS['chart']]
        miles_html = []
        for i, (men, mes) in enumerate(zip(miles_en, miles_es)):
            miles_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="card-icon-wrapper purple">{ask_icons[i]}</div>
                    <div class="card-title">
                      <span class="lang-en">{men['title']}</span>
                      <span class="lang-es">{mes['title']}</span>
                    </div>
                  </div>
                  <span class="slide-number-pill">PHASE 0{men['num']}</span>
                </div>
                <div class="card-desc">
                  <span class="lang-en">{men['desc']}</span>
                  <span class="lang-es">{mes['desc']}</span>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 17: INVESTMENT ASK -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body">
            <div class="cards-grid-2">
              {''.join(miles_html)}
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

    # Slide 18: Closing
    elif sid == 18:
        pillars_en = s.get('pillars_en', [])
        pillars_es = s.get('pillars_es', [])
        icons_closing = [ICONS['target'], ICONS['route'], ICONS['brain'], ICONS['chart'], ICONS['zap']]
        p_html = []
        for i, (pen, pes) in enumerate(zip(pillars_en, pillars_es)):
            p_html.append(f'''
              <div class="flow-step-pill">
                <span class="pill-icon">{icons_closing[i]}</span>
                <span class="lang-en">{pen}</span>
                <span class="lang-es">{pes}</span>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 18: CLOSING -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
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

    # Slide 19: FAQ Appendix
    elif sid == 19:
        faqs_en = s.get('faqs_en', [])
        faqs_es = s.get('faqs_es', [])
        faqs_html = []
        for fen, fes in zip(faqs_en, faqs_es):
            faqs_html.append(f'''
              <div class="faq-card">
                <div class="faq-q">
                  <span class="faq-q-badge">Q</span>
                  <div>
                    <span class="lang-en">{fen['q']}</span>
                    <span class="lang-es">{fes['q']}</span>
                  </div>
                </div>
                <div class="faq-a">
                  <span class="lang-en">{fen['a']}</span>
                  <span class="lang-es">{fes['a']}</span>
                </div>
              </div>''')

        slide_html = f'''
        <!-- SLIDE 19: FAQ -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header">
            <h2>
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body" style="overflow-y: auto;">
            <div class="faq-grid">
              {''.join(faqs_html)}
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

    # Slides 20 to 27: Visual Context Deep-Dives
    else:
        img_src = s.get('image', '')
        slide_html = f'''
        <!-- SLIDE {sid}: VISUAL CONTEXT -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">{num}</span>
              <span class="slide-category-title">
                <span class="lang-en">{cat_en}</span>
                <span class="lang-es">{cat_es}</span>
              </span>
            </div>
          </div>
          <div class="slide-header" style="margin-bottom: 12px;">
            <h2 style="font-size: 1.9rem;">
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </h2>
            <p class="slide-lead" style="font-size: 1.05rem;">
              <span class="lang-en">{lead_en}</span>
              <span class="lang-es">{lead_es}</span>
            </p>
          </div>
          <div class="slide-body" style="align-items: center; justify-content: center;">
            <div class="diagram-preview-box visual-full" onclick="openLightbox('{img_src}')">
              <img src="{img_src}" alt="{title_en}">
              <div class="zoom-hint-pill">{ICONS['search']} <span class="lang-en">Click for Fullscreen HD View</span><span class="lang-es">Clic para Vista HD Completa</span></div>
            </div>
          </div>
          <div class="slide-footer" style="margin-top: 12px;">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['sparkles']}</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    html_slides.append(slide_html)

# Generate Overview Thumbnails
overview_cards = []
for s in slides:
    sid = s['id']
    title_en = s.get('title_en', '')
    title_es = s.get('title_es', '')
    cat_en = s.get('category_en', s.get('tag_en', ''))
    cat_es = s.get('category_es', s.get('tag_es', ''))
    overview_cards.append(f'''
      <div class="overview-thumb-card" onclick="goToSlide({sid})">
        <div class="thumb-num">SLIDE {sid:02d} · <span class="lang-en">{cat_en}</span><span class="lang-es">{cat_es}</span></div>
        <div class="thumb-title">
          <span class="lang-en">{title_en}</span>
          <span class="lang-es">{title_es}</span>
        </div>
      </div>''')

overview_html = ''.join(overview_cards)

full_html = f'''<!DOCTYPE html>
<html lang="es" data-theme="dark" data-lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Expert Multi-Agent Tutor · Investor Presentation</title>
  <meta name="description" content="An intelligent tutoring system that diagnoses, teaches, evaluates, and adapts. Produces verifiable learning.">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Ambient Glowing Background -->
  <div class="ambient-bg">
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
  </div>

  <!-- Main Application Wrapper -->
  <div class="app-container">

    <!-- Top Floating HUD Bar -->
    <header class="top-hud">
      <div class="brand-logo">
        <div class="brand-icon">{ICONS['zap']}</div>
        <div class="brand-title">Multi-Agent <span>Tutor</span></div>
      </div>

      <div class="deck-progress-wrapper">
        <div class="progress-bar-container">
          <div class="progress-bar-fill" id="progressBar"></div>
        </div>
        <div class="slide-counter" id="slideCounter">01 / 27</div>
      </div>

      <div class="hud-actions">
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
        <button class="btn-hud" onclick="toggleOverview()" title="Ver Cuadrícula de Diapositivas (G)">
          <span class="pill-icon">{ICONS['grid']}</span>
          <span class="lang-en">Overview</span>
          <span class="lang-es">Cuadrícula</span>
        </button>

        <!-- Print PDF Button -->
        <button class="btn-hud" onclick="window.print()" title="Exportar a PDF / Imprimir">
          <span class="pill-icon">{ICONS['file']}</span>
          <span class="lang-en">Export PDF</span>
          <span class="lang-es">Exportar PDF</span>
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
        {''.join(html_slides)}
      </div>
    </main>

    <!-- Bottom Controls HUD -->
    <footer class="bottom-controls">
      <div class="nav-buttons-group">
        <button class="btn-nav" id="prevBtn" onclick="prevSlide()">
          <span class="pill-icon">{ICONS['arrow_left']}</span>
          <span class="lang-en">Previous</span>
          <span class="lang-es">Anterior</span>
        </button>
        <button class="btn-nav" id="nextBtn" onclick="nextSlide()">
          <span class="lang-en">Next</span>
          <span class="lang-es">Siguiente</span>
          <span class="pill-icon">{ICONS['arrow_right']}</span>
        </button>
      </div>

      <div class="keyboard-hints">
        <span><kbd class="kbd-badge">←</kbd> <kbd class="kbd-badge">→</kbd> <span class="lang-en">Navigate</span><span class="lang-es">Navegar</span></span>
        <span><kbd class="kbd-badge">Space</kbd> <span class="lang-en">Next</span><span class="lang-es">Avanzar</span></span>
        <span><kbd class="kbd-badge">F</kbd> <span class="lang-en">Fullscreen</span><span class="lang-es">Pantalla Completa</span></span>
        <span><kbd class="kbd-badge">G</kbd> <span class="lang-en">Grid</span><span class="lang-es">Cuadrícula</span></span>
        <span><kbd class="kbd-badge">L</kbd> <span class="lang-en">Language</span><span class="lang-es">Idioma</span></span>
        <span><kbd class="kbd-badge">T</kbd> <span class="lang-en">Theme</span><span class="lang-es">Tema</span></span>
      </div>
    </footer>

  </div>

  <!-- Overview Slide Drawer Modal -->
  <div class="overview-drawer" id="overviewDrawer">
    <div class="overview-header">
      <div class="overview-title">
        <span class="lang-en">Slide Navigator</span>
        <span class="lang-es">Navegador de Diapositivas</span>
      </div>
      <button class="lightbox-close-btn" onclick="toggleOverview()">{ICONS['close']}</button>
    </div>
    <div class="overview-grid">
      {overview_html}
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

print("Generated enhanced index.html with professional SVG icons and contextual images.")
