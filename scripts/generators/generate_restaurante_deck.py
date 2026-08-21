# -*- coding: utf-8 -*-
"""
Enhanced Generator for the Arcana Restaurantes Deck (10 Executive Slides)
Enriched with industry data from:
- exposicion-beneficio-arcana-dueno-restaurante.md
- Loomis 4 anti-theft strategies
- National Restaurant Association (NRA) NIST & Digital Security
- Rewards Network (FACES theft framework & QSR benchmarks)
- Food Cost Variance (>2%) and EBITDA margin recovery analysis
"""

import json
from pathlib import Path

ICONS = {
    "brain": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/><path d="M7 10h10"/><path d="M7 14h10"/></svg>',
    "dish": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11h.01"/><path d="M12 15h.01"/><path d="M16 16h.01"/><path d="M2 19h20"/><path d="M20 15a8 8 0 0 0-16 0"/><path d="M12 4v3"/></svg>',
    "utensils": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
    "cubes": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/><path d="m3.27 6.96 8.73 4.88 8.73-4.88"/><path d="M12 22.08V12"/></svg>',
    "sparkles": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    "target": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    "route": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
    "zap": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    "shield": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    "database": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>',
    "chart": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    "layers": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    "scale": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
    "check": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    "dollar": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    "alert": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    "zoom": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    "thermometer": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>',
    "lock": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    "wine": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>',
    "box": '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>'
}

def generate_deck_html():
    slides = [
        # SLIDE 1: COVER HERO
        f"""
        <!-- SLIDE 1: COVER HERO -->
        <section class="slide active slide-hero-lumi" id="restaurante-slide-1" data-slide="1" data-deck="restaurante">
          <div class="hero-cover">
            <div class="hero-brand-top">| 3i BAIRD LAB · VENTURES | ARCANA</div>
            <div class="hero-glow-badge">
              <span class="pill-icon">{ICONS['sparkles']}</span>
              <span class="lang-en">Executive Proposal · Restaurant Owners &amp; Operators · 10 Slides</span>
              <span class="lang-es">Propuesta Ejecutiva · Dueños y Operadores de Restaurante · 10 Slides</span>
            </div>
            <h1 class="hero-title">
              <span class="lang-en">Arcana: Accounting You Cannot Fake</span>
              <span class="lang-es">Arcana: Contabilidad que no se puede mentir</span>
            </h1>
            <p class="hero-subtitle">
              <span class="lang-en">For restaurant owners and operators who want to prove what was purchased, cooked, and sold without living on top of the store.</span>
              <span class="lang-es">Para dueños y operadores gastronómicos que quieren demostrar lo comprado, cocinado y vendido sin vivir encima del local.</span>
            </p>
            <div class="hero-flow-ribbon">
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['scale']}</span>
                <span class="lang-en">Signed IoT Sensors</span>
                <span class="lang-es">IoT Firmado (ESP32)</span>
              </div>
              <div class="flow-arrow"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['shield']}</span>
                <span class="lang-en">Auditable Daily Close</span>
                <span class="lang-es">Cierre Diario Auditable</span>
              </div>
              <div class="flow-arrow"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['dollar']}</span>
                <span class="lang-en">EBITDA Leak Recovery</span>
                <span class="lang-es">Recuperación de EBITDA</span>
              </div>
              <div class="flow-arrow"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
              <div class="flow-step-pill">
                <span class="pill-icon">{ICONS['target']}</span>
                <span class="lang-en">Physical Evidence Proof</span>
                <span class="lang-es">Control Físico Real</span>
              </div>
            </div>
            <div class="hero-bottom-proof">
              <span class="proof-tag"><span class="lang-en">STRATEGIC PRINCIPLE</span><span class="lang-es">PRINCIPIO ESTRATÉGICO</span></span>
              <span class="proof-text">
                <span class="lang-en">Arcana does not replace your POS; it tethers digital registers to the physical reality of scales, fridges, kitchen lines, and cash drawers.</span>
                <span class="lang-es">Arcana no reemplaza el POS; lo ata a la realidad física de básculas, neveras, hornos y caja registradora.</span>
              </span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 2: THE OWNER PROBLEM & ECONOMIC IMPACT
        f"""
        <!-- SLIDE 2: THE OWNER PROBLEM & ECONOMIC IMPACT -->
        <section class="slide" id="restaurante-slide-2" data-slide="2" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">02</span>
              <span class="slide-category-title"><span class="lang-en">THE OWNER'S DILEMMA · ECONOMIC IMPACT</span><span class="lang-es">EL PROBLEMA DEL DUEÑO · IMPACTO ECONÓMICO</span></span>
            </div>
            <div class="slide-meta-brand">| 3i BAIRD LAB · INDUSTRY BENCHMARKS</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Money Leaks Out in Small Drops: The Real Loss</span><span class="lang-es">El dinero se escapa por goteo: La anatomía de la fuga</span></h2>
            <p class="slide-lead"><span class="lang-en">With typical industry net margins of only 3–9%, a 4% loss on sales wipes out 50% to 100% of the entire annual profit.</span><span class="lang-es">Con un margen neto sectorial de solo 3–9%, una fuga del 4% sobre ventas destruye entre el 50% y el 100% de la utilidad anual.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div class="metrics-row-4">
                  <div class="metric-card gold">
                    <div class="metric-val">3–9%</div>
                    <div class="metric-lbl"><span class="lang-en">Typical sector net margin</span><span class="lang-es">Margen neto típico del sector</span></div>
                  </div>
                  <div class="metric-card amber">
                    <div class="metric-val">4%–7%</div>
                    <div class="metric-lbl"><span class="lang-en">Annual leakage (NRA QSR ceiling: 7%)</span><span class="lang-es">Fuga anual (techo QSR: 7% NRA)</span></div>
                  </div>
                  <div class="metric-card red">
                    <div class="metric-val">75%</div>
                    <div class="metric-lbl"><span class="lang-en">Shrinkage from internal theft</span><span class="lang-es">Faltante por merma interna (Loomis)</span></div>
                  </div>
                  <div class="metric-card cyan">
                    <div class="metric-val">&gt;2%</div>
                    <div class="metric-lbl"><span class="lang-en">Critical Food Cost Variance alert</span><span class="lang-es">Alerta crítica Food Cost Variance</span></div>
                  </div>
                </div>

                <!-- Annual Loss Table by Store Size -->
                <div class="comparison-table-wrapper" style="margin-top: 2px;">
                  <table class="comparison-table" style="font-size: 0.82rem;">
                    <thead>
                      <tr>
                        <th><span class="lang-en">Store Size Profile</span><span class="lang-es">Perfil del Restaurante</span></th>
                        <th><span class="lang-en">Annual Gross Sales</span><span class="lang-es">Ventas Anuales</span></th>
                        <th class="bad"><span class="lang-en">Annual Loss (4% Base)</span><span class="lang-es">Pérdida Anual (4% Base)</span></th>
                        <th class="good"><span class="lang-en">Recuperación (50% Recorte)</span><span class="lang-es">Recuperación (50% Recorte)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="aspect"><strong><span class="lang-en">Small / Coffee / Fast-Casual</span><span class="lang-es">Pequeño / Cafetería / QSR</span></strong></td>
                        <td>$500,000 USD</td>
                        <td class="bad"><strong>-$20,000 USD/año</strong></td>
                        <td class="good"><strong>+$10,000 USD/año</strong></td>
                      </tr>
                      <tr>
                        <td class="aspect"><strong><span class="lang-en">Mid-Sized / Full-Service</span><span class="lang-es">Mediano / Servicio Completo</span></strong></td>
                        <td>$1,200,000 USD</td>
                        <td class="bad"><strong>-$48,000 USD/año</strong></td>
                        <td class="good"><strong>+$24,000 USD/año</strong></td>
                      </tr>
                      <tr>
                        <td class="aspect"><strong><span class="lang-en">Large / High-Volume Franchise</span><span class="lang-es">Grande / Alto Volumen / Franquicia</span></strong></td>
                        <td>$3,000,000 USD</td>
                        <td class="bad"><strong>-$120,000 USD/año</strong></td>
                        <td class="good"><strong>+$60,000 USD/año</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="feature-card highlight-card" style="padding: 10px 14px;">
                  <div class="card-icon-wrapper amber">{ICONS['target']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">The Owner's Bottom Line:</span><span class="lang-es">La lectura del dueño:</span></div>
                    <div class="card-desc" style="font-size: 0.88rem; color: #f8fafc;">
                      <span class="lang-en">To generate $24k in new net profit at a 6% margin, you would need $400,000 USD in extra sales. Recovering leakage goes 100% straight to net cash EBITDA.</span>
                      <span class="lang-es">Para ganar $24k netos nuevos al 6% de margen, tendrías que vender $400,000 USD adicionales. Recuperar la fuga va 100% directo a la utilidad líquida.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-2-1.png')">
                <img src="extracted_media_restaurante/image-2-1.png" alt="El problema del dueño">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['alert']}</span>
              <span class="lang-en">Question Arcana Answers: "Can I prove what was bought, cooked, and sold actually happened without living inside the store?"</span>
              <span class="lang-es">Pregunta que responde Arcana: “¿Puedo demostrar que lo comprado, cocinado y vendido realmente pasó sin vivir encima del local?”</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 3: PAIN MAP & THE F.A.C.E.S. THEFT FRAMEWORK
        f"""
        <!-- SLIDE 3: PAIN MAP & F.A.C.E.S. FRAMEWORK -->
        <section class="slide" id="restaurante-slide-3" data-slide="3" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">03</span>
              <span class="slide-category-title"><span class="lang-en">PAIN MAP · THE F.A.C.E.S. FRAMEWORK</span><span class="lang-es">MAPA DEL DOLOR · EL MARCO F.A.C.E.S.</span></span>
            </div>
            <div class="slide-meta-brand">| REWARDS NETWORK &amp; LOOMIS BENCHMARKS</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Where Store Truth Breaks Down: The F.A.C.E.S. Vectors</span><span class="lang-es">Dónde se rompe la verdad del local: Los vectores F.A.C.E.S.</span></h2>
            <p class="slide-lead"><span class="lang-en">POS logs issued tickets; Arcana reconciles tickets against the 5 physical vectors where restaurant profit evaporates.</span><span class="lang-es">El POS registra tickets emitidos; Arcana audita los 5 vectores críticos donde la utilidad se evapora.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber">{ICONS['utensils']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">F — Food &amp; Portions</span><span class="lang-es">F — Alimentos (Food)</span></div>
                      <div class="card-desc"><span class="lang-en">Portion drift, unrecorded comps, sweethearting, unauthorized staff meals.</span><span class="lang-es">Porciones alteradas, merma no declarada, 'sweethearting' y comidas de personal.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper purple">{ICONS['wine']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">A — Alcohol &amp; Beverages</span><span class="lang-es">A — Alcohol y Bebidas</span></div>
                      <div class="card-desc"><span class="lang-en">Over-pours, unlogged open bottles, inventory drain behind the bar.</span><span class="lang-es">Pours no medidos, botellas abiertas sin registro y merma en barra.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper gold">{ICONS['dollar']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">C — Cash &amp; Front of House</span><span class="lang-es">C — Efectivo y Caja (Cash)</span></div>
                      <div class="card-desc"><span class="lang-en">Drawer voids, short-ringing, cash skimming before register, rogue comps.</span><span class="lang-es">Voids abusivos, short-ringing, skimming en caja y descuentos de confianza.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper cyan">{ICONS['box']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">E/S — Equipment &amp; Supplies</span><span class="lang-es">E/S — Equipos y Suministros</span></div>
                      <div class="card-desc"><span class="lang-en">Short vendor deliveries, substituted items, packaging waste without sales.</span><span class="lang-es">Entregas cortas de proveedores, sustitución de insumos y cajas to-go sin ticket.</span></div>
                    </div>
                  </div>
                </div>
                <div class="feature-card compact" style="border-left: 3px solid #fbbf24; background: rgba(245, 158, 11, 0.08);">
                  <div class="card-icon-wrapper amber">{ICONS['shield']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">The Governance Disconnect: Editable Excel vs. Remote Partners</span><span class="lang-es">La Desconexión: Reportes en Excel vs. Socios Remotos</span></div>
                    <div class="card-desc"><span class="lang-en">Spreadsheets and manual POS dashboards are editable after the shift. Blind trust creates friction with investors and banking partners.</span><span class="lang-es">Las hojas de cálculo y reportes de POS son editables a posteriori. La confianza humana sin evidencia técnica dura genera disputas con socios.</span></div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-3-1.png')">
                <img src="extracted_media_restaurante/image-3-1.png" alt="Mapa del dolor F.A.C.E.S.">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['sparkles']}</span>
              <span class="lang-en">It is not "more CCTV cameras" — it is control architecture where physical sensors and digital tickets align.</span>
              <span class="lang-es">No es “más cámaras de vigilancia”: Es diseño de control físico donde inventario, cocina y caja cuentan la misma historia.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 4: WHAT IS ARCANA (JARGON-FREE)
        f"""
        <!-- SLIDE 4: WHAT IS ARCANA -->
        <section class="slide" id="restaurante-slide-4" data-slide="4" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">04</span>
              <span class="slide-category-title"><span class="lang-en">WHAT IS ARCANA · JARGON-FREE ARCHITECTURE</span><span class="lang-es">QUÉ ES ARCANA · SIN JERGA NI HUMO</span></span>
            </div>
            <div class="slide-meta-brand">| 3i BAIRD LAB · CRYPTOGRAPHIC AUDITING</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Machines Sign What They Witnessed in Real Time</span><span class="lang-es">Las máquinas firman lo que vieron en tiempo real</span></h2>
            <p class="slide-lead"><span class="lang-en">Low-cost IoT microcontrollers (ESP32) connect the fridge, scales, kitchen ovens, and cash drawers to forge an immutable daily ledger.</span><span class="lang-es">Microcontroladores IoT (ESP32) conectan neveras, básculas, hornos y POS en una red de auditoría criptográfica local.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper cyan">{ICONS['thermometer']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">1. Fridge &amp; Cold Chain</span><span class="lang-es">1. Nevera / Cadena Fría</span></div>
                      <div class="card-desc"><span class="lang-en">Continuous weight sensors &amp; temperature logs (never turned off).</span><span class="lang-es">Peso de insumos y temperatura continua para evitar merma y apagados.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber">{ICONS['zap']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">2. Kitchen Cooking Line</span><span class="lang-es">2. Cocina / Hornos</span></div>
                      <div class="card-desc"><span class="lang-en">Active cooking energy draw corroborates exact portion prep.</span><span class="lang-es">Ciclos térmicos y eléctricos corroboran porciones cocinadas reales.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper purple">{ICONS['database']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">3. POS Integration</span><span class="lang-es">3. Punto de Venta (POS)</span></div>
                      <div class="card-desc"><span class="lang-en">Ties sold tickets, voids, and comps directly to physical output.</span><span class="lang-es">Ata tickets vendidos, anulaciones y cortesías al pesaje real.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper gold">{ICONS['dollar']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">4. Cash Drawer Count</span><span class="lang-es">4. Caja y Efectivo</span></div>
                      <div class="card-desc"><span class="lang-en">Shift opening, cash drops, and daily reconciliation signed on-device.</span><span class="lang-es">Apertura, drops y arqueo final de caja firmados criptográficamente.</span></div>
                    </div>
                  </div>
                </div>
                <div class="feature-card highlight-card">
                  <div class="card-icon-wrapper emerald">{ICONS['lock']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Immutable Daily Close Seal (Merkle Root Hash)</span><span class="lang-es">Sello Criptográfico Inalterable (Árbol de Merkle)</span></div>
                    <div class="card-desc"><span class="lang-en">Every midnight, all physical logs compress into a cryptographic hash notarized on Polygon (&lt;$0.02/day). If anyone modifies an Excel or POS line later, the seal breaks immediately.</span><span class="lang-es">A medianoche, todos los eventos se resumen en un hash notarizado en Polygon (&lt;$0.02/día). Si alguien cambia un dato o un Excel después, el sello ya no cuadra.</span></div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-4-1.png')">
                <img src="extracted_media_restaurante/image-4-1.png" alt="Qué es Arcana">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['shield']}</span>
              <span class="lang-en">Zero crypto speculation: 1:1 USDC treasury backing without volatile tokens or speculative distractions.</span>
              <span class="lang-es">Cero especulación crypto: Respaldo 1:1 con USDC en tesorería, sin tokens volátiles ni distracciones.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 5: 4 LOOMIS STRATEGIES REINFORCED BY ARCANA
        f"""
        <!-- SLIDE 5: 4 LOOMIS STRATEGIES REINFORCED BY ARCANA -->
        <section class="slide" id="restaurante-slide-5" data-slide="5" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">05</span>
              <span class="slide-category-title"><span class="lang-en">INDUSTRY STRATEGIES · LOOMIS + ARCANA</span><span class="lang-es">ESTRATEGIAS DEL SECTOR · LOOMIS + ARCANA</span></span>
            </div>
            <div class="slide-meta-brand">| 3i BAIRD LAB · OPERATIONAL EXCELLENCE</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Arcana Reinforces What the Industry Recommends</span><span class="lang-es">Arcana refuerza las 4 estrategias anti-robo de Loomis</span></h2>
            <p class="slide-lead"><span class="lang-en">It does not replace culture or smart safes: it enforces physical truth where POS and spreadsheets fail.</span><span class="lang-es">No sustituye la cultura ni las smart safes: refuerza donde el POS y el Excel tradicional se quedan cortos.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="cards-grid-vertical" style="gap: 6px;">
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:900;">01</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">1. Culture of Accountability &amp; Declared Comps</span><span class="lang-es">1. Cultura de Accountability y Merma Declarada</span></div>
                      <div class="card-desc"><span class="lang-en">Loomis recommends strict onboarding and comps rules. Arcana makes waste and employee meals declared on-chain, not hidden.</span><span class="lang-es">SOPs claros y límites de comidas de personal; la merma queda declarada en el rastro firmado y deja de ser invisible.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:900;">02</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">2. Cash Management &amp; Smart Safes</span><span class="lang-es">2. Manejo de Efectivo y Separación de Roles</span></div>
                      <div class="card-desc"><span class="lang-en">Cash drawer drops and drawer counts tie directly to cooked portions and recipe weights: skimming clashes with physics.</span><span class="lang-es">Smart safes y cash drops; el dinero en caja choca matemáticamente con los kilos de insumos cocinados.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:900;">03</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">3. Continuous Inventory &amp; Blind Counts</span><span class="lang-es">3. Control de Inventario por Peso Continuo</span></div>
                      <div class="card-desc"><span class="lang-en">Signed IoT weight logs + sales tickets replace inaccurate manual spreadsheets: eliminating ghost shortages.</span><span class="lang-es">Báscula IoT firmada + ventas POS = erradicación del faltante fantasma y el 'sweethearting' en barra y cocina.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:900;">04</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">4. Exception-Based POS Auditing</span><span class="lang-es">4. Auditoría de POS y Excepciones Correlacionadas</span></div>
                      <div class="card-desc"><span class="lang-en">POS exception reporting detects voids; Arcana demands that POS anomalies match kitchen heat &amp; scale telemetry.</span><span class="lang-es">Un void o anulación en el POS exige justificación física de cocina. Mentir en un solo sistema ya no alcanza.</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-7-1.png')">
                <img src="extracted_media_restaurante/image-7-1.png" alt="Estrategia Loomis + Arcana">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['shield']}</span>
              <span class="lang-en">Core Principle: To commit fraud, an actor would have to breach 4 independent physical hardware systems simultaneously.</span>
              <span class="lang-es">Principio: Para hacer trampa habría que vulnerar 4 sistemas físicos de hardware independientes a la vez.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 6: OPERATIONAL MATURITY CURVE (1 TO 6)
        f"""
        <!-- SLIDE 6: OPERATIONAL MATURITY CURVE -->
        <section class="slide" id="restaurante-slide-6" data-slide="6" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">06</span>
              <span class="slide-category-title"><span class="lang-en">OPERATIONAL MATURITY · LEVELS 1 TO 6</span><span class="lang-es">CURVA DE MADUREZ OPERATIVA · NIVELES 1 A 6</span></span>
            </div>
            <div class="slide-meta-brand">| 3i BAIRD LAB · BENCHMARKS</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">From Gut Intuition to Cryptographic Telemetry</span><span class="lang-es">De la intuición al dato criptográfico: Niveles de madurez</span></h2>
            <p class="slide-lead"><span class="lang-en">How restaurant EBITDA margins and investor transparency scale as operational maturity advances.</span><span class="lang-es">Cómo evoluciona la rentabilidad y el control de un restaurante al adoptar tecnología verificable.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="comparison-table-wrapper">
                  <table class="comparison-table" style="font-size: 0.8rem;">
                    <thead>
                      <tr>
                        <th><span class="lang-en">Maturity Level</span><span class="lang-es">Nivel de Madurez</span></th>
                        <th><span class="lang-en">Without Arcana (Traditional)</span><span class="lang-es">Operación Tradicional</span></th>
                        <th class="good"><span class="lang-en">With Arcana Architecture</span><span class="lang-es">Con Arquitectura Arcana</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="aspect"><strong><span class="lang-en">Levels 1–2 (Reactive)</span><span class="lang-es">Nivel 1–2 (Reactivo)</span></strong></td>
                        <td class="bad"><span class="status-cross">✕</span> <span class="lang-en">8–10% waste, invisible theft, paper logs</span><span class="lang-es">Merma 8–10%, robo invisible, papel</span></td>
                        <td class="good"><span class="status-check">✓</span> <span class="lang-en">Document SOPs + calibrate initial IoT baselines</span><span class="lang-es">Documentar SOPs + calibrar sensores base</span></td>
                      </tr>
                      <tr>
                        <td class="aspect"><strong><span class="lang-en">Levels 3–4 (Standardized)</span><span class="lang-es">Nivel 3–4 (Estandarizado)</span></strong></td>
                        <td class="bad"><span class="status-cross">✕</span> <span class="lang-en">Manual weekly blind counts, delayed P&amp;L</span><span class="lang-es">Conteo manual semanal, P&amp;L tardío</span></td>
                        <td class="good"><span class="status-check">✓</span> <span class="lang-en">Continuous theoretical vs. real variance tracking</span><span class="lang-es">Monitoreo continuo Teórico vs. Real (&lt;2%)</span></td>
                      </tr>
                      <tr>
                        <td class="aspect"><strong><span class="lang-en">Levels 5–6 (Systematized)</span><span class="lang-es">Nivel 5–6 (Sistematizado)</span></strong></td>
                        <td class="bad"><span class="status-cross">✕</span> <span class="lang-en">Disputes between remote partners &amp; managers</span><span class="lang-es">Disputas entre socios e inconsistencias</span></td>
                        <td class="good"><span class="status-check">✓</span> <span class="lang-en">Multi-sensor correlation + sealed Polygon close</span><span class="lang-es">Correlación multi-sensor + cierre sellado</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="feature-card highlight-card" style="padding: 10px 14px;">
                  <div class="card-icon-wrapper emerald">{ICONS['chart']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">EBITDA Margin Impact: 2 to 5 Percentage Points</span><span class="lang-es">Impacto en EBITDA: 2 a 5 Puntos Porcentuales</span></div>
                    <div class="card-desc" style="font-size: 0.86rem; color: #f1f5f9;">
                      <span class="lang-en">Eliminating non-operational shrinkage, unrecorded comps, and invoicing errors recovers 2–5% of EBITDA directly into the owner's pocket.</span>
                      <span class="lang-es">Subir de nivel operativo protege de 2 a 5 puntos porcentuales de EBITDA que hoy se pierden en fugas invisibles.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-6-1.png')">
                <img src="extracted_media_restaurante/image-6-1.png" alt="Curva de madurez">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['dollar']}</span>
              <span class="lang-en">Controlling operational leakage is the highest-ROI investment a restaurant operator can make.</span>
              <span class="lang-es">Controlar las fugas operativas es la inversión de mayor retorno que un operador puede ejecutar.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 7: 3 TECHNICAL LEAKS + DIGITAL SECURITY (NRA NIST)
        f"""
        <!-- SLIDE 7: 3 TECHNICAL LEAKS & DIGITAL SECURITY -->
        <section class="slide" id="restaurante-slide-7" data-slide="7" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">07</span>
              <span class="slide-category-title"><span class="lang-en">TECHNICAL LEAKS &amp; DIGITAL SECURITY</span><span class="lang-es">FUGAS TÉCNICAS Y CIBERSEGURIDAD DIGITAL</span></span>
            </div>
            <div class="slide-meta-brand">| NRA DIGITAL SECURITY 101 &amp; NIST FRAMEWORK</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Closing Physical Leaks and Securing Digital Integrity</span><span class="lang-es">Cierre de fugas técnicas y ciberseguridad digital</span></h2>
            <p class="slide-lead"><span class="lang-en">Protecting both the physical store operations and the high-cost digital vectors highlighted by the National Restaurant Association.</span><span class="lang-es">Protección integral contra las fugas operativas internas y los costosos riesgos digitales del sector gastronómico.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber">{ICONS['scale']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">1. Non-Operational Shrinkage</span><span class="lang-es">1. Merma No Operativa</span></div>
                      <div class="card-desc"><span class="lang-en">Immediate detection of inventory leaving without sales tickets or declared comps.</span><span class="lang-es">Detección de salidas de insumos sin ticket ni merma justificada.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber">{ICONS['zap']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">2. Ghost Orders &amp; Cash Skimming</span><span class="lang-es">2. Comandas Fantasma y Caja</span></div>
                      <div class="card-desc"><span class="lang-en">Synchronizes cooking line active draw with registered sales in real time.</span><span class="lang-es">Sincronización estricta entre cocción en horno y tickets cobrados.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber">{ICONS['box']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">3. Vendor Delivery Shortages</span><span class="lang-es">3. Descuadres con Proveedores</span></div>
                      <div class="card-desc"><span class="lang-en">Signed receiving scales verify invoice quantities upon warehouse arrival.</span><span class="lang-es">Recepción sobre báscula IoT: el albarán coincide con el peso real.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper red">{ICONS['shield']}</div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">4. Digital Breach Risk ($100k+)</span><span class="lang-es">4. Riesgo de Breach Digital ($100k+)</span></div>
                      <div class="card-desc"><span class="lang-en">NRA reports breaches cost $36k–$100k+. Arcana eliminates editable spreadsheets.</span><span class="lang-es">La NRA advierte que un breach cuesta $36k–$100k+. Arcana erradica hojas editables.</span></div>
                    </div>
                  </div>
                </div>
                <div class="feature-card highlight-card" style="padding: 10px 14px;">
                  <div class="card-icon-wrapper gold">{ICONS['lock']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">NIST Digital Security Alignment:</span><span class="lang-es">Alineación con el Marco NIST:</span></div>
                    <div class="card-desc" style="font-size: 0.86rem; color: #fff;">
                      <span class="lang-en">Identify → Protect → Detect → Respond → Recover. Arcana acts as the "Digital HACCP" ensuring financial and operational data integrity.</span>
                      <span class="lang-es">Identificar → Proteger → Detectar → Responder → Recuperar. Arcana actúa como un "HACCP Digital" asegurando la integridad de los datos.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-5-1.png')">
                <img src="extracted_media_restaurante/image-5-1.png" alt="Fugas técnicas y seguridad">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['check']}</span>
              <span class="lang-en">A breach or reporting fraud can destroy a year of earnings; cryptographic certainty protects brand equity.</span>
              <span class="lang-es">Un breach o un fraude de reportes puede costar un año entero de utilidades; la certeza protege la reputación.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 8: HONEST PROMISE (GUARANTEES VS BOUNDARIES)
        f"""
        <!-- SLIDE 8: HONEST PROMISE -->
        <section class="slide" id="restaurante-slide-8" data-slide="8" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">08</span>
              <span class="slide-category-title"><span class="lang-en">HONEST PROMISE · GUARANTEES &amp; BOUNDARIES</span><span class="lang-es">PROMESA HONESTA · GARANTÍAS Y LÍMITES</span></span>
            </div>
            <div class="slide-meta-brand">| 3i BAIRD LAB · INTEGRITY PRINCIPLES</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">What Arcana Delivers vs. What It Does Not Promise</span><span class="lang-es">Qué sí hace Arcana y qué no promete</span></h2>
            <p class="slide-lead"><span class="lang-en">Commercial and investor trust expands when technological guarantees are rigorously delimited.</span><span class="lang-es">La confianza comercial y de inversión se construye sobre compromisos técnicos delimitados y verificables.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <div class="feature-card" style="border-top: 3px solid #10b981; padding: 12px 14px;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; color: #10b981; font-weight: 800; font-family: var(--font-heading); font-size: 0.88rem;">
                      <span style="font-size: 1.1rem;">✓</span>
                      <span class="lang-en">WHAT ARCANA GUARANTEES</span>
                      <span class="lang-es">SÍ GARANTIZA</span>
                    </div>
                    <ul class="features-bullet-list" style="gap: 5px; font-size: 0.8rem;">
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#10b981;">✓</span> <div><span class="lang-en">Correlated &amp; signed physical hardware trail</span><span class="lang-es">Rastro correlacionado y firmado por sensores IoT</span></div></li>
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#10b981;">✓</span> <div><span class="lang-en">Immutable daily close notarized on Polygon</span><span class="lang-es">Cierre diario sellado e inalterable en Polygon</span></div></li>
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#10b981;">✓</span> <div><span class="lang-en">Visible, logged, and bounded manager overrides</span><span class="lang-es">Overrides visibles, registrados y con límite pactado</span></div></li>
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#10b981;">✓</span> <div><span class="lang-en">Zero dependence on editable Excel spreadsheets</span><span class="lang-es">Cero dependencia de hojas de cálculo editables</span></div></li>
                    </ul>
                  </div>
                  <div class="feature-card" style="border-top: 3px solid #f43f5e; padding: 12px 14px;">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; color: #f43f5e; font-weight: 800; font-family: var(--font-heading); font-size: 0.88rem;">
                      <span style="font-size: 1.1rem;">—</span>
                      <span class="lang-en">WHAT IT DOES NOT PROMISE</span>
                      <span class="lang-es">NO PROMETE</span>
                    </div>
                    <ul class="features-bullet-list" style="gap: 5px; font-size: 0.8rem;">
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#f43f5e;">—</span> <div><span class="lang-en">"Impossible to hack" magical hype</span><span class="lang-es">"Hackeo imposible" absoluto ni magia</span></div></li>
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#f43f5e;">—</span> <div><span class="lang-en">Replacing PCI/NIST cybersecurity policies</span><span class="lang-es">Sustituir normativas PCI/NIST o HACCP</span></div></li>
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#f43f5e;">—</span> <div><span class="lang-en">Eliminating human leadership and supervision</span><span class="lang-es">Eliminar la gestión humana y liderazgo</span></div></li>
                      <li class="feature-bullet"><span class="bullet-glow" style="color:#f43f5e;">—</span> <div><span class="lang-en">Locking store down if internet fails (operates offline)</span><span class="lang-es">Bloqueo ante fallas de red (opera offline)</span></div></li>
                    </ul>
                  </div>
                </div>
                <div class="feature-card highlight-card" style="padding: 10px 14px;">
                  <div class="card-icon-wrapper amber">{ICONS['sparkles']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Commercial Positioning</span><span class="lang-es">Posicionamiento Comercial</span></div>
                    <div class="card-desc" style="font-size: 0.86rem;"><span class="lang-en">The pitch is not "crypto hype." It is recoverable cash margin, proof of operation, and peace of mind for partners and capital investors.</span><span class="lang-es">La venta no es “humo crypto”. La venta es margen recuperable, prueba de operación y control para socios e inversores.</span></div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-8-1.png')">
                <img src="extracted_media_restaurante/image-8-1.png" alt="Promesa honesta">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['target']}</span>
              <span class="lang-en">Rigorous engineering that provides concrete business ROI without unrealistic claims.</span>
              <span class="lang-es">Ingeniería rigurosa que provee ROI empresarial concreto sin falsas promesas.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 9: IDEAL CLIENT CHECKLIST (3+ SIGNS)
        f"""
        <!-- SLIDE 9: IDEAL CLIENT CHECKLIST -->
        <section class="slide" id="restaurante-slide-9" data-slide="9" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">09</span>
              <span class="slide-category-title"><span class="lang-en">IDEAL CLIENT · DECISION CHECKLIST</span><span class="lang-es">CLIENTE IDEAL · CHECKLIST DE DECISIÓN</span></span>
            </div>
            <div class="slide-meta-brand">| 3i BAIRD LAB · QUALIFICATION MODEL</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">Which Restaurant Owner Benefits First?</span><span class="lang-es">Checklist de decisión: ¿Arcana es para mi restaurante?</span></h2>
            <p class="slide-lead"><span class="lang-en">If you check 3 or more boxes, Arcana transforms from "cool technology" into mandatory financial control.</span><span class="lang-es">Si marcas 3 o más casillas, Arcana se convierte en un multiplicador financiero directo.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <div class="cards-grid-vertical" style="gap: 5px;">
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:bold; font-size:1.05rem;">☑</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">1. Food Cost Variance &gt; 2%</span><span class="lang-es">1. Food Cost Variance &gt; 2%</span></div>
                      <div class="card-desc"><span class="lang-en">Real food cost or shrinkage drifts continuously above theoretical recipe benchmarks.</span><span class="lang-es">El Food Cost real supera al teórico en más del 2% mes tras mes sin causa clara.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:bold; font-size:1.05rem;">☑</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">2. Register Discrepancies &amp; Excessive Voids</span><span class="lang-es">2. Descuadres en Caja y Voids Frecuentes</span></div>
                      <div class="card-desc"><span class="lang-en">Cash drawer over/under balances, cancel/re-ring anomalies, or irregular comps.</span><span class="lang-es">Cajones descuadrados, anulaciones (voids) recurrentes o tips fuera de rango.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:bold; font-size:1.05rem;">☑</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">3. Warehouse vs. Ticket Discrepancies</span><span class="lang-es">3. Desconexión Inventario vs. Ventas</span></div>
                      <div class="card-desc"><span class="lang-en">Physical inventory depletes faster than ticket volume; suspect vendor short delivery.</span><span class="lang-es">Inventario en bodega no cuadra con tickets o proveedores entregan de menos.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:bold; font-size:1.05rem;">☑</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">4. Remote Partners &amp; Silent Investors</span><span class="lang-es">4. Socios o Inversionistas Remotos</span></div>
                      <div class="card-desc"><span class="lang-en">Capital partners who cannot be in the restaurant every day demand objective proof.</span><span class="lang-es">Inversionistas que exigen transparencia contable sin tener que vivir en el local.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:bold; font-size:1.05rem;">☑</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">5. Process Discipline Over Passive CCTV</span><span class="lang-es">5. Cultura y SOPs Reales (No solo Cámaras)</span></div>
                      <div class="card-desc"><span class="lang-en">Seeks standardized SOP compliance and operating culture, not just passive video cameras.</span><span class="lang-es">Buscas disciplina operativa y SOPs de caja, no solo cámaras pasivas que nadie ve.</span></div>
                    </div>
                  </div>
                  <div class="feature-card compact">
                    <div class="card-icon-wrapper amber"><span style="font-weight:bold; font-size:1.05rem;">☑</span></div>
                    <div class="card-text-group">
                      <div class="card-title"><span class="lang-en">6. Bounded Manager Overrides</span><span class="lang-es">6. Overrides Visibles con Techo Pactado</span></div>
                      <div class="card-desc"><span class="lang-en">Accepts transparent, logged exceptions with alerts when threshold is exceeded.</span><span class="lang-es">Aceptas operar con excepciones visibles y alertas automáticas si hay abusos.</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-9-1.png')">
                <img src="extracted_media_restaurante/image-9-1.png" alt="Cliente ideal checklist">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['check']}</span>
              <span class="lang-en">Decision Rule: 3+ checked signals confirm a 100% justifiable pilot with measurable leakage reduction.</span>
              <span class="lang-es">Regla del sector: 3+ señales confirman un piloto justificable con medición del ROI en 30–60 días.</span>
            </div>
          </div>
        </section>
        """,

        # SLIDE 10: ROADMAP & NEXT STEPS
        f"""
        <!-- SLIDE 10: ROADMAP & NEXT STEPS -->
        <section class="slide" id="restaurante-slide-10" data-slide="10" data-deck="restaurante">
          <div class="slide-top-meta">
            <div class="slide-tag-group">
              <span class="slide-number-pill">10</span>
              <span class="slide-category-title"><span class="lang-en">RECOMMENDED ROADMAP · PILOT DEPLOYMENT</span><span class="lang-es">RUTA RECOMENDADA · PRÓXIMOS PASOS</span></span>
            </div>
            <div class="slide-meta-brand">| 3i BAIRD LAB · EXECUTIVE CLOSE</div>
          </div>
          <div class="slide-header">
            <h2><span class="lang-en">From Diagnostic Audit to Measurable Pilot</span><span class="lang-es">De la auditoría inicial al piloto con retorno medible</span></h2>
            <p class="slide-lead"><span class="lang-en">Arcana deploys as friction-free operational control, validating EBITDA recovery before multi-unit scaling.</span><span class="lang-es">Arcana se implementa como control operativo auditable, no como una promesa tecnológica abstracta.</span></p>
          </div>
          <div class="slide-body">
            <div class="split-layout">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="timeline-v-flow">
                  <div class="timeline-step-card">
                    <div class="step-num-bubble amber">01</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">01. Leakage Diagnostic (Days 1–7)</span><span class="lang-es">01. Diagnóstico de Fugas (Días 1–7)</span></div>
                      <div class="step-desc"><span class="lang-en">Measure baseline food cost variance, drawer voids, waste comps, and daily closing gaps.</span><span class="lang-es">Medir merma actual, food cost variance, voids y brechas de caja del local.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble amber">02</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">02. Light Instrumentation (Days 8–14)</span><span class="lang-es">02. Instrumentación Ligera (Días 8–14)</span></div>
                      <div class="step-desc"><span class="lang-en">Install non-invasive IoT microcontrollers on critical nodes: receiving scale, fridge, cook line, POS.</span><span class="lang-es">Instalar sensores IoT en puntos críticos: báscula de recepción, nevera, cocina y POS.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble amber">03</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">03. Controlled Live Pilot (30–60 Days)</span><span class="lang-es">03. Piloto Controlado (30–60 Días)</span></div>
                      <div class="step-desc"><span class="lang-en">Benchmark theoretical recipe consumption vs. physical scale logs and validated revenue.</span><span class="lang-es">Comparar consumo teórico de recetas vs. pesaje y ventas reales en vivo.</span></div>
                    </div>
                  </div>
                  <div class="timeline-step-card">
                    <div class="step-num-bubble emerald">04</div>
                    <div class="step-content">
                      <div class="step-title"><span class="lang-en">04. Scale Decision &amp; Expansion</span><span class="lang-es">04. Decisión de Escala &amp; Expansión</span></div>
                      <div class="step-desc"><span class="lang-en">Expand across franchise stores once EBITDA margin recovery and partner transparency are proven.</span><span class="lang-es">Escalar a toda la cadena con métricas de recuperación y reportes para socios.</span></div>
                    </div>
                  </div>
                </div>
                <div class="feature-card highlight-card" style="padding: 10px 14px;">
                  <div class="card-icon-wrapper gold">{ICONS['sparkles']}</div>
                  <div class="card-text-group">
                    <div class="card-title"><span class="lang-en">Executive Closing Takeaway:</span><span class="lang-es">Cierre Ejecutivo:</span></div>
                    <div class="card-desc" style="font-size: 0.95rem; color: #fff; font-weight: 600;">
                      <span class="lang-en">The owner stops asking others to trust them; they start being able to prove every dollar with mathematical certainty.</span>
                      <span class="lang-es">El dueño deja de pedir que le crean; ahora puede demostrar cada dólar con certeza matemática.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="diagram-preview-box" onclick="openLightbox('extracted_media_restaurante/image-10-1.png')">
                <img src="extracted_media_restaurante/image-10-1.png" alt="Ruta recomendada">
                <div class="zoom-hint-pill">{ICONS['zoom']} <span class="lang-en">Zoom Diagram</span><span class="lang-es">Ampliar Diagrama</span></div>
              </div>
            </div>
          </div>
          <div class="slide-footer">
            <div class="punchline-badge">
              <span class="pill-icon">{ICONS['target']}</span>
              <span class="lang-en">Turn every restaurant branch into an unalterable accounting chapter.</span>
              <span class="lang-es">Convierte cada sucursal en un capítulo contable inalterable y transparente.</span>
            </div>
          </div>
        </section>
        """
    ]

    deck_wrapper = f"""
        <!-- DECK: ARCANA RESTAURANTE (10 Slides) -->
        <div class="deck-container" id="deck-restaurante">
          {''.join(slides)}
        </div>
    """
    return deck_wrapper

def generate_thumbs_html():
    thumbs = [
        ("01", "EXECUTIVE PROPOSAL", "PROPUESTA EJECUTIVA", "Arcana: Accounting You Cannot Fake", "Arcana: Contabilidad que no se puede mentir"),
        ("02", "THE OWNER PROBLEM & LOSS", "EL PROBLEMA DEL DUEÑO", "Money Leaks in Drops: Real Dollar Loss", "El dinero se escapa por goteo: Pérdida real"),
        ("03", "PAIN MAP & F.A.C.E.S.", "MAPA DEL DOLOR F.A.C.E.S.", "Where Store Truth Breaks Down", "Dónde se rompe la verdad del local"),
        ("04", "WHAT IS ARCANA", "QUÉ ES ARCANA", "Machines Sign What They Witnessed", "Las máquinas firman lo que vieron"),
        ("05", "LOOMIS 4 STRATEGIES", "ESTRATEGIAS DEL SECTOR", "Arcana Reinforces Loomis Strategies", "Arcana refuerza las 4 estrategias de Loomis"),
        ("06", "OPERATIONAL MATURITY", "MADUREZ OPERATIVA", "From Gut Feeling to Signed Telemetry", "De la intuición al dato criptográfico"),
        ("07", "TECHNICAL LEAKS & NIST", "FUGAS TÉCNICAS Y NIST", "Closing Physical Leaks & Digital Security", "Cierre de fugas técnicas y ciberseguridad"),
        ("08", "HONEST PROMISE", "PROMESA HONESTA", "What Arcana Delivers vs. Explicit Limits", "Qué sí hace Arcana y qué no promete"),
        ("09", "IDEAL CLIENT CHECKLIST", "CHECKLIST DE DECISIÓN", "Which Restaurant Owner Benefits First?", "Checklist: ¿Arcana es para mi restaurante?"),
        ("10", "ROADMAP & NEXT STEPS", "PRÓXIMOS PASOS", "From Diagnostic Audit to Measurable Pilot", "De la auditoría inicial al piloto medible")
    ]

    cards = []
    for idx, en_tag, es_tag, en_title, es_title in thumbs:
        s_num = int(idx)
        cards.append(f"""          <div class="overview-thumb-card" data-deck="restaurante" onclick="goToSlide({s_num})">
            <div class="thumb-num">SLIDE {idx} / 10 · <span class="lang-en">{en_tag}</span><span class="lang-es">{es_tag}</span></div>
            <div class="thumb-title">
              <span class="lang-en">{en_title}</span>
              <span class="lang-es">{es_title}</span>
            </div>
          </div>""")

    grid = f"""
    <div class="overview-grid" id="overviewGrid-restaurante" style="display: none;">
{chr(10).join(cards)}
    </div>
    """
    return grid

if __name__ == "__main__":
    deck_html = generate_deck_html()
    thumbs_html = generate_thumbs_html()
    with open("deck_restaurante_fragment.html", "w", encoding="utf-8") as f:
        f.write(deck_html)
    with open("deck_restaurante_thumbs.html", "w", encoding="utf-8") as f:
        f.write(thumbs_html)
    print("Generated enhanced deck_restaurante_fragment.html and deck_restaurante_thumbs.html successfully!")
