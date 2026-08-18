# 🏛️ 3i BAIRD LAB · Executive Venture Selection Hub

Plataforma ejecutiva interactiva y futurista de presentación multideck desarrollada para **3i BAIRD LAB** (Venture Architecture & DeepTech Platform).

---

## 📁 Estructura del Proyecto

El repositorio está organizado según estándares profesionales de ingeniería de software y gestión de activos multimedia:

```text
presentacion/
│
├── 🌐 APLICACIÓN WEB PRINCIPAL
│   ├── index.html                  # Aplicación SPA / Hub de Selección Ejecutiva + 4 Decks
│   ├── style.css                   # Sistema de diseño futurista (Cyber-HUD, Glassmorphism, Responsive)
│   ├── app.js                      # Lógica interactiva (ES/EN, Dark/Light, Teclado, Video Theater, Zoom)
│   └── serve.py                    # Servidor HTTP multihilo optimizado para streaming y assets
│
├── 🎨 ASSETS Y MULTIMEDIA
│   ├── backgrounds/                # Fondos de alta definición temáticos por vertical
│   │   ├── bg-hub.jpg              # Hub Ejecutivo Principal
│   │   ├── bg-tutor-*.jpg          # Vertical AI EdTech Tutor
│   │   ├── bg-fastfood-*.jpg       # Vertical FoodTech QSR
│   │   ├── bg-arcana-*.jpg         # Vertical Arcana Web3 & IoT
│   │   └── bg-ia-*.jpg             # Hardware e Infraestructura Local
│   ├── media/                      # Videos ejecutivos en HD y fotografías de hardware IA
│   │   ├── ai-edtech-hd.mp4        # Video introductorio AI EdTech
│   │   └── ia/                     # Galería de workstations y servidores locales
│   ├── extracted_media/            # Diagramas de arquitectura y flujo (AI EdTech Tutor)
│   ├── extracted_media_arcana/     # Diagramas y esquemas técnicos (Arcana Web3 & IoT)
│   └── extracted_media_fastfood/   # Diagramas operativos y flujos (Smart Fast-Food)
│
├── 📦 FUENTES Y MATERIALES ORIGINALES (sources/)
│   ├── pptx/                       # Presentaciones PowerPoint originales
│   │   ├── Arcana_Investor_Presentation_EN_VISUAL.pptx
│   │   ├── Expert_MultiAgent_Tutor_Investors_EN_VISUAL.pptx
│   │   ├── Pitch_Investor_Smart_Fast_Food_EN_VISUAL.pptx
│   │   └── comparativo_equipos_ia_local.pptx
│   └── raw_media/                  # Videos y tomas en bruto
│
├── 📊 CAPA DE DATOS Y METADATOS (data/)
│   ├── decks/                      # Estructura JSON de cada deck (15 slides c/u y comparativo)
│   └── extracts/                   # Resúmenes textuales de diapositivas y transcripciones
│
└── ⚙️ PIPELINE Y GENERADORES (scripts/)
    ├── generators/                 # Generadores de diapositivas HTML y estructuradores
    └── extractors/                 # Utilidades de parsing PPTX e inyección de datos
```

---

## 🚀 Cómo Ejecutar la Plataforma

### Requisitos Previos
- Python 3.8 o superior (no requiere librerías externas para la ejecución de la app web).

### Iniciar Servidor Local
Ejecuta el siguiente comando en la raíz del proyecto:

```bash
python serve.py
```

Luego abre en tu navegador:
```text
http://127.0.0.1:8765/
```

*(También es posible abrir directamente `index.html` en cualquier navegador moderno).*

---

## ⌨️ Controles y Atajos de Teclado

La plataforma incluye navegación inmersiva para presentaciones en vivo:

| Tecla | Acción |
| :--- | :--- |
| <kbd>→</kbd> / <kbd>Espacio</kbd> / <kbd>PgDn</kbd> | Siguiente diapositiva |
| <kbd>←</kbd> / <kbd>PgUp</kbd> | Diapositiva anterior |
| <kbd>Home</kbd> / <kbd>End</kbd> | Primera / Última diapositiva |
| <kbd>G</kbd> | Abrir/Cerrar Grid General (Slide Overview) |
| <kbd>M</kbd> | Regresar al Hub Ejecutivo Principal (Menú) |
| <kbd>L</kbd> | Alternar Idioma en tiempo real (**ES** / **EN**) |
| <kbd>T</kbd> | Alternar Tema (**Dark** / **Light**) |
| <kbd>F</kbd> | Pantalla Completa (**Fullscreen**) |
| <kbd>Esc</kbd> | Cerrar Modales / Video / Overview / Volver al Hub |

---

## 📑 Presentaciones Incluidas

1. **AI EdTech · Tutor Multi-Agente Inteligente** (15 Slides)
   - Arquitectura desacoplada, memoria reflexiva en 3 capas, economía de tokens y proyecciones de inversión.
2. **FoodTech QSR · Smart Fast-Food Franchise** (15 Slides)
   - Sistema de cocina predictiva, micro-estaciones robóticas y optimización de márgenes operativos.
3. **Web3 & IoT · Arcana Trust Network** (15 Slides)
   - Red de verificación por hardware, contratos descentralizados y seguridad de datos.
4. **Infraestructura · Comparativo IA Local** (10 Slides)
   - Análisis comparativo de hardware (DGX Spark, Workstations RTX, Mac Studio) para inferencia y entrenamiento local.

---

## 🛠️ Tecnologías Empleadas
- **Core:** HTML5 Semántico, CSS3 Moderno (CSS Custom Properties, Glassmorphism, CSS Grid & Flexbox), Vanilla JavaScript (ES6+).
- **Audio/Video:** HTML5 Native Video Theater con controles cinemáticos de reproducción y finalización automática.
- **Backend/Serving:** Servidor HTTP Multithreaded Python con soporte nativo de tipos MIME y caching de alto rendimiento.
