# -*- coding: utf-8 -*-
"""
Generate comprehensive bilingual (ES + EN) Curated Q&A, Objections, and Presenter Notes
for EVERY slide in ALL 5 decks:
1. comparativo (Infraestructura IA - 10 slides)
2. restaurante (Arcana Restaurantes - 10 slides)
3. fastfood (Smart Fast-Food - 15 slides)
4. tutor (Expert Multi-Agent Tutor - 15 slides)
5. arcana (Arcana Trust Network - 15 slides)
"""

import json
import re
from pathlib import Path

BILINGUAL_QA = {
    "comparativo": {
        1: [
            {
                "id": "comp-1-1",
                "category": "inversor",
                "question_es": "¿Por qué la estrategia de infraestructura debe basarse en etapas de negocio y no en potencia bruta?",
                "question_en": "Why should infrastructure strategy be based on business stages rather than raw computing power?",
                "answer_es": "Comprar hardware antes de tener tracción comercial genera capital ocioso y rápida obsolescencia. La inversión progresiva asegura que cada equipo esté financiado y amortizado por contratos activos.",
                "answer_en": "Purchasing hardware before commercial traction creates idle capital and rapid depreciation. Phased investment ensures every machine is funded and amortized by active client contracts.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-1-2",
                "category": "nota",
                "question_es": "Nota del presentador: Tesis central de apertura",
                "question_en": "Presenter Note: Core opening thesis",
                "answer_es": "Enfatizar que el objetivo de 3i Baird Lab no es acumular servidores costosos, sino crear un activo productivo y rentable que multiplique los ingresos.",
                "answer_en": "Emphasize that 3i Baird Lab's goal is not accumulating expensive servers, but forging a productive, profitable asset that multiplies enterprise revenue.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        2: [
            {
                "id": "comp-2-1",
                "category": "operativa",
                "question_es": "¿Qué soluciones concretas podemos monetizar de inmediato con Capex US$0?",
                "question_en": "What concrete solutions can we monetize immediately at $0 Capex?",
                "answer_es": "Plataformas web empresariales, RAG documental con APIs de frontera, automatizaciones de procesos de negocio y prototipos funcionales para validación comercial.",
                "answer_en": "Enterprise web platforms, document RAG with frontier APIs, business workflow automations, and functional prototypes for commercial validation.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-2-2",
                "category": "inversor",
                "question_es": "¿Por qué no renovar toda la flota de desarrollo de inmediato?",
                "question_en": "Why not upgrade the entire developer fleet right away?",
                "answer_es": "Los equipos actuales son más que suficientes para la fase de desarrollo y demos; el desembolso de capital se reserva para cuando un cliente exija procesamiento masivo o privacidad local.",
                "answer_en": "Current machines are fully capable for development and demos; capital deployment is reserved for when clients demand massive throughput or local privacy.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        3: [
            {
                "id": "comp-3-1",
                "category": "objecion",
                "question_es": "¿Cuáles son los 4 cuellos de botella que nos obligarán a comprar hardware dedicado?",
                "question_en": "What are the 4 bottlenecks that will trigger dedicated hardware purchases?",
                "answer_es": "1) Volumen de datos (modelos 32B-70B que requieren VRAM), 2) Concurrencia de usuarios, 3) Mandato de privacidad On-Premise, 4) Disponibilidad 24/7 sin riesgo de fallas.",
                "answer_en": "1) Data volume (32B-70B models requiring high VRAM), 2) Multi-user concurrency, 3) On-Premise privacy compliance, 4) 24/7 non-stop availability.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-3-2",
                "category": "nota",
                "question_es": "Nota del presentador: Metáfora de la VRAM para clientes no técnicos",
                "question_en": "Presenter Note: VRAM metaphor for non-technical clients",
                "answer_es": "Comparar la VRAM con el ancho de una autopista: si el modelo de IA no cabe en la memoria de la tarjeta gráfica, el sistema se vuelve 50 veces más lento.",
                "answer_en": "Compare VRAM to highway lanes: if the AI model does not fit directly in GPU memory, execution slows down by 50x.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        4: [
            {
                "id": "comp-4-1",
                "category": "inversor",
                "question_es": "¿Qué métricas financieras justifican una inversión en estaciones dedicadas?",
                "question_en": "What financial metrics justify investing in dedicated workstations?",
                "answer_es": "+300% de capacidad de procesamiento paralelo, 100% de retención de datos confidenciales (cero fuga a nubes públicas) y reducción de hasta el 65% en costos recurrentes de APIs.",
                "answer_en": "+300% concurrent processing throughput, 100% confidential data retention (zero cloud leakage), and up to 65% reduction in recurring API expenses.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-4-2",
                "category": "operativa",
                "question_es": "¿Cómo ayuda el hardware propio a cerrar clientes Enterprise?",
                "question_en": "How does owned hardware help close Enterprise contracts?",
                "answer_es": "Permite firmar acuerdos de nivel de servicio (SLAs) con garantías de privacidad y tiempos de respuesta dedicados que la nube pública no garantiza a bajo costo.",
                "answer_en": "It enables signing strict SLAs with dedicated response times and privacy guarantees that public cloud APIs cannot provide at fixed costs.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        5: [
            {
                "id": "comp-5-1",
                "category": "nota",
                "question_es": "Nota del presentador: La ecuación de productividad del talento",
                "question_en": "Presenter Note: The talent productivity equation",
                "answer_es": "Destacar la regla: 'Mejor hardware = -70% tiempo de espera = 3x más iteraciones = proyectos entregados en la mitad del tiempo'.",
                "answer_en": "Highlight the rule: 'Better hardware = -70% waiting lag = 3x iteration frequency = projects delivered in half the time'.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-5-2",
                "category": "operativa",
                "question_es": "¿Cómo se beneficia un desarrollador con inferencia local?",
                "question_en": "How does a developer benefit from local AI inference?",
                "answer_es": "Prueba y ajusta prompts y código en segundos sin esperar colas de red ni preocuparse por el costo por token durante la etapa de pruebas.",
                "answer_en": "They test and iterate code and prompts in seconds with zero network queue delays and zero per-token cost anxiety during testing.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        6: [
            {
                "id": "comp-6-1",
                "category": "inversor",
                "question_es": "¿Cómo se estructuran los niveles de presupuesto recomendados?",
                "question_en": "How are the recommended budget tiers structured?",
                "answer_es": "Nivel 0: US$0 (Desarrollo y demos). Nivel 1: US$2.5k–3.5k (IA local intermedia). Nivel 2: US$4k–6.5k (Workstations profesionales 70B). Nivel 3: Servidores centralizados 24/7.",
                "answer_en": "Tier 0: $0 (Dev & demos). Tier 1: $2.5k–$3.5k (Intermediate local AI). Tier 2: $4k–$6.5k (Professional 70B workstations). Tier 3: Centralized 24/7 servers.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-6-2",
                "category": "objecion",
                "question_es": "¿Por qué no saltar directamente al servidor empresarial Nivel 3?",
                "question_en": "Why not jump directly to a Tier 3 enterprise server?",
                "answer_es": "Porque requiere costos adicionales de energía, refrigeración y mantenimiento. Solo debe adquirirse cuando múltiples clientes en producción lo financien.",
                "answer_en": "Because it incurs ongoing power, thermal, and maintenance overhead. It must only be deployed once multiple production clients fund it.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        7: [
            {
                "id": "comp-7-1",
                "category": "inversor",
                "question_es": "¿Cuáles son los 5 gatilladores que autorizan la compra de nuevo equipo?",
                "question_en": "What are the 5 triggers that authorize purchasing new hardware?",
                "answer_es": "1. Cliente con contrato firmado que lo exija. 2. Saturación de proyectos simultáneos. 3. Facturas de Cloud API superiores al costo de amortización. 4. Requisito legal de privacidad. 5. Operación en vivo 24/7.",
                "answer_en": "1. Signed client contract demanding it. 2. Concurrent project saturation. 3. Cloud API bills exceeding amortization costs. 4. Legal compliance mandate. 5. Non-stop 24/7 live ops.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-7-2",
                "category": "nota",
                "question_es": "Nota de negociación con clientes",
                "question_en": "Client negotiation note",
                "answer_es": "Si un cliente exige privacidad total, el costo del nodo local dedicado puede trasladarse como costo directo de setup en la propuesta comercial.",
                "answer_en": "If a client demands strict on-premise privacy, dedicated hardware costs can be factored directly into the onboarding setup fee.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        8: [
            {
                "id": "comp-8-1",
                "category": "operativa",
                "question_es": "¿Cuáles son los 4 pilares indispensables para una operación 24/7?",
                "question_en": "What are the 4 indispensable pillars for a 24/7 operation?",
                "answer_es": "1) Talento potenciado, 2) Capacidad tecnológica GPU, 3) Continuidad eléctrica (UPS online de doble conversión), 4) Conectividad redundante (Doble proveedor de Internet con failover).",
                "answer_en": "1) Empowered talent, 2) Compute GPU capacity, 3) Electrical continuity (Double-conversion online UPS), 4) Redundant connectivity (Dual WAN failover).",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-8-2",
                "category": "objecion",
                "question_es": "¿Qué ocurre si solo compramos computadores sin respaldo eléctrico?",
                "question_en": "What happens if we buy fast computers without power protection?",
                "answer_es": "Una sola micro-interrupción eléctrica apaga los servidores, corrompe bases de datos y tumba los servicios de los clientes, arruinando la reputación de la empresa.",
                "answer_en": "A single power surge shuts down servers, corrupts databases, and crashes live client services, destroying enterprise reputation.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        9: [
            {
                "id": "comp-9-1",
                "category": "nota",
                "question_es": "Nota del presentador: Desglose del modelo en 3 capas",
                "question_en": "Presenter Note: 3-Layer Model breakdown",
                "answer_es": "Capa 1: Personas (Velocidad). Capa 2: Tecnología (Cómputo). Capa 3: Continuidad (Resiliencia). Todo debe responder al filtro de las 5 preguntas antes de comprar.",
                "answer_en": "Layer 1: People (Velocity). Layer 2: Technology (Compute). Layer 3: Continuity (Resilience). All purchases must pass the 5-question filter.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-9-2",
                "category": "operativa",
                "question_es": "¿Cuál es la primera pregunta que debemos hacernos antes de cualquier compra?",
                "question_en": "What is the first question to ask before any purchase?",
                "answer_es": "¿Podemos resolver esta necesidad con la infraestructura que ya tenemos? Si la respuesta es sí, se optimiza lo existente.",
                "answer_en": "Can we solve this need with the infrastructure we already own? If yes, we optimize existing assets first.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        10: [
            {
                "id": "comp-10-1",
                "category": "inversor",
                "question_es": "¿Cuál es el resumen ejecutivo final para la toma de decisiones?",
                "question_en": "What is the final executive summary for decision-makers?",
                "answer_es": "La infraestructura deja de ser un gasto tecnológico y se convierte en una inversión en capacidad productiva, comercial y operativa que respalda el crecimiento de 3i Baird Lab.",
                "answer_en": "Infrastructure ceases to be a mere IT expense and becomes a direct investment in productive, commercial, and operational capability backing 3i Baird Lab's growth.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "comp-10-2",
                "category": "nota",
                "question_es": "Nota de cierre: Llamado a la acción",
                "question_en": "Closing Note: Strategic call to action",
                "answer_es": "Concluir reforzando la ruta: 'Primero tracción comercial con lo que tenemos; luego escalamiento rentable con continuidad 24/7'.",
                "answer_en": "Conclude by reiterating the path: 'First commercial traction with existing assets; then profitable scaling with 24/7 continuity'.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ]
    },
    "restaurante": {
        1: [
            {
                "id": "rest-1-1",
                "category": "inversor",
                "question_es": "¿Por qué un dueño de restaurante pagaría por Arcana en vez de confiar en su POS actual?",
                "question_en": "Why would a restaurant owner pay for Arcana instead of trusting their current POS?",
                "answer_es": "El POS solo registra lo que el cajero quiere tipear. Arcana audita la realidad física (básculas, neveras, consumos) y detecta comandas canceladas fraudulentamente o ventas no registradas.",
                "answer_en": "The POS only logs what the cashier types. Arcana audits physical reality (scales, fridges, raw ingredients) and catches cancelled tickets and unrecorded sales.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "rest-1-2",
                "category": "operativa",
                "question_es": "¿Requiere reemplazar el software o hardware de punto de venta existente?",
                "question_en": "Does it require replacing existing POS hardware or software?",
                "answer_es": "No. Arcana funciona de manera no invasiva conectándose al flujo de red, impresoras de comandas y sensores externos sin alterar el POS del local.",
                "answer_en": "No. Arcana operates non-invasively by tethering to network streams, kitchen ticket printers, and external IoT sensors without altering existing POS setups.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        2: [
            {
                "id": "rest-2-1",
                "category": "inversor",
                "question_es": "¿Cómo se traduce una fuga del 4% en el 50-100% de la utilidad anual del restaurante?",
                "question_en": "How does a 4% leakage wipe out 50-100% of annual restaurant profit?",
                "answer_es": "Dado que los márgenes netos del sector gastronómico oscilan entre el 3% y el 8%, cualquier fuga directa sobre ingresos brutos consume la totalidad de la ganancia limpia del dueño.",
                "answer_en": "Because restaurant net margins average between 3% and 8%, any direct 4% leakage on gross revenue wipes out the owner's entire net profit.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "rest-2-2",
                "category": "objecion",
                "question_es": "¿No basta con poner más cámaras de seguridad tradicionales CCTV?",
                "question_en": "Isn't adding more CCTV security cameras enough?",
                "answer_es": "Las cámaras convencionales graban terabytes sin correlación. Nadie revisa 12 horas de video diario. Arcana correlaciona eventos exactos con marcas de tiempo e incongruencias de ticket.",
                "answer_en": "Conventional CCTV records unindexed video terabytes that no owner has time to review. Arcana flags specific timestamped discrepancies automatically.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        3: [
            {
                "id": "rest-3-1",
                "category": "operativa",
                "question_es": "¿Cuáles son los 5 vectores del marco F.A.C.E.S. en la práctica?",
                "question_en": "What are the 5 vectors of the F.A.C.E.S. framework in practice?",
                "answer_es": "1) Facturación y tickets, 2) Almacén y compras, 3) Cocina y recetas estándar, 4) Efectivo y arqueos, 5) Salidas no autorizadas o mermas.",
                "answer_en": "1) Billing & voids, 2) Receiving & storage, 3) Kitchen recipe variance, 4) Cash drawer reconciliations, 5) Unauthorized waste and shrinkage.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        4: [
            {
                "id": "rest-4-1",
                "category": "inversor",
                "question_es": "¿Cuál es la propuesta de valor para el dueño en una sola frase?",
                "question_en": "What is the core value proposition for the restaurant owner?",
                "answer_es": "Demostrar matemáticamente lo comprado, cocinado y vendido sin necesidad de vivir vigilando encima del local.",
                "answer_en": "Mathematically proving what was bought, prepared, and sold without living on top of store operations.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        5: [
            {
                "id": "rest-5-1",
                "category": "operativa",
                "question_es": "¿Cómo se evitan manipulaciones en los sensores IoT?",
                "question_en": "How are IoT sensor tampering attempts prevented?",
                "answer_es": "Cada microcontrolador firma criptográficamente las lecturas en hardware antes de transmitirlas, impidiendo la alteración de datos por parte del personal.",
                "answer_en": "Every microcontroller cryptographically signs telemetry at the hardware enclave before transmission, preventing staff manipulation.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        6: [
            {
                "id": "rest-6-1",
                "category": "operativa",
                "question_es": "¿Qué pasa si se cae el Internet en el restaurante?",
                "question_en": "What happens if store internet goes down?",
                "answer_es": "Los nodos IoT almacenan las lecturas cifradas localmente en memoria no volátil y sincronizan automáticamente en cuanto se restablece la conexión.",
                "answer_en": "IoT edge nodes buffer encrypted records in non-volatile flash and automatically reconcile when connectivity resumes.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        7: [
            {
                "id": "rest-7-1",
                "category": "inversor",
                "question_es": "¿Por qué un protocolo de cierre diario inalterable en blockchain?",
                "question_en": "Why implement an unalterable daily closing protocol on blockchain?",
                "answer_es": "Porque elimina discrepancias contables entre socios e inversionistas: nadie puede modificar los números de ventas ni costos una vez cerrado el turno.",
                "answer_en": "Because it eliminates accounting disputes between partners and franchisors: nobody can retroactively alter sales or cost logs.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        8: [
            {
                "id": "rest-8-1",
                "category": "operativa",
                "question_es": "¿Cómo se realiza la liquidación y reparto de utilidades?",
                "question_en": "How are automated profit splits executed?",
                "answer_es": "Mediante reglas automáticas de split en smart contracts que liquidan diariamente o semanalmente en stablecoins (USDC) o transferencias bancarias directas.",
                "answer_en": "Through deterministic smart contract rules that disburse daily or weekly splits directly in USDC or bank payouts.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        9: [
            {
                "id": "rest-9-1",
                "category": "nota",
                "question_es": "Nota del presentador: Telemetría móvil para el propietario",
                "question_en": "Presenter Note: Mobile telemetry for the store owner",
                "answer_es": "Mostrar cómo el dueño recibe alertas directas en Telegram/WhatsApp cuando hay una discrepancia mayor al 2% entre peso de insumos y tickets.",
                "answer_en": "Demonstrate how the owner receives real-time Telegram/WhatsApp alerts when raw ingredient consumption diverges by >2% from sales tickets.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        10: [
            {
                "id": "rest-10-1",
                "category": "inversor",
                "question_es": "¿Cuál es el tiempo de retorno de inversión (ROI) estimado para el piloto inicial?",
                "question_en": "What is the estimated payback period (ROI) for the pilot?",
                "answer_es": "El piloto se amortiza en menos de 45 días al recuperar un promedio de $1,200 a $3,500 USD mensuales en mermas y fraudes detectados por sucursal.",
                "answer_en": "The pilot achieves payback within 45 days by capturing $1,200 to $3,500 monthly in prevented food waste and shrinkage per unit.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ]
    },
    "fastfood": {
        1: [
            {
                "id": "ff-1-1",
                "category": "inversor",
                "question_es": "¿Cuál es el margen operativo unitario proyectado del local automatizado?",
                "question_en": "What is the projected unit EBITDA margin of the automated store?",
                "answer_es": "Entre 28% y 34% de EBITDA gracias a la reducción del 60% de mano de obra en cocina y reducción de desperdicio a menos del 1.5%.",
                "answer_en": "Between 28% and 34% EBITDA margin driven by 60% kitchen labor reduction and shrinking ingredient waste under 1.5%.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "ff-1-2",
                "category": "nota",
                "question_es": "Nota del presentador: Tesis Smart QSR",
                "question_en": "Presenter Note: Smart QSR thesis",
                "answer_es": "El futuro de la comida rápida es la ingeniería de precisión: estandarización milimétrica de ingredientes y tiempos de horneado exactos.",
                "answer_en": "The future of fast food is precision engineering: exact portioning and calibrated continuous baking.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        2: [
            {
                "id": "ff-2-1",
                "category": "inversor",
                "question_es": "¿Cuáles son las 3 ineficiencias críticas que destruyen el margen tradicional?",
                "question_en": "What are the 3 critical inefficiencies crushing traditional restaurant margins?",
                "answer_es": "1) Alta rotación y costo laboral en cocina, 2) Variabilidad en porciones y desperdicio de insumos, 3) Cuellos de botella en horas pico.",
                "answer_en": "1) High kitchen turnover & labor costs, 2) Portion variability & food waste, 3) Peak-hour bottlenecks.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        3: [
            {
                "id": "ff-3-1",
                "category": "operativa",
                "question_es": "¿Cómo opera el horno continuo de alta velocidad en horas pico?",
                "question_en": "How does the high-speed continuous oven perform during peak rush?",
                "answer_es": "Cocción automatizada por cinta transportadora calibrada que hornea una pizza cada 120 segundos sin intervención manual en el proceso térmico.",
                "answer_en": "Calibrated conveyor belt baking producing a fresh pizza every 120 seconds with zero manual thermal handling.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        4: [
            {
                "id": "ff-4-1",
                "category": "inversor",
                "question_es": "¿Comparativa directa con franquicias tradicionales?",
                "question_en": "How does it compare against traditional franchise models?",
                "answer_es": "40% menor Capex de apertura, 65% menos personal en cocina y punto de equilibrio alcanzable con solo 60 pedidos diarios.",
                "answer_en": "40% lower opening Capex, 65% fewer kitchen staff, and breakeven reachable with just 60 daily orders.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        5: [
            {
                "id": "ff-5-1",
                "category": "nota",
                "question_es": "Nota: ¿Por qué Cúcuta como ciudad piloto?",
                "question_en": "Note: Why Cúcuta as the initial pilot market?",
                "answer_es": "Costos operativos eficientes, alta densidad de consumo de comida rápida y mercado ideal para validar la ingeniería antes de escalar a Bogotá y Medellín.",
                "answer_en": "Efficient operating costs, dense fast-food consumption, and ideal market dynamics to validate engineering before national rollout.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        6: [
            {
                "id": "ff-6-1",
                "category": "operativa",
                "question_es": "¿Qué equipamiento automatizado compone la cocina?",
                "question_en": "What automated machinery equips the modular kitchen?",
                "answer_es": "Prensas neumáticas de masa, dosificadores volumétricos de salsa y queso, y hornos de túnel continuo con control PID.",
                "answer_en": "Pneumatic dough presses, volumetric sauce & cheese dispensers, and PID-controlled continuous tunnel ovens.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        7: [
            {
                "id": "ff-7-1",
                "category": "operativa",
                "question_es": "¿Cómo se gestiona el inventario en tiempo real?",
                "question_en": "How is real-time inventory reconciled?",
                "answer_es": "Básculas conectadas por IoT descuentan automáticamente gramos de queso, masa y proteínas con cada orden emitida en el KDS.",
                "answer_en": "IoT smart scales deduct exact grams of dough, cheese, and proteins in real time with each ticket fired on the KDS.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        8: [
            {
                "id": "ff-8-1",
                "category": "inversor",
                "question_es": "¿Cuál es el costo unitario de producto (Food Cost)?",
                "question_en": "What is the targeted unit Food Cost percentage?",
                "answer_es": "Estandarizado en 26% de costo de materia prima gracias a cero sobreporciones y compras centralizadas de insumos.",
                "answer_en": "Standardized at 26% of gross sales due to zero over-portioning and centralized ingredient sourcing.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        9: [
            {
                "id": "ff-9-1",
                "category": "nota",
                "question_es": "Nota: Experiencia del cliente y rapidez",
                "question_en": "Note: Customer experience & turnaround speed",
                "answer_es": "Tiempo promedio desde que el cliente ordena en el kiosco hasta la entrega en mano: menos de 3.5 minutos.",
                "answer_en": "Average time from digital kiosk ordering to hot box handoff: under 3.5 minutes.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        10: [
            {
                "id": "ff-10-1",
                "category": "inversor",
                "question_es": "¿Cómo es el modelo de expansión de la franquicia?",
                "question_en": "What does the franchise expansion blueprint look like?",
                "answer_es": "Locales compactos tipo Dark Kitchen y Express (35–50 m2) con bajo arriendo y rápido despliegue modular.",
                "answer_en": "Compact Express & Dark Kitchen footprints (35–50 sqm) with low lease overhead and modular setup.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        11: [
            {
                "id": "ff-11-1",
                "category": "inversor",
                "question_es": "¿Tamaño del mercado objetivo accesible (TAM/SAM)?",
                "question_en": "What is the Total and Serviceable Addressable Market (TAM/SAM)?",
                "answer_es": "Mercado QSR regional de pizza y comida rápida superior a $450M USD en ciudades intermedias de Colombia.",
                "answer_en": "Regional pizza & fast food QSR market exceeding $450M USD across intermediate cities in Colombia.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        12: [
            {
                "id": "ff-12-1",
                "category": "operativa",
                "question_es": "¿Mantenimiento preventivo del equipamiento?",
                "question_en": "How is preventive equipment maintenance handled?",
                "answer_es": "Telemetría IoT predice desgaste de resistencias, motores de cinta y sensores de temperatura antes de que ocurra una falla.",
                "answer_en": "IoT telemetry monitors heating elements, belt motor torque, and thermal probes to predict maintenance before breakdowns.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        13: [
            {
                "id": "ff-13-1",
                "category": "nota",
                "question_es": "Nota: Hoja de ruta a 12 meses",
                "question_en": "Note: 12-month execution roadmap",
                "answer_es": "Mes 1-3: Piloto insignia. Mes 4-6: Apertura de 3 locales propios. Mes 7-12: Franquiciamiento a operadores terceros.",
                "answer_en": "Months 1-3: Flagship pilot. Months 4-6: 3 company-owned stores. Months 7-12: Franchise onboarding to third-party operators.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        14: [
            {
                "id": "ff-14-1",
                "category": "inversor",
                "question_es": "¿Monto de la ronda de inversión y asignación de fondos?",
                "question_en": "Seed round size and capital allocation?",
                "answer_es": "Ronda Semilla de $120,000 USD destinada a equipamiento de cocina automatizada (55%), adecuación del local (25%) y capital de trabajo (20%).",
                "answer_en": "$120,000 USD Seed Round allocated to kitchen automation (55%), store fit-out (25%), and working capital (20%).",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        15: [
            {
                "id": "ff-15-1",
                "category": "inversor",
                "question_es": "¿Cierre ejecutivo y retorno para el inversionista?",
                "question_en": "Executive closing & investor returns?",
                "answer_es": "ROI proyectado de 22 meses con distribución trimestral de dividendos y valorización de la marca franquiciable.",
                "answer_en": "22-month projected payback with quarterly dividend distribution and brand enterprise equity upside.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ]
    },
    "tutor": {
        1: [
            {
                "id": "tut-1-1",
                "category": "inversor",
                "question_es": "¿Por qué un sistema Multi-Agente supera a ChatGPT / Claude estándar para educación?",
                "question_en": "Why does a Multi-Agent architecture outperform generic LLM chatbots for education?",
                "answer_es": "Los LLMs genéricos resuelven la tarea por el alumno. El sistema 3i tiene agentes especializados en pedagogía socrática que guían paso a paso y evalúan comprensión real.",
                "answer_en": "Generic LLMs simply hand out answers. The 3i multi-agent system uses specialized pedagogical agents that guide Socratic reasoning and verify cognitive retention.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "tut-1-2",
                "category": "nota",
                "question_es": "Nota del presentador: Enfoque DeepTech",
                "question_en": "Presenter Note: DeepTech differentiation",
                "answer_es": "Subrayar que no somos un simple wrapper de OpenAI; contamos con grafos de conocimiento y memoria persistente en 3 niveles.",
                "answer_en": "Highlight that 3i is not an API wrapper; it deploys custom knowledge graphs and a 3-tier persistent cognitive memory architecture.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        2: [
            {
                "id": "tut-2-1",
                "category": "inversor",
                "question_es": "¿Cuál es el cuello de botella de $300B en educación?",
                "question_en": "What is the $300B bottleneck in education?",
                "answer_es": "El 85% de los estudiantes que usan chatbots tradicionales experimentan una falsa sensación de aprendizaje sin retención a largo plazo.",
                "answer_en": "85% of students using generic AI chatbots suffer from illusion of competence without genuine long-term knowledge retention.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        3: [
            {
                "id": "tut-3-1",
                "category": "operativa",
                "question_es": "¿Cómo funciona la arquitectura socrática multi-agente?",
                "question_en": "How does the Socratic multi-agent architecture operate?",
                "answer_es": "El Agente Pedagogo formula preguntas guiadas; el Agente Evaluador mide comprensión; el Agente Psicólogo ajusta el tono motivacional según la frustración del estudiante.",
                "answer_en": "The Pedagogical Agent crafts scaffolded questions; the Evaluator verifies understanding; the Behavioral Agent adapts tone to student cognitive load.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        4: [
            {
                "id": "tut-4-1",
                "category": "inversor",
                "question_es": "¿Ventaja competitiva frente a Khan Academy o Duolingo?",
                "question_en": "Competitive advantage against Khan Academy or Duolingo?",
                "answer_es": "Adaptabilidad en tiempo real a currículos universitarios y corporativos complejos con verificación criptográfica de dominio de conceptos.",
                "answer_en": "Dynamic real-time scaffolding for advanced university/corporate STEM curricula paired with verifiable Proof-of-Mastery.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        5: [
            {
                "id": "tut-5-1",
                "category": "operativa",
                "question_es": "¿Cuáles son las 4 escuadras de agentes?",
                "question_en": "What are the 4 specialized agent squads?",
                "answer_es": "1. Escuadra de Diagnóstico, 2. Escuadra Pedagógica, 3. Escuadra de Verificación STEM, 4. Escuadra de Síntesis y Memoria.",
                "answer_en": "1. Diagnostic Squad, 2. Pedagogical Squad, 3. STEM Verification Squad, 4. Synthesis & Memory Squad.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        6: [
            {
                "id": "tut-6-1",
                "category": "operativa",
                "question_es": "¿Cómo opera la memoria en 3 capas?",
                "question_en": "How does the 3-tier memory engine work?",
                "answer_es": "Capa 1: Contexto de sesión activa. Capa 2: Grafo de conceptos dominados del estudiante. Capa 3: Memoria episódica a largo plazo de vacíos cognitivos.",
                "answer_en": "Tier 1: Active session context. Tier 2: Individual concept mastery graph. Tier 3: Long-term episodic memory tracking learning gaps.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        7: [
            {
                "id": "tut-7-1",
                "category": "nota",
                "question_es": "Nota: Grafos de conocimiento dinámicos",
                "question_en": "Note: Dynamic knowledge graph traversal",
                "answer_es": "Explicar cómo el tutor identifica si un estudiante falla en cálculo porque en realidad tiene un vacío previo en factorización algebraica.",
                "answer_en": "Demonstrate how the tutor diagnoses that a calculus error is rooted in an earlier algebraic factoring misunderstanding.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        8: [
            {
                "id": "tut-8-1",
                "category": "inversor",
                "question_es": "¿Qué es la Prueba Verificable de Dominio (Proof-of-Mastery)?",
                "question_en": "What is the Verifiable Proof-of-Mastery credential?",
                "answer_es": "Credenciales emitidas en base a resolución autónoma de problemas sin trampas, validables por empleadores y universidades.",
                "answer_en": "Tamper-proof credentials issued upon unassisted mastery problem-solving, verifiable by universities and employers.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        9: [
            {
                "id": "tut-9-1",
                "category": "operativa",
                "question_es": "¿Stack tecnológico de la infraestructura?",
                "question_en": "Technical infrastructure stack?",
                "answer_es": "Orquestación en LangGraph/LlamaIndex, base de datos vectorial Qdrant, almacenamiento en grafos Neo4j e inferencia híbrida.",
                "answer_en": "Orchestration with LangGraph/LlamaIndex, Qdrant vector database, Neo4j knowledge graphs, and hybrid inference.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        10: [
            {
                "id": "tut-10-1",
                "category": "inversor",
                "question_es": "¿Tamaño del mercado EdTech accesible?",
                "question_en": "Total accessible EdTech market size?",
                "answer_es": "$180B USD en los 3 niveles: K-12, Educación Superior y Reskilling corporativo B2B.",
                "answer_en": "$180B USD across 3 verticals: K-12, Higher Education, and Corporate B2B reskilling.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        11: [
            {
                "id": "tut-11-1",
                "category": "inversor",
                "question_es": "¿Modelo de monetización?",
                "question_en": "Monetization model?",
                "answer_es": "SaaS recurrente B2C ($19/mes por estudiante) y licencias institucionales B2B ($8/alumno/mes para colegios y universidades).",
                "answer_en": "Recurring B2C SaaS ($19/student/month) and enterprise B2B licensing ($8/student/month for universities and schools).",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        12: [
            {
                "id": "tut-12-1",
                "category": "nota",
                "question_es": "Nota: Métricas de tracción inicial",
                "question_en": "Note: Early traction benchmarks",
                "answer_es": "Piloto con más de 1,200 estudiantes activos con una retención mensual del 78% y mejora del 34% en calificaciones de exámenes.",
                "answer_en": "Pilot of 1,200+ active learners showing 78% monthly retention and a 34% average exam score improvement.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        13: [
            {
                "id": "tut-13-1",
                "category": "nota",
                "question_es": "Nota: Hoja de ruta estratégica a 18 meses",
                "question_en": "Note: 18-month strategic roadmap",
                "answer_es": "Fase 1: Dominio de STEM y programación. Fase 2: Expansión a idiomas y ciencias humanas. Fase 3: Integración con plataformas universitarias LMS.",
                "answer_en": "Phase 1: STEM & coding mastery. Phase 2: Languages & humanities expansion. Phase 3: Global LMS integrations.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        14: [
            {
                "id": "tut-14-1",
                "category": "inversor",
                "question_es": "¿Ronda de inversión Semilla?",
                "question_en": "Seed fundraising round?",
                "answer_es": "Buscamos $1.2M USD para perfeccionamiento del motor multi-agente (50%), expansión comercial B2B (35%) y operaciones (15%).",
                "answer_en": "Raising $1.2M USD for multi-agent engine development (50%), B2B enterprise sales (35%), and operations (15%).",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        15: [
            {
                "id": "tut-15-1",
                "category": "inversor",
                "question_es": "¿Cierre ejecutivo de la visión?",
                "question_en": "Executive closing vision?",
                "answer_es": "Estamos construyendo la infraestructura de inteligencia artificial que democratizará la tutoría de élite personalizada para millones de personas.",
                "answer_en": "We are building the AI infrastructure to democratize world-class elite 1-on-1 tutoring for millions of learners worldwide.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ]
    },
    "arcana": {
        1: [
            {
                "id": "arc-1-1",
                "category": "inversor",
                "question_es": "¿Por qué anclar la contabilidad en Polygon en lugar de una base de datos PostgreSQL tradicional?",
                "question_en": "Why anchor accounting on Polygon instead of a standard PostgreSQL database?",
                "answer_es": "Porque garantiza inmutabilidad criptográfica. Ni el dueño de la franquicia ni el franquiciado pueden alterar los registros de ventas y repartos una vez firmados por las máquinas.",
                "answer_en": "Because it guarantees cryptographic immutability. Neither the franchisor nor the operator can tamper with sales or split records once machine-signed.",
                "pinned": True,
                "timestamp": "Preset 3i"
            },
            {
                "id": "arc-1-2",
                "category": "nota",
                "question_es": "Nota del presentador: Confianza por Construcción",
                "question_en": "Presenter Note: Trust by Construction thesis",
                "answer_es": "Enfatizar el concepto: 'No le pidas al inversor que confíe en personas; dale un sistema donde las máquinas firman la verdad matemática'.",
                "answer_en": "Emphasize the core concept: 'Do not ask investors to trust humans; provide a framework where physical machines sign mathematical truth'.",
                "pinned": False,
                "timestamp": "Preset 3i"
            }
        ],
        2: [
            {
                "id": "arc-2-1",
                "category": "inversor",
                "question_es": "¿Cuál es el problema central entre franquiciador y franquiciado?",
                "question_en": "What is the core friction between franchisors and franchisees?",
                "answer_es": "La asimetría de información: el inversionista pasivo no está en el local y sospecha de sub-declaración de ventas, mientras el operador resiente la fiscalización constante.",
                "answer_en": "Information asymmetry: passive investors fear revenue underreporting, while operators resent intrusive auditing.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        3: [
            {
                "id": "arc-3-1",
                "category": "nota",
                "question_es": "Nota: Tesis de inversión de Arcana",
                "question_en": "Note: Arcana investment thesis",
                "answer_es": "Transformar cada local comercial en un libro contable auditable en tiempo real mediante sensores IoT no manipulables.",
                "answer_en": "Transforming physical stores into real-time auditable balance sheets via tamper-proof IoT telemetry.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        4: [
            {
                "id": "arc-4-1",
                "category": "operativa",
                "question_es": "¿Qué es Arcana y qué NO es?",
                "question_en": "What Arcana IS and what it is NOT?",
                "answer_es": "Arcana ES una capa de auditoría física y liquidación automática. NO es un software contable tradicional ni un punto de venta más.",
                "answer_en": "Arcana IS an automated physical audit and settlement layer. It is NOT another standard ERP or POS software.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        5: [
            {
                "id": "arc-5-1",
                "category": "operativa",
                "question_es": "¿Cómo garantizan que el hardware IoT sea inviolable?",
                "question_en": "How is IoT hardware security ensured?",
                "answer_es": "Chips con enclave criptográfico seguro que firman cada paquete de telemetría con clave privada embebida en silicio.",
                "answer_en": "Secure hardware enclaves signing each telemetry packet with silicon-embedded private keys.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        6: [
            {
                "id": "arc-6-1",
                "category": "operativa",
                "question_es": "¿Cómo funciona el motor de correlación de fraude multi-vector?",
                "question_en": "How does the multi-vector fraud correlation engine work?",
                "answer_es": "Cruza simultáneamente aperturas de gaveta de dinero, peso de insumos consumidos y tickets emitidos para detectar transacciones fantasma.",
                "answer_en": "It cross-references cash drawer triggers, ingredient scale depletion, and POS receipts to catch ghost sales.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        7: [
            {
                "id": "arc-7-1",
                "category": "operativa",
                "question_es": "¿Cómo es el protocolo de cierre diario en Polygon?",
                "question_en": "How does the Polygon daily closing protocol operate?",
                "answer_es": "Al terminar la jornada, se genera un hash criptográfico con todos los eventos del día y se acuña en la blockchain con costo de transacción despreciable.",
                "answer_en": "At end-of-day, a Merkle hash summarizing all events is minted onto Polygon with sub-cent gas fees.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        8: [
            {
                "id": "arc-8-1",
                "category": "inversor",
                "question_es": "¿Cómo se realiza la liquidación de regalías y utilidades en USDC?",
                "question_en": "How are royalty and profit splits disbursed in USDC?",
                "answer_es": "Smart contracts ejecutan la distribución inmediata de porcentajes pactados hacia las billeteras o cuentas de los socios sin intermediación humana.",
                "answer_en": "Deterministic smart contracts execute instant payouts to partner wallets with zero manual intermediaries.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        9: [
            {
                "id": "arc-9-1",
                "category": "nota",
                "question_es": "Nota: Dashboard del Inversionista en tiempo real",
                "question_en": "Note: Real-time Investor Dashboard",
                "answer_es": "Demostrar cómo el inversor abre su app móvil y ve la facturación en vivo de 10 locales sincronizados con prueba criptográfica.",
                "answer_en": "Showcase how investors monitor live revenue across 10 franchise units with verified cryptographic proof.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        10: [
            {
                "id": "arc-10-1",
                "category": "inversor",
                "question_es": "¿Modelo de negocio y monetización de Arcana?",
                "question_en": "Business model and unit economics?",
                "answer_es": "SaaS recurrente por local ($99 USD/mes) + Take-rate del 0.75% sobre las liquidaciones procesadas a través del protocolo.",
                "answer_en": "Recurring SaaS ($99 USD/store/month) + 0.75% take-rate on all automated on-chain settlements.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        11: [
            {
                "id": "arc-11-1",
                "category": "inversor",
                "question_es": "¿Tamaño del mercado de franquicias?",
                "question_en": "Global franchise market opportunity?",
                "answer_es": "Mercado global de franquicias superior a $800B USD con más de 750,000 establecimientos que sufren problemas de auditoría y confianza.",
                "answer_en": "$800B+ global franchise ecosystem with 750,000+ units facing structural trust and audit friction.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        12: [
            {
                "id": "arc-12-1",
                "category": "nota",
                "question_es": "Nota: Primera integración insignia con Smart Fast-Food",
                "question_en": "Note: Flagship integration with Smart Fast-Food",
                "answer_es": "El piloto con la cadena Smart Fast-Food de 3i Baird Lab sirve como caso de éxito validado para vender la solución a terceros.",
                "answer_en": "The pilot with 3i Baird Lab's Smart Fast-Food chain serves as the proving ground for commercial multi-brand rollout.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        13: [
            {
                "id": "arc-13-1",
                "category": "nota",
                "question_es": "Nota: Hoja de ruta estratégica",
                "question_en": "Note: Strategic expansion roadmap",
                "answer_es": "De 1 local piloto a 20 locales en 6 meses, escalando a más de 100 franquicias conectadas en el mes 18.",
                "answer_en": "From 1 pilot store to 20 units in 6 months, scaling to 100+ connected locations by month 18.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        14: [
            {
                "id": "arc-14-1",
                "category": "inversor",
                "question_es": "¿Ronda Semilla de Inversión?",
                "question_en": "Seed fundraising round?",
                "answer_es": "Ronda de $750,000 USD para desarrollo de firmware IoT (40%), auditorías de smart contracts (25%) y despliegue comercial (35%).",
                "answer_en": "Raising $750,000 USD for IoT firmware (40%), smart contract audits (25%), and commercial deployment (35%).",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ],
        15: [
            {
                "id": "arc-15-1",
                "category": "inversor",
                "question_es": "¿Cierre ejecutivo de Arcana Trust Network?",
                "question_en": "Executive closing vision for Arcana?",
                "answer_es": "El futuro de las inversiones en franquicias es verificable. Convertimos negocios físicos en activos líquidos, auditables y transparentes.",
                "answer_en": "The future of retail franchise investment is verifiable. We turn physical businesses into liquid, auditable, and transparent assets.",
                "pinned": True,
                "timestamp": "Preset 3i"
            }
        ]
    }
}

# Add 'question' and 'answer' properties for backwards compatibility
for deck_name, slides_dict in BILINGUAL_QA.items():
    for slide_num, items in slides_dict.items():
        for item in items:
            item["question"] = item.get("question_es", "")
            item["answer"] = item.get("answer_es", "")

def update_app_js():
    root = Path('.')
    app_file = root / 'app.js'
    code = app_file.read_text(encoding='utf-8')

    js_qa_str = "const CURATED_SLIDE_QA = " + json.dumps(BILINGUAL_QA, indent=2, ensure_ascii=False) + ";"

    # Replace CURATED_SLIDE_QA
    pattern = r"const CURATED_SLIDE_QA = \{[\s\S]*?\n\};\n\nfunction getSlideNotesKey"
    replacement = js_qa_str + "\n\nfunction getSlideNotesKey"

    if re.search(pattern, code):
        code = re.sub(pattern, replacement, code)
        print("Replaced CURATED_SLIDE_QA with full bilingual dataset!")
    else:
        print("Could not match CURATED_SLIDE_QA block in app.js!")

    app_file.write_text(code, encoding='utf-8')

if __name__ == "__main__":
    update_app_js()
