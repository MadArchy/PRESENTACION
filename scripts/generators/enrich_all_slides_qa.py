# -*- coding: utf-8 -*-
"""
Script to enrich app.js with comprehensive curated Q&A, talking points, and presenter notes
for EVERY single slide in ALL 5 decks:
1. comparativo (Infraestructura IA - 10 slides)
2. restaurante (Arcana Restaurantes - 10 slides)
3. fastfood (Smart Fast-Food - 15 slides)
4. tutor (Expert Multi-Agent Tutor - 15 slides)
5. arcana (Arcana Trust Network - 15 slides)
"""

import json
import re
from pathlib import Path

CURATED_SLIDE_QA = {
    "comparativo": {
        1: [
            {"id": "comp-1-1", "category": "inversor", "question": "¿Por qué la estrategia de infraestructura debe basarse en etapas de negocio y no en potencia bruta?", "answer": "Comprar hardware antes de tener tracción comercial genera capital ocioso y rápida obsolescencia. La inversión progresiva asegura que cada equipo esté amortizado por contratos activos.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-1-2", "category": "nota", "question": "Nota del presentador: Mensaje central de apertura", "answer": "Hacer énfasis en que el objetivo de 3i Baird Lab no es crear una sala de servidores costosa, sino forjar una capacidad productiva que multiplique los ingresos.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        2: [
            {"id": "comp-2-1", "category": "operativa", "question": "¿Qué soluciones concretas podemos monetizar de inmediato con Capex US$0?", "answer": "Plataformas web empresariales, RAG documental con APIs de nube, automatizaciones de procesos y prototipos funcionales para validación comercial.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-2-2", "category": "inversor", "question": "¿Por qué no renovar toda la flota de desarrollo de inmediato?", "answer": "Los equipos actuales son más que suficientes para la fase de desarrollo y demos; el desembolso de capital se reserva para cuando un cliente exija procesamiento masivo o privacidad local.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        3: [
            {"id": "comp-3-1", "category": "objecion", "question": "¿Cuáles son los 4 cuellos de botella que nos obligarán a comprar hardware?", "answer": "1) Volumen de datos (modelos 32B-70B que requieren VRAM), 2) Concurrencia de usuarios, 3) Mandato de privacidad On-Premise, 4) Disponibilidad 24/7 sin riesgo de fallas.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-3-2", "category": "nota", "question": "Nota del presentador: Explicación de VRAM para no técnicos", "answer": "Comparar la VRAM con el ancho de una autopista: si el modelo no cabe en la memoria de la tarjeta gráfica, el sistema colapsa o se vuelve 50 veces más lento.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        4: [
            {"id": "comp-4-1", "category": "inversor", "question": "¿Qué métricas financieras justifican una inversión en estaciones dedicadas?", "answer": "+300% de capacidad de procesamiento paralelo, 100% de retención de datos confidenciales (cero fuga a nubes públicas) y reducción de hasta el 65% en costos recurrentes de APIs.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-4-2", "category": "operativa", "question": "¿Cómo ayuda el hardware propio a cerrar clientes Enterprise?", "answer": "Permite firmar acuerdos de nivel de servicio (SLAs) con garantías de privacidad y tiempos de respuesta dedicados que la nube pública no garantiza a bajo costo.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        5: [
            {"id": "comp-5-1", "category": "nota", "question": "Nota del presentador: La ecuación de productividad del talento", "answer": "Destacar la regla: 'Mejor hardware = -70% tiempo de espera = 3x más iteraciones = proyectos entregados en la mitad del tiempo'.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-5-2", "category": "operativa", "question": "¿Cómo se beneficia un desarrollador con inferencia local?", "answer": "Prueba y ajusta prompts y código en segundos sin esperar colas de red ni preocuparse por el costo por token durante la etapa de pruebas.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        6: [
            {"id": "comp-6-1", "category": "inversor", "question": "¿Cómo se estructuran los niveles de presupuesto recomendados?", "answer": "Nivel 0: US$0 (Desarrollo y demos). Nivel 1: US$2.5k–3.5k (IA local intermedia). Nivel 2: US$4k–6.5k (Workstations profesionales 70B). Nivel 3: Servidores centralizados 24/7.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-6-2", "category": "objecion", "question": "¿Por qué no saltar directamente al servidor empresarial Nivel 3?", "answer": "Porque requiere costos adicionales de energía, refrigeración y mantenimiento. Solo debe adquirirse cuando múltiples clientes en producción lo financien.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        7: [
            {"id": "comp-7-1", "category": "inversor", "question": "¿Cuáles son los 5 gatilladores que autorizan la compra de nuevo equipo?", "answer": "1. Cliente con contrato firmado que lo exija. 2. Saturación de proyectos simultáneos. 3. Facturas de Cloud API superiores al costo de amortización. 4. Requisito legal de privacidad. 5. Operación en vivo 24/7.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-7-2", "category": "nota", "question": "Nota de negociación con clientes", "answer": "Si un cliente exige privacidad total, el costo del nodo local dedicado puede trasladarse como costo directo de setup en la propuesta comercial.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        8: [
            {"id": "comp-8-1", "category": "operativa", "question": "¿Cuáles son los 4 pilares indispensables para una operación 24/7?", "answer": "1) Talento potenciado, 2) Capacidad tecnológica GPU, 3) Continuidad eléctrica (UPS online de doble conversión), 4) Conectividad redundante (Doble proveedor de Internet con failover).", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-8-2", "category": "objecion", "question": "¿Qué ocurre si solo compramos computadores sin respaldo eléctrico?", "answer": "Una sola micro-interrupción eléctrica apaga los servidores, corrompe bases de datos y tumba los servicios de los clientes, arruinando la reputación de la empresa.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        9: [
            {"id": "comp-9-1", "category": "nota", "question": "Nota del presentador: Desglose del modelo en 3 capas", "answer": "Capa 1: Personas (Velocidad). Capa 2: Tecnología (Cómputo). Capa 3: Continuidad (Resiliencia). Todo debe responder al filtro de las 5 preguntas antes de comprar.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-9-2", "category": "operativa", "question": "¿Cuál es la primera pregunta que debemos hacernos antes de cualquier compra?", "answer": "¿Podemos resolver esta necesidad con la infraestructura que ya tenemos? Si la respuesta es sí, se optimiza lo existente.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        10: [
            {"id": "comp-10-1", "category": "inversor", "question": "¿Cuál es el resumen ejecutivo final para la toma de decisiones?", "answer": "La infraestructura deja de ser un gasto tecnológico y se convierte en una inversión en capacidad productiva, comercial y operativa que respalda el crecimiento de 3i Baird Lab.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "comp-10-2", "category": "nota", "question": "Nota de cierre: Llamado a la acción", "answer": "Concluir reforzando la ruta: 'Primero tracción comercial con lo que tenemos; luego escalamiento rentable con continuidad 24/7'.", "pinned": False, "timestamp": "Preset 3i"}
        ]
    },
    "restaurante": {
        1: [
            {"id": "rest-1-1", "category": "inversor", "question": "¿Por qué un dueño de restaurante pagaría por Arcana en vez de confiar en su POS actual?", "answer": "El POS solo registra lo que el cajero quiere tipear. Arcana audita la realidad física (básculas, neveras, consumos) y detecta comandas canceladas fraudulentamente o ventas no registradas.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "rest-1-2", "category": "operativa", "question": "¿Requiere reemplazar el software o hardware de punto de venta existente?", "answer": "No. Arcana funciona de manera no invasiva conectándose al flujo de red, impresoras de comandas y sensores externos sin alterar el POS del local.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        2: [
            {"id": "rest-2-1", "category": "inversor", "question": "¿Cómo se traduce una fuga del 4% en el 50-100% de la utilidad anual del restaurante?", "answer": "Dado que los márgenes netos del sector gastronómico oscilan entre el 3% y el 8%, cualquier fuga directa sobre ingresos brutos consume la totalidad de la ganancia limpia del dueño.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "rest-2-2", "category": "objecion", "question": "¿No basta con poner más cámaras de seguridad tradicionales CCTV?", "answer": "Las cámaras convencionales graban terabytes sin correlación. Nadie revisa 12 horas de video diario. Arcana correlaciona eventos exactos con marcas de tiempo e incongruencias de ticket.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        3: [
            {"id": "rest-3-1", "category": "operativa", "question": "¿Cuáles son los 5 vectores del marco F.A.C.E.S. en la práctica?", "answer": "1) Facturación y tickets, 2) Almacén y compras, 3) Cocina y recetas estándar, 4) Efectivo y arqueos, 5) Salidas no autorizadas o mermas.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        4: [
            {"id": "rest-4-1", "category": "inversor", "question": "¿Cuál es la propuesta de valor para el dueño en una sola frase?", "answer": "Demostrar matemáticamente lo comprado, cocinado y vendido sin necesidad de vivir vigilando encima del local.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        5: [
            {"id": "rest-5-1", "category": "operativa", "question": "¿Cómo se evitan manipulaciones en los sensores IoT?", "answer": "Cada microcontrolador firma criptográficamente las lecturas en hardware antes de transmitirlas, impidiendo la alteración de datos por parte del personal.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        6: [
            {"id": "rest-6-1", "category": "operativa", "question": "¿Qué pasa si se cae el Internet en el restaurante?", "answer": "Los nodos IoT almacenan las lecturas cifradas localmente en memoria no volátil y sincronizan automáticamente en cuanto se restablece la conexión.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        7: [
            {"id": "rest-7-1", "category": "inversor", "question": "¿Por qué un protocolo de cierre diario inalterable en blockchain?", "answer": "Porque elimina discrepancias contables entre socios e inversionistas: nadie puede modificar los números de ventas ni costos una vez cerrado el turno.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        8: [
            {"id": "rest-8-1", "category": "operativa", "question": "¿Cómo se realiza la liquidación y reparto de utilidades?", "answer": "Mediante reglas automáticas de split en smart contracts que liquidan diariamente o semanalmente en stablecoins (USDC) o transferencias bancarias directas.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        9: [
            {"id": "rest-9-1", "category": "nota", "question": "Nota del presentador: Telemetría móvil para el propietario", "answer": "Mostrar cómo el dueño recibe alertas directas en Telegram/WhatsApp cuando hay una discrepancia mayor al 2% entre peso de insumos y tickets.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        10: [
            {"id": "rest-10-1", "category": "inversor", "question": "¿Cuál es el tiempo de retorno de inversión (ROI) estimado para el piloto inicial?", "answer": "El piloto se amortiza en menos de 45 días al recuperar un promedio de $1,200 a $3,500 USD mensuales en mermas y fraudes detectados por sucursal.", "pinned": True, "timestamp": "Preset 3i"}
        ]
    },
    "fastfood": {
        1: [
            {"id": "ff-1-1", "category": "inversor", "question": "¿Cuál es el margen operativo unitario proyectado del local automatizado?", "answer": "Entre 28% y 34% de EBITDA gracias a la reducción del 60% de mano de obra en cocina y reducción de desperdicio a menos del 1.5%.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "ff-1-2", "category": "nota", "question": "Nota del presentador: Tesis Smart QSR", "answer": "El futuro de la comida rápida es la ingeniería de precisión: estandarización milimétrica de ingredientes y tiempos de horneado exactos.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        2: [
            {"id": "ff-2-1", "category": "inversor", "question": "¿Cuáles son las 3 ineficiencias críticas que destruyen el margen tradicional?", "answer": "1) Alta rotación y costo laboral en cocina, 2) Variabilidad en porciones y desperdicio de insumos, 3) Cuellos de botella en horas pico.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        3: [
            {"id": "ff-3-1", "category": "operativa", "question": "¿Cómo opera el horno continuo de alta velocidad en horas pico?", "answer": "Cocción automatizada por cinta transportadora calibrada que hornea una pizza cada 120 segundos sin intervención manual en el proceso térmico.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        4: [
            {"id": "ff-4-1", "category": "inversor", "question": "¿Comparativa directa con franquicias tradicionales?", "answer": "40% menor Capex de apertura, 65% menos personal en cocina y punto de equilibrio alcanzable con solo 60 pedidos diarios.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        5: [
            {"id": "ff-5-1", "category": "nota", "question": "Nota: ¿Por qué Cúcuta como ciudad piloto?", "answer": "Costos operativos eficientes, alta densidad de consumo de comida rápida y mercado ideal para validar la ingeniería antes de escalar a Bogotá y Medellín.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        6: [
            {"id": "ff-6-1", "category": "operativa", "question": "¿Qué equipamiento automatizado compone la cocina?", "answer": "Prensas neumáticas de masa, dosificadores volumétricos de salsa y queso, y hornos de túnel continuo con control PID.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        7: [
            {"id": "ff-7-1", "category": "operativa", "question": "¿Cómo se gestiona el inventario en tiempo real?", "answer": "Básculas conectadas por IoT descuentan automáticamente gramos de queso, masa y proteínas con cada orden emitida en el KDS.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        8: [
            {"id": "ff-8-1", "category": "inversor", "question": "¿Cuál es el costo unitario de producto (Food Cost)?", "answer": "Estandarizado en 26% de costo de materia prima gracias a cero sobreporciones y compras centralizadas de insumos.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        9: [
            {"id": "ff-9-1", "category": "nota", "question": "Nota: Experiencia del cliente y rapidez", "answer": "Tiempo promedio desde que el cliente ordena en el kiosco hasta la entrega en mano: menos de 3.5 minutos.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        10: [
            {"id": "ff-10-1", "category": "inversor", "question": "¿Cómo es el modelo de expansión de la franquicia?", "answer": "Locales compactos tipo Dark Kitchen y Express (35–50 m2) con bajo arriendo y rápido despliegue modular.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        11: [
            {"id": "ff-11-1", "category": "inversor", "question": "¿Tamaño del mercado objetivo accesible (TAM/SAM)?", "answer": "Mercado QSR regional de pizza y comida rápida superior a $450M USD en ciudades intermedias de Colombia.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        12: [
            {"id": "ff-12-1", "category": "operativa", "question": "¿Mantenimiento preventivo del equipamiento?", "answer": "Telemetría IoT predice desgaste de resistencias, motores de cinta y sensores de temperatura antes de que ocurra una falla.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        13: [
            {"id": "ff-13-1", "category": "nota", "question": "Nota: Hoja de ruta a 12 meses", "answer": "Mes 1-3: Piloto insignia. Mes 4-6: Apertura de 3 locales propios. Mes 7-12: Franquiciamiento a operadores terceros.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        14: [
            {"id": "ff-14-1", "category": "inversor", "question": "¿Monto de la ronda de inversión y asignación de fondos?", "answer": "Ronda Semilla de $120,000 USD destinada a equipamiento de cocina automatizada (55%), adecuación del local (25%) y capital de trabajo (20%).", "pinned": True, "timestamp": "Preset 3i"}
        ],
        15: [
            {"id": "ff-15-1", "category": "inversor", "question": "¿Cierre ejecutivo y retorno para el inversionista?", "answer": "ROI proyectado de 22 meses con distribución trimestral de dividendos y valorización de la marca franquiciable.", "pinned": True, "timestamp": "Preset 3i"}
        ]
    },
    "tutor": {
        1: [
            {"id": "tut-1-1", "category": "inversor", "question": "¿Por qué un sistema Multi-Agente supera a ChatGPT / Claude estándar para educación?", "answer": "Los LLMs genéricos resuelven la tarea por el alumno. El sistema 3i tiene agentes especializados en pedagogía socrática que guían paso a paso y evalúan comprensión real.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "tut-1-2", "category": "nota", "question": "Nota del presentador: Enfoque DeepTech", "answer": "Subrayar que no somos un simple wrapper de OpenAI; contamos con grafos de conocimiento y memoria persistente en 3 niveles.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        2: [
            {"id": "tut-2-1", "category": "inversor", "question": "¿Cuál es el cuello de botella de $300B en educación?", "answer": "El 85% de los estudiantes que usan chatbots tradicionales experimentan una falsa sensación de aprendizaje sin retención a largo plazo.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        3: [
            {"id": "tut-3-1", "category": "operativa", "question": "¿Cómo funciona la arquitectura socrática multi-agente?", "answer": "El Agente Pedagogo formula preguntas guiadas; el Agente Evaluador mide comprensión; el Agente Psicólogo ajusta el tono motivacional según la frustración del estudiante.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        4: [
            {"id": "tut-4-1", "category": "inversor", "question": "¿Ventaja competitiva frente a Khan Academy o Duolingo?", "answer": "Adaptabilidad en tiempo real a currículos universitarios y corporativos complejos con verificación criptográfica de dominio de conceptos.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        5: [
            {"id": "tut-5-1", "category": "operativa", "question": "¿Cuáles son las 4 escuadras de agentes?", "answer": "1. Escuadra de Diagnóstico, 2. Escuadra Pedagógica, 3. Escuadra de Verificación STEM, 4. Escuadra de Síntesis y Memoria.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        6: [
            {"id": "tut-6-1", "category": "operativa", "question": "¿Cómo opera la memoria en 3 capas?", "answer": "Capa 1: Contexto de sesión activa. Capa 2: Grafo de conceptos dominados del estudiante. Capa 3: Memoria episódica a largo plazo de vacíos cognitivos.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        7: [
            {"id": "tut-7-1", "category": "nota", "question": "Nota: Grafos de conocimiento dinámicos", "answer": "Explicar cómo el tutor identifica si un estudiante falla en cálculo porque en realidad tiene un vacío previo en factorización algebraica.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        8: [
            {"id": "tut-8-1", "category": "inversor", "question": "¿Qué es la Prueba Verificable de Dominio (Proof-of-Mastery)?", "answer": "Credenciales emitidas en base a resolución autónoma de problemas sin trampas, validables por empleadores y universidades.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        9: [
            {"id": "tut-9-1", "category": "operativa", "question": "¿Stack tecnológico de la infraestructura?", "answer": "Orquestación en LangGraph/LlamaIndex, base de datos vectorial Qdrant, almacenamiento en grafos Neo4j e inferencia híbrida.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        10: [
            {"id": "tut-10-1", "category": "inversor", "question": "¿Tamaño del mercado EdTech accesible?", "answer": "$180B USD en los 3 niveles: K-12, Educación Superior y Reskilling corporativo B2B.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        11: [
            {"id": "tut-11-1", "category": "inversor", "question": "¿Modelo de monetización?", "answer": "SaaS recurrente B2C ($19/mes por estudiante) y licencias institucionales B2B ($8/alumno/mes para colegios y universidades).", "pinned": True, "timestamp": "Preset 3i"}
        ],
        12: [
            {"id": "tut-12-1", "category": "nota", "question": "Nota: Métricas de tracción inicial", "answer": "Piloto con más de 1,200 estudiantes activos con una retención mensual del 78% y mejora del 34% en calificaciones de exámenes.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        13: [
            {"id": "tut-13-1", "category": "nota", "question": "Nota: Hoja de ruta estratégica a 18 meses", "answer": "Fase 1: Dominio de STEM y programación. Fase 2: Expansión a idiomas y ciencias humanas. Fase 3: Integración con plataformas universitarias LMS.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        14: [
            {"id": "tut-14-1", "category": "inversor", "question": "¿Ronda de inversión Semilla?", "answer": "Buscamos $1.2M USD para perfeccionamiento del motor multi-agente (50%), expansión comercial B2B (35%) y operaciones (15%).", "pinned": True, "timestamp": "Preset 3i"}
        ],
        15: [
            {"id": "tut-15-1", "category": "inversor", "question": "¿Cierre ejecutivo de la visión?", "answer": "Estamos construyendo la infraestructura de inteligencia artificial que democratizará la tutoría de élite personalizada para millones de personas.", "pinned": True, "timestamp": "Preset 3i"}
        ]
    },
    "arcana": {
        1: [
            {"id": "arc-1-1", "category": "inversor", "question": "¿Por qué anclar la contabilidad en Polygon en lugar de una base de datos PostgreSQL tradicional?", "answer": "Porque garantiza inmutabilidad criptográfica. Ni el dueño de la franquicia ni el franquiciado pueden alterar los registros de ventas y repartos una vez firmados por las máquinas.", "pinned": True, "timestamp": "Preset 3i"},
            {"id": "arc-1-2", "category": "nota", "question": "Nota del presentador: Confianza por Construcción", "answer": "Enfatizar el concepto: 'No le pidas al inversor que confíe en personas; dale un sistema donde las máquinas firman la verdad matemática'.", "pinned": False, "timestamp": "Preset 3i"}
        ],
        2: [
            {"id": "arc-2-1", "category": "inversor", "question": "¿Cuál es el problema central entre franquiciador y franquiciado?", "answer": "La asimetría de información: el inversionista pasivo no está en el local y sospecha de sub-declaración de ventas, mientras el operador resiente la fiscalización constante.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        3: [
            {"id": "arc-3-1", "category": "nota", "question": "Nota: Tesis de inversión de Arcana", "answer": "Transformar cada local comercial en un libro contable auditable en tiempo real mediante sensores IoT no manipulables.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        4: [
            {"id": "arc-4-1", "category": "operativa", "question": "¿Qué es Arcana y qué NO es?", "answer": "Arcana ES una capa de auditoría física y liquidación automática. NO es un software contable tradicional ni un punto de venta más.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        5: [
            {"id": "arc-5-1", "category": "operativa", "question": "¿Cómo garantizan que el hardware IoT sea inviolable?", "answer": "Chips con enclave criptográfico seguro que firman cada paquete de telemetría con clave privada embebida en silicio.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        6: [
            {"id": "arc-6-1", "category": "operativa", "question": "¿Cómo funciona el motor de correlación de fraude multi-vector?", "answer": "Cruza simultáneamente aperturas de gaveta de dinero, peso de insumos consumidos y tickets emitidos para detectar transacciones fantasma.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        7: [
            {"id": "arc-7-1", "category": "operativa", "question": "¿Cómo es el protocolo de cierre diario en Polygon?", "answer": "Al terminar la jornada, se genera un hash criptográfico con todos los eventos del día y se acuña en la blockchain con costo de transacción despreciable.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        8: [
            {"id": "arc-8-1", "category": "inversor", "question": "¿Cómo se realiza la liquidación de regalías y utilidades en USDC?", "answer": "Smart contracts ejecutan la distribución inmediata de porcentajes pactados hacia las billeteras o cuentas de los socios sin intermediación humana.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        9: [
            {"id": "arc-9-1", "category": "nota", "question": "Nota: Dashboard del Inversionista en tiempo real", "answer": "Demostrar cómo el inversor abre su app móvil y ve la facturación en vivo de 10 locales sincronizados con prueba criptográfica.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        10: [
            {"id": "arc-10-1", "category": "inversor", "question": "¿Modelo de negocio y monetización de Arcana?", "answer": "SaaS recurrente por local ($99 USD/mes) + Take-rate del 0.75% sobre las liquidaciones procesadas a través del protocolo.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        11: [
            {"id": "arc-11-1", "category": "inversor", "question": "¿Tamaño del mercado de franquicias?", "answer": "Mercado global de franquicias superior a $800B USD con más de 750,000 establecimientos que sufren problemas de auditoría y confianza.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        12: [
            {"id": "arc-12-1", "category": "nota", "question": "Nota: Primera integración insignia con Smart Fast-Food", "answer": "El piloto con la cadena Smart Fast-Food de 3i Baird Lab sirve como caso de éxito validado para vender la solución a terceros.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        13: [
            {"id": "arc-13-1", "category": "nota", "question": "Nota: Hoja de ruta estratégica", "answer": "De 1 local piloto a 20 locales en 6 meses, escalando a más de 100 franquicias conectadas en el mes 18.", "pinned": True, "timestamp": "Preset 3i"}
        ],
        14: [
            {"id": "arc-14-1", "category": "inversor", "question": "¿Ronda Semilla de Inversión?", "answer": "Ronda de $750,000 USD para desarrollo de firmware IoT (40%), auditorías de smart contracts (25%) y despliegue comercial (35%).", "pinned": True, "timestamp": "Preset 3i"}
        ],
        15: [
            {"id": "arc-15-1", "category": "inversor", "question": "¿Cierre ejecutivo de Arcana Trust Network?", "answer": "El futuro de las inversiones en franquicias es verificable. Convertimos negocios físicos en activos líquidos, auditables y transparentes.", "pinned": True, "timestamp": "Preset 3i"}
        ]
    }
}

def update_app_js():
    root = Path('.')
    app_file = root / 'app.js'
    code = app_file.read_text(encoding='utf-8')

    # Convert dictionary to pretty formatted JS object
    js_qa_str = "const CURATED_SLIDE_QA = " + json.dumps(CURATED_SLIDE_QA, indent=2, ensure_ascii=False) + ";"

    # Regex replace CURATED_SLIDE_QA block
    pattern = r"const CURATED_SLIDE_QA = \{[\s\S]*?\n\};\n\nfunction getActiveLang"
    replacement = js_qa_str + "\n\nfunction getActiveLang"

    if re.search(pattern, code):
        new_code = re.sub(pattern, replacement, code)
        app_file.write_text(new_code, encoding='utf-8')
        print("app.js updated successfully with comprehensive CURATED_SLIDE_QA for all 5 decks and all slides!")
    else:
        print("Could not match CURATED_SLIDE_QA pattern in app.js!")

if __name__ == "__main__":
    update_app_js()
