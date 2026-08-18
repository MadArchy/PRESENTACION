# -*- coding: utf-8 -*-
from pathlib import Path

root = Path(__file__).resolve().parent
html = (root / "index.html").read_text(encoding="utf-8")
frag = (root / "deck_comparativo_fragment.html").read_text(encoding="utf-8")

if "id=\"deck-comparativo\"" in html:
    print("already injected")
else:
    pill_needle = '                    <span class="pill-btn-label">WEB3 &amp; IOT</span>\n                  </button>\n                </div>'
    pill_insert = '''                    <span class="pill-btn-label">WEB3 &amp; IOT</span>
                  </button>
                  <button class="venture-pill-btn pill-ia" onclick="launchDeck('comparativo')">
                    <span class="pill-btn-icon gold"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg></span>
                    <span class="pill-btn-label">IA LOCAL</span>
                  </button>
                </div>'''
    if pill_needle not in html:
        raise SystemExit("pill needle not found")
    html = html.replace(pill_needle, pill_insert, 1)

    html = html.replace(
        "Evaluación estratégica de oportunidades en AI EdTech, FoodTech QSR y Web3 &amp; IoT",
        "Evaluación estratégica de oportunidades en AI EdTech, FoodTech QSR, Web3 &amp; IoT e IA local",
    )
    html = html.replace(
        "Strategic evaluation of investment opportunities in AI EdTech, FoodTech QSR and Web3 &amp; IoT",
        "Strategic evaluation of investment opportunities in AI EdTech, FoodTech QSR, Web3 &amp; IoT and local AI hardware",
    )

    marker = "            </section>\n        </div>\n      </div>\n    </main>"
    idx = html.rfind(marker)
    if idx < 0:
        raise SystemExit("deck end marker not found")
    html = html[:idx] + "            </section>\n        </div>\n" + frag + "\n      </div>\n    </main>" + html[idx + len(marker) :]

    thumbs = Path(root / "deck_comparativo_thumbs.html").read_text(encoding="utf-8")
    vt = '  <div class="video-theater" id="videoTheater" hidden>'
    if vt not in html:
        raise SystemExit("video theater not found")
    html = html.replace(vt, thumbs + "\n" + vt, 1)

    (root / "index.html").write_text(html, encoding="utf-8")
    print("injected", "deck-comparativo" in html, "pill-ia" in html, "overviewGrid-comparativo" in html)
