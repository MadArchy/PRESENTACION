# -*- coding: utf-8 -*-
import json

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

        flow_items = []
        for i in range(len(flow_en)):
            flow_items.append(f'''
              <div class="flow-step-pill">
                <span class="lang-en">{flow_en[i]}</span>
                <span class="lang-es">{flow_es[i]}</span>
              </div>''')
            if i < len(flow_en) - 1:
                flow_items.append('<div class="flow-arrow">→</div>')
        flow_html = ''.join(flow_items)

        slide_html = f'''
        <!-- SLIDE 1: HERO -->
        <section class="slide{active_class}" id="slide-{sid}" data-slide="{sid}">
          <div class="hero-cover">
            <div class="hero-glow-badge">
              <span class="lang-en">✦ {badge_en}</span>
              <span class="lang-es">✦ {badge_es}</span>
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
    
    # Slide 2: The Problem
    elif sid == 2:
        pillars_en = s.get('pillars_en', [])
        pillars_es = s.get('pillars_es', [])
        pillars_html = []
        icons = ['🎯', '🗺️', '🧠', '📊']
        for i, (pen, pes) in enumerate(zip(pillars_en, pillars_es)):
            pillars_html.append(f'''
              <div class="feature-card">
                <div class="card-icon">{icons[i]}</div>
                <div class="card-title">
                  <span class="lang-en">{pen['title']}</span>
                  <span class="lang-es">{pes['title']}</span>
                </div>
                <div class="card-desc">
                  <span class="lang-en">{pen['desc']}</span>
                  <span class="lang-es">{pes['desc']}</span>
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
            <div class="cards-grid-4">
              {''.join(pillars_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>⚡</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
            <button class="btn-hud" onclick="openLightbox('{s.get('image', '')}')">
              <span>🔍</span>
              <span class="lang-en">View Architecture Diagram</span>
              <span class="lang-es">Ver Diagrama de Arquitectura</span>
            </button>
          </div>
        </section>'''

    # Slide 3: Timing / Why Now
    elif sid == 3:
        cards_en = s.get('cards_en', [])
        cards_es = s.get('cards_es', [])
        cards_html = []
        for cen, ces in zip(cards_en, cards_es):
            cards_html.append(f'''
              <div class="feature-card">
                <div class="card-icon">{cen['icon']}</div>
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
              <span>🚀</span>
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
              <div class="agent-item" style="padding: 10px 14px; font-weight: 600; font-size: 0.95rem;">
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
                <div class="feature-card" style="background: rgba(139, 92, 246, 0.08); border-color: rgba(139, 92, 246, 0.3);">
                  <div class="card-title" style="color: var(--accent-purple);">
                    <span class="lang-en">Autonomous AI Agent Definition</span>
                    <span class="lang-es">Definición de Agente de IA</span>
                  </div>
                  <div class="card-desc">
                    <span class="lang-en">{s.get('definition_en', '')}</span>
                    <span class="lang-es">{s.get('definition_es', '')}</span>
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                  {''.join(steps_html)}
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('{s.get('image', '')}')">
                <img src="{s.get('image', '')}" alt="Solution Overview">
                <div class="zoom-hint-pill">🔍 <span class="lang-en">Click to Zoom</span><span class="lang-es">Clic para Ampliar</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>💎</span>
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
              <div class="agent-item" style="padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-weight: 700; color: var(--accent-cyan); font-size: 0.85rem;">
                  {i}. <span class="lang-en">{len_item['step']}</span><span class="lang-es">{les_item['step']}</span>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.8rem;">
                  <span class="lang-en">{len_item['desc']}</span><span class="lang-es">{les_item['desc']}</span>
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
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                {''.join(loop_html)}
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('{s.get('image', '')}')">
                <img src="{s.get('image', '')}" alt="Learning Cycle">
                <div class="zoom-hint-pill">🔍 <span class="lang-en">Click to Zoom</span><span class="lang-es">Clic para Ampliar</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>🔄</span>
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
                  <span class="lang-en">{c['bot_en']}</span>
                  <span class="lang-es">{c['bot_es']}</span>
                </td>
                <td class="good">
                  <span class="lang-en">✓ {c['tutor_en']}</span>
                  <span class="lang-es">✓ {c['tutor_es']}</span>
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
              <span>🎯</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 7: Governance 4 Teams
    elif sid == 7:
        teams_en = s.get('teams_en', [])
        teams_es = s.get('teams_es', [])
        teams_html = []
        for ten, tes in zip(teams_en, teams_es):
            agents_html = ''.join([f'<li class="agent-item"><span class="lang-en">{aen}</span><span class="lang-es">{aes}</span></li>' for aen, aes in zip(ten['agents'], tes['agents'])])
            teams_html.append(f'''
              <div class="team-card">
                <div class="team-header">
                  <span class="team-name">
                    <span class="lang-en">{ten['name']}</span>
                    <span class="lang-es">{tes['name']}</span>
                  </span>
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
              <span>⚖️</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
            <button class="btn-hud" onclick="openLightbox('{s.get('image', '')}')">
              <span>🔍</span>
              <span class="lang-en">Inspect Orchestration Topology</span>
              <span class="lang-es">Ver Topología de Orquestación</span>
            </button>
          </div>
        </section>'''

    # Slide 8: Learning Through Connections
    elif sid == 8:
        feats_en = s.get('features_en', [])
        feats_es = s.get('features_es', [])
        feats_html = ''.join([f'<li style="font-size: 0.95rem; color: var(--text-secondary);"><span style="color: var(--accent-cyan); font-weight: bold;">✦</span> <span class="lang-en">{fen}</span><span class="lang-es">{fes}</span></li>' for fen, fes in zip(feats_en, feats_es)])

        diagram_en = s.get('diagram_en', [])
        diagram_es = s.get('diagram_es', [])
        diag_html = []
        for den, des in zip(diagram_en, diagram_es):
            diag_html.append(f'''
              <div class="feature-card" style="padding: 16px;">
                <div class="card-title" style="font-size: 1rem; color: var(--accent-purple);">
                  <span class="lang-en">{den['label']}</span>
                  <span class="lang-es">{des['label']}</span>
                </div>
                <div class="card-desc" style="font-size: 0.85rem;">
                  <span class="lang-en">{den['detail']}</span>
                  <span class="lang-es">{des['detail']}</span>
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
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                  {''.join(diag_html)}
                </div>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
                  {feats_html}
                </ul>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('{s.get('image', '')}')">
                <img src="{s.get('image', '')}" alt="Connections Diagram">
                <div class="zoom-hint-pill">🔍 <span class="lang-en">Click to Zoom</span><span class="lang-es">Clic para Ampliar</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>🌉</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 9: Structured Memory
    elif sid == 9:
        layers_en = s.get('layers_en', [])
        layers_es = s.get('layers_es', [])
        layers_html = []
        for len_l, les_l in zip(layers_en, layers_es):
            layers_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="card-title" style="color: var(--accent-cyan); font-size: 1.1rem;">
                    <span class="lang-en">{len_l['type']}</span>
                    <span class="lang-es">{les_l['type']}</span>
                  </div>
                  <span class="slide-number-pill">{len_l['tech']}</span>
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
            <div class="cards-grid-3">
              {''.join(layers_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>💾</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
            <button class="btn-hud" onclick="openLightbox('{s.get('image', '')}')">
              <span>🔍</span>
              <span class="lang-en">View Memory Architecture</span>
              <span class="lang-es">Ver Arquitectura de Memoria</span>
            </button>
          </div>
        </section>'''

    # Slide 10: Trust & Sources
    elif sid == 10:
        pipe_en = s.get('pipeline_en', [])
        pipe_es = s.get('pipeline_es', [])
        pipe_html = []
        for pen, pes in zip(pipe_en, pipe_es):
            pipe_html.append(f'''
              <div class="feature-card">
                <div class="card-title" style="color: var(--accent-emerald);">
                  <span class="lang-en">{pen['step']}</span>
                  <span class="lang-es">{pes['step']}</span>
                </div>
                <div class="card-desc">
                  <span class="lang-en">{pen['desc']}</span>
                  <span class="lang-es">{pes['desc']}</span>
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
            <div class="cards-grid-3">
              {''.join(pipe_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>🛡️</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
            <button class="btn-hud" onclick="openLightbox('{s.get('image', '')}')">
              <span>🔍</span>
              <span class="lang-en">View Verification Pipeline</span>
              <span class="lang-es">Ver Pipeline de Verificación</span>
            </button>
          </div>
        </section>'''

    # Slide 11: Decoupled Architecture
    elif sid == 11:
        stack_en = s.get('stack_en', [])
        stack_es = s.get('stack_es', [])
        stack_html = []
        for sten, stes in zip(stack_en, stack_es):
            stack_html.append(f'''
              <div class="feature-card" style="padding: 18px;">
                <div class="card-title" style="color: var(--accent-purple); font-size: 1.05rem;">
                  <span class="lang-en">{sten['layer']}</span>
                  <span class="lang-es">{stes['layer']}</span>
                </div>
                <div class="card-desc" style="font-size: 0.9rem;">
                  <span class="lang-en">{sten['desc']}</span>
                  <span class="lang-es">{stes['desc']}</span>
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
            <div class="cards-grid-4">
              {''.join(stack_html)}
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>⚙️</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
            <button class="btn-hud" onclick="openLightbox('{s.get('image', '')}')">
              <span>🔍</span>
              <span class="lang-en">View Stack Schematic</span>
              <span class="lang-es">Ver Esquema de Arquitectura</span>
            </button>
          </div>
        </section>'''

    # Slide 12: Target Market
    elif sid == 12:
        segs_en = s.get('segments_en', [])
        segs_es = s.get('segments_es', [])
        segs_html = []
        for sen, ses in zip(segs_en, segs_es):
            segs_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="card-title" style="font-size: 1.15rem;">
                    <span class="lang-en">{sen['title']}</span>
                    <span class="lang-es">{ses['title']}</span>
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
              <span>🎯</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 13: MVP Demo
    elif sid == 13:
        stages_en = s.get('demo_steps_en', [])
        stages_es = s.get('demo_steps_es', [])
        stages_html = []
        for sten, stes in zip(stages_en, stages_es):
            items_html = ''.join([f'<li><span class="bullet">✓</span> <span><span class="lang-en">{ien}</span><span class="lang-es">{ies}</span></span></li>' for ien, ies in zip(sten['items'], stes['items'])])
            stages_html.append(f'''
              <div class="demo-stage-card">
                <div class="stage-badge">
                  <span class="lang-en">{sten['badge']}</span>
                  <span class="lang-es">{stes['badge']}</span>
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
              <span>🔬</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 14: Roadmap
    elif sid == 14:
        phases_en = s.get('phases_en', [])
        phases_es = s.get('phases_es', [])
        phases_html = []
        for pen, pes in zip(phases_en, phases_es):
            miles_html = ''.join([f'<li style="font-size: 0.88rem; color: var(--text-secondary);"><span style="color: var(--accent-purple);">✦</span> <span class="lang-en">{men}</span><span class="lang-es">{mes}</span></li>' for men, mes in zip(pen['milestones'], pes['milestones'])])
            phases_html.append(f'''
              <div class="feature-card">
                <div class="slide-number-pill" style="align-self: flex-start;">
                  <span class="lang-en">{pen['phase']}</span>
                  <span class="lang-es">{pes['phase']}</span>
                </div>
                <div class="card-title" style="color: var(--accent-cyan);">
                  <span class="lang-en">{pen['focus']}</span>
                  <span class="lang-es">{pes['focus']}</span>
                </div>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
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
              <span>🗺️</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 15: Value Model & Moat
    elif sid == 15:
        streams_en = s.get('streams_en', [])
        streams_es = s.get('streams_es', [])
        streams_html = []
        for sen, ses in zip(streams_en, streams_es):
            streams_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="card-title" style="color: var(--accent-purple);">
                    <span class="lang-en">{sen['type']}</span>
                    <span class="lang-es">{ses['type']}</span>
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
            <div class="feature-card" style="background: rgba(6, 182, 212, 0.08); border-color: rgba(6, 182, 212, 0.3);">
              <div class="card-title" style="color: var(--accent-cyan);">
                <span class="lang-en">🛡️ Proprietary Data Moat</span>
                <span class="lang-es">🛡️ Moat de Datos Propietario</span>
              </div>
              <div class="card-desc" style="color: var(--text-primary);">
                <span class="lang-en">{s.get('moat_en', '')}</span>
                <span class="lang-es">{s.get('moat_es', '')}</span>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span>📈</span>
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
              <div class="feature-card" style="padding: 16px;">
                <div class="card-title" style="color: var(--accent-rose); font-size: 1rem;">
                  ⚠️ <span class="lang-en">{ren['risk']}</span><span class="lang-es">{res['risk']}</span>
                </div>
                <div class="card-desc" style="font-size: 0.88rem; color: #e2e8f0;">
                  <span style="color: var(--accent-emerald); font-weight: 600;">✓ Mitigación:</span>
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
              <span>🛡️</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 17: Investment Ask
    elif sid == 17:
        miles_en = s.get('milestones_en', [])
        miles_es = s.get('milestones_es', [])
        miles_html = []
        for men, mes in zip(miles_en, miles_es):
            miles_html.append(f'''
              <div class="feature-card">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="slide-number-pill">STEP 0{men['num']}</span>
                  <div class="card-title" style="font-size: 1.1rem;">
                    <span class="lang-en">{men['title']}</span>
                    <span class="lang-es">{mes['title']}</span>
                  </div>
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
              <span>🚀</span>
              <span class="lang-en">{punch_en}</span>
              <span class="lang-es">{punch_es}</span>
            </div>
          </div>
        </section>'''

    # Slide 18: Closing
    elif sid == 18:
        pillars_en = s.get('pillars_en', [])
        pillars_es = s.get('pillars_es', [])
        p_html = []
        for pen, pes in zip(pillars_en, pillars_es):
            p_html.append(f'''
              <div class="flow-step-pill">
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
            <div class="quote-box" style="max-width: 960px;">
              <p>
                <span class="lang-en">{s.get('quote_en', '')}</span>
                <span class="lang-es">{s.get('quote_es', '')}</span>
              </p>
            </div>
            <div class="hero-flow-ribbon" style="margin-top: 20px;">
              {''.join(p_html)}
            </div>
          </div>
          <div class="slide-footer" style="justify-content: center;">
            <div class="punchline-badge" style="font-size: 1.1rem; padding: 10px 24px;">
              <span>⭐</span>
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
                  <span class="lang-en">{fen['q']}</span>
                  <span class="lang-es">{fes['q']}</span>
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
              <span>💬</span>
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
            <div class="diagram-preview-box" style="width: 100%; max-height: 520px; display: flex; justify-content: center;" onclick="openLightbox('{img_src}')">
              <img src="{img_src}" alt="{title_en}" style="max-height: 500px; width: auto; object-fit: contain;">
              <div class="zoom-hint-pill">🔍 <span class="lang-en">Click for Fullscreen View</span><span class="lang-es">Clic para Pantalla Completa</span></div>
            </div>
          </div>
          <div class="slide-footer" style="margin-top: 12px;">
            <div class="punchline-badge">
              <span>✨</span>
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
        <div class="brand-icon">⚡</div>
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
          <span id="langIcon">🌐</span>
          <span id="langLabel">ESPAÑOL</span>
        </button>

        <!-- Theme Toggle -->
        <button class="btn-hud" onclick="toggleTheme()" title="Modo Claro/Oscuro (T)">
          <span id="themeIcon">☀️</span>
        </button>

        <!-- Overview Grid Button -->
        <button class="btn-hud" onclick="toggleOverview()" title="Ver Cuadrícula de Diapositivas (G)">
          <span>▦</span>
          <span class="lang-en">Overview</span>
          <span class="lang-es">Cuadrícula</span>
        </button>

        <!-- Print PDF Button -->
        <button class="btn-hud" onclick="window.print()" title="Exportar a PDF / Imprimir">
          <span>📄</span>
          <span class="lang-en">Export PDF</span>
          <span class="lang-es">Exportar PDF</span>
        </button>

        <!-- Fullscreen Button -->
        <button class="btn-hud" onclick="toggleFullscreen()" title="Pantalla Completa (F)">
          <span id="fsIcon">⛶</span>
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
          <span>←</span>
          <span class="lang-en">Previous</span>
          <span class="lang-es">Anterior</span>
        </button>
        <button class="btn-nav" id="nextBtn" onclick="nextSlide()">
          <span class="lang-en">Next</span>
          <span class="lang-es">Siguiente</span>
          <span>→</span>
        </button>
      </div>

      <div class="keyboard-hints">
        <span><kbd class="kbd-badge">←</kbd> <kbd class="kbd-badge">→</kbd> <span class="lang-en">Navigate</span><span class="lang-es">Navegar</span></span>
        <span><kbd class="kbd-badge">Space</kbd> <span class="lang-en">Next</span><span class="lang-es">Avanzar</span></span>
        <span><kbd class="kbd-badge">F</kbd> <span class="lang-en">Fullscreen</span><span class="lang-es">Pantalla Completa</span></span>
        <span><kbd class="kbd-badge">G</kbd> <span class="lang-en">Grid</span><span class="lang-es">Cuadrícula</span></span>
        <span><kbd class="kbd-badge">L</kbd> <span class="lang-en">Language</span><span class="lang-es">Idioma</span></span>
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
      <button class="lightbox-close-btn" onclick="toggleOverview()">✕</button>
    </div>
    <div class="overview-grid">
      {overview_html}
    </div>
  </div>

  <!-- Lightbox Zoom Modal for Diagrams -->
  <div class="lightbox-modal" id="lightboxModal" onclick="closeLightbox(event)">
    <button class="lightbox-close-btn" onclick="closeLightboxDirect()">✕</button>
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

print("Generated complete index.html with all 27 slides and full bilingual support.")
