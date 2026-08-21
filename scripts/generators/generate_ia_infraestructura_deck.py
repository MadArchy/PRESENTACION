# -*- coding: utf-8 -*-
"""
Generator for the 'Estrategia Ejecutiva de Infraestructura para Inteligencia Artificial' Deck (10 Executive Slides)
Based on: Estrategia Ejecutiva de Infraestructura para Inteligencia Artificial.md
Features:
- Executive tone & clear statistical KPI cards
- 4 Pillars of 24/7 Operations
- 3-Layer Investment Model
- Financial ROI & Phased Budget Breakdown
- Contextual Imagery & Lightbox integration
- Bilingual (ES/EN)
"""

import json
from pathlib import Path

ICONS = {
    "brain": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/><path d="M7 10h10"/><path d="M7 14h10"/></svg>',
    "sparkles": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    "target": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    "route": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
    "zap": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    "shield": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    "database": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>',
    "chart": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    "layers": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    "scale": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
    "dollar": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    "alert": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    "cpu": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>',
    "users": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "server": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>',
    "lock": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    "activity": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    "clock": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
}

def generate_deck_html():
    slides = [
        # SLIDE 1: COVER HERO
        f"""
        <!-- SLIDE 1: COVER HERO -->
        <section class="slide active slide-hero-lumi" id="comparativo-slide-1" data-slide="1" data-deck="comparativo">
          <div class="hero-cover">
            <div class="hero-brand-top">| 3i BAIRD LAB · ESTRATEGIA DE INFRAESTRUCTURA IA |</div>
            <div class="hero-glow-badge">
              <span class="pill-icon">{ICONS['cpu']}</span>
              <span class="lang-en">Executive Strategy · AI Infrastructure, Continuity &amp; Growth · 10 Slides</span>
              <span class="lang-es">Estrategia Ejecutiva · Infraestructura IA, Continuidad y Crecimiento · 10 Slides</span>
            </div>
            <h1 class="hero-title">
              <span class="lang-en">Enterprise AI Infrastructure Strategy</span>
              <span class="lang-es">Estrategia Ejecutiva de Infraestructura IA</span>
            </h1>
            <p class="hero-subtitle">
              <span class="lang-en">Capacity, talent productivity, 24/7 operational continuity, and progressive business-driven investment.</span>
              <span class="lang-es">Capacidad, productividad del talento, continuidad 24/7 y modelo de inversión escalonada por retorno de negocio.</span>
            </p>
            <div class="hero-flow-ribbon">
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['users']}</span>
                <span class="lang-en">1. Talent &amp; Tools</span>
                <span class="lang-es">1. Talento Potenciado</span>
              </div>
              <div class="flow-arrow"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['cpu']}</span>
                <span class="lang-en">2. Targeted Compute</span>
                <span class="lang-es">2. Cómputo Justificado</span>
              </div>
              <div class="flow-arrow"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['activity']}</span>
                <span class="lang-en">3. 24/7 Continuity</span>
                <span class="lang-es">3. Continuidad 24/7</span>
              </div>
              <div class="flow-arrow"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['dollar']}</span>
                <span class="lang-en">4. Phased Scale</span>
                <span class="lang-es">4. Escalamiento Rentable</span>
              </div>
            </div>
            <div class="hero-bottom-proof">
              <span class="proof-tag"><span class="lang-en">CORE EXECUTIVE PRINCIPLE</span><span class="lang-es">PRINCIPIO EJECUTIVO CENTRAL</span></span>
              <span class="proof-text">
                <span class="lang-en">We do not buy the most powerful computer just because it exists; we deploy the exact infrastructure required for each business phase.</span>
                <span class="lang-es">No buscamos comprar el computador más potente; buscamos disponer de la infraestructura adecuada para cada etapa del negocio.</span>
              </span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 2: CURRENT CAPACITY (WHAT WE CAN DO TODAY)
        f"""
        <!-- SLIDE 2: WHAT WE CAN DO TODAY -->
        <section class="slide" id="comparativo-slide-2" data-slide="2" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['zap']} <span class="lang-en">CURRENT ASSETS · IMMEDIATE TRACTION</span><span class="lang-es">ACTIVOS ACTUALES · TRACCIÓN INMEDIATA</span></span>
            <span class="slide-num-tag">02 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">What Can We Build Today with Existing Hardware?</span><span class="lang-es">¿Qué podemos hacer hoy con la infraestructura actual?</span></h2>
            <p class="slide-lead"><span class="lang-en">Our current hardware is a functional development and commercial validation platform that enables rapid productization at zero immediate capex.</span><span class="lang-es">La infraestructura actual es una plataforma de desarrollo y validación comercial inmediata que no requiere desembolso inicial.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div class="cards-grid-2x2">
                <div class="feature-card">
                  <div class="card-icon-wrapper cyan">{ICONS['brain']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">App Development &amp; Prototyping</span><span class="lang-es">Desarrollo de Apps &amp; Prototipos</span></div>
                    <div class="card-desc"><span class="lang-en">Full stack creation of client MVPs, internal tools, automations, and functional pilot demonstrators.</span><span class="lang-es">Construcción de MVPs, plataformas web, flujos de automatización y prototipos para clientes.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper emerald">{ICONS['database']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Document AI &amp; Enterprise Assistants</span><span class="lang-es">Asistentes &amp; Procesamiento Documental</span></div>
                    <div class="card-desc"><span class="lang-en">RAG pipelines, enterprise document parsing, intelligent indexing, and conversational agents.</span><span class="lang-es">Bases de conocimiento, indexación de PDFs, extracción estructurada y agentes conversacionales.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper purple">{ICONS['route']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Cloud AI &amp; Hybrid Orchestration</span><span class="lang-es">Integración Híbrida con IA en la Nube</span></div>
                    <div class="card-desc"><span class="lang-en">Multi-model connectivity with Claude, OpenAI, and Gemini for heavy reasoning combined with local lightweight logic.</span><span class="lang-es">Conexión con APIs de frontera en la nube combinada con micro-agentes locales.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper gold">{ICONS['target']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Commercial Validation &amp; Demos</span><span class="lang-es">Validación Comercial &amp; Demos en Vivo</span></div>
                    <div class="card-desc"><span class="lang-en">Presenting working pilots to clients, validating business willingness to pay before committing capital.</span><span class="lang-es">Demostraciones en vivo para validar interés comercial y tracción antes de comprar nuevo hardware.</span></div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-workflow.jpg')">
                <img src="media/ia/ia-workflow.jpg" alt="Flujo de trabajo actual">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Workflow</span><span class="lang-es">Ampliar Flujo</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['sparkles']}</span>
              <span class="lang-en">Takeaway: We can start developing, testing, and selling solutions using the exact infrastructure we already own.</span>
              <span class="lang-es">Mensaje clave: Podemos comenzar a desarrollar, probar y comercializar soluciones utilizando la infraestructura que ya tenemos.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 3: OPERATIONAL LIMITS & BOTTLENECK ANALYSIS
        f"""
        <!-- SLIDE 3: OPERATIONAL LIMITS & BOTTLENECKS -->
        <section class="slide" id="comparativo-slide-3" data-slide="3" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['alert']} <span class="lang-en">GROWTH BOUNDARIES · RISK AUDIT</span><span class="lang-es">LÍMITES DE CRECIMIENTO · AUDITORÍA DE RIESGO</span></span>
            <span class="slide-num-tag">03 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Where Real Operational Limits Emerge</span><span class="lang-es">¿Dónde están nuestros límites operativos reales?</span></h2>
            <p class="slide-lead"><span class="lang-en">We can develop any software solution, but advanced execution bottlenecks appear as client concurrency, latency, and security demands scale.</span><span class="lang-es">Podemos programar cualquier solución, pero los cuellos de botella surgen al escalar volumen, velocidad, concurrencia y privacidad.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="timeline-v-flow">
                  <div class="timeline-step-card">
                    <div class="step-num-bubble gold">01</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">Data Volume &amp; Local Model Scale</span><span class="lang-es">01. Volumen de Datos &amp; Modelos Locales</span></div>
                      <div class="step-desc"><span class="lang-en">Running 32B–70B parameter models locally requires dedicated VRAM buffers beyond consumer workstations.</span><span class="lang-es">Ejecutar modelos de 32B a 70B parámetros localmente satura la VRAM de equipos convencionales.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble gold">02</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">Multi-User &amp; Multi-Project Concurrency</span><span class="lang-es">02. Concurrencia Multi-Usuario &amp; Multi-Proyecto</span></div>
                      <div class="step-desc"><span class="lang-en">Single machines struggle when simultaneously hosting databases, dev pipelines, and inference servers.</span><span class="lang-es">Los equipos se saturan al correr simultáneamente bases de datos, compilación y servidores de inferencia.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble amber">03</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">Strict On-Premise Privacy Compliance</span><span class="lang-es">03. Privacidad On-Premise y Datos Sensibles</span></div>
                      <div class="step-desc"><span class="lang-en">Enterprise clients prohibit cloud API uploads; processing must occur 100% inside our physical control.</span><span class="lang-es">Clientes corporativos exigen que sus datos financieros/médicos jamás salgan a servidores de terceros.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble red">04</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">24/7 Availability &amp; Zero Downtime</span><span class="lang-es">04. Disponibilidad Permanente 24/7 sin Interrupciones</span></div>
                      <div class="step-desc"><span class="lang-en">Personal laptops cannot act as persistent servers without risking thermal throttling and power cuts.</span><span class="lang-es">Equipos personales no garantizan uptime continuo ante fallas eléctricas o de conexión residencial.</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-memory.jpg')">
                <img src="media/ia/ia-memory.jpg" alt="Cuello de botella de memoria">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Memory Matrix</span><span class="lang-es">Ampliar Matriz VRAM</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['shield']}</span>
              <span class="lang-en">Diagnostic: Existing machines do not become obsolete; they get complemented as business demands grow.</span>
              <span class="lang-es">Diagnóstico: Los equipos actuales no dejan de servir; se complementan cuando el negocio exige mayor escala.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 4: WHAT WE GAIN BY SCALING (BUSINESS VALUE)
        f"""
        <!-- SLIDE 4: BUSINESS GAINS FROM INFRASTRUCTURE SCALE -->
        <section class="slide" id="comparativo-slide-4" data-slide="4" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['chart']} <span class="lang-en">EXECUTIVE VALUE · STRATEGIC ROI</span><span class="lang-es">VALOR EJECUTIVO · RETORNO ESTRATÉGICO</span></span>
            <span class="slide-num-tag">04 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">What Do We Gain by Upgrading Hardware?</span><span class="lang-es">¿Qué ganamos al mejorar y escalar los equipos?</span></h2>
            <p class="slide-lead"><span class="lang-en">We are not purchasing faster computers; we are unlocking institutional capacity to serve larger contracts, eliminate recurring cloud bills, and mitigate risk.</span><span class="lang-es">No compramos computadores más rápidos; adquirimos capacidad adicional para producir, captar clientes de alto valor y eliminar costos recurrentes.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div class="cards-grid-2x2">
                <div class="metric-card gold">
                  <div class="metric-val">+300%</div>
                  <div class="metric-label"><span class="lang-en">Concurrent Processing Capacity</span><span class="lang-es">Capacidad de Cómputo Simultáneo</span></div>
                  <div class="metric-desc"><span class="lang-en">Execute heavy inference, fine-tuning, embeddings, and database services in parallel without lag.</span><span class="lang-es">Ejecución simultánea de inferencia pesada, fine-tuning y bases vectoriales sin degradación.</span></div>
                </div>
                <div class="metric-card emerald">
                  <div class="metric-val">100%</div>
                  <div class="metric-label"><span class="lang-en">Confidential Data Retention</span><span class="lang-es">Retención Total de Datos Confidenciales</span></div>
                  <div class="metric-desc"><span class="lang-en">Zero third-party data leakage. Proprietary enterprise knowledge stays strictly inside company custody.</span><span class="lang-es">Cero fuga de información sensible. Los datos propietarios del cliente permanecen bajo custodia local.</span></div>
                </div>
                <div class="metric-card cyan">
                  <div class="metric-val">-65%</div>
                  <div class="metric-label"><span class="lang-en">Recurring Cloud API Cost Reduction</span><span class="lang-es">Reducción de Costos Recurrentes en Nube</span></div>
                  <div class="metric-desc"><span class="lang-en">Replace unpredictable monthly token billing with amortized local hardware at fixed operational cost.</span><span class="lang-es">Sustitución de facturas variables por consumo de tokens por infraestructura propia amortizada.</span></div>
                </div>
                <div class="metric-card purple">
                  <div class="metric-val">Enterprise</div>
                  <div class="metric-label"><span class="lang-en">Institutional Contract Readiness</span><span class="lang-es">Capacidad de Cierre para Clientes Corporativos</span></div>
                  <div class="metric-desc"><span class="lang-en">Comply with enterprise security audits, dedicated SLAs, and high-volume real-time client throughput.</span><span class="lang-es">Cumplimiento de auditorías corporativas de seguridad, SLAs dedicados y mayor volumen transaccional.</span></div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-models.jpg')">
                <img src="media/ia/ia-models.jpg" alt="Capacidad de modelos">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Model Spectrum</span><span class="lang-es">Ampliar Rango de Modelos</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['dollar']}</span>
              <span class="lang-en">Strategic Law: The investment increases our organizational bandwidth to capture bigger projects and higher revenue.</span>
              <span class="lang-es">Regla estratégica: La inversión aumenta nuestra capacidad para atender proyectos más grandes, clientes más exigentes y operaciones más complejas.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 5: EMPOWERING TALENT = EMPOWERING PEOPLE
        f"""
        <!-- SLIDE 5: TALENT PRODUCTIVITY ACCELERATION -->
        <section class="slide" id="comparativo-slide-5" data-slide="5" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['users']} <span class="lang-en">HUMAN CAPITAL · TALENT MULTIPLIER</span><span class="lang-es">CAPITAL HUMANO · MULTIPLICADOR DE TALENTO</span></span>
            <span class="slide-num-tag">05 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Empowering Hardware Means Empowering People</span><span class="lang-es">Potenciar los equipos significa potenciar a las personas</span></h2>
            <p class="slide-lead"><span class="lang-en">Infrastructure must not be viewed as mere machinery. Eliminating developer idle time drastically compounds output and accelerates delivery cycles.</span><span class="lang-es">La infraestructura no son simples máquinas; es el multiplicador que elimina tiempos muertos y maximiza la velocidad de entrega del equipo técnico.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div class="cards-grid-2x2" style="grid-template-columns: 1fr 1fr;">
                  <div class="feature-card">
                    <div class="card-icon-wrapper emerald">{ICONS['clock']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">-70% Idle Waiting Time</span><span class="lang-es">-70% Tiempo Muerto de Espera</span></div>
                      <div class="card-desc"><span class="lang-en">Instant local prompt debugging, vector searches, and code compilation without cloud latency lag.</span><span class="lang-es">Pruebas e inferencia instantáneas sin esperar cola en servidores remotos.</span></div>
                    </div>
                  </div>
                  <div class="feature-card">
                    <div class="card-icon-wrapper cyan">{ICONS['zap']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">3x Iteration Frequency</span><span class="lang-es">3x Frecuencia de Iteración</span></div>
                      <div class="card-desc"><span class="lang-en">Developers run comprehensive test suites and edge case evaluations in minutes instead of overnight.</span><span class="lang-es">Más pruebas, prototipos más sólidos y detección inmediata de errores de código.</span></div>
                    </div>
                  </div>
                </div>
                <div class="feature-card highlight-card">
                  <div class="card-icon-wrapper gold">{ICONS['route']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">The Executive Productivity Equation:</span><span class="lang-es">La Ecuación de Productividad Empresarial:</span></div>
                    <div class="card-desc" style="font-size: 0.92rem; color: #fff; font-weight: 600;">
                      <span class="lang-en">Better Hardware → Zero Idle Lag → Higher Developer Velocity → More Client Projects Delivered per Quarter</span>
                      <span class="lang-es">Mejor equipo → Menos tiempo perdido → Mayor productividad del personal → Mayor capacidad para facturar proyectos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-talent-acceleration.jpg')">
                <img src="media/ia/ia-talent-acceleration.jpg" alt="Aceleración de talento y productividad">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Talent Workstation</span><span class="lang-es">Ampliar Estación de Trabajo</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['sparkles']}</span>
              <span class="lang-en">Principle: We do not merely buy faster hardware; we directly elevate the execution throughput of our human talent.</span>
              <span class="lang-es">Principio: No solamente mejoramos computadores; aumentamos la capacidad de ejecución y valor de nuestros trabajadores.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 6: PHASED INVESTMENT STRUCTURE (HOW MUCH IT COSTS TO GROW)
        f"""
        <!-- SLIDE 6: PHASED INVESTMENT STRUCTURE -->
        <section class="slide" id="comparativo-slide-6" data-slide="6" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['dollar']} <span class="lang-en">CAPEX ALLOCATION · PHASED BUDGET</span><span class="lang-es">ASIGNACIÓN DE CAPITAL · PRESUPUESTO ESCALONADO</span></span>
            <span class="slide-num-tag">06 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Phased Capital Investment Model: How Much to Grow?</span><span class="lang-es">¿Cuánto cuesta crecer? Modelo de inversión escalonada</span></h2>
            <p class="slide-lead"><span class="lang-en">Infrastructure must scale progressively in sync with contract revenue. We do not over-provision capital before customer demand validates it.</span><span class="lang-es">La infraestructura debe crecer por etapas alineadas a los ingresos. No sobredimensionamos capital antes de que los clientes lo justifiquen.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="timeline-v-flow">
                  <div class="timeline-step-card">
                    <div class="step-num-bubble emerald">N0</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">Level 0: Existing Baseline (US$ 0)</span><span class="lang-es">Nivel 0: Infraestructura Actual (US$ 0)</span></div>
                      <div class="step-desc"><span class="lang-en">Already available. Used for software dev, lightweight 7B/8B testing, document indexing, and client demos.</span><span class="lang-es">Ya disponible. Desarrollo, prototipos, pruebas internas, integraciones API y validación comercial inicial.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble cyan">N1</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">Level 1: Intermediate AI Node (US$ 2,500 – 3,500)</span><span class="lang-es">Nivel 1: Estación IA Intermedia (US$ 2.500 – 3.500)</span></div>
                      <div class="step-desc"><span class="lang-en">High memory workstation (64GB–128GB). Unlocks serious local AI, RAG embeddings, and privacy projects.</span><span class="lang-es">Equipos con alto buffer de memoria unificada/RAM. Permite IA local seria, privacidad y proyectos de mayor volumen.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble purple">N2</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">Level 2: Professional AI Workstation (US$ 4,000 – 6,500)</span><span class="lang-es">Nivel 2: Estación IA Profesional (US$ 4.000 – 6.500)</span></div>
                      <div class="step-desc"><span class="lang-en">Enterprise-grade GPUs (RTX 4090 / Mac Studio / GB10). Serves 70B quantized models, fine-tuning, and heavy client loads.</span><span class="lang-es">Workstations dedicadas de alto rendimiento. Modelos 70B, fine-tuning local y contratos corporativos.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble gold">N3</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">Level 3: Centralized Enterprise Server (Custom Scale)</span><span class="lang-es">Nivel 3: Servidor Empresarial Centralizado (A Medida)</span></div>
                      <div class="step-desc"><span class="lang-en">Rack-mount servers with redundant power, fiber SAN, and 24/7 clustered high availability for scaled SaaS.</span><span class="lang-es">Servidor en rack, red de alta velocidad y operación continua centralizada para múltiples clientes en producción.</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-tower.jpg')">
                <img src="media/ia/ia-tower.jpg" alt="Estaciones de trabajo escalonadas">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Hardware Tiers</span><span class="lang-es">Ampliar Niveles de Hardware</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['dollar']}</span>
              <span class="lang-en">Takeaway: We do not need to buy the entire infrastructure on day one. We invest strictly in verified, revenue-generating steps.</span>
              <span class="lang-es">Mensaje clave: No necesitamos comprar toda la infraestructura desde el comienzo; invertimos por etapas justificadas por el negocio.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 7: FINANCIAL ROI TRIGGERS (WHEN TO INVEST)
        f"""
        <!-- SLIDE 7: WHEN IS INVESTMENT JUSTIFIED? -->
        <section class="slide" id="comparativo-slide-7" data-slide="7" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['target']} <span class="lang-en">DECISION CRITERIA · ROI TRIGGERS</span><span class="lang-es">CRITERIOS DE DECISIÓN · GATILLADORES DE ROI</span></span>
            <span class="slide-num-tag">07 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">The 5 Business Triggers: When Is It Time to Invest?</span><span class="lang-es">Los 5 gatilladores financieros: ¿Cuándo vale la pena invertir?</span></h2>
            <p class="slide-lead"><span class="lang-en">A hardware upgrade is never justified by novelty; it is strictly triggered when capacity unlocks immediate commercial revenue or prevents contractual risk.</span><span class="lang-es">La empresa no invierte por novedad tecnológica; invierte cuando la nueva capacidad genera ingresos, reduce costos o abre contratos inmediatos.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div class="cards-grid-2x2">
                <div class="feature-card">
                  <div class="card-icon-wrapper gold">{ICONS['dollar']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">1. High-Value Client Demands</span><span class="lang-es">1. Clientes con Requisitos Mayores</span></div>
                    <div class="card-desc"><span class="lang-en">Client contract requires sub-second response times, dedicated instances, high concurrency, or custom model fine-tuning.</span><span class="lang-es">Aparecen contratos que exigen alta velocidad, múltiples usuarios concurrentes o modelos dedicados.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper purple">{ICONS['shield']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">2. Absolute Privacy Mandate</span><span class="lang-es">2. Privacidad y Soberanía de Datos</span></div>
                    <div class="card-desc"><span class="lang-en">Enterprise compliance prevents client datasets from traversing public clouds (Banking, Legal, Healthcare).</span><span class="lang-es">El cliente exige por contrato que sus datos jamás salgan de la infraestructura física bajo nuestro control.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper cyan">{ICONS['chart']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">3. Cloud API Crossover Point</span><span class="lang-es">3. Punto de Cruce de Facturas Cloud</span></div>
                    <div class="card-desc"><span class="lang-en">Monthly cloud token bills surpass the 6-month hardware amortization cost. Local execution becomes instantly profitable.</span><span class="lang-es">El gasto mensual en APIs de nube supera el costo de amortizar un equipo local propio en 6 meses.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper emerald">{ICONS['clock']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">4. 24/7 Production Deployment</span><span class="lang-es">4. Operación Permanente en Vivo</span></div>
                    <div class="card-desc"><span class="lang-en">Live services transition from internal testing to production SLAs requiring non-stop uptime and redundancy.</span><span class="lang-es">La plataforma pasa de fase prototipo a servicio en producción que debe estar disponible día y noche.</span></div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-client.jpg')">
                <img src="media/ia/ia-client.jpg" alt="Explicación y propuesta al cliente">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Client Case</span><span class="lang-es">Ampliar Propuesta Cliente</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['target']}</span>
              <span class="lang-en">Investment Rule: We invest when new capacity generates revenue, reduces recurrent cost, or unlocks opportunities we cannot otherwise seize.</span>
              <span class="lang-es">Regla de inversión: Invertimos cuando la nueva capacidad genera ingresos, reduce costos, eleva productividad o permite captar clientes que hoy no podemos asumir.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 8: 24/7 TECH OPERATIONS (THE 4 PILLARS)
        f"""
        <!-- SLIDE 8: 24/7 CONTINUITY AND THE 4 PILLARS -->
        <section class="slide" id="comparativo-slide-8" data-slide="8" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['shield']} <span class="lang-en">ENTERPRISE RESILIENCE · 24/7 PILLARS</span><span class="lang-es">RESILIENCIA EMPRESARIAL · 4 PILARES 24/7</span></span>
            <span class="slide-num-tag">08 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">The True Goal: Robust 24/7 Technological Operations</span><span class="lang-es">El verdadero objetivo: Una operación tecnológica 24/7</span></h2>
            <p class="slide-lead"><span class="lang-en">Raw computational power loses its value if a single power outage, thermal drop, or network failure knocks services offline. Continuity is the foundation of enterprise trust.</span><span class="lang-es">La potencia pierde su valor si un corte eléctrico, recalentamiento o caída de red deja los servicios fuera de línea. La continuidad es el activo real.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div class="cards-grid-2x2">
                <div class="feature-card">
                  <div class="card-icon-wrapper emerald">{ICONS['users']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Pillar 1: Empowered Talent</span><span class="lang-es">Pilar 1: Talento Potenciado</span></div>
                    <div class="card-desc"><span class="lang-en">Ergonomic, responsive workstations equipped with modern AI development tooling and zero lag.</span><span class="lang-es">Mejores herramientas de trabajo que multiplican la productividad del personal y aceleran entregas.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper cyan">{ICONS['cpu']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Pillar 2: Compute Capacity</span><span class="lang-es">Pilar 2: Capacidad Tecnológica</span></div>
                    <div class="card-desc"><span class="lang-en">Scalable GPU VRAM, fast NVMe arrays, and dedicated local models for complex institutional workloads.</span><span class="lang-es">Hardware especializado en IA, procesamiento masivo y bases de datos para proyectos exigentes.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper gold">{ICONS['zap']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Pillar 3: Protected Power</span><span class="lang-es">Pilar 3: Continuidad Eléctrica</span></div>
                    <div class="card-desc"><span class="lang-en">Double-conversion online UPS, surge suppression, automated voltage regulation, and safe automated shutdown.</span><span class="lang-es">Sistemas UPS de respaldo, supresión de picos, regulación de voltaje y apagado seguro ante apagones.</span></div>
                  </div>
                </div>
                <div class="feature-card">
                  <div class="card-icon-wrapper purple">{ICONS['route']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Pillar 4: Redundant Network</span><span class="lang-es">Pilar 4: Conectividad Redundante</span></div>
                    <div class="card-desc"><span class="lang-en">Dual WAN fiber providers with instant automatic failover, enterprise routers, and 24/7 uptime monitoring.</span><span class="lang-es">Doble proveedor de Internet con conmutación automática de respaldo y monitoreo permanente de red.</span></div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-datacenter-24-7.jpg')">
                <img src="media/ia/ia-datacenter-24-7.jpg" alt="Centro de operaciones y continuidad 24/7">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom 24/7 Center</span><span class="lang-es">Ampliar Centro 24/7</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['shield']}</span>
              <span class="lang-en">Formula: Better Tools + Resilient Infrastructure = Maximum Output + High Capacity + Zero Operational Risk.</span>
              <span class="lang-es">Fórmula empresarial: Mejores herramientas + Mejor infraestructura = Mayor productividad + Mayor capacidad + Menor riesgo operativo.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 9: THE 3-LAYER INVESTMENT MODEL & DECISION CHECKLIST
        f"""
        <!-- SLIDE 9: 3-LAYER INVESTMENT MODEL & DECISION CHECKLIST -->
        <section class="slide" id="comparativo-slide-9" data-slide="9" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['layers']} <span class="lang-en">FRAMEWORK · 3-LAYER MODEL</span><span class="lang-es">MARCO ESTRATÉGICO · MODELO EN 3 CAPAS</span></span>
            <span class="slide-num-tag">09 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">3-Layer Investment Architecture &amp; Decision Matrix</span><span class="lang-es">Modelo de inversión en 3 capas &amp; Matriz de decisión</span></h2>
            <p class="slide-lead"><span class="lang-en">A clear structural checklist to evaluate any technological acquisition before allocating company capital.</span><span class="lang-es">Checklist estructurado para evaluar con rigor cualquier adquisición tecnológica antes de comprometer capital.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="timeline-v-flow">
                  <div class="timeline-step-card">
                    <div class="step-num-bubble cyan">C1</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">LAYER 1 — PEOPLE (Talent Productivity)</span><span class="lang-es">CAPA 1 — PERSONAS (Productividad del Talento)</span></div>
                      <div class="step-desc"><span class="lang-en">Investment in high-speed workstations. Result: faster developers, rapid prototypes, and more shipped projects.</span><span class="lang-es">Inversión en mejores estaciones. Resultado: desarrolladores más veloces y productivos.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble gold">C2</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">LAYER 2 — TECHNOLOGY (Compute &amp; Storage)</span><span class="lang-es">CAPA 2 — TECNOLOGÍA (Capacidad de Cómputo)</span></div>
                      <div class="step-desc"><span class="lang-en">Investment in dedicated AI hardware, VRAM, and servers. Result: capacity to execute higher-tier client contracts.</span><span class="lang-es">Inversión en estaciones de IA, VRAM y servidores. Resultado: capacidad para proyectos de mayor nivel.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble emerald">C3</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">LAYER 3 — CONTINUITY (24/7 Operations)</span><span class="lang-es">CAPA 3 — CONTINUIDAD (Operación 24/7)</span></div>
                      <div class="step-desc"><span class="lang-en">Investment in UPS, dual WAN, cooling, monitoring, and automated backups. Result: non-stop institutional uptime.</span><span class="lang-es">Inversión en energía protegida, Internet redundante, monitoreo y copias de seguridad continuas.</span></div>
                    </div>
                  </div>
                </div>
                <div class="feature-card" style="padding: 8px 12px;">
                  <div class="card-icon-wrapper purple">{ICONS['target']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">5-Question Filter:</span><span class="lang-es">Filtro de 5 Preguntas:</span></div>
                    <div class="card-desc"><span class="lang-en">1. Can we do it with what we have? 2. Where is the bottleneck? 3. What do we gain? 4. What is the cost vs benefit? 5. Does the business demand it today?</span><span class="lang-es">1. ¿Podemos hacerlo con lo actual? 2. ¿Dónde está el límite? 3. ¿Qué ganamos? 4. ¿Costo vs beneficio? 5. ¿El negocio lo exige hoy?</span></div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-rag.jpg')">
                <img src="media/ia/ia-rag.jpg" alt="Arquitectura en 3 capas">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Architecture</span><span class="lang-es">Ampliar Arquitectura</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['layers']}</span>
              <span class="lang-en">Framework Rule: First develop with what we have. Invest when the business proves it requires higher capacity.</span>
              <span class="lang-es">Principio rector: Primero desarrollamos con lo que tenemos; invertimos cuando el negocio demuestra que necesita más capacidad.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 10: STRATEGIC ROADMAP & EXECUTIVE CLOSING
        f"""
        <!-- SLIDE 10: ROADMAP & EXECUTIVE CLOSING -->
        <section class="slide" id="comparativo-slide-10" data-slide="10" data-deck="comparativo">
          <div class="slide-top-meta">
            <span class="slide-badge-category">{ICONS['route']} <span class="lang-en">STRATEGIC ROADMAP · EXECUTIVE SUMMARY</span><span class="lang-es">HOJA DE RUTA · RESUMEN EJECUTIVO</span></span>
            <span class="slide-num-tag">10 / 10</span>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Strategic Growth Roadmap: Building an Enterprise Asset</span><span class="lang-es">Hoja de ruta estratégica: Construyendo un activo empresarial</span></h2>
            <p class="slide-lead"><span class="lang-en">Our goal is not to accumulate hardware; it is to forge a scalable technological asset that accelerates talent, captures revenue, and operates continuously.</span><span class="lang-es">El objetivo no es acumular computadores, sino forjar una capacidad tecnológica que potencie al talento, genere ingresos y opere 24/7.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="timeline-v-flow">
                  <div class="timeline-step-card">
                    <div class="step-num-bubble cyan">01</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">01. Immediate Phase: Exploit Current Assets</span><span class="lang-es">01. Fase Inmediata: Explotar Activos Actuales</span></div>
                      <div class="step-desc"><span class="lang-en">Develop software solutions, prototypes, integrations, and secure early client validation at zero added capex.</span><span class="lang-es">Desarrollar soluciones, prototipos y validar comercialmente proyectos sin compras prematuras.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble gold">02</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">02. Growth Trigger: Identify Real Boundary</span><span class="lang-es">02. Gatillador de Crecimiento: Identificar el Límite</span></div>
                      <div class="step-desc"><span class="lang-en">Detect concrete demand bottlenecks in local model size, concurrency, privacy compliance, or latency.</span><span class="lang-es">Detectar cuellos de botella reales en tamaño de modelos, privacidad requerida o concurrencia de clientes.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble emerald">03</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">03. Scaled Phase: Enterprise 24/7 Continuity</span><span class="lang-es">03. Fase de Escala: Continuidad Empresarial 24/7</span></div>
                      <div class="step-desc"><span class="lang-en">Deploy dedicated AI nodes backed by UPS power, dual WAN, and strict institutional SLA monitoring.</span><span class="lang-es">Incorporar estaciones y servidores con respaldo eléctrico UPS, doble conexión y estabilidad continua.</span></div>
                    </div>
                  </div>
                </div>
                <div class="feature-card highlight-card" style="padding: 10px 14px;">
                  <div class="card-icon-wrapper gold">{ICONS['sparkles']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Executive Closing Takeaway:</span><span class="lang-es">Mensaje Ejecutivo Final:</span></div>
                    <div class="card-desc" style="font-size: 0.92rem; color: #fff; font-weight: 600;">
                      <span class="lang-en">Infrastructure upgrades stop being mere technology expenses; they become direct investments in our company's productive, commercial, and operational power.</span>
                      <span class="lang-es">Comprar infraestructura deja de ser un gasto tecnológico y pasa a convertirse en una inversión directa en la capacidad productiva, comercial y operativa de la empresa.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('media/ia/ia-dgx.jpg')">
                <img src="media/ia/ia-dgx.jpg" alt="Escalamiento empresarial">
                <div class="zoom-hint-pill"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> <span class="lang-en">Zoom Enterprise Scale</span><span class="lang-es">Ampliar Escala Empresarial</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['target']}</span>
              <span class="lang-en">Progression: People → Technology → Continuity → Clients → Scalable Growth.</span>
              <span class="lang-es">Ruta progresiva: Personas → Tecnología → Continuidad → Clientes → Escalamiento.</span>
            </div>
          </div>
        </section>
        """
    ]

    return "\n".join(slides)

def generate_overview_grid_html():
    thumbs = [
        ("01", "PROPUESTA EJECUTIVA", "EXECUTIVE PROPOSAL", "Estrategia Ejecutiva de Infraestructura IA", "Enterprise AI Infrastructure Strategy"),
        ("02", "CAPACIDAD ACTUAL", "CURRENT ASSETS", "¿Qué podemos hacer hoy con la infraestructura actual?", "What Can We Build Today with Existing Hardware?"),
        ("03", "LÍMITES OPERATIVOS", "GROWTH LIMITS", "Dónde están nuestros límites operativos reales", "Where Real Operational Limits Emerge"),
        ("04", "GANANCIA EMPRESARIAL", "BUSINESS VALUE", "Qué ganamos al mejorar y escalar los equipos", "What Do We Gain by Upgrading Hardware?"),
        ("05", "TALENTO & PERSONAS", "HUMAN TALENT", "Potenciar los equipos = Potenciar a las personas", "Empowering Hardware Means Empowering People"),
        ("06", "MODELO DE INVERSIÓN", "PHASED BUDGET", "¿Cuánto cuesta crecer? Inversión por etapas", "Phased Capital Investment Model: How Much to Grow?"),
        ("07", "GATILLADORES ROI", "ROI TRIGGERS", "Los 5 gatilladores financieros para invertir", "The 5 Business Triggers: When Is It Time to Invest?"),
        ("08", "CONTINUIDAD 24/7", "24/7 CONTINUITY", "El verdadero objetivo: Operación tecnológica 24/7", "The True Goal: Robust 24/7 Technological Operations"),
        ("09", "MODELO EN 3 CAPAS", "3-LAYER MODEL", "Modelo en 3 capas & Matriz de decisión", "3-Layer Investment Architecture & Decision Matrix"),
        ("10", "HOJA DE RUTA", "STRATEGIC ROADMAP", "Hoja de ruta estratégica: Construir un activo empresarial", "Strategic Growth Roadmap: Building an Enterprise Asset"),
    ]

    cards_html = []
    for num, tag_es, tag_en, title_es, title_en in thumbs:
        card = f"""          <div class="overview-thumb-card" data-deck="comparativo" onclick="goToSlide({int(num)})">
            <div class="thumb-num">SLIDE {num} / 10 · <span class="lang-en">{tag_en}</span><span class="lang-es">{tag_es}</span></div>
            <div class="thumb-title">
              <span class="lang-en">{title_en}</span>
              <span class="lang-es">{title_es}</span>
            </div>
          </div>"""
        cards_html.append(card)

    return f"""    <div class="overview-grid" id="overviewGrid-comparativo" style="display: none;">\n""" + "\n".join(cards_html) + "\n    </div>"

def update_index_html():
    root = Path('.')
    index_file = root / 'index.html'
    html = index_file.read_text(encoding='utf-8')

    # 1. Generate new deck container HTML
    deck_html = f"""        <!-- ===================================================================
             ESTRATEGIA EJECUTIVA DE INFRAESTRUCTURA PARA IA (10 SLIDES)
             =================================================================== -->
        <div class="deck-container" id="deck-comparativo">
{generate_deck_html()}
        </div>"""

    # 2. Locate existing deck-comparativo in index.html
    start_tag = '<div class="deck-container" id="deck-comparativo">'
    end_tag = '<!-- ==================================================================='
    
    idx_start = html.find(start_tag)
    if idx_start != -1:
        # Find next deck container start
        idx_next = html.find('<div class="deck-container" id="deck-restaurante">', idx_start)
        if idx_next == -1:
            idx_next = html.find('</div>\n      </div>\n    </main>', idx_start)
        
        # Look backwards for previous comment if any
        comment_marker = '<!-- ==================================================================='
        idx_comment = html.rfind(comment_marker, 0, idx_start)
        if idx_comment != -1 and idx_start - idx_comment < 200:
            replace_start = idx_comment
        else:
            replace_start = idx_start

        html = html[:replace_start] + deck_html + '\n\n        ' + html[idx_next:]
        print("Updated deck-comparativo slides in index.html!")
    else:
        print("deck-comparativo start tag not found!")

    # 3. Replace overviewGrid-comparativo
    grid_start_tag = '<div class="overview-grid" id="overviewGrid-comparativo"'
    idx_grid_start = html.find(grid_start_tag)
    if idx_grid_start != -1:
        # Find next overviewGrid or closing container
        idx_grid_next = html.find('<div class="overview-grid" id="overviewGrid-restaurante"', idx_grid_start)
        if idx_grid_next == -1:
            idx_grid_next = html.find('<div class="video-theater"', idx_grid_start)
        
        new_grid_html = generate_overview_grid_html()
        html = html[:idx_grid_start] + new_grid_html + '\n\n    ' + html[idx_grid_next:]
        print("Updated overviewGrid-comparativo in index.html!")
    else:
        print("overviewGrid-comparativo tag not found!")

    # 4. Update landing hub pill text for 'comparativo'
    html = html.replace('<span class="pill-btn-label">IA LOCAL</span>', '<span class="pill-btn-label">INFRAESTRUCTURA IA</span>')

    index_file.write_text(html, encoding='utf-8')
    print("index.html fully updated!")

if __name__ == "__main__":
    update_index_html()
