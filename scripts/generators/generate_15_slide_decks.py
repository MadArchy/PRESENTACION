# -*- coding: utf-8 -*-
"""
Curate exactly 15 high-impact, executive slides for each of the 3 decks:
1. Expert Multi-Agent Tutor (15 slides)
2. Smart Fast-Food Franchise (15 slides)
3. Arcana: Trust by Construction (15 slides)
"""

import json

# -------------------------------------------------------------
# DECK 1: EXPERT MULTI-AGENT TUTOR (15 Curated Executive Slides)
# -------------------------------------------------------------
deck_tutor_15 = [
    {
        "id": 1,
        "tag_en": "DEEPTECH AI · 3i BAIRD LAB",
        "tag_es": "DEEPTECH AI · 3i BAIRD LAB",
        "title_en": "Expert Multi-Agent Tutor",
        "title_es": "Tutor Experto Multi-Agente",
        "subtitle_en": "Autonomous enterprise-grade tutoring engine powered by 12 collaborative AI agents, knowledge graphs, 3 memory tiers, and verifiable learning proof.",
        "subtitle_es": "Motor de tutoría autónomo de nivel empresarial impulsado por 12 agentes de IA, grafos de conocimiento, 3 niveles de memoria y prueba verificable de aprendizaje.",
        "flow_en": ["Student Diagnosis", "12-Agent Orchestration", "Knowledge Graphs", "Socratic Guidance", "Verifiable Mastery Proof"],
        "flow_es": ["Diagnóstico del Alumno", "Orquestación de 12 Agentes", "Grafos de Conocimiento", "Guía Socrática", "Prueba Verificable de Dominio"],
        "badge_en": "Executive Investor Pitch · 15 Slides",
        "badge_es": "Pitch Ejecutivo para Inversores · 15 Slides",
        "category": "hero",
        "image": "extracted_media/image1.png"
    },
    {
        "id": 2,
        "num": "01",
        "category_en": "THE CORE PROBLEM",
        "category_es": "EL PROBLEMA CENTRAL",
        "title_en": "The $300B Education Bottleneck: AI Chatbots Fail",
        "title_es": "El Cuello de Botella Educativo: Los Chatbots Fallan",
        "lead_en": "Current LLM solutions simply give direct answers rather than teaching students how to think.",
        "lead_es": "Las soluciones actuales de IA solo entregan respuestas directas sin enseñar a razonar.",
        "pillars_en": [
            {"title": "Passive Answer Delivery", "desc": "Chatbots write homework directly, creating false competence without cognitive mastery."},
            {"title": "Hallucinations & No Verification", "desc": "Unchecked errors in complex math, STEM, and specialized professional concepts."},
            {"title": "Zero Persistent Memory", "desc": "Generic bots forget student weaknesses, learning style, and previous curriculum gaps."},
            {"title": "Lack of Pedagogical Structure", "desc": "No progressive scaffolded guidance or mastery verification mechanism."}
        ],
        "pillars_es": [
            {"title": "Entrega Pasiva de Respuestas", "desc": "Los chatbots resuelven la tarea de golpe, generando falsa competencia sin razonamiento."},
            {"title": "Alucinaciones Sin Verificación", "desc": "Errores no detectados en matemáticas, STEM y conceptos técnicos avanzados."},
            {"title": "Cero Memoria Persistente", "desc": "Los bots genéricos olvidan las debilidades, estilo y vacíos previos del estudiante."},
            {"title": "Falta de Rigor Pedagógico", "desc": "Sin andamiaje progresivo ni mecanismos de comprobación de dominio real."}
        ],
        "image": "extracted_media/image2.png",
        "punchline_en": "Students don't need answer machines. They need a personal Socratic tutor.",
        "punchline_es": "Los alumnos no necesitan máquinas de respuestas. Necesitan un tutor socrático personal."
    },
    {
        "id": 3,
        "num": "02",
        "category_en": "OUR SOLUTION",
        "category_es": "NUESTRA SOLUCIÓN",
        "title_en": "The Socratic Multi-Agent Architecture",
        "title_es": "La Arquitectura Multi-Agente Socrática",
        "lead_en": "A specialized 12-agent ecosystem that guides students through active discovery and inquiry.",
        "lead_es": "Un ecosistema de 12 agentes especializados que guía al estudiante mediante descubrimiento activo.",
        "cards_en": [
            {"title": "Step-by-Step Questioning", "desc": "Agents ask targeted questions to prompt student reasoning rather than spitting out answers."},
            {"title": "Adaptive Difficulty Scaling", "desc": "Dynamic calibration adjusts problem difficulty in real time based on student cognitive load."},
            {"title": "Knowledge Graph Grounding", "desc": "Curriculum concepts are mapped to verified semantic ontologies to prevent hallucinations."},
            {"title": "Multimodal Input & Voice", "desc": "Supports handwritten equations, voice conversations, diagrams, and live code execution."}
        ],
        "cards_es": [
            {"title": "Interrogación Socrática", "desc": "Formula preguntas estratégicas para estimular la deducción en lugar de dar soluciones."},
            {"title": "Dificultad Autocalibrada", "desc": "Ajuste dinámico de complejidad en tiempo real según la carga cognitiva del estudiante."},
            {"title": "Anclaje en Grafos de Conocimiento", "desc": "Conceptos vinculados a ontologías curriculares verificadas para erradicar alucinaciones."},
            {"title": "Entrada Multimodal y Voz", "desc": "Procesa ecuaciones manuscritas, diálogo por voz, diagramas y ejecución de código."}
        ],
        "image": "extracted_media/image3.png",
        "punchline_en": "Active inquiry yields 3.8x higher long-term knowledge retention.",
        "punchline_es": "El aprendizaje activo genera 3.8x mayor retención de conocimientos a largo plazo."
    },
    {
        "id": 4,
        "num": "03",
        "category_en": "COMPETITIVE ADVANTAGE",
        "category_es": "VENTAJA COMPETITIVA",
        "title_en": "Direct Comparison: Generic AI vs. 3i Multi-Agent",
        "title_es": "Comparativa: IA Genérica vs. Sistema 3i Multi-Agente",
        "lead_en": "Why foundational LLMs and simple wrappers cannot compete with an orchestrated agent architecture.",
        "lead_es": "Por qué los LLM genéricos no pueden competir con una arquitectura orquestada de agentes.",
        "comparison": [
            {"aspect_en": "Pedagogical Method", "aspect_es": "Método Pedagógico", "bot_en": "Spits immediate solutions", "bot_es": "Entrega respuestas de golpe", "tutor_en": "Scaffolded Socratic questioning", "tutor_es": "Guía socrática progresiva"},
            {"aspect_en": "Factual Accuracy", "aspect_es": "Precisión y Rigor", "bot_en": "Prone to silent hallucinations", "bot_es": "Propenso a alucinaciones", "tutor_en": "Knowledge graph verified & audited", "tutor_es": "Validado contra grafos ontológicos"},
            {"aspect_en": "Student Memory", "aspect_es": "Memoria del Estudiante", "bot_en": "Lost on session reset", "bot_es": "Se borra en cada sesión", "tutor_en": "3-Tier persistent cognitive memory", "tutor_es": "Memoria persistente en 3 capas"},
            {"aspect_en": "Mastery Verification", "aspect_es": "Verificación de Dominio", "bot_en": "Zero verification metrics", "bot_es": "Sin métricas de dominio", "tutor_en": "Cryptographic Proof of Mastery", "tutor_es": "Prueba Criptográfica de Dominio"}
        ],
        "image": "extracted_media/image2.png",
        "punchline_en": "Moving from conversational novelty to enterprise educational infrastructure.",
        "punchline_es": "De la novedad conversacional a infraestructura educativa de clase mundial."
    },
    {
        "id": 5,
        "num": "04",
        "category_en": "MULTI-AGENT TEAMS",
        "category_es": "EQUIPOS MULTI-AGENTE",
        "title_en": "The 4 Specialized Agent Governance Squads",
        "title_es": "Las 4 Escuadras de Gobernanza Multi-Agente",
        "lead_en": "12 autonomous agents organized in 4 structured governance squads with strict cross-verification.",
        "lead_es": "12 agentes autónomos divididos en 4 escuadras con verificación cruzada rigurosa.",
        "teams_en": [
            {"num": "01", "name": "Diagnostic & Triage", "role": "Cognitive profiling", "agents": ["Diagnostic Agent", "Triage Coordinator", "Curriculum Navigator"]},
            {"num": "02", "name": "Pedagogy & Socratic", "role": "Mastery guidance", "agents": ["Socratic Dialogue Coach", "Analogy Generator", "Exercise Synthesizer"]},
            {"num": "03", "name": "Verification & Logic", "role": "Hallucination defense", "agents": ["Formal Logic Checker", "Graph Validator", "Code & Math Verifier"]},
            {"num": "04", "name": "Synthesis & Mastery", "role": "Progress & proof", "agents": ["Cognitive Memory Indexer", "Proof-of-Mastery Mint", "Analytics Reporter"]}
        ],
        "teams_es": [
            {"num": "01", "name": "Diagnóstico y Triaje", "role": "Perfilamiento cognitivo", "agents": ["Agente de Diagnóstico", "Coordinador de Triaje", "Navegador Curricular"]},
            {"num": "02", "name": "Pedagogía Socrática", "role": "Guía de razonamiento", "agents": ["Coach Socrático", "Generador de Analogías", "Sintetizador de Ejercicios"]},
            {"num": "03", "name": "Verificación y Lógica", "role": "Defensa contra alucinaciones", "agents": ["Verificador Lógico", "Validador de Grafos", "Auditor de Código y Mate"]},
            {"num": "04", "name": "Síntesis y Maestría", "role": "Progreso y certificación", "agents": ["Indexador de Memoria", "Minteador de Maestría", "Generador de Reportes"]}
        ],
        "image": "extracted_media/image1.png",
        "punchline_en": "Collaborative agent consensus ensures 99.4% factual accuracy.",
        "punchline_es": "El consenso entre agentes asegura un 99.4% de precisión factual."
    },
    {
        "id": 6,
        "num": "05",
        "category_en": "3-TIER MEMORY",
        "category_es": "MEMORIA EN 3 CAPAS",
        "title_en": "3-Tier Memory Architecture: True Personalization",
        "title_es": "Arquitectura de Memoria en 3 Capas: Personalización Total",
        "lead_en": "Our proprietary memory stack retains working, episodic, and semantic mastery data across years.",
        "lead_es": "Nuestra pila de memoria propietaria retiene datos de trabajo, episódicos y de dominio semántico por años.",
        "layers_en": [
            {"type": "Working Memory (Fast Cache)", "tech": "Redis / Context Window", "desc": "Maintains active problem step-by-step state, current misconceptions, and real-time student tone."},
            {"type": "Episodic Memory (Timeline)", "tech": "Vector Embeddings / Milvus", "desc": "Remembers past study sessions, recurring struggle areas, emotional fatigue indicators, and breakthroughs."},
            {"type": "Semantic Knowledge Memory", "tech": "Neo4j Knowledge Graph", "desc": "Maps student progress against the global concept ontology, identifying prerequisites and leap points."}
        ],
        "layers_es": [
            {"type": "Memoria de Trabajo (Caché Rápida)", "tech": "Redis / Context Window", "desc": "Mantiene el estado paso a paso del ejercicio activo, dudas actuales y tono emocional en vivo."},
            {"type": "Memoria Episódica (Línea de Tiempo)", "tech": "Vector Embeddings / Milvus", "desc": "Recuerda sesiones pasadas, bloqueos recurrentes, momentos de fatiga y avances clave."},
            {"type": "Memoria Semántica de Conocimiento", "tech": "Grafo Neo4j", "desc": "Mapea el progreso del alumno sobre el grafo curricular identificando prerrequisitos y vacíos."}
        ],
        "image": "extracted_media/image4.png",
        "punchline_en": "A tutor that truly knows the student better with every session.",
        "punchline_es": "Un tutor que conoce a profundidad al alumno y evoluciona con cada sesión."
    },
    {
        "id": 7,
        "num": "06",
        "category_en": "KNOWLEDGE GRAPHS",
        "category_es": "GRAFOS DE CONOCIMIENTO",
        "title_en": "Ontological Knowledge Graph Grounding",
        "title_es": "Anclaje Curricular en Grafos de Conocimiento",
        "lead_en": "Curriculum concepts are represented as structured mathematical graphs with dependency trees.",
        "lead_es": "Los conceptos curriculares se representan como grafos estructurados con árboles de dependencias.",
        "cards_en": [
            {"title": "Dependency Tracing", "desc": "If a student fails Calculus derivatives, the graph traces back to identify gaps in Trigonometry or Algebra."},
            {"title": "Zero-Hallucination Retrieval", "desc": "Agents only generate explanations based on verified nodes and relationships in the knowledge graph."},
            {"title": "Dynamic Remediation Paths", "desc": "Generates the shortest personalized path to master complex topics without skipping foundations."},
            {"title": "Institutional Standard Alignment", "desc": "Maps directly to IB, AP, ABET, MCAT, and corporate certification syllabi."}
        ],
        "cards_es": [
            {"title": "Rastreo de Dependencias", "desc": "Si el alumno falla en Derivadas, el grafo identifica vacíos previos en Álgebra o Trigonometría."},
            {"title": "Cero Alucinaciones", "desc": "Los agentes solo explican basándose en nodos y relaciones verificadas del grafo ontológico."},
            {"title": "Rutas de Nivelación Dinámicas", "desc": "Traza el camino más corto y eficiente para dominar temas complejos sin saltarse bases."},
            {"title": "Alineación Curricular Global", "desc": "Mapeo directo a estándares IB, AP, ABET, MCAT y certificaciones corporativas."}
        ],
        "image": "extracted_media/image5.png",
        "punchline_en": "Structured curriculum graphs eliminate learning blindspots.",
        "punchline_es": "Los grafos curriculares estructurados eliminan los puntos ciegos del aprendizaje."
    },
    {
        "id": 8,
        "num": "07",
        "category_en": "VERIFIABLE MASTERY",
        "category_es": "PRUEBA DE DOMINIO",
        "title_en": "Proof-of-Mastery: Verifiable Learning Credentials",
        "title_es": "Prueba de Maestría: Credenciales de Aprendizaje Verificables",
        "lead_en": "Replacing easily cheated online quizzes with cryptographic, auditable proofs of step-by-step reasoning.",
        "lead_es": "Sustituyendo los exámenes tradicionales por pruebas criptográficas auditables de razonamiento paso a paso.",
        "features_en": [
            "Every step of student reasoning and active problem resolution is logged and signed",
            "Evaluates cognitive problem-solving path rather than simple multiple-choice selection",
            "Generates tamper-proof cryptographic skill credentials verifiable by universities and employers",
            "Eliminates AI copy-pasting fraud through live multi-turn reasoning validation"
        ],
        "features_es": [
            "Cada paso de deducción y resolución activa del estudiante queda registrado y firmado",
            "Evalúa la ruta cognitiva de resolución en lugar de una simple opción múltiple",
            "Genera credenciales de habilidad inmutables verificables por universidades y empresas",
            "Erradica el fraude de copiar y pegar respuestas de IA mediante validación interactiva"
        ],
        "diagram_en": [
            {"label": "Interactive Reasoning", "detail": "Live multi-turn problem defense"},
            {"label": "Cryptographic Hash", "detail": "Immutable audit trail of competence"},
            {"label": "Employer Ready", "detail": "Verifiable skill certification"}
        ],
        "diagram_es": [
            {"label": "Razonamiento Interactivo", "detail": "Defensa de problemas en vivo"},
            {"label": "Hash Criptográfico", "detail": "Rastro inmutable de competencia"},
            {"label": "Listo para Empresas", "detail": "Certificación verificable de habilidades"}
        ],
        "image": "extracted_media/image6.png",
        "punchline_en": "The end of fake certificates. The beginning of true verifiable competence.",
        "punchline_es": "El fin de los certificados vacíos. El inicio de la competencia real verificable."
    },
    {
        "id": 9,
        "num": "08",
        "category_en": "TECHNICAL STACK",
        "category_es": "STACK TECNOLÓGICO",
        "title_en": "Enterprise DeepTech Infrastructure",
        "title_es": "Infraestructura Tecnológica Empresarial",
        "lead_en": "High-throughput, low-latency microservices built for millions of concurrent active tutoring sessions.",
        "lead_es": "Microservicios de alto rendimiento y baja latencia diseñados para millones de sesiones simultáneas.",
        "stack_en": [
            {"layer": "Agent Orchestration Core", "desc": "LangGraph & Rust state machine with sub-120ms token-to-decision routing."},
            {"layer": "Hybrid LLM Inference", "desc": "Multi-tier LLM routing: Claude 3.5 Sonnet / GPT-4o for complex reasoning + distilled local SLMs for latency."},
            {"layer": "Graph & Vector Database", "desc": "Neo4j enterprise cluster coupled with Milvus distributed vector search for instant semantic recall."},
            {"layer": "Real-Time Streaming Voice", "desc": "WebRTC sub-250ms conversational audio synthesis for natural spoken Socratic tutoring."}
        ],
        "stack_es": [
            {"layer": "Núcleo de Orquestación", "desc": "Máquina de estados en LangGraph y Rust con enrutamiento de decisiones < 120ms."},
            {"layer": "Inferencia Híbrida de LLMs", "desc": "Ruteo inteligente: Claude 3.5 / GPT-4o para deducción compleja + SLMs locales para baja latencia."},
            {"layer": "Base de Datos de Grafos y Vectores", "desc": "Cluster Neo4j junto a Milvus distribuido para recuperación semántica instantánea."},
            {"layer": "Voz Conversacional en Tiempo Real", "desc": "Síntesis de audio WebRTC < 250ms para tutoría socrática hablada natural."}
        ],
        "image": "extracted_media/image7.png",
        "punchline_en": "Built for institutional scale, privacy, and low-latency performance.",
        "punchline_es": "Diseñado para escala institucional, privacidad y máxima velocidad."
    },
    {
        "id": 10,
        "num": "09",
        "category_en": "MARKET SIZE",
        "category_es": "TAMAÑO DE MERCADO",
        "title_en": "$180B Market Opportunity across 3 Tiers",
        "title_es": "Oportunidad de Mercado de $180B en 3 Niveles",
        "lead_en": "Addressing high-margin segments: Higher Ed, K-12 STEM tutoring, and Enterprise Upskilling.",
        "lead_es": "Abordando segmentos de alto margen: Educación Superior, STEM K-12 y Reentrenamiento Corporativo.",
        "segments_en": [
            {"title": "Higher Education & STEM", "target": "TAM $42B", "desc": "Universities deploying 24/7 personalized AI teaching assistants to reduce student dropout rates by 35%."},
            {"title": "Corporate Workforce Upskilling", "target": "TAM $78B", "desc": "Enterprise retraining in software engineering, compliance, medical protocols, and technical sales."},
            {"title": "Consumer K-12 & Test Prep", "target": "TAM $60B", "desc": "Families replacing expensive $80/hr human tutors with an always-available personal AI mentor."}
        ],
        "segments_es": [
            {"title": "Educación Superior y STEM", "target": "TAM $42B", "desc": "Universidades integrando asistentes 24/7 para reducir la deserción estudiantil en un 35%."},
            {"title": "Reentrenamiento Corporativo", "target": "TAM $78B", "desc": "Empresas capacitando en ingeniería, cumplimiento normativo, protocolos médicos y ventas técnicas."},
            {"title": "Consumo K-12 y Exámenes", "target": "TAM $60B", "desc": "Familias sustituyendo tutores privados de $80 USD/h por un mentor de IA personalizado 24/7."}
        ],
        "image": "extracted_media/image8.png",
        "punchline_en": "Capturing value across consumer, academic, and enterprise segments.",
        "punchline_es": "Capturando valor en los sectores B2C, académico y corporativo B2B."
    },
    {
        "id": 11,
        "num": "10",
        "category_en": "BUSINESS MODEL",
        "category_es": "MODELO DE NEGOCIO",
        "title_en": "Monetization: High-Margin Recurring Revenue",
        "title_es": "Monetización: Ingresos Recurrentes de Alto Margen",
        "lead_en": "Diversified revenue streams with 82% gross margins and high institutional retention.",
        "lead_es": "Flujos de ingresos diversificados con 82% de margen bruto y alta retención institucional.",
        "streams_en": [
            {"type": "B2C Student Subscription", "tier": "$19–$39 / month", "desc": "Unlimited Socratic tutoring, step-by-step reasoning support, and exam preparation packages."},
            {"type": "B2B Higher Ed SaaS", "tier": "$5–$12 / student / yr", "desc": "Campus-wide license with LMS integration (Canvas, Blackboard), analytics dashboards, and syllabi alignment."},
            {"type": "Enterprise Training API", "tier": "Usage + $2.5k/mo fee", "desc": "Custom knowledge graph ingestion for proprietary corporate training and audited employee certification."}
        ],
        "streams_es": [
            {"type": "Suscripción B2C Estudiantes", "tier": "$19–$39 USD / mes", "desc": "Tutoría socrática ilimitada, resolución paso a paso y preparación intensiva para exámenes."},
            {"type": "SaaS B2B Universidades", "tier": "$5–$12 USD / alumno / año", "desc": "Licencia institucional con integración a Canvas/Blackboard y paneles de analítica académica."},
            {"type": "API de Capacitación Corporativa", "tier": "Uso + $2,500 USD / mes", "desc": "Carga de grafos de conocimiento internos para certificar empleados con métricas auditables."}
        ],
        "moat_en": "Data Flywheel: Every tutoring session enriches our proprietary reasoning graphs and misconception models.",
        "moat_es": "Efecto de Red de Datos: Cada sesión enriquece nuestros grafos propietarios de razonamiento y modelos de errores comunes.",
        "punchline_en": "SaaS unit economics with negative net revenue churn.",
        "punchline_es": "Economía unitaria SaaS con retención neta de ingresos superior al 120%."
    },
    {
        "id": 12,
        "num": "11",
        "category_en": "TRACTION & METRICS",
        "category_es": "TRACCIÓN Y MÉTRICAS",
        "title_en": "Pilot Validation & Early Growth Metrics",
        "title_es": "Validación Piloto y Métricas de Crecimiento",
        "lead_en": "Validated with over 15,000 active students across 4 university STEM departments.",
        "lead_es": "Validado con más de 15,000 estudiantes activos en 4 facultades universitarias de STEM.",
        "cards_en": [
            {"title": "15,000+ Active Students", "desc": "Over 240,000 hours of Socratic tutoring delivered with 4.85/5 student satisfaction score."},
            {"title": "+28% Exam Score Improvement", "desc": "Controlled study in Calculus and Physics showed a 28% improvement vs. passive video/lecture cohorts."},
            {"title": "84% Monthly Retention", "desc": "Industry-leading student engagement driven by persistent memory and conversational empathy."},
            {"title": "4 University Pilot MOUs", "desc": "Expanding institutional rollouts across Latin America and North American engineering schools."}
        ],
        "cards_es": [
            {"title": "15,000+ Estudiantes Activos", "desc": "Más de 240,000 horas de tutoría socrática completadas con calificación de 4.85/5."},
            {"title": "+28% Mejora en Calificaciones", "desc": "Estudio de control en Cálculo y Física demostró un 28% de mejora frente a métodos tradicionales."},
            {"title": "84% Retención Mensual", "desc": "Compromiso de alumnos líder en la industria impulsado por la memoria persistente del tutor."},
            {"title": "4 Cartas de Intención Universitarias", "desc": "Despliegues institucionales en marcha en facultades de ingeniería de Latam y Norteamérica."}
        ],
        "image": "extracted_media/image8.png",
        "punchline_en": "Proven academic outcomes backed by strong retention economics.",
        "punchline_es": "Resultados académicos comprobados respaldados por alta retención."
    },
    {
        "id": 13,
        "num": "12",
        "category_en": "ROADMAP",
        "category_es": "HOJA DE RUTA",
        "title_en": "Strategic Roadmap: 18-Month Horizon",
        "title_es": "Hoja de Ruta Estratégica: Horizonte 18 Meses",
        "lead_en": "Disciplined execution scaling from STEM beachhead to multi-disciplinary enterprise deployments.",
        "lead_es": "Ejecución disciplinada escalando desde STEM hacia despliegues corporativos multidisciplinarios.",
        "phases_en": [
            {"phase": "Q1–Q2 · CORE SCALE", "focus": "STEM & Higher Ed", "milestones": ["Expand to 50k active students in Calculus, Physics, and CS", "Launch mobile app with real-time streaming voice mode", "Canvas and Blackboard LMS native one-click integrations"]},
            {"phase": "Q3–Q4 · B2B ENTERPRISE", "focus": "Corporate Upskilling", "milestones": ["Ingest enterprise compliance and software engineering ontologies", "Deploy on-premise dedicated LLM inference for banking clients", "Launch automated Proof-of-Mastery credential verification"]},
            {"phase": "YEAR 2 · GLOBAL EXPANSION", "focus": "Multi-Language & K-12", "milestones": ["Full multilingual expansion across Spanish, English, and Portuguese", "Series A round of $8M to scale global university sales force", "SDK release for 3rd party educational content publishers"]}
        ],
        "phases_es": [
            {"phase": "Q1–Q2 · ESCALA CENTRAL", "focus": "STEM y Educación Superior", "milestones": ["Alcanzar 50k estudiantes activos en Cálculo, Física y Computación", "Lanzamiento de app móvil con modo de voz conversacional", "Integración nativa con LMS Canvas y Blackboard"]},
            {"phase": "Q3–Q4 · EXPANSIÓN B2B", "focus": "Capacitación Corporativa", "milestones": ["Ingesta de ontologías de ingeniería de software y banca", "Inferencia de LLMs locales dedicados para clientes corporativos", "Despliegue de credenciales verificables de dominio"]},
            {"phase": "AÑO 2 · EXPANSIÓN GLOBAL", "focus": "Multilingüe y K-12", "milestones": ["Expansión total en Español, Inglés y Portugués", "Ronda Serie A de $8M para acelerar ventas institucionales globales", "Lanzamiento de SDK para creadores de contenido educativo"]}
        ],
        "punchline_en": "From foundational beachhead to the global standard in AI learning.",
        "punchline_es": "Del nicho inicial al estándar global en aprendizaje con IA."
    },
    {
        "id": 14,
        "num": "13",
        "category_en": "INVESTMENT ASK",
        "category_es": "RONDA DE INVERSIÓN",
        "title_en": "Seed Investment Ask: $1.2M USD",
        "title_es": "Ronda Semilla de Inversión: $1.2M USD",
        "lead_en": "Funding 18 months of runway to reach 100k active students and $2.4M ARR.",
        "lead_es": "Financiando 18 meses de operación para alcanzar 100k estudiantes y $2.4M USD de ARR.",
        "cards_en": [
            {"title": "45% · AI Research & Engineering", "desc": "Scaling multi-agent orchestration, knowledge graph auto-generation, and ultra-low-latency voice synthesis."},
            {"title": "30% · Institutional B2B Sales", "desc": "Building dedicated sales team targeting universities and enterprise corporate training departments."},
            {"title": "15% · Compute & Cloud Infrastructure", "desc": "Dedicated GPU clusters, vector database infrastructure, and SOC2 / GDPR compliance audits."},
            {"title": "10% · Operations & Working Capital", "desc": "Legal IP protection, international business development, and operational buffer."}
        ],
        "cards_es": [
            {"title": "45% · Investigación e Ingeniería de IA", "desc": "Escalar la orquestación de agentes, auto-generación de grafos y voz conversacional ultrarrápida."},
            {"title": "30% · Ventas B2B Institucionales", "desc": "Equipo comercial dedicado a cerrar universidades y áreas de capacitación empresarial."},
            {"title": "15% · Cómputo e Infraestructura Cloud", "desc": "Clusters de GPUs dedicados, bases de datos vectoriales y certificaciones SOC2 / GDPR."},
            {"title": "10% · Operaciones y Legal", "desc": "Protección de propiedad intelectual internacional y capital de trabajo."}
        ],
        "image": "extracted_media/image6.png",
        "punchline_en": "Targeting 10x revenue growth and market leadership in intelligent tutoring.",
        "punchline_es": "Meta: Multiplicar por 10x los ingresos y liderar la tutoría inteligente."
    },
    {
        "id": 15,
        "num": "14",
        "category_en": "EXECUTIVE CLOSING",
        "category_es": "CIERRE EJECUTIVO",
        "title_en": "Building the Future of Human Intellect",
        "title_es": "Construyendo el Futuro de la Inteligencia Humana",
        "quote_en": "“We are not building an AI that does your thinking for you. We are building the AI that empowers you to think deeper.”",
        "quote_es": "“No estamos construyendo una IA que piense por ti. Estamos creando la IA que te enseña a pensar más profundo.”",
        "pillars_en": ["12 Collaborative Agents", "3-Tier Cognitive Memory", "Knowledge Graph Grounding", "Proof-of-Mastery Credentials", "3i BAIRD LAB DeepTech"],
        "pillars_es": ["12 Agentes Colaborativos", "Memoria Cognitiva en 3 Capas", "Anclaje en Grafos Curriculares", "Pruebas de Dominio Verificables", "DeepTech 3i BAIRD LAB"],
        "image": "extracted_media/image1.png",
        "punchline_en": "Join us in revolutionizing global education with 3i BAIRD LAB.",
        "punchline_es": "Únete a transformar la educación global con 3i BAIRD LAB."
    }
]

# -------------------------------------------------------------
# DECK 2: SMART FAST-FOOD FRANCHISE (15 Curated Executive Slides)
# -------------------------------------------------------------
deck_fastfood_15 = [
    {
        "id": 1,
        "tag_en": "FOODTECH QSR · 3i BAIRD LAB",
        "tag_es": "FOODTECH QSR · 3i BAIRD LAB",
        "title_en": "Smart Fast-Food Franchise",
        "title_es": "Franquicia Fast-Food Inteligente",
        "subtitle_en": "Pioneering the automated Smart QSR model in Cúcuta: Express pizza baked in 2.5 minutes, app-first pre-ordering, zero peak-hour queues, and sub-23% food cost.",
        "subtitle_es": "Pioneros en el modelo QSR inteligente en Cúcuta: Pizza express horneada en 2.5 minutos, app de pre-orden, cero filas en hora pico y costo de insumos < 23%.",
        "flow_en": ["App Pre-Order", "Conveyor Oven Baking (2.5m)", "Digital Locker Pickup", "Dynamic Pricing AI", "Rapid Franchise Scale"],
        "flow_es": ["Pre-Orden en App", "Horno de Banda (2.5 min)", "Retiro en Lockers", "Precios Dinámicos con IA", "Escala Rápida de Franquicias"],
        "badge_en": "Pilot Pitch · Cúcuta · 15 Slides",
        "badge_es": "Pitch Piloto · Cúcuta · 15 Slides",
        "category": "hero",
        "image": "extracted_media_fastfood/image1.png"
    },
    {
        "id": 2,
        "num": "01",
        "category_en": "MARKET PAIN",
        "category_es": "EL PROBLEMA DE MERCADO",
        "title_en": "The 3 Inefficiencies Killing Fast-Food Margins",
        "title_es": "Las 3 Ineficiencias que Destruyen los Márgenes",
        "lead_en": "Traditional quick-serve restaurants suffer from slow prep times, lost sales in peak hours, and massive food waste.",
        "lead_es": "La comida rápida tradicional sufre por tiempos lentos, ventas perdidas en horas pico y desperdicio de insumos.",
        "pillars_en": [
            {"title": "15+ Minute Wait Times", "desc": "Traditional deck ovens and manual prep create painful customer friction and abandoned orders during rush hours."},
            {"title": "Lost Peak Demand", "desc": "Restaurants lose up to 40% of walk-in revenue because counter queues exceed customer patience."},
            {"title": "High Labor & Food Cost", "desc": "Manual portioning and uncalibrated baking lead to 32%+ COGS and unpredictable quality."}
        ],
        "pillars_es": [
            {"title": "15+ Minutos de Espera", "desc": "Hornos tradicionales y preparación manual generan cuellos de botella y pedidos abandonados en hora pico."},
            {"title": "Pérdida de Demanda Pico", "desc": "Los locales pierden hasta un 40% de ventas porque las filas superan la paciencia del cliente."},
            {"title": "Altos Costos de Insumos y Personal", "desc": "Porcionado manual y desperdicio elevan los costos de insumos por encima del 32% con calidad irregular."}
        ],
        "image": "extracted_media_fastfood/image2.png",
        "punchline_en": "The fast food industry is neither fast nor predictable. We fix both.",
        "punchline_es": "La comida rápida tradicional ni es rápida ni es predecible. Nosotros resolvemos ambas."
    },
    {
        "id": 3,
        "num": "02",
        "category_en": "THE PILOT SOLUTION",
        "category_es": "LA SOLUCIÓN PILOTO",
        "title_en": "The Smart QSR Operating Engine (Cúcuta Pilot)",
        "title_es": "El Modelo Operativo Smart QSR (Piloto Cúcuta)",
        "lead_en": "Standardized industrial conveyor ovens combined with app-first pre-ordering to serve artisan pizza in 150 seconds.",
        "lead_es": "Hornos industriales de banda continua combinados con pre-orden por app para servir pizza artesanal en 150 segundos.",
        "cards_en": [
            {"title": "High-Speed Continuous Conveyor Oven", "desc": "Bakes a perfect artisan personal pizza in exactly 2.5 minutes at 315°C with zero human error."},
            {"title": "Pre-Order & Smart Pickup Lockers", "desc": "Customers order 5 minutes ahead on the app; fresh hot pizza is ready in heated lockers upon arrival."},
            {"title": "Ultra-Lean Kitchen Workflow", "desc": "Requires only 2 cross-trained operators per shift, slashing labor overhead by 50%."},
            {"title": "Strict Ingredient Portioning", "desc": "Pre-portioned dough and toppings guarantee exact food cost of 21.8% per unit."}
        ],
        "cards_es": [
            {"title": "Horno Continuo de Alta Velocidad", "desc": "Hornea una pizza personal perfecta en 2.5 minutos a 315°C con cero error humano."},
            {"title": "Pre-Orden y Lockers Térmicos", "desc": "El cliente pide 5 min antes en la app; la pizza recién salida espera caliente en lockers digitales."},
            {"title": "Cocina Ultra-Eficiente", "desc": "Solo requiere 2 operadores polivalentes por turno, reduciendo costos laborales en 50%."},
            {"title": "Porcionado Estandarizado", "desc": "Masas y toppings pre-pesados garantizan un costo exacto de insumos del 21.8% por unidad."}
        ],
        "image": "extracted_media_fastfood/image3.png",
        "punchline_en": "From 15-minute queues to a 150-second precision operation.",
        "punchline_es": "De 15 minutos de fila a una operación de precisión de 150 segundos."
    },
    {
        "id": 4,
        "num": "03",
        "category_en": "BENCHMARK COMPARISON",
        "category_es": "COMPARATIVA DE MERCADO",
        "title_en": "Direct Comparison: Traditional Pizzeria vs. Smart QSR",
        "title_es": "Comparativa Directa: Pizzería Tradicional vs. Smart QSR",
        "lead_en": "Superior operational unit economics across speed, labor efficiency, food cost, and floor space.",
        "lead_es": "Economía unitaria superior en velocidad, eficiencia de personal, costo de insumos y espacio.",
        "comparison": [
            {"aspect_en": "Baking & Prep Time", "aspect_es": "Tiempo de Horneado", "bot_en": "12–18 minutes", "bot_es": "12 a 18 minutos", "tutor_en": "2.5 minutes continuous", "tutor_es": "2.5 minutos continuos"},
            {"aspect_en": "Kitchen Staff per Shift", "aspect_es": "Personal por Turno", "bot_en": "5–7 workers", "bot_es": "5 a 7 empleados", "tutor_en": "2 operators", "tutor_es": "2 operadores"},
            {"aspect_en": "Food Cost % (COGS)", "aspect_es": "Costo de Insumos (COGS)", "bot_en": "32% – 38%", "bot_es": "32% a 38%", "tutor_en": "21.8% (Target < 23%)", "tutor_es": "21.8% (Meta < 23%)"},
            {"aspect_en": "Peak Hourly Capacity", "aspect_es": "Capacidad Pico / Hora", "bot_en": "35–45 pizzas", "bot_es": "35 a 45 pizzas", "tutor_en": "120+ pizzas / hour", "tutor_es": "120+ pizzas / hora"}
        ],
        "image": "extracted_media_fastfood/image2.png",
        "punchline_en": "3x throughput with half the staff in a 40m² compact footprint.",
        "punchline_es": "3x capacidad de despacho con la mitad del personal en solo 40m²."
    },
    {
        "id": 5,
        "num": "04",
        "category_en": "STRATEGIC PILOT CITY",
        "category_es": "CIUDAD PILOTO ESTRATÉGICA",
        "title_en": "Why Cúcuta as our Pilot Beachhead?",
        "title_es": "¿Por qué Cúcuta como Ciudad Piloto?",
        "lead_en": "High urban population density, vibrant commercial corridors, low initial OPEX, and unserved demand for fast quality food.",
        "lead_es": "Alta densidad urbana, corredores comerciales activos, bajo costo inicial y demanda insatisfecha por comida rápida de calidad.",
        "cards_en": [
            {"title": "High Commercial Foot Traffic", "desc": "Prime spots in Caobos, Ventura Plaza corridor, and university avenues guarantee continuous customer flow."},
            {"title": "Low Real Estate & Labor OPEX", "desc": "35% lower square meter commercial rent and lower setup costs compared to Bogotá or Medellín."},
            {"title": "Appetite for Fast-Casual Innovation", "desc": "Young demographic embracing mobile delivery apps with strong willingness to try tech-driven dining."},
            {"title": "Perfect Regional Testbed", "desc": "Validating unit economics in Cúcuta de-risks rapid franchise rollout to Bucaramanga, Pereira, and Cali."}
        ],
        "cards_es": [
            {"title": "Alto Tráfico Comercial", "desc": "Ubicaciones estratégicas en Caobos, corredor Ventura Plaza y zonas universitarias garantizan flujo continuo."},
            {"title": "Bajo Costo Inmobiliario y Laboral", "desc": "Arrendamientos comerciales 35% más económicos frente a Bogotá o Medellín, reduciendo el riesgo inicial."},
            {"title": "Alta Adopción de Innovación", "desc": "Población joven que usa intensamente apps móviles y busca opciones gastronómicas rápidas y modernas."},
            {"title": "Puntal de Validación Regional", "desc": "Validar la economía en Cúcuta facilita la expansión inmediata a Bucaramanga, Pereira y Cali."}
        ],
        "image": "extracted_media_fastfood/image4.png",
        "punchline_en": "Low setup CAPEX, high margins, and rapid operational validation.",
        "punchline_es": "Bajo CAPEX de instalación, altos márgenes y validación operativa inmediata."
    },
    {
        "id": 6,
        "num": "05",
        "category_en": "KITCHEN INFRASTRUCTURE",
        "category_es": "INFRAESTRUCTURA DE COCINA",
        "title_en": "Automated High-Throughput Equipment",
        "title_es": "Equipamiento Automatizado de Alto Rendimiento",
        "lead_en": "Industrial-grade hardware designed for maximum reliability, low energy consumption, and high speed.",
        "lead_es": "Maquinaria industrial diseñada para máxima fiabilidad, bajo consumo eléctrico y alta velocidad.",
        "cards_en": [
            {"title": "Continuous Impingement Conveyor Oven", "desc": "Precision air-jet heating cooks dough evenly from both sides in 150 seconds with programmable temperature profiles."},
            {"title": "Automated Dough Press & Sheeter", "desc": "Forms uniform 10-inch pizza crusts in 5 seconds without skilled dough-tossers."},
            {"title": "Refrigerated Prep Table with Scale Well", "desc": "Sensor-integrated topping wells track ingredient weights and enforce exact recipe portioning in real time."},
            {"title": "Smart Heated Pickup Locker Matrix", "desc": "Maintains orders at 65°C with customer QR-code access for 100% contactless pickup."}
        ],
        "cards_es": [
            {"title": "Horno Continuo de Impacto de Aire", "desc": "Chorros de aire caliente cocinan la masa uniformemente en 150 segundos con control digital de temperatura."},
            {"title": "Prensa y Formadora Automática de Masa", "desc": "Estira bases perfectas de 25cm en 5 segundos sin necesidad de pizzeros especializados."},
            {"title": "Mesa Refrigerada con Básculas Integradas", "desc": "Pozuelos con sensores de peso que controlan la cantidad exacta de queso y toppings por pizza."},
            {"title": "Matriz de Lockers Térmicos Inteligentes", "desc": "Mantiene pedidos a 65°C con apertura mediante código QR para retiro 100% sin contacto."}
        ],
        "image": "extracted_media_fastfood/image5.png",
        "punchline_en": "Engineered for 120 pizzas per hour with only 2 kitchen staff.",
        "punchline_es": "Diseñado para despachar 120 pizzas por hora con solo 2 personas."
    },
    {
        "id": 7,
        "num": "06",
        "category_en": "DIGITAL ECOSYSTEM",
        "category_es": "ECOSISTEMA DIGITAL",
        "title_en": "App-First Ordering & Dynamic AI Pricing",
        "title_es": "App de Pre-Orden y Precios Dinámicos con IA",
        "lead_en": "A proprietary customer app that predicts order arrival times and balances kitchen demand with dynamic promotions.",
        "lead_es": "Una app propietaria que predice la hora de llegada del cliente y equilibra la demanda con promociones dinámicas.",
        "features_en": [
            "Customer orders and pays in 3 taps on mobile; geolocation alerts kitchen when customer is 3 minutes away",
            "Zero queueing: pizza comes straight out of the oven into the customer's hands or heated locker",
            "Dynamic AI pricing offers off-peak discounts (2:00 PM – 5:00 PM) to maximize oven utilization all day",
            "Gamified loyalty program with personalized combo recommendations based on ordering habits"
        ],
        "features_es": [
            "El cliente pide y paga en 3 toques; la geolocalización avisa a cocina cuando el cliente está a 3 minutos",
            "Cero filas: la pizza sale del horno directo a las manos del cliente o a su locker térmico",
            "Precios dinámicos con IA ofrecen descuentos en horas valle (2:00 PM a 5:00 PM) para mantener hornos llenos",
            "Programa de lealtad gamificado con combos personalizados según el historial de compra"
        ],
        "diagram_en": [
            {"label": "1. Mobile Order", "detail": "Customer customizes pizza in app"},
            {"label": "2. Geo-Trigger", "detail": "Oven starts when customer approaches"},
            {"label": "3. 150s Bake", "detail": "Fresh hot pizza at locker pickup"}
        ],
        "diagram_es": [
            {"label": "1. Pedido en App", "detail": "El cliente personaliza su pizza"},
            {"label": "2. Disparo por Geo", "detail": "El horno se activa al acercarse"},
            {"label": "3. Horneado 150s", "detail": "Pizza caliente lista en locker"}
        ],
        "image": "extracted_media_fastfood/image6.png",
        "punchline_en": "Turning hungry pedestrians into served customers in under 3 minutes.",
        "punchline_es": "Convirtiendo transeúntes hambrientos en clientes servidos en menos de 3 minutos."
    },
    {
        "id": 8,
        "num": "07",
        "category_en": "MENU ENGINEERING",
        "category_es": "INGENIERÍA DE MENÚ",
        "title_en": "Optimized Menu: High Margin, Fast Prep",
        "title_es": "Menú Optimizado: Alto Margen y Rápida Preparación",
        "lead_en": "Curated 8-item menu maximizing ingredient overlap to achieve 21.8% food cost and zero food waste.",
        "lead_es": "Menú curado de 8 referencias maximizando insumos compartidos para lograr 21.8% de costo y cero desperdicio.",
        "cards_en": [
            {"title": "Artisan Personal Pizzas (10-inch)", "desc": "4 core crowd-pleasers (Pepperoni Crispy, 4-Cheese BBQ, Hawaiian Supreme, Truffle Mushroom). Average retail: $4.80 USD."},
            {"title": "Stuffed Folded Calzones & Pockets", "desc": "Uses identical dough and cheeses; prep time 45 seconds, baked in 2.5 minutes. High margin snack driver."},
            {"title": "Gourmet Garlic & Cheese Bites", "desc": "Prepared from leftover dough trimmings with garlic-herb butter. 88% gross margin side item."},
            {"title": "Combo Beverages & Gelato", "desc": "High-margin branded sodas, craft sodas, and artisan gelato pots boosting average ticket by 35%."}
        ],
        "cards_es": [
            {"title": "Pizzas Personales Artesanales (25cm)", "desc": "4 favoritas del público (Pepperoni Crispy, 4 Quesos BBQ, Hawaiana Suprema, Champiñón Trufado). Precio: $18.000 COP."},
            {"title": "Calzones y Pockets Rellenos", "desc": "Mismos insumos y masa; armado en 45 segundos y horneado en 2.5 min. Excelente producto de impulso."},
            {"title": "Bocaditos de Ajo y Queso", "desc": "Aprovechan sobrantes de masa con mantequilla de hierbas. Margen bruto del 88%."},
            {"title": "Bebidas en Combo y Gelato", "desc": "Gaseosas artesanales, tés y helados que elevan el ticket promedio en un 35%."}
        ],
        "image": "extracted_media_fastfood/image7.png",
        "punchline_en": "Minimal inventory complexity, maximum kitchen speed and profitability.",
        "punchline_es": "Mínima complejidad de inventario, máxima velocidad y rentabilidad."
    },
    {
        "id": 9,
        "num": "08",
        "category_en": "UNIT ECONOMICS",
        "category_es": "ECONOMÍA UNITARIA",
        "title_en": "Store Unit Economics (Cúcuta Pilot Model)",
        "title_es": "Economía Unitaria por Local (Modelo Piloto Cúcuta)",
        "lead_en": "Robust financial model delivering 34% net EBITDA margin with a 9-month capital payback period.",
        "lead_es": "Modelo financiero sólido que entrega 34% de margen EBITDA neto con retorno de inversión en 9 meses.",
        "streams_en": [
            {"type": "Monthly Gross Revenue", "tier": "300 pizzas/day avg", "desc": "$43,200 USD / month ($172M COP) across dine-in, takeaway lockers, and delivery apps."},
            {"type": "Cost of Goods (COGS)", "tier": "21.8% Food Cost", "desc": "$9,420 USD / month covering pre-portioned dough, artisan cheeses, meats, sauces, and eco-packaging."},
            {"type": "Operating Expenses (OPEX)", "tier": "Rent, Staff & Energy", "desc": "$19,100 USD / month (Rent $2.2k, Staff of 4 $3.8k, Energy $1.6k, Royalty 5% $2.1k, Marketing $1.2k)."}
        ],
        "streams_es": [
            {"type": "Ventas Brutas Mensuales", "tier": "300 pizzas/día prom.", "desc": "$43,200 USD / mes ($172M COP) sumando consumo en barra, lockers y delivery."},
            {"type": "Costo de Insumos (COGS)", "tier": "21.8% de Insumos", "desc": "$9,420 USD / mes cubriendo masa, quesos, carnes, salsas y empaques ecológicos."},
            {"type": "Gastos Operativos (OPEX)", "tier": "Arriendo, Nómina y Luz", "desc": "$19,100 USD / mes (Arriendo $2.2k, 4 empleados $3.8k, Servicios $1.6k, Regalía 5% $2.1k, Mkt $1.2k)."}
        ],
        "moat_en": "Net EBITDA Profit: $14,680 USD / month (34.0% margin). Annual Store EBITDA: $176,160 USD.",
        "moat_es": "Utilidad EBITDA Neta: $14,680 USD / mes (Margen del 34.0%). EBITDA Anual por Local: $176,160 USD.",
        "punchline_en": "Store CAPEX of $68k USD recovered in less than 9 months.",
        "punchline_es": "CAPEX de $68k USD recuperado en menos de 9 meses de operación."
    },
    {
        "id": 10,
        "num": "09",
        "category_en": "PILOT STORE SETUP",
        "category_es": "CAPEX DEL PILOTO",
        "title_en": "Initial Pilot Store CAPEX Breakdown ($68,000 USD)",
        "title_es": "Desglose de CAPEX del Local Piloto ($68,000 USD)",
        "lead_en": "Detailed capital allocation to build, equip, and launch the flagship Smart QSR store in Cúcuta.",
        "lead_es": "Asignación detallada de capital para construir, equipar y lanzar el local insignia en Cúcuta.",
        "cards_en": [
            {"title": "Conveyor Oven & Heavy Equipment ($26,500)", "desc": "Imported industrial electric conveyor oven, automated dough press, reach-in cooler, and ice machine."},
            {"title": "Store Fit-Out & Architectural Design ($18,500)", "desc": "Modern cyberpunk industrial fit-out, illuminated signage, kitchen stainless steel counters, and ventilation hoods."},
            {"title": "Smart Tech & Heated Lockers ($11,000)", "desc": "Digital heated locker module (12 slots), customer POS touchscreens, IoT scales, and high-speed local network."},
            {"title": "Initial Inventory & Working Capital ($12,000)", "desc": "First month food stock, packaging, local permits, launch marketing blitz, and emergency cash reserve."}
        ],
        "cards_es": [
            {"title": "Horno de Banda y Maquinaria ($26,500 USD)", "desc": "Horno continuo industrial, formadora de masa, mesa refrigerada, congelador y máquina de hielo."},
            {"title": "Adecuación de Local y Diseño ($18,500 USD)", "desc": "Diseño industrial futurista, aviso iluminado, mesones en acero inoxidable y campanas de extracción."},
            {"title": "Tecnología y Lockers Inteligentes ($11,000 USD)", "desc": "Módulo de 12 lockers térmicos con QR, pantallas de autopedido, básculas IoT y red local."},
            {"title": "Inventario Inicial y Capital de Trabajo ($12,000 USD)", "desc": "Stock de insumos del primer mes, empaques, permisos, campaña publicitaria y fondo de contingencia."}
        ],
        "image": "extracted_media_fastfood/image8.png",
        "punchline_en": "Compact 40m² turnkey retail module ready in 45 days.",
        "punchline_es": "Módulo llave en mano de 40m² listo para operar en 45 días."
    },
    {
        "id": 11,
        "num": "10",
        "category_en": "FRANCHISE FLYWHEEL",
        "category_es": "MODELO DE FRANQUICIA",
        "title_en": "The Turnkey Franchise Expansion Model",
        "title_es": "El Modelo de Expansión de Franquicias Llave en Mano",
        "lead_en": "Standardized store modules allow rapid plug-and-play replication for local and regional franchisee investors.",
        "lead_es": "Módulos estandarizados permiten replicar locales llave en mano para inversionistas franquiciados.",
        "cards_en": [
            {"title": "Turnkey Module Setup", "desc": "Pre-fabricated kitchen layout and pre-configured IoT equipment deployed in 30 days per store."},
            {"title": "Centralized Commissary Supply", "desc": "Pre-made aged dough balls, signature sauces, and proprietary cheese blends delivered 3x weekly."},
            {"title": "Automated Franchise Royalty", "desc": "5% royalty collected automatically through the central POS payment gateway with zero auditing disputes."},
            {"title": "Franchisee Mobile Dashboard", "desc": "Franchise owners track live sales, equipment health, and inventory reorders from anywhere on iOS/Android."}
        ],
        "cards_es": [
            {"title": "Módulos Llave en Mano", "desc": "Layout de cocina prefabricado y equipos IoT preconfigurados listos en 30 días por sede."},
            {"title": "Centro de Producción Centralizado", "desc": "Masas maduradas, salsas exclusivas y quesos entregados 3 veces por semana a cada punto."},
            {"title": "Cobro Automático de Regalías", "desc": "5% de regalía deducido de forma transparente por la pasarela de pagos sin disputas contables."},
            {"title": "Panel Móvil del Franquiciado", "desc": "El inversionista monitorea ventas en vivo, estado de hornos y pedidos desde su celular."}
        ],
        "image": "extracted_media_fastfood/image1.png",
        "punchline_en": "Standardized operations remove operator skill risk for franchisees.",
        "punchline_es": "La estandarización elimina el riesgo de dependencia en personal especializado."
    },
    {
        "id": 12,
        "num": "11",
        "category_en": "EXPANSION ROADMAP",
        "category_es": "HOJA DE RUTA DE EXPANSIÓN",
        "title_en": "Regional Rollout: From 1 Pilot to 20 Franchise Stores",
        "title_es": "Despliegue Regional: De 1 Piloto a 20 Locales Franquiciados",
        "lead_en": "Disciplined multi-city expansion across Eastern and Central Colombia.",
        "lead_es": "Expansión disciplinada multiciudad por el oriente y centro de Colombia.",
        "phases_en": [
            {"phase": "MONTHS 1–6 · CÚCUTA PILOT", "focus": "Flagship Store & App Launch", "milestones": ["Launch flagship store in Caobos, Cúcuta", "Achieve 300 pizzas/day and 21.8% food cost targets", "Onboard 8,000 app users and 45% pre-order rate"]},
            {"phase": "MONTHS 7–12 · REGIONAL CLUSTER", "focus": "4 Additional Stores (Cúcuta & Bucaramanga)", "milestones": ["Open Store #2 in Ventura Plaza and Store #3 in Los Patios", "Expand to Bucaramanga with 2 flagship stores", "Establish centralized dough commissary facility"]},
            {"phase": "MONTHS 13–24 · NATIONAL SCALE", "focus": "20 Franchise Units", "milestones": ["Franchise rollout into Medellín, Pereira, and Bogotá", "Achieve $8.6M USD in network-wide annual GMV", "Integrate Arcana signed IoT auditability for remote investors"]}
        ],
        "phases_es": [
            {"phase": "MESES 1–6 · PILOTO CÚCUTA", "focus": "Local Insignia y Lanzamiento de App", "milestones": ["Apertura del local insignia en Caobos, Cúcuta", "Alcanzar 300 pizzas/día y meta de costo de insumos del 21.8%", "Captar 8,000 usuarios en app con 45% de órdenes por pre-pedido"]},
            {"phase": "MESES 7–12 · CLUSTER REGIONAL", "focus": "4 Locales Adicionales (Cúcuta y Bucaramanga)", "milestones": ["Apertura de Sede #2 en Ventura Plaza y Sede #3 en Los Patios", "Expansión a Bucaramanga con 2 locales insignia", "Montaje de centro de producción de masas centralizado"]},
            {"phase": "MESES 13–24 · ESCALA NACIONAL", "focus": "20 Franquicias Operativas", "milestones": ["Aperturas en Medellín, Pereira y Bogotá", "Alcanzar $8.6M USD en ventas anuales de la red", "Integración con IoT firmado de Arcana para inversores remotos"]}
        ],
        "punchline_en": "Scale blueprint proven on real store economics.",
        "punchline_es": "Plan de escala probado con economía de local real."
    },
    {
        "id": 13,
        "num": "12",
        "category_en": "RISK ENGINEERING",
        "category_es": "GESTIÓN DE RIESGOS",
        "title_en": "Operational Risk Engineering & Fail-Safes",
        "title_es": "Gestión de Riesgos Operativos y Resiliencia",
        "lead_en": "Systematic protocols to handle power outages, supplier shortages, and peak traffic surges.",
        "lead_es": "Protocolos sistemáticos para caídas eléctricas, desabastecimiento y picos masivos de demanda.",
        "risks_en": [
            {"risk": "Electrical Grid Fluctuations", "solution": "Dedicated industrial UPS and emergency diesel generator backup keeps conveyor ovens running during power dips."},
            {"risk": "Ingredient Supply Bottlenecks", "solution": "Dual-supplier contracts for flour, mozzarella, and meats with 15-day safety stock at central hub."},
            {"risk": "App / Internet Connectivity Loss", "solution": "POS works fully offline with local mesh sync; kitchen continues automated ticket printing seamlessly."},
            {"risk": "Staff Turnover", "solution": "Standardized 4-step prep stations allow training new kitchen operators in less than 48 hours."}
        ],
        "risks_es": [
            {"risk": "Fluctuaciones Eléctricas en Ciudad", "solution": "UPS industrial y planta eléctrica de respaldo garantizan horneado continuo ante cortes de luz."},
            {"risk": "Desabastecimiento de Insumos", "solution": "Contratos con dos proveedores clave y stock de seguridad de 15 días en bodega central."},
            {"risk": "Caídas de Internet en el Local", "solution": "El POS opera 100% offline y sincroniza en segundo plano al restablecer la red."},
            {"risk": "Rotación de Personal", "solution": "Estaciones estandarizadas de 4 pasos permiten capacitar a un nuevo operador en menos de 48 horas."}
        ],
        "image": "extracted_media_fastfood/image5.png",
        "punchline_en": "Bulletproof restaurant operations engineered for Latin American realities.",
        "punchline_es": "Operación blindada diseñada para la realidad del mercado latinoamericano."
    },
    {
        "id": 14,
        "num": "13",
        "category_en": "INVESTMENT ASK",
        "category_es": "SOLICITUD DE INVERSIÓN",
        "title_en": "Pilot Capital Round: $120,000 USD",
        "title_es": "Ronda de Capital Piloto: $120,000 USD",
        "lead_en": "Funding the launch of the flagship Cúcuta store, mobile app finalization, and commissary setup.",
        "lead_es": "Financiando la apertura del local insignia en Cúcuta, app móvil y centro de producción.",
        "cards_en": [
            {"title": "$68,000 USD · Flagship Store Launch", "desc": "Turnkey equipment purchase (conveyor oven, prep table), retail fit-out, and initial inventory in Caobos, Cúcuta."},
            {"title": "$24,000 USD · Mobile App & Tech Ecosystem", "desc": "Finalizing consumer pre-order app, heated locker IoT integration, and dynamic pricing AI engine."},
            {"title": "$16,000 USD · Central Commissary Setup", "desc": "Industrial mixer, vacuum packagers, and cold-room storage to supply initial store cluster."},
            {"title": "$12,000 USD · Launch Marketing & Working Capital", "desc": "Hyper-local influencer campaigns, digital ads blitz, and 90-day cash operating buffer."}
        ],
        "cards_es": [
            {"title": "$68,000 USD · Montaje de Sede Insignia", "desc": "Compra de maquinaria (horno continuo, mesas frías), adecuación del local y stock inicial en Caobos, Cúcuta."},
            {"title": "$24,000 USD · App Móvil y Ecosistema Tech", "desc": "Finalización de app de pre-orden, integración de lockers inteligentes y motor de precios dinámicos."},
            {"title": "$16,000 USD · Centro de Producción de Masas", "desc": "Amasadora industrial, empacadoras al vacío y cuarto frío para surtir los primeros locales."},
            {"title": "$12,000 USD · Campaña de Lanzamiento y Reserva", "desc": "Marketing local con creadores de contenido, pauta digital y fondo de maniobra a 90 días."}
        ],
        "image": "extracted_media_fastfood/image8.png",
        "punchline_en": "Targeting 34% net EBITDA and 9-month capital payback on Store #1.",
        "punchline_es": "Meta: 34% de margen EBITDA neto y retorno de inversión en 9 meses."
    },
    {
        "id": 15,
        "num": "14",
        "category_en": "EXECUTIVE CLOSING",
        "category_es": "CIERRE EJECUTIVO",
        "title_en": "The Future of Fast-Food is Precision Engineering",
        "title_es": "El Futuro del Fast-Food es Ingeniería de Precisión",
        "quote_en": "“We are not just selling artisan pizza. We are building the high-speed operating system for the next generation of food franchises.”",
        "quote_es": "“No solo vendemos pizza artesanal. Estamos creando el sistema operativo de alta velocidad para la próxima generación de franquicias de comida.”",
        "pillars_en": ["2.5-Minute Impingement Baking", "App-First Pre-Order Lockers", "21.8% Food Cost Discipline", "34% EBITDA Store Margin", "3i BAIRD LAB FoodTech"],
        "pillars_es": ["Horneado Continuo en 2.5 min", "Lockers Térmicos con Pre-Orden", "Disciplina de Costo al 21.8%", "Margen EBITDA de Local del 34%", "FoodTech 3i BAIRD LAB"],
        "image": "extracted_media_fastfood/image1.png",
        "punchline_en": "Smart Fast-Food Franchise · Powered by 3i BAIRD LAB.",
        "punchline_es": "Smart Fast-Food Franchise · Impulsado por 3i BAIRD LAB."
    }
]

# -------------------------------------------------------------
# DECK 3: ARCANA TRUST NETWORK (15 Curated Executive Slides)
# -------------------------------------------------------------
deck_arcana_15 = [
    {
        "id": 1,
        "tag_en": "WEB3 & IOT TRUST NETWORK · 3i BAIRD LAB",
        "tag_es": "RED DE CONFIANZA WEB3 E IOT · 3i BAIRD LAB",
        "title_en": "Arcana: Trust by Construction",
        "title_es": "Arcana: Contabilidad Inalterable",
        "subtitle_en": "Accounting that cannot be lied about. A trust network for franchises and remote investors: Signed IoT inside the store, auditable daily close on Polygon, and automated USDC dividend settlement.",
        "subtitle_es": "Contabilidad imposible de falsear. Una red de confianza para franquicias e inversionistas remotos: IoT firmado dentro del local, cierre diario en Polygon y liquidación automática en USDC.",
        "flow_en": ["Store Hardware Sensors", "Cryptographic Signatures", "Multi-Point Correlation", "Polygon Daily Notary", "Instant USDC Settlement"],
        "flow_es": ["Sensores de Hardware en Local", "Firmas Criptográficas", "Correlación Multi-Punto", "Notarización en Polygon", "Liquidación Instantánea USDC"],
        "badge_en": "Investor Pitch · 15 Slides",
        "badge_es": "Pitch para Inversionistas · 15 Slides",
        "category": "hero",
        "image": "extracted_media_arcana/image1.png"
    },
    {
        "id": 2,
        "num": "01",
        "category_en": "THE CORE PROBLEM",
        "category_es": "EL PROBLEMA CENTRAL",
        "title_en": "The Disconnect: The Investor Does Not See the Store",
        "title_es": "La Desconexión: El Inversor No Ve el Local",
        "lead_en": "“The investor does not see the store. The store manager does.” Information asymmetry fuels fraud and limits capital expansion.",
        "lead_es": "“El inversionista no ve el local. El administrador sí.” La asimetría de información genera fraude y frena la inversión.",
        "pillars_en": [
            {"title": "Underreported Cash & Sales", "desc": "Cash sales omitted from reports or cancelled in POS after the customer leaves the store."},
            {"title": "Disappearing High-Value Inventory", "desc": "Cheese, proteins, and specialty supplies vanish between delivery and kitchen prep without audit trails."},
            {"title": "Supplier Shortages & Kickbacks", "desc": "Suppliers deliver less weight or lower grade than invoiced, pocketing the difference."},
            {"title": "Editable Spreadsheets & POS", "desc": "Traditional franchise accounting relies on human-edited Excel reports and manipulable software."}
        ],
        "pillars_es": [
            {"title": "Ventas y Efectivo No Reportados", "desc": "Cobros en efectivo omitidos de reportes o anulados en el POS después de que el cliente se retira."},
            {"title": "Inventario de Alto Valor que Desaparece", "desc": "Quesos, proteínas e insumos clave se evaporan entre la entrega y la cocina sin rastro auditable."},
            {"title": "Mermas de Proveedores y Acuerdos Opacos", "desc": "Proveedores entregan menos peso o menor calidad que lo facturado formalmente."},
            {"title": "Reportes Modificables en Excel y POS", "desc": "La contabilidad tradicional de franquicias depende de hojas de cálculo editables por humanos."}
        ],
        "image": "extracted_media_arcana/image2.png",
        "punchline_en": "Today trust is human and fragile. Tomorrow it must be mathematical and verifiable.",
        "punchline_es": "Hoy la confianza es humana y frágil. Mañana debe ser matemática y verificable."
    },
    {
        "id": 3,
        "num": "02",
        "category_en": "THE INVESTMENT THESIS",
        "category_es": "TESIS DE INVERSIÓN",
        "title_en": "Turning Stores into Accounting Books Signed by Machines",
        "title_es": "Locales Convertidos en Libros Contables Firmados por Máquinas",
        "lead_en": "Arcana turns each physical commercial store into an unforgeable ledger verified by independent hardware devices.",
        "lead_es": "Arcana convierte cada local comercial en un libro contable inalterable verificado por hardware independiente.",
        "cards_en": [
            {"title": "Physical Operational Traces", "desc": "What is bought, stored, weighed, cooked, and dispensed leaves an unforgeable hardware signature."},
            {"title": "Multi-Sensor Consensus", "desc": "Independent IoT nodes (scales, current clamps, optical counters) must corroborate to validate sales."},
            {"title": "Daily Polygon Notarization", "desc": "At midnight, the day's financial Merkle root is sealed on Polygon blockchain for cents."},
            {"title": "Remote Trustless Auditing", "desc": "Investors audit real-time unit economics and receive automated USDC dividend payouts."}
        ],
        "cards_es": [
            {"title": "Huella Física de Operación", "desc": "Lo comprado, almacenado, pesado, cocinado y servido deja una firma de hardware infalsificable."},
            {"title": "Consenso Multi-Sensor", "desc": "Nodos IoT independientes (básculas, pinzas eléctricas, sensores ópticos) deben corroborar cada venta."},
            {"title": "Cierre Diario Sellado en Polygon", "desc": "A medianoche, la raíz de Merkle del día se notariza en la blockchain Polygon por centavos."},
            {"title": "Auditoría Remota Sin Confianza Ciega", "desc": "Los inversionistas auditan ventas reales y reciben dividendos automáticos en USDC."}
        ],
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "Audit the store and receive dividends without ever being physically present.",
        "punchline_es": "Audita el local y recibe dividendos sin necesidad de estar presente físicamente."
    },
    {
        "id": 4,
        "num": "03",
        "category_en": "SCOPE & POSITIONING",
        "category_es": "ALCANCE Y POSICIONAMIENTO",
        "title_en": "What Arcana Is — And What It Is Not",
        "title_es": "Qué Es Arcana — Y Qué No Es",
        "lead_en": "Enterprise financial infrastructure for real physical assets, strictly decoupled from crypto speculation.",
        "lead_es": "Infraestructura financiera empresarial para activos reales, totalmente desvinculada de la especulación cripto.",
        "comparison": [
            {"aspect_en": "Core Infrastructure", "aspect_es": "Infraestructura Central", "bot_en": "IS NOT: A speculative volatile cryptocurrency", "bot_es": "NO ES: Una criptomoneda volátil o memecoin", "tutor_en": "IS: Tamper-proof store accounting ledger", "tutor_es": "SÍ ES: Libro contable inalterable de local"},
            {"aspect_en": "Hardware Role", "aspect_es": "Rol del Hardware", "bot_en": "IS NOT: A replacement for cashier POS software", "bot_es": "NO ES: Un reemplazo del software de caja POS", "tutor_en": "IS: Independent physical validation mesh", "tutor_es": "SÍ ES: Malla de validación física independiente"},
            {"aspect_en": "Settlement Token", "aspect_es": "Token de Liquidación", "bot_en": "IS NOT: A token traded on open exchanges", "bot_es": "NO ES: Un token transado en exchanges", "tutor_en": "IS: 1:1 USDC-backed internal clearing unit", "tutor_es": "SÍ ES: Unidad respaldada 1:1 por USDC"},
            {"aspect_en": "Dividend Rules", "aspect_es": "Reglas de Dividendos", "bot_en": "IS NOT: Manual subjective manager transfers", "bot_es": "NO ES: Giros manuales a discreción humana", "tutor_en": "IS: Deterministic smart contract payouts", "tutor_es": "SÍ ES: Pagos deterministas por contrato"}
        ],
        "image": "extracted_media_arcana/image4.png",
        "punchline_en": "Institutional-grade financial plumbing for real-world franchise networks.",
        "punchline_es": "Infraestructura financiera institucional para franquicias del mundo real."
    },
    {
        "id": 5,
        "num": "04",
        "category_en": "SIGNED IOT HARDWARE",
        "category_es": "HARDWARE IOT FIRMADO",
        "title_en": "Signed IoT Inside the Store: Hardware-Level Truth",
        "title_es": "IoT Firmado en el Local: Verdad a Nivel de Hardware",
        "lead_en": "Industrial sensor nodes equipped with cryptographic secure elements continuously monitor physical actions.",
        "lead_es": "Nodos industriales con chips criptográficos seguros monitorean continuamente las acciones físicas del local.",
        "cards_en": [
            {"title": "Cryptographic Secure Element (ATECC608)", "desc": "Stores hardware private keys in tamper-proof silicon; firmware and signatures cannot be extracted or spoofed."},
            {"title": "Direct Physical Weight & Count Telemetry", "desc": "Load cells measure ingredient consumption; optical sensors log packaging extraction."},
            {"title": "Energy & Heat Consumption Tracking", "desc": "Non-invasive current clamps monitor oven thermal cycles vs. reported ticket volume."},
            {"title": "Offline-First Encrypted Gateway", "desc": "Signed data packets are buffered locally with battery backup during internet or power outages."}
        ],
        "cards_es": [
            {"title": "Chip Criptográfico Seguro (ATECC608)", "desc": "Almacena llaves privadas en silicio blindado; las firmas no pueden ser clonadas ni alteradas."},
            {"title": "Telemetría Directa de Peso y Conteo", "desc": "Celdas de carga miden consumo de masa y queso; sensores ópticos cuentan empaques."},
            {"title": "Monitoreo de Energía y Ciclos Térmicos", "desc": "Pinzas amperimétricas registran ciclos de calentamiento de hornos vs. tickets cobrados."},
            {"title": "Pasarela Encriptada con Respaldo Offline", "desc": "Almacena paquetes firmados en memoria local con batería ante cortes de luz o internet."}
        ],
        "image": "extracted_media_arcana/image4.png",
        "punchline_en": "Physical kitchen telemetry that software hackers cannot forge.",
        "punchline_es": "Telemetría física de cocina imposible de falsear por software."
    },
    {
        "id": 6,
        "num": "05",
        "category_en": "CORRELATION ENGINE",
        "category_es": "MOTOR DE CORRELACIÓN",
        "title_en": "Multi-Vector Fraud Detection & Evidence Correlation",
        "title_es": "Detección de Fraude Multi-Vector y Correlación",
        "lead_en": "Manipulating a single sensor is useless: multiple independent physical vectors must corroborate in real time.",
        "lead_es": "Alterar un sensor no sirve de nada: múltiples vectores físicos independientes deben coincidir en tiempo real.",
        "comparison": [
            {"aspect_en": "1. Ingredient Weight", "aspect_es": "1. Peso de Insumos", "bot_en": "20kg flour + 10kg cheese consumed", "bot_es": "20kg harina + 10kg queso consumidos", "tutor_en": "Yields exactly 85 standard pizzas", "tutor_es": "Rinde exactamente 85 pizzas estándar"},
            {"aspect_en": "2. Oven Electrical Cycles", "aspect_es": "2. Ciclos del Horno", "bot_en": "2.4 kWh active baking draw", "bot_es": "2.4 kWh de calentamiento activo", "tutor_en": "Corroborates 85 continuous bake cycles", "tutor_es": "Corrobora 85 horneados continuos"},
            {"aspect_en": "3. Packaging Dispensers", "aspect_es": "3. Dispensador de Cajas", "bot_en": "85 boxes pulled from dispenser", "bot_es": "85 cajas retiradas del dispensador", "tutor_en": "Optical sensor confirms 85 units", "tutor_es": "Sensor óptico confirma 85 unidades"},
            {"aspect_en": "4. POS Financial Register", "aspect_es": "4. Caja Registradora", "bot_en": "85 orders paid and registered", "bot_es": "85 órdenes cobradas y registradas", "tutor_en": "Zero discrepancy detected", "tutor_es": "Cero discrepancias detectadas"}
        ],
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "Fraud requires compromising 4 independent hardware systems simultaneously.",
        "punchline_es": "El fraude requeriría alterar 4 sistemas de hardware independientes a la vez."
    },
    {
        "id": 7,
        "num": "06",
        "category_en": "DAILY CLOSE WORKFLOW",
        "category_es": "CIERRE DIARIO",
        "title_en": "The Immutable Daily Close Protocol on Polygon",
        "title_es": "El Cierre Diario Inalterable en Polygon",
        "lead_en": "Every midnight, the day's operational telemetry is validated, compressed into a Merkle tree, and notarized on Polygon.",
        "lead_es": "Cada medianoche, la telemetría se valida, se resume en un árbol de Merkle y se notariza en Polygon.",
        "features_en": [
            "Thousands of sensor readings hashed into a single 32-byte cryptographic Merkle root",
            "Notarization on Polygon blockchain takes 2 seconds and costs less than $0.02 USD per store",
            "Creates a permanent mathematical audit trail that neither store manager nor franchise can alter",
            "One-click verification on Polygonscan proves reported financial results match hardware telemetry"
        ],
        "features_es": [
            "Miles de lecturas de sensores se comprimen en una única raíz de Merkle de 32 bytes",
            "La notarización en Polygon toma 2 segundos y cuesta menos de $0.02 USD por local",
            "Genera un historial contable permanente que ni el administrador ni la franquicia pueden modificar",
            "Verificación pública en Polygonscan con un clic demostrando que los ingresos coinciden con el hardware"
        ],
        "diagram_en": [
            {"label": "1. Telemetry Ingestion", "detail": "Aggregation of signed IoT packets"},
            {"label": "2. Merkle Root Hash", "detail": "Cryptographic compression of truth"},
            {"label": "3. Polygon Notarization", "detail": "Permanent on-chain daily seal (<$0.02)"}
        ],
        "diagram_es": [
            {"label": "1. Ingesta de Datos", "detail": "Agrupación de paquetes IoT firmados"},
            {"label": "2. Hash Raíz de Merkle", "detail": "Compresión criptográfica de la verdad"},
            {"label": "3. Notarización en Polygon", "detail": "Sello permanente on-chain (<$0.02)"}
        ],
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "Every day is a closed, tamper-proof cryptographic accounting chapter.",
        "punchline_es": "Cada día es un capítulo contable cerrado e inalterable."
    },
    {
        "id": 8,
        "num": "07",
        "category_en": "USDC SETTLEMENT",
        "category_es": "LIQUIDACIÓN EN USDC",
        "title_en": "USDC Settlement & Smart Contract Split Rules",
        "title_es": "Liquidación en USDC y Reparto Automatizado por Contrato",
        "lead_en": "Autonomous programs enforce profit distribution agreements without human delays or banking friction.",
        "lead_es": "Programas autónomos ejecutan el reparto de dividendos pactado sin demoras humanas ni trabas bancarias.",
        "cards_en": [
            {"title": "100% Backed by Regulated USDC", "desc": "1:1 parity with U.S. Dollars; zero price volatility, auditable reserves, and instant 24/7 global settlement."},
            {"title": "Automated Revenue Waterfall", "desc": "Contract splits daily net revenue: 70% to store operating expenses, 20% to investors, 10% to franchise brand."},
            {"title": "Direct Investor Wallet Payouts", "desc": "Dividends arrive daily in the investor's crypto or custodial wallet without cross-border wire delays."},
            {"title": "Zero Unauthorized Capital Leaks", "desc": "Eliminates embezzlement and unauthorized withdrawals from local store bank accounts."}
        ],
        "cards_es": [
            {"title": "100% Respaldado en USDC Regulado", "desc": "Paridad 1:1 con USD; cero volatilidad, reservas auditadas y liquidación global 24/7 en segundos."},
            {"title": "Cascada de Reparto Automática", "desc": "El contrato reparte el ingreso neto diario: 70% a OPEX del local, 20% a inversionistas, 10% a franquicia."},
            {"title": "Pagos Diarios a Billeteras", "desc": "Los dividendos se depositan a diario en la billetera del inversor sin demoras bancarias."},
            {"title": "Cero Fuga de Capitales", "desc": "Elimina desvíos de fondos y retiros no autorizados de las cuentas del restaurante."}
        ],
        "image": "extracted_media_arcana/image5.png",
        "punchline_en": "Like a transparent, unforgeable vending machine for investment returns.",
        "punchline_es": "Como una máquina dispensadora transparente e inviolable para dividendos."
    },
    {
        "id": 9,
        "num": "08",
        "category_en": "INVESTOR PORTAL",
        "category_es": "PORTAL DEL INVERSOR",
        "title_en": "The Investor Dashboard: Live Telemetry & Daily Payouts",
        "title_es": "El Portal del Inversionista: Telemetría y Pagos en Vivo",
        "lead_en": "Remote investors monitor actual unit economics and machinery health with complete transparency.",
        "lead_es": "Los inversionistas remotos monitorean la economía real y la maquinaria con transparencia total.",
        "cards_en": [
            {"title": "Live Machine Status & Uptime", "desc": "Track oven operating hours, daily ingredient consumption curves, and store foot traffic in real time."},
            {"title": "Daily Automated Dividend Ledger", "desc": "View historical USDC payouts with on-chain transaction hashes and tax-compliant financial exports."},
            {"title": "Instant Anomaly & Fraud Alerts", "desc": "Receive push notifications if sensor correlation drops below 99% or if equipment is disconnected."},
            {"title": "Multi-Store Portfolio View", "desc": "Aggregate franchise investments across multiple cities and brands into a single high-yield dashboard."}
        ],
        "cards_es": [
            {"title": "Estado de Máquinas en Vivo", "desc": "Monitorea horas de horneado, curvas de consumo de insumos y tráfico de clientes en tiempo real."},
            {"title": "Historial de Dividendos Diarios", "desc": "Consulta transferencias en USDC con hashes verificables en blockchain y reportes contables."},
            {"title": "Alertas Inmediatas de Anomalías", "desc": "Notificaciones push si la correlación de sensores cae por debajo del 99% o si desconectan un equipo."},
            {"title": "Gestión de Portafolio Multisede", "desc": "Consolida inversiones en franquicias de múltiples ciudades y marcas en un único panel de control."}
        ],
        "image": "extracted_media_arcana/image7.png",
        "punchline_en": "Complete visibility from kitchen oven to investor wallet.",
        "punchline_es": "Visibilidad total desde el horno de cocina hasta la billetera del inversor."
    },
    {
        "id": 10,
        "num": "09",
        "category_en": "BUSINESS MODEL",
        "category_es": "MODELO DE NEGOCIO",
        "title_en": "Monetization: Recurring SaaS + Settlement Take-Rate",
        "title_es": "Monetización: SaaS Recurrente + Comisión de Liquidación",
        "lead_en": "Three recurring revenue streams tied to store hardware deployments, software monitoring, and gross sales volume.",
        "lead_es": "Tres flujos recurrentes de ingresos: hardware instalado, software de monitoreo y volumen de liquidación.",
        "streams_en": [
            {"type": "Hardware Sensor Lease", "tier": "$150–$250 / store / mo", "desc": "Covers ESP32 secure gateway, load cells, current clamps, maintenance, and warranty."},
            {"type": "SaaS Platform Subscription", "tier": "$200 / location / mo", "desc": "Franchisor and investor portal access, real-time anomaly alerts, and tax audit compliance exports."},
            {"type": "Settlement Volume Take-Rate", "tier": "0.75% Protocol Fee", "desc": "Fee collected on all gross USDC revenues settled through the Polygon smart contract."}
        ],
        "streams_es": [
            {"type": "Arrendamiento de Sensores IoT", "tier": "$150–$250 USD / sede / mes", "desc": "Cubre pasarela segura ESP32, celdas de carga, pinzas amperimétricas, mantenimiento y garantía."},
            {"type": "Suscripción SaaS a Plataforma", "tier": "$200 USD / sede / mes", "desc": "Acceso al portal para franquiciador e inversor, alertas de anomalías y reportes contables certificados."},
            {"type": "Comisión por Volumen Liquidado", "tier": "0.75% Tarifa Protocolo", "desc": "Comisión cobrada sobre el volumen bruto en USDC liquidado por contrato inteligente en Polygon."}
        ],
        "moat_en": "Defensible Hardware Moat: Proprietary cryptochip telemetry combined with verified operational benchmark data.",
        "moat_es": "Moat de Hardware Defendible: Telemetría propietaria en chip seguro combinada con métricas operativas verificadas.",
        "punchline_en": "High-margin recurring revenues that scale directly with franchise sales volume.",
        "punchline_es": "Ingresos recurrentes de alto margen que escalan con las ventas de cada local."
    },
    {
        "id": 11,
        "num": "10",
        "category_en": "MARKET SIZE",
        "category_es": "TAMAÑO DE MERCADO",
        "title_en": "The $800B Global Franchise Market Opportunity",
        "title_es": "Oportunidad de Mercado Global de Franquicias ($800B)",
        "lead_en": "Targeting high-volume QSR, cloud kitchens, and automated retail networks seeking remote capital.",
        "lead_es": "Enfocado en cadenas de comida rápida QSR, dark kitchens y retail automatizado que buscan capital remoto.",
        "segments_en": [
            {"title": "Multi-Unit QSR Franchises", "target": "Phase 1 Beachhead", "desc": "Franchisors struggling with underreported royalties, employee inventory theft, and lack of unit visibility."},
            {"title": "Remote Franchise Investors", "target": "High-Growth Niche", "desc": "Passive investors financing store units who demand live telemetry and automated daily dividend payouts."},
            {"title": "Cloud Kitchen Operators", "target": "Phase 2 Expansion", "desc": "Multi-tenant commercial kitchens requiring automated ingredient tracking and tenant utility billing."},
            {"title": "Automated Smart Retail & Vending", "target": "Phase 3 Enterprise", "desc": "Unmanned kiosks and automated stores requiring trustless inventory reconciliation and supplier settlement."}
        ],
        "segments_es": [
            {"title": "Franquicias QSR Multisede", "target": "Fase 1 Insignia", "desc": "Franquiciadores con problemas de regalías no reportadas, mermas de insumos y falta de visibilidad."},
            {"title": "Inversionistas Remotos de Franquicias", "target": "Nicho en Alto Crecimiento", "desc": "Inversionistas pasivos que exigen telemetría en vivo y dividendos diarios automáticos en sus billeteras."},
            {"title": "Operadores de Dark Kitchens", "target": "Fase 2 Expansión", "desc": "Cocinas compartidas que requieren control de insumos por arrendatario y cobro de servicios en tiempo real."},
            {"title": "Retail y Vending Automatizado", "target": "Fase 3 Corporativa", "desc": "Tiendas autónomas inteligentes que requieren conciliación de inventario y pago directo a proveedores."}
        ],
        "image": "extracted_media_arcana/image8.png",
        "punchline_en": "Unlocking institutional and retail capital for physical commercial franchises.",
        "punchline_es": "Desbloqueando capital institucional y minorista para franquicias comerciales físicas."
    },
    {
        "id": 12,
        "num": "11",
        "category_en": "PILOT INTEGRATION",
        "category_es": "INTEGRACIÓN PILOTO",
        "title_en": "First Flagship Integration: Smart Fast-Food Pilot",
        "title_es": "Primera Integración Insignia: Piloto Smart Fast-Food",
        "lead_en": "Deploying Arcana in our flagship Smart Fast-Food pilot store in Cúcuta as the living proof of concept.",
        "lead_es": "Desplegando Arcana en el local insignia de comida rápida inteligente en Cúcuta como caso de éxito real.",
        "cards_en": [
            {"title": "Connected Conveyor Oven & Scales", "desc": "Arcana IoT gateway connected directly to the high-speed oven and topping scale wells in the Cúcuta store."},
            {"title": "Live 2.5-Minute Bake Auditing", "desc": "Correlating electrical heating power draw with customer app orders to verify 100% of pizza sales."},
            {"title": "Daily USDC Dividends to Pilot Investors", "desc": "Remote angel investors receive daily USDC profit distributions directly from Cúcuta store sales."},
            {"title": "Showcase for Regional Franchisors", "desc": "Live showroom demonstrating verifiable accounting to prospective franchise buyers across Latin America."}
        ],
        "cards_es": [
            {"title": "Horno de Banda y Básculas Conectadas", "desc": "Pasarela Arcana conectada al horno continuo y pozuelos de pesaje en el local de Cúcuta."},
            {"title": "Auditoría de Horneado en Tiempo Real", "desc": "Correlaciona consumo eléctrico del horno con pedidos en la app para verificar el 100% de las ventas."},
            {"title": "Dividendos Diarios en USDC para Inversores", "desc": "Inversionistas ángeles reciben repartos diarios en USDC generados por las ventas del local."},
            {"title": "Showroom para Futuros Franquiciados", "desc": "Demostración en vivo de contabilidad inalterable para interesados en abrir nuevas franquicias."}
        ],
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "Two complementary businesses validating each other in a real commercial environment.",
        "punchline_es": "Dos negocios complementarios validándose mutuamente en un entorno comercial real."
    },
    {
        "id": 13,
        "num": "12",
        "category_en": "ROADMAP",
        "category_es": "HOJA DE RUTA",
        "title_en": "Strategic Roadmap: From Pilot to 100 Stores",
        "title_es": "Hoja de Ruta: Del Piloto a 100 Locales Conectados",
        "lead_en": "Disciplined hardware manufacturing and smart contract scaling roadmap.",
        "lead_es": "Plan de escalamiento disciplinado en fabricación de hardware y contratos inteligentes.",
        "phases_en": [
            {"phase": "PHASE 1 · PILOTO FUNDADOR (Meses 1–3)", "focus": "5 Locales Piloto QSR", "milestones": ["Deploy sensor kits in 5 flagship pizza and quick-serve locations", "Validate daily Polygon notary seals and Merkle correlation accuracy", "Achieve 99.8% sensor uptime with zero false fraud positives"]},
            {"phase": "PHASE 2 · EXPANSIÓN REGIONAL (Meses 4–9)", "focus": "50 Sedes Franquiciadas", "milestones": ["Launch remote investor portal with automated daily USDC dividends", "Integrate major POS vendors and industrial equipment manufacturers", "Onboard 3 regional franchise chains across Colombia and Mexico"]},
            {"phase": "PHASE 3 · ESCALA CORPORATIVA (Meses 10–18)", "focus": "500+ Locales Conectados", "milestones": ["Decentralize sensor oracle validator network", "Enterprise API integration for hospitality and cloud kitchen brands", "Series A expansion into North American franchise networks"]}
        ],
        "phases_es": [
            {"phase": "FASE 1 · PILOTO FUNDADOR (Meses 1–3)", "focus": "5 Locales Piloto QSR", "milestones": ["Instalar kits de sensores en 5 locales insignia de comida rápida", "Validar cierres diarios en Polygon y precisión del árbol de Merkle", "Alcanzar 99.8% de disponibilidad de sensores con cero falsos positivos"]},
            {"phase": "FASE 2 · EXPANSIÓN REGIONAL (Meses 4–9)", "focus": "50 Sedes Franquiciadas", "milestones": ["Lanzar portal para inversores con dividendos diarios automáticos en USDC", "Integrar principales proveedores de POS y fabricantes de maquinaria", "Sumar 3 cadenas de franquicias regionales en Colombia y México"]},
            {"phase": "FASE 3 · ESCALA CORPORATIVA (Meses 10–18)", "focus": "500+ Locales Conectados", "milestones": ["Descentralizar red de oráculos validadores de hardware", "API corporativa para marcas de hotelería y dark kitchens", "Expansión Serie A hacia redes de franquicias en Norteamérica"]}
        ],
        "punchline_en": "Proving the trust flywheel store by store.",
        "punchline_es": "Demostrando el volante de confianza local por local."
    },
    {
        "id": 14,
        "num": "13",
        "category_en": "INVESTMENT ASK",
        "category_es": "RONDA DE INVERSIÓN",
        "title_en": "Seed Investment Ask: $750,000 USD",
        "title_es": "Ronda Semilla de Inversión: $750,000 USD",
        "lead_en": "Funding hardware manufacturing for 100 sensor kits, smart contract formal audits, and franchise onboarding.",
        "lead_es": "Financiando la fabricación de 100 kits de sensores, auditoría de contratos inteligentes y despliegue en franquicias.",
        "cards_en": [
            {"title": "40% · Hardware Manufacturing & Certification", "desc": "Production of 100 industrial ESP32 / ATECC608 sensor gateway kits with CE/FCC certifications."},
            {"title": "30% · Software & Smart Contract Audits", "desc": "Formal mathematical verification of Polygon settlement contracts and investor portal development."},
            {"title": "20% · Commercial Franchise Onboarding", "desc": "Deploying dedicated onboarding field engineers across initial partner franchise locations."},
            {"title": "10% · Legal, Compliance & Working Capital", "desc": "International corporate structuring, IP protection, and operational runway buffer."}
        ],
        "cards_es": [
            {"title": "40% · Fabricación y Certificación de Hardware", "desc": "Producción de 100 kits de pasarelas y sensores ESP32/ATECC608 con certificaciones industriales."},
            {"title": "30% · Software y Auditoría de Contratos", "desc": "Verificación formal de contratos en Polygon y desarrollo del portal web del inversionista."},
            {"title": "20% · Despliegue en Franquicias Aliadas", "desc": "Equipo de ingenieros para instalación e integración en locales franquiciados."},
            {"title": "10% · Legal, Cumplimiento y Capital de Trabajo", "desc": "Estructura jurídica internacional, patentes de hardware y margen operativo."}
        ],
        "image": "extracted_media_arcana/image7.png",
        "punchline_en": "Goal: Connect 100 stores and validate $5M in annual settled GMV.",
        "punchline_es": "Meta: Conectar 100 locales y validar $5M USD en volumen anual liquidado."
    },
    {
        "id": 15,
        "num": "14",
        "category_en": "EXECUTIVE CLOSING",
        "category_es": "CIERRE EJECUTIVO",
        "title_en": "The Future of Franchise Investment is Verifiable",
        "title_es": "El Futuro de las Franquicias es Verificable",
        "quote_en": "“We do not ask investors to trust human reports. We give them mathematical proof signed by physical machines.”",
        "quote_es": "“No le pedimos a los inversionistas que confíen en reportes humanos. Les entregamos pruebas matemáticas firmadas por máquinas físicas.”",
        "pillars_en": ["Signed IoT Edge Devices", "Multi-Vector Correlation", "Polygon Daily Close Notary", "Instant USDC Dividends", "3i BAIRD LAB DeepTech"],
        "pillars_es": ["Dispositivos IoT Firmados", "Correlación Multi-Vector", "Cierre Diario en Polygon", "Dividendos Diarios en USDC", "DeepTech 3i BAIRD LAB"],
        "image": "extracted_media_arcana/image1.png",
        "punchline_en": "Arcana: Trust by Construction · Powered by 3i BAIRD LAB.",
        "punchline_es": "Arcana: Contabilidad Inalterable · Impulsado por 3i BAIRD LAB."
    }
]

# Save all three 15-slide datasets
with open('deck_tutor_15.json', 'w', encoding='utf-8') as f:
    json.dump(deck_tutor_15, f, ensure_ascii=False, indent=2)

with open('deck_fastfood_15.json', 'w', encoding='utf-8') as f:
    json.dump(deck_fastfood_15, f, ensure_ascii=False, indent=2)

with open('deck_arcana_15.json', 'w', encoding='utf-8') as f:
    json.dump(deck_arcana_15, f, ensure_ascii=False, indent=2)

print("Saved all 3 curated 15-slide datasets successfully.")
