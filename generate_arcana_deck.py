# -*- coding: utf-8 -*-
"""
Generate complete bilingual dataset for Deck 3: Arcana (39 slides).
Topic: Arcana - Accounting that cannot be lied about.
Trust network for franchises and remote investors: Signed IoT, daily close, Polygon + USDC settlement.
"""

import json

slides_data = [
    {
        "id": 1,
        "tag_en": "INVESTOR PRESENTATION",
        "tag_es": "PRESENTACIÓN PARA INVERSORES",
        "title_en": "Arcana: Trust by Construction",
        "title_es": "Arcana: Contabilidad Inalterable",
        "subtitle_en": "Accounting that cannot be lied about. A trust network for franchises and remote investors: Signed IoT inside the store, auditable daily close, and instant settlement on Polygon backed by USDC.",
        "subtitle_es": "Contabilidad imposible de falsear. Una red de confianza para franquicias e inversionistas remotos: IoT firmado dentro del local, cierre diario auditable y liquidación en Polygon respaldada por USDC.",
        "flow_en": ["Store IoT Sensors", "Cryptographic Signatures", "Multi-Point Correlation", "Polygon Daily Close", "USDC Settlement"],
        "flow_es": ["Sensores IoT en Local", "Firmas Criptográficas", "Correlación Multi-Punto", "Cierre Diario en Polygon", "Liquidación en USDC"],
        "badge_en": "Trust Network · Web3 & IoT",
        "badge_es": "Red de Confianza · Web3 e IoT",
        "category": "hero",
        "image": "extracted_media_arcana/image1.png"
    },
    {
        "id": 2,
        "num": "01",
        "category_en": "THE CORE PROBLEM",
        "category_es": "EL PROBLEMA CENTRAL",
        "title_en": "The Problem in One Sentence",
        "title_es": "El Problema en Una Sola Frase",
        "lead_en": "“The investor does not see the store. The store manager does.”",
        "lead_es": "“El inversionista no ve el local. El administrador sí.”",
        "pillars_en": [
            {"title": "Underreported Sales", "desc": "Cash transactions omitted from reports or cancelled after the customer leaves."},
            {"title": "Disappearing Inventory", "desc": "High-value ingredients vanish without trace between delivery and preparation."},
            {"title": "Supplier Shortages", "desc": "Suppliers deliver less weight or lower grade than invoiced, pocketing the difference."},
            {"title": "Editable POS & Excel Reports", "desc": "Traditional accounting relies on human-edited spreadsheets and modifiable registers."}
        ],
        "pillars_es": [
            {"title": "Ventas No Reportadas", "desc": "Cobros en efectivo omitidos de los reportes o anulados tras la salida del cliente."},
            {"title": "Inventario que Desaparece", "desc": "Insumos de alto valor se evaporan sin rastro entre la entrega y la preparación."},
            {"title": "Mermas de Proveedores", "desc": "Proveedores entregan menos peso o menor calidad que lo facturado formalmente."},
            {"title": "Reportes Modificables en Excel", "desc": "La contabilidad tradicional depende de hojas de cálculo editables por humanos."}
        ],
        "image": "extracted_media_arcana/image2.png",
        "punchline_en": "Today trust is human and vulnerable. Tomorrow it must be verifiable.",
        "punchline_es": "Hoy la confianza es humana y vulnerable. Mañana debe ser verificable."
    },
    {
        "id": 3,
        "num": "02",
        "category_en": "ECONOMIC IMPACT",
        "category_es": "IMPACTO ECONÓMICO",
        "title_en": "The Cost of Not Knowing: Everyone Loses",
        "title_es": "El Costo de No Saber: Todos Pierden",
        "lead_en": "When physical operational evidence is not correlated, the entire franchise ecosystem breaks down.",
        "lead_es": "Cuando la evidencia física no se correlaciona, todo el ecosistema de franquicias se deteriora.",
        "comparison": [
            {"aspect_en": "Remote Investor", "aspect_es": "Inversionista Remoto", "bot_en": "Blindly accepts reports", "bot_es": "Acepta reportes a ciegas", "tutor_en": "Receives real audited yields", "tutor_es": "Recibe rendimientos auditados reales"},
            {"aspect_en": "Franchise Brand", "aspect_es": "Marca Franquiciadora", "bot_en": "Brand dilution & friction", "bot_es": "Desprestigio y fricciones legales", "tutor_en": "Guaranteed auditability", "tutor_es": "Auditabilidad y reputación blindada"},
            {"aspect_en": "Honest Store Manager", "aspect_es": "Administrador Honesto", "bot_en": "Cannot prove excellence", "bot_es": "No puede probar su buena gestión", "tutor_en": "Objective cryptographic proof", "tutor_es": "Prueba criptográfica de excelencia"},
            {"aspect_en": "End Customer", "aspect_es": "Consumidor Final", "bot_en": "Inconsistent portions & cold chain", "bot_es": "Porciones y cadena de frío dudosas", "tutor_en": "Audited freshness & safety", "tutor_es": "Frescura y seguridad trazables"}
        ],
        "image": "extracted_media_arcana/image2.png",
        "punchline_en": "Verifiable trust removes friction and unlocks institutional capital.",
        "punchline_es": "La confianza verificable elimina fricciones y desbloquea capital institucional."
    },
    {
        "id": 4,
        "num": "03",
        "category_en": "INVESTMENT THESIS",
        "category_es": "TESIS DE INVERSIÓN",
        "title_en": "The Investment Thesis: Physical Books Signed by Machines",
        "title_es": "La Tesis de Inversión: Libros Contables Firmados por Máquinas",
        "lead_en": "Arcana turns each physical commercial location into an immutable accounting ledger signed by hardware devices.",
        "lead_es": "Arcana convierte cada local comercial en un libro contable inmutable firmado por dispositivos de hardware.",
        "cards_en": [
            {"title": "Physical Operational Traces", "desc": "What is bought, stored, weighed, cooked, and dispensed leaves an unforgeable hardware footprint."},
            {"title": "Multi-Device Consensus", "desc": "Multiple independent IoT nodes (scales, energy meters, thermal cameras) must agree before validating a sale."},
            {"title": "Anchored on Polygon", "desc": "At daily close, mathematical proofs are notarized on the Polygon blockchain for fractions of a cent."},
            {"title": "Remote Trustless Auditing", "desc": "Investors audit real revenue and equipment status in real time from anywhere in the world."}
        ],
        "cards_es": [
            {"title": "Rastro Físico de Operación", "desc": "Lo comprado, almacenado, pesado, cocinado y servido deja una huella de hardware infalsificable."},
            {"title": "Consenso Multi-Dispositivo", "desc": "Múltiples nodos IoT independientes (básculas, medidores de luz, sensores térmicos) deben coincidir."},
            {"title": "Sellado en Polygon", "desc": "Al cierre diario, las pruebas matemáticas se notarizan en la blockchain Polygon por centavos."},
            {"title": "Auditoría Remota en Tiempo Real", "desc": "Los inversionistas auditan ventas reales y estado de máquinas desde cualquier parte del mundo."}
        ],
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "Audit the store without being physically present.",
        "punchline_es": "Audita el local comercial sin necesidad de estar presente."
    },
    {
        "id": 5,
        "num": "04",
        "category_en": "SCOPE & BOUNDARIES",
        "category_es": "ALCANCE Y LÍMITES",
        "title_en": "What Arcana Is — And What It Is Not",
        "title_es": "Qué Es Arcana — Y Qué No Es",
        "lead_en": "Clear institutional scope focused strictly on operational auditability and settlement.",
        "lead_es": "Alcance institucional claro enfocado estrictamente en auditabilidad operativa y liquidación.",
        "comparison": [
            {"aspect_en": "Distributed Accounting", "aspect_es": "Contabilidad Distribuida", "bot_en": "IS NOT: A speculative cryptocurrency", "bot_es": "NO ES: Una criptomoneda especulativa", "tutor_en": "IS: Tamper-proof store ledger", "tutor_es": "SÍ ES: Libro contable inalterable"},
            {"aspect_en": "IoT Sensor Mesh", "aspect_es": "Malla de Sensores IoT", "bot_en": "IS NOT: A replacement for point-of-sale", "bot_es": "NO ES: Un reemplazo del software POS", "tutor_en": "IS: Independent hardware validation", "tutor_es": "SÍ ES: Validación de hardware independiente"},
            {"aspect_en": "Settlement Token", "aspect_es": "Token de Liquidación", "bot_en": "IS NOT: A volatile traded memecoin", "bot_es": "NO ES: Un memecoin volátil de exchange", "tutor_en": "IS: 1:1 USDC-backed internal unit", "tutor_es": "SÍ ES: Unidad respaldada 1:1 por USDC"},
            {"aspect_en": "Automated Contracts", "aspect_es": "Contratos Automatizados", "bot_en": "IS NOT: A complex payroll tool", "bot_es": "NO ES: Un sistema de nómina complejo", "tutor_en": "IS: Deterministic yield distribution", "tutor_es": "SÍ ES: Reparto determinista de dividendos"}
        ],
        "image": "extracted_media_arcana/image4.png",
        "punchline_en": "Enterprise-grade financial infrastructure for real physical assets.",
        "punchline_es": "Infraestructura financiera de nivel empresarial para activos físicos reales."
    },
    {
        "id": 6,
        "num": "05",
        "category_en": "TECHNICAL GLOSSARY",
        "category_es": "GLOSARIO TÉCNICO",
        "title_en": "Executive Technology Vocabulary",
        "title_es": "Vocabulario Tecnológico Ejecutivo",
        "lead_en": "One-minute reference guide to understand the underlying infrastructure.",
        "lead_es": "Guía rápida de un minuto para entender la infraestructura subyacente.",
        "cards_en": [
            {"title": "Blockchain", "desc": "A public ledger replicated across thousands of independent nodes that cannot be erased quietly."},
            {"title": "Polygon", "desc": "A fast, low-cost Layer-2 network where Arcana seals daily transaction proofs for cents."},
            {"title": "USDC", "desc": "A fully-reserved digital dollar issued by Circle, backed 1:1 with real USD cash and treasury bonds."},
            {"title": "Signed ESP32 / IoT", "desc": "Industrial microcontrollers embedded in equipment with secure cryptochips that digitally sign data."}
        ],
        "cards_es": [
            {"title": "Blockchain", "desc": "Un libro contable público replicado en miles de nodos que es imposible de alterar a escondidas."},
            {"title": "Polygon", "desc": "Una red de capa 2 rápida y económica donde Arcana sella los cierres diarios por centavos."},
            {"title": "USDC", "desc": "Un dólar digital regulado emitido por Circle, respaldado 1:1 por depósitos bancarios reales en USD."},
            {"title": "ESP32 / IoT Firmado", "desc": "Microcomputadores industriales en la maquinaria con chips criptográficos que firman datos."}
        ],
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "Simple technologies orchestrated into an unshakeable security mesh.",
        "punchline_es": "Tecnologías sencillas orquestadas en una malla de seguridad inquebrantable."
    },
    {
        "id": 7,
        "num": "06",
        "category_en": "BLOCKCHAIN PRIMER",
        "category_es": "CONCEPTOS · BLOCKCHAIN",
        "title_en": "What is a Blockchain? A Ledger Copied Everywhere",
        "title_es": "¿Qué es una Blockchain? Un Libro Replicado en Todas Partes",
        "lead_en": "In Excel, someone can quietly delete a row. On a blockchain, all copies must agree.",
        "lead_es": "En Excel cualquiera puede borrar una fila en silencio. En una blockchain todas las copias deben coincidir.",
        "features_en": [
            "Every new transaction batch is cryptographically linked to the previous one",
            "Tampering with past records requires computing power greater than the entire global network",
            "Public auditability allows anyone with an explorer to verify cryptographic validity",
            "Eliminates trust in individual human bookkeepers and replaces it with mathematical consensus"
        ],
        "features_es": [
            "Cada nuevo lote de transacciones se enlaza criptográficamente con el anterior",
            "Alterar registros pasados requeriría hackear miles de computadores simultáneamente",
            "La auditabilidad pública permite a cualquier auditor verificar la validez matemática",
            "Elimina la dependencia de la buena fe humana y la sustituye por consenso matemático"
        ],
        "diagram_en": [
            {"label": "Immutable", "detail": "Records cannot be edited or deleted retroactively"},
            {"label": "Decentralized", "detail": "Thousands of validators maintain the same ledger state"},
            {"label": "Auditable", "detail": "24/7 public cryptographic verification"}
        ],
        "diagram_es": [
            {"label": "Inmutable", "detail": "Los registros no pueden editarse ni borrarse hacia atrás"},
            {"label": "Descentralizado", "detail": "Miles de validadores mantienen el mismo estado contable"},
            {"label": "Auditable", "detail": "Verificación criptográfica pública 24/7"}
        ],
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "A ledger that is impossible to tamper with.",
        "punchline_es": "Un libro contable imposible de manipular."
    },
    {
        "id": 8,
        "num": "07",
        "category_en": "SETTLEMENT LAYER",
        "category_es": "CAPA DE LIQUIDACIÓN",
        "title_en": "Why Polygon? High Speed, Negligible Costs",
        "title_es": "¿Por qué Polygon? Alta Velocidad y Costos Mínimos",
        "lead_en": "Polygon acts as the digital notary of the day for fractions of a cent per store.",
        "lead_es": "Polygon actúa como el notario digital del día por fracciones de centavo por local.",
        "cards_en": [
            {"title": "Ethereum Compatibility", "desc": "Full EVM smart contract support with robust tooling and institutional security."},
            {"title": "Sub-Cent Gas Fees", "desc": "A daily store notarization costs < $0.02 USD, compared to $10+ on Ethereum mainnet."},
            {"title": "2-Second Finality", "desc": "Fast block times enable rapid settlement of daily cash flows and investor payouts."},
            {"title": "Store Decoupling", "desc": "Food is cooked in the physical kitchen; Polygon only acts as the notary of daily close."}
        ],
        "cards_es": [
            {"title": "Compatibilidad con Ethereum", "desc": "Soporte total de contratos inteligentes EVM con seguridad probada a nivel global."},
            {"title": "Comisiones de Fracciones de Centavo", "desc": "Notarizar un cierre diario cuesta < $0.02 USD, frente a $10+ en Ethereum."},
            {"title": "Confirmación en 2 Segundos", "desc": "Bloques rápidos que permiten liquidar flujos de caja y pagar dividendos al instante."},
            {"title": "Operación Desacoplada", "desc": "La comida se cocina en el local físico; Polygon solo actúa como el notario del día."}
        ],
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "A daily seal costs cents, not a restaurant commission.",
        "punchline_es": "Un sello diario cuesta centavos, no la comisión de un restaurante."
    },
    {
        "id": 9,
        "num": "08",
        "category_en": "STABLE CURRENCY",
        "category_es": "MONEDA ESTABLE",
        "title_en": "USDC: The Digital Dollar for Global Settlement",
        "title_es": "USDC: El Dólar Digital para Liquidación Global",
        "lead_en": "A regulated, fully-reserved digital dollar designed for business payments without volatility.",
        "lead_es": "Un dólar digital regulado y totalmente respaldado diseñado para pagos comerciales sin volatilidad.",
        "features_en": [
            "1 USDC is backed 1:1 by short-dated US Treasuries and cash held in regulated custody",
            "Eliminates foreign exchange risk and cross-border bank wire fees for international investors",
            "Enables micro-distributions and daily dividend payouts directly to investor wallets",
            "Arcana does not create a speculative coin: real USDC backs all internal store units"
        ],
        "features_es": [
            "1 USDC está respaldado 1:1 por bonos del tesoro de EE.UU. y efectivo en bancos regulados",
            "Elimina el riesgo cambiario y los costosos giros bancarios internacionales",
            "Permite micro-distribuciones y pagos diarios de dividendos directo a billeteras",
            "Arcana no crea una moneda especulativa: USDC real respalda todas las unidades contables"
        ],
        "diagram_en": [
            {"label": "1:1 Dollar Peg", "detail": "Audited reserves by Deloitte / Grant Thornton"},
            {"label": "Instant Settlement", "detail": "Moves in seconds 24/7/365 without banking holidays"},
            {"label": "Zero Volatility", "detail": "Stable purchasing power for operating expenses"}
        ],
        "diagram_es": [
            {"label": "Paridad 1:1 con USD", "detail": "Reservas auditadas por firmas de primer nivel"},
            {"label": "Liquidación Inmediata", "detail": "Se transfiere en segundos 24/7/365 sin festivos bancarios"},
            {"label": "Cero Volatilidad", "detail": "Poder de compra estable para gastos operativos"}
        ],
        "image": "extracted_media_arcana/image5.png",
        "punchline_en": "Digital dollars in an open, verifiable vault.",
        "punchline_es": "Dólares digitales en una bóveda abierta y verificable."
    },
    {
        "id": 10,
        "num": "09",
        "category_en": "TOKENOMICS",
        "category_es": "TOKENÓMICA",
        "title_en": "Store Settlement Tokens (ERC-20)",
        "title_es": "Tokens de Liquidación del Local (ERC-20)",
        "lead_en": "A deterministic accounting unit with strict rules, not a speculative meme token.",
        "lead_es": "Una unidad contable determinista con reglas estrictas, no un token especulativo.",
        "cards_en": [
            {"title": "1 Token = 1 Gross USDC", "desc": "Tokens are minted strictly upon verified USDC deposits and burned upon redemption."},
            {"title": "Closed Settlement Loop", "desc": "Tokens cannot be traded on speculative open DEXs; they only exist to clear store debits."},
            {"title": "Automated Machine Debt", "desc": "Equipment leasing and operational costs are automatically deducted from daily token flows."},
            {"title": "Standard ERC-20 Protocol", "desc": "Uses standard smart contracts ('the PDF standard for money') for absolute compatibility."}
        ],
        "cards_es": [
            {"title": "1 Token = 1 USDC Bruto", "desc": "Los tokens se emiten únicamente tras depositar USDC real y se destruyen al liquidar."},
            {"title": "Circuito de Liquidación Cerrado", "desc": "No se transan en exchanges especulativos; solo existen para saldar deudas del local."},
            {"title": "Amortización de Maquinaria", "desc": "El arrendamiento de equipos e insumos se descuenta automáticamente del flujo diario."},
            {"title": "Estándar ERC-20", "desc": "Usa contratos estándar ('el formato PDF del dinero') para compatibilidad total."}
        ],
        "image": "extracted_media_arcana/image5.png",
        "punchline_en": "A mathematical accounting unit governed by code.",
        "punchline_es": "Una unidad contable matemática gobernada por código."
    },
    {
        "id": 11,
        "num": "10",
        "category_en": "SMART CONTRACTS",
        "category_es": "CONTRATOS INTELIGENTES",
        "title_en": "Smart Contracts: Executing Rules Without Human Exceptions",
        "title_es": "Contratos Inteligentes: Reglas Sin Excepciones Humanas",
        "lead_en": "Autonomous programs that enforce revenue distribution agreements without delays or excuses.",
        "lead_es": "Programas autónomos que ejecutan el reparto de ingresos pactado sin demoras ni excusas.",
        "features_en": [
            "Deployed on Polygon with open, auditable bytecode and parameters",
            "Prevents issuing more store tokens than deposited USDC reserves",
            "Splits daily revenue automatically: e.g. 70% to store OPEX, 20% to investors, 10% to franchise brand",
            "Eliminates funds diversion to unauthorized bank accounts"
        ],
        "features_es": [
            "Desplegados en Polygon con código abierto y reglas matemáticas auditables",
            "Impiden emitir más tokens de liquidación que las reservas reales depositadas en USDC",
            "Reparten el ingreso diario automáticamente: ej. 70% a OPEX, 20% a inversionistas, 10% a franquicia",
            "Eliminan el desvío de dinero a cuentas bancarias no autorizadas"
        ],
        "diagram_en": [
            {"label": "Immutable Code", "detail": "No manager can modify profit splits unilaterally"},
            {"label": "Automated Execution", "detail": "Triggered automatically upon daily close verification"},
            {"label": "Zero Intermediaries", "detail": "Direct settlement from store revenue to investor wallet"}
        ],
        "diagram_es": [
            {"label": "Código Inmutable", "detail": "Ningún administrador puede cambiar las comisiones unilateralmente"},
            {"label": "Ejecución Automática", "detail": "Se dispara de inmediato al verificar el cierre diario"},
            {"label": "Cero Intermediarios", "detail": "Liquidación directa desde el flujo de caja a la billetera del inversor"}
        ],
        "image": "extracted_media_arcana/image5.png",
        "punchline_en": "Analogy: A transparent vending machine for financial rules.",
        "punchline_es": "Analogía: Una máquina dispensadora transparente para reglas financieras."
    },
    {
        "id": 12,
        "num": "11",
        "category_en": "PHYSICAL ARCHITECTURE",
        "category_es": "ARQUITECTURA FÍSICA",
        "title_en": "Signed IoT Inside the Store: Hardware-Level Truth",
        "title_es": "IoT Firmado en el Local: Verdad a Nivel de Hardware",
        "lead_en": "Independent sensor nodes continuously observe physical actions and cryptographically sign data packets.",
        "lead_es": "Nodos de sensores independientes observan las acciones físicas y firman criptográficamente cada dato.",
        "cards_en": [
            {"title": "Cryptographic Key Storage", "desc": "Hardware security elements (ATECC608) store private keys securely; firmware cannot be cloned."},
            {"title": "Direct Physical Measurement", "desc": "Load cells measure ingredient weights; optical sensors count dispensed cups and boxes."},
            {"title": "Energy & Heat Monitoring", "desc": "Current transformers verify oven and griddle operating cycles vs. reported ticket volume."},
            {"title": "Signed Batch Telemetry", "desc": "Every 60 seconds, signed telemetry packets are encrypted and streamed to the local aggregator."}
        ],
        "cards_es": [
            {"title": "Chip Criptográfico Seguro", "desc": "Chips de seguridad (ATECC608) resguardan la llave privada; el firmware no puede ser clonado."},
            {"title": "Medición Física Directa", "desc": "Celdas de carga miden peso de insumos; sensores ópticos cuentan cajas y empaques."},
            {"title": "Monitoreo Eléctrico y Térmico", "desc": "Sensores de corriente verifican ciclos de hornos y planchas frente a tickets reportados."},
            {"title": "Telemetría Firmada", "desc": "Cada 60 segundos se transmiten paquetes encriptados y firmados al concentrador local."}
        ],
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "Hardware telemetry that cannot be manipulated via software.",
        "punchline_es": "Telemetría de hardware imposible de manipular por software."
    },
    {
        "id": 13,
        "num": "12",
        "category_en": "CORRELATION ENGINE",
        "category_es": "MOTOR DE CORRELACIÓN",
        "title_en": "Multi-Point Evidence Correlation",
        "title_es": "Correlación de Evidencia Multi-Punto",
        "lead_en": "A single manipulated sensor is useless: multiple independent physical vectors must corroborate.",
        "lead_es": "Un sensor alterado no sirve de nada: múltiples vectores físicos independientes deben coincidir.",
        "comparison": [
            {"aspect_en": "Ingredient Weight (Scale)", "aspect_es": "Peso de Insumos (Báscula)", "bot_en": "20kg flour + 10kg cheese consumed", "bot_es": "20kg harina + 10kg queso consumidos", "tutor_en": "Matches recipe BOM yields", "tutor_es": "Coincide con rendimiento de receta"},
            {"aspect_en": "Oven Electrical Current", "aspect_es": "Consumo Eléctrico de Horno", "bot_en": "2.4 kWh active heating consumed", "bot_es": "2.4 kWh de calentamiento activo", "tutor_en": "Correlates to 85 pizzas baked", "tutor_es": "Correlaciona con 85 pizzas horneadas"},
            {"aspect_en": "Packaging Optical Counter", "aspect_es": "Contador Óptico de Cajas", "bot_en": "85 boxes pulled from dispenser", "bot_es": "85 cajas extraídas del dispensador", "tutor_en": "Validates final physical units", "tutor_es": "Valida unidades físicas despachadas"},
            {"aspect_en": "POS Cashier Register", "aspect_es": "Caja Registradora POS", "bot_en": "85 orders logged and paid", "bot_es": "85 órdenes cobradas en sistema", "tutor_en": "Zero discrepancies detected", "tutor_es": "Cero discrepancias detectadas"}
        ],
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "Fraud requires compromising 4 separate hardware systems simultaneously.",
        "punchline_es": "El fraude requeriría alterar 4 sistemas de hardware independientes a la vez."
    },
    {
        "id": 14,
        "num": "13",
        "category_en": "DAILY CLOSE WORKFLOW",
        "category_es": "CIERRE DIARIO",
        "title_en": "The Immutable Daily Close Protocol",
        "title_es": "El Protocolo de Cierre Diario Inalterable",
        "lead_en": "At midnight, store data is aggregated, audited, hashed into a Merkle tree, and sealed on-chain.",
        "lead_es": "A medianoche, los datos se consolidan, auditan, empaquetan en un árbol de Merkle y se sellan en blockchain.",
        "steps_en": ["1. IoT Aggregation", "2. Anomaly Scoring", "3. Merkle Root Generation", "4. Polygon Contract Call", "5. USDC Yield Payout", "6. Investor Dashboard Sync"],
        "steps_es": ["1. Consolidación IoT", "2. Detección de Anomalías", "3. Generación Árbol Merkle", "4. Notarización en Polygon", "5. Reparto de Rendimientos", "6. Sincronización Dashboard"],
        "definition_en": "Merkle Root: A single cryptographic fingerprint representing millions of telemetry data points that proves none was altered.",
        "definition_es": "Raíz de Merkle: Una única huella criptográfica que resume millones de lecturas de sensores y demuestra que nada fue alterado.",
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "Every day is a closed, auditable cryptographic chapter.",
        "punchline_es": "Cada día es un capítulo contable cerrado e inalterable."
    },
    {
        "id": 15,
        "num": "14",
        "category_en": "INVESTOR EXPERIENCE",
        "category_es": "EXPERIENCIA DEL INVERSOR",
        "title_en": "The Investor Portal: Live Telemetry & Daily Payouts",
        "title_es": "El Portal del Inversionista: Telemetría y Pagos Diarios",
        "lead_en": "Remote investors track actual unit economics with complete transparency and receive daily USDC dividends.",
        "lead_es": "Los inversionistas remotos monitorean la economía real con total transparencia y reciben dividendos diarios en USDC.",
        "cards_en": [
            {"title": "Live Machine Status", "desc": "View real-time oven uptime, inventory depletion curves, and customer traffic counters."},
            {"title": "Automated Yield Payouts", "desc": "Contract splits daily net cash flow directly into the investor's crypto or custodial wallet."},
            {"title": "Cryptographic Proof Viewer", "desc": "One-click verification on Polygonscan proving that reported numbers match signed hardware data."},
            {"title": "Portfolio Aggregation", "desc": "Manage multiple store locations across different cities in a single unified dashboard."}
        ],
        "cards_es": [
            {"title": "Estado de Máquinas en Vivo", "desc": "Monitorea tiempo activo de hornos, curvas de insumos y tráfico de clientes en tiempo real."},
            {"title": "Pago Automatizado de Rendimientos", "desc": "El contrato transfiere la ganancia neta diaria directamente a la billetera del inversor."},
            {"title": "Verificador Criptográfico", "desc": "Acceso a Polygonscan con un clic para comprobar que los datos coinciden con el hardware."},
            {"title": "Gestión Multisede", "desc": "Supervisa múltiples locales en distintas ciudades desde un único panel centralizado."}
        ],
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "Invest remotely with total financial and operational clarity.",
        "punchline_es": "Invierte a distancia con total claridad operativa y financiera."
    },
    {
        "id": 16,
        "num": "15",
        "category_en": "VALUE CREATION",
        "category_es": "CREACIÓN DE VALOR",
        "title_en": "Monetization Model: B2B SaaS + Settlement Fees",
        "title_es": "Modelo de Negocio: SaaS B2B + Comisiones de Liquidación",
        "lead_en": "Three recurring revenue streams generated by hardware leasing, software licenses, and settlement volume.",
        "lead_es": "Tres fuentes recurrentes de ingresos: arrendamiento de hardware, licencias de software y volumen de liquidación.",
        "streams_en": [
            {"type": "Hardware & IoT Node Lease", "tier": "Per Store / Month", "desc": "$150–$300/mo hardware fee covering sensors, cryptographic gateways, and maintenance."},
            {"type": "SaaS Platform Subscription", "tier": "Franchisor & Investor", "desc": "$200/mo per location for real-time monitoring, anomaly alerts, and tax-ready audit logs."},
            {"type": "Settlement Volume Take-Rate", "tier": "Transaction Fee", "desc": "0.5% – 1.0% protocol fee on all gross USDC revenues settled through the smart contract."}
        ],
        "streams_es": [
            {"type": "Arrendamiento de Nodos IoT", "tier": "Por Local / Mes", "desc": "$150–$300 USD/mes cubriendo sensores, pasarelas criptográficas y mantenimiento."},
            {"type": "Suscripción a Plataforma SaaS", "tier": "Franquiciador e Inversor", "desc": "$200 USD/mes por sede para monitoreo en vivo, alertas de anomalías y reportes fiscales."},
            {"type": "Comisión de Liquidación", "tier": "Tarifa por Volumen", "desc": "0.5% a 1.0% de comisión sobre el volumen bruto de USDC liquidado por contrato."}
        ],
        "image": "extracted_media_arcana/image7.png",
        "punchline_en": "High-margin recurring revenues aligned with store sales volume.",
        "punchline_es": "Ingresos recurrentes de alto margen alineados con las ventas del local."
    },
    {
        "id": 17,
        "num": "16",
        "category_en": "MARKET OPPORTUNITY",
        "category_es": "OPORTUNIDAD DE MERCADO",
        "title_en": "Target Market: The $800B Global Franchise Industry",
        "title_es": "Mercado Objetivo: La Industria Global de Franquicias de $800B",
        "lead_en": "Initial beachhead in fast-food QSR and cloud kitchens, expanding to automated retail and hospitality.",
        "lead_es": "Enfoque inicial en comida rápida QSR y cocinas ocultas, expandiendo a retail automatizado y hotelería.",
        "segments_en": [
            {"title": "Multi-Unit QSR Franchises", "target": "Phase 1 Beachhead", "desc": "Franchisors struggling with underreported royalties and inventory theft across distributed stores."},
            {"title": "Remote Franchise Investors", "target": "High-Growth Niche", "desc": "Passive investors funding franchise units who demand real-time telemetry and guaranteed payout splits."},
            {"title": "Cloud Kitchen Operators", "target": "Phase 2 Expansion", "desc": "Shared commercial kitchens needing automated multi-tenant ingredient tracking and utility billing."},
            {"title": "Automated Vending & Retail", "target": "Phase 3 Enterprise", "desc": "Unmanned smart stores requiring trustless inventory reconciliation and immediate supplier payouts."}
        ],
        "segments_es": [
            {"title": "Franquicias QSR Multisede", "target": "Fase 1 Insignia", "desc": "Franquiciadores con problemas de regalías no reportadas y mermas en locales distribuidos."},
            {"title": "Inversionistas de Franquicias Remotos", "target": "Nicho en Alto Crecimiento", "desc": "Inversionistas pasivos que exigen telemetría en tiempo real y reparto garantizado de dividendos."},
            {"title": "Operadores de Dark Kitchens", "target": "Fase 2 Expansión", "desc": "Cocinas compartidas que requieren control de insumos por arrendatario y cobro de servicios."},
            {"title": "Retail y Vending Automatizado", "target": "Fase 3 Corporativa", "desc": "Tiendas autónomas inteligentes que requieren conciliación de inventario y pago a proveedores."}
        ],
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "A massive addressable market starved for cryptographic trust.",
        "punchline_es": "Un mercado gigantesco necesitado de confianza criptográfica."
    },
    {
        "id": 18,
        "num": "17",
        "category_en": "COMPETITIVE ADVANTAGE",
        "category_es": "VENTAJA COMPETITIVA",
        "title_en": "Our Sustainable Moat: Hardware + On-Chain Trust",
        "title_es": "Nuestro Foso Competitivo: Hardware + Confianza On-Chain",
        "lead_en": "Pure software accounting tools can be fooled. Pure IoT lacks settlement. Arcana unifies both.",
        "lead_es": "El software contable puro puede ser engañado. El IoT puro no liquida. Arcana une ambos mundos.",
        "comparison": [
            {"aspect_en": "Traditional Accounting (Excel/QuickBooks)", "aspect_es": "Contabilidad Tradicional (Excel/QuickBooks)", "bot_en": "Manually edited, post-facto spreadsheets", "bot_es": "Hojas editadas a mano después del hecho", "tutor_en": "Real-time hardware-signed ledger", "tutor_es": "Libro en tiempo real firmado por hardware"},
            {"aspect_en": "Point of Sale Systems (Toast/Square)", "aspect_es": "Sistemas de Punto de Venta (Toast/Square)", "bot_en": "Only sees what cashier inputs", "bot_es": "Solo ve lo que el cajero digita", "tutor_en": "Corroborates scales, heat & optical sensors", "tutor_es": "Corrobora básculas, calor y sensores ópticos"},
            {"aspect_en": "Generic IoT Dashboards", "aspect_es": "Paneles IoT Genéricos", "bot_en": "No financial settlement or blockchain", "bot_es": "Sin liquidación financiera ni blockchain", "tutor_en": "Automated Polygon smart contract payouts", "tutor_es": "Pagos automáticos por contrato en Polygon"},
            {"aspect_en": "Crypto Payment Gateways", "aspect_es": "Pasarelas Cripto Tradicionales", "bot_en": "Disconnected from physical kitchen reality", "bot_es": "Desconectadas de la realidad física", "tutor_en": "Full physical-to-digital correlation", "tutor_es": "Correlación física a digital integral"}
        ],
        "image": "extracted_media_arcana/image1.png",
        "punchline_en": "The intersection of physical IoT telemetry and financial smart contracts.",
        "punchline_es": "La intersección de la telemetría IoT física y los contratos inteligentes financieros."
    },
    {
        "id": 19,
        "num": "18",
        "category_en": "RISK & MITIGATION",
        "category_es": "RIESGO Y MITIGACIÓN",
        "title_en": "Risk Engineering: Fail-Safe Store Operations",
        "title_es": "Ingeniería de Riesgos: Operación Segura y Resiliente",
        "lead_en": "We systematically engineer how hardware tampering, power outages, and network failures are handled.",
        "lead_es": "Diseñamos sistemáticamente cómo se manejan sabotajes de hardware, cortes de luz y caídas de red.",
        "risks_en": [
            {"risk": "Physical Sensor Sabotage", "solution": "Multi-sensor correlation detects anomalies; disconnecting one node triggers instant fraud alert."},
            {"risk": "Internet Outages in Store", "solution": "Local hardware buffer stores cryptographically signed batches offline with battery backup."},
            {"risk": "Smart Contract Vulnerabilities", "solution": "Audited non-upgradeable core contracts with multi-sig emergency pauses and formal verification."},
            {"risk": "Regulatory & Stablecoin Shifts", "solution": "Uses compliant, fully-reserved USDC; architecture allows hot-swapping settlement tokens."},
            {"risk": "Manager Adoption Friction", "solution": "Sensors operate invisibly in background; zero extra manual steps required for kitchen staff."}
        ],
        "risks_es": [
            {"risk": "Sabotaje Físico de Sensores", "solution": "La correlación multi-sensor detecta anomalías; desconectar un nodo dispara una alerta de fraude."},
            {"risk": "Corte de Internet en Local", "solution": "Memoria interna local almacena paquetes firmados offline con batería de respaldo."},
            {"risk": "Vulnerabilidades en Contratos", "solution": "Contratos auditados con firmas múltiples de emergencia y verificación formal de código."},
            {"risk": "Cambios Regulatorios en Stablecoins", "solution": "Usa USDC regulado; la arquitectura permite cambiar el token de liquidación si es necesario."},
            {"risk": "Fricción con el Personal", "solution": "Los sensores operan de forma invisible; cero pasos adicionales para el equipo de cocina."}
        ],
        "image": "extracted_media_arcana/image4.png",
        "punchline_en": "We engineer for the messy physical world, not just a theoretical sandbox.",
        "punchline_es": "Diseñamos para el mundo físico real, no solo para un entorno teórico ideal."
    },
    {
        "id": 20,
        "num": "19",
        "category_en": "PILOT ROADMAP",
        "category_es": "HOJA DE RUTA",
        "title_en": "Execution Roadmap: From 5-Store Pilot to Scale",
        "title_es": "Hoja de Ruta: De Piloto de 5 Locales a Escala Masiva",
        "lead_en": "Disciplined rollout validating hardware reliability before expanding to franchise networks.",
        "lead_es": "Despliegue disciplinado validando la fiabilidad del hardware antes de expandir a redes de franquicias.",
        "phases_en": [
            {"phase": "PHASE 1 · FOUNDING PILOT (Months 1-3)", "focus": "5 QSR Pilot Stores", "milestones": ["Deploy sensor kits in 5 flagship pizza and quick-serve locations", "Validate daily Polygon notary seals and Merkle correlation accuracy", "Achieve 99.8% sensor uptime with zero false fraud positives"]},
            {"phase": "PHASE 2 · REGIONAL EXPANSION (Months 4-9)", "focus": "50 Franchise Units", "milestones": ["Launch remote investor portal with automated daily USDC dividends", "Integrate major POS vendors and industrial equipment manufacturers", "Onboard 3 regional franchise chains across Colombia and Mexico"]},
            {"phase": "PHASE 3 · SCALE & ENTERPRISE (Months 10-18)", "focus": "500+ Connected Locations", "milestones": ["Decentralize sensor oracle validator network", "Enterprise API integration for hospitality and cloud kitchen brands", "Series A expansion into North American franchise networks"]}
        ],
        "phases_es": [
            {"phase": "FASE 1 · PILOTO FUNDADOR (Meses 1-3)", "focus": "5 Locales Piloto QSR", "milestones": ["Instalar kits de sensores en 5 locales insignia de comida rápida", "Validar cierres diarios en Polygon y precisión del árbol de Merkle", "Alcanzar 99.8% de disponibilidad de sensores con cero falsos positivos"]},
            {"phase": "FASE 2 · EXPANSIÓN REGIONAL (Meses 4-9)", "focus": "50 Sedes Franquiciadas", "milestones": ["Lanzar portal para inversores con dividendos diarios automáticos en USDC", "Integrar principales proveedores de POS y fabricantes de maquinaria", "Sumar 3 cadenas de franquicias regionales en Colombia y México"]},
            {"phase": "FASE 3 · ESCALA CORPORATIVA (Meses 10-18)", "focus": "500+ Locales Conectados", "milestones": ["Descentralizar red de oráculos validadores de hardware", "API corporativa para marcas de hotelería y dark kitchens", "Expansión Serie A hacia redes de franquicias en Norteamérica"]}
        ],
        "image": "extracted_media_arcana/image7.png",
        "punchline_en": "Proving the economic flywheel store by store.",
        "punchline_es": "Demostrando el volante económico local por local."
    },
    {
        "id": 21,
        "num": "20",
        "category_en": "INVESTMENT ASK",
        "category_es": "SOLICITUD DE INVERSIÓN",
        "title_en": "Investment Ask & Use of Funds: Seed Round",
        "title_es": "Solicitud de Inversión y Uso de Fondos: Ronda Semilla",
        "lead_en": "Seeking $750k USD to manufacture 100 IoT sensor kits, finalize smart contract audits, and scale initial pilot cohorts.",
        "lead_es": "Buscamos $750k USD para fabricar 100 kits de sensores IoT, auditar contratos inteligentes y escalar la cohorte piloto.",
        "cards_en": [
            {"title": "40% · Hardware Engineering & Manufacturing", "desc": "Production of 100 industrial ESP32/ATECC608 sensor gateway kits with CE/FCC certification."},
            {"title": "30% · Software & Smart Contract Audits", "desc": "Formal verification of Polygon settlement contracts and investor portal development."},
            {"title": "20% · Commercial Franchise Onboarding", "desc": "Deploying dedicated onboarding engineers across initial partner franchise locations."},
            {"title": "10% · Legal, Compliance & Working Capital", "desc": "Regulatory compliance, international IP filing, and operational runway."}
        ],
        "cards_es": [
            {"title": "40% · Ingeniería y Fabricación de Hardware", "desc": "Producción de 100 kits de sensores industriales ESP32/ATECC608 certificados."},
            {"title": "30% · Software y Auditoría de Contratos", "desc": "Verificación formal de contratos en Polygon y desarrollo del portal de inversores."},
            {"title": "20% · Despliegue Comercial en Franquicias", "desc": "Equipo de ingenieros para instalación e integración en locales franquiciados."},
            {"title": "10% · Legal, Cumplimiento y Capital de Trabajo", "desc": "Estructuración jurídica internacional, protección de PI y margen operativo."}
        ],
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "Goal: Connect 100 stores and validate $5M in annual settled GMV.",
        "punchline_es": "Meta: Conectar 100 locales y validar $5M USD en volumen anual liquidado."
    },
    {
        "id": 22,
        "num": "21",
        "category_en": "CLOSING STATEMENT",
        "category_es": "CIERRE EJECUTIVO",
        "title_en": "The Future of Franchise Investment is Verifiable",
        "title_es": "El Futuro de las Franquicias es Verificable",
        "quote_en": "“We do not ask investors to trust human reports. We give them mathematical proof signed by physical machines.”",
        "quote_es": "“No le pedimos a los inversionistas que confíen en reportes humanos. Les entregamos pruebas matemáticas firmadas por máquinas físicas.”",
        "pillars_en": ["Signed IoT Hardware", "Multi-Point Correlation", "Polygon Daily Close", "Instant USDC Settlement", "Remote Auditability"],
        "pillars_es": ["Hardware IoT Firmado", "Correlación Multi-Punto", "Cierre Diario en Polygon", "Liquidación Inmediata en USDC", "Auditabilidad Remota"],
        "image": "extracted_media_arcana/image7.png",
        "punchline_en": "Arcana: The Trust Protocol for Physical World Assets.",
        "punchline_es": "Arcana: El Protocolo de Confianza para Activos del Mundo Real."
    },
    {
        "id": 23,
        "num": "22",
        "category_en": "FAQ APPENDIX 1",
        "category_es": "APÉNDICE FAQ 1",
        "title_en": "Frequently Asked Questions: Hardware & Security",
        "title_es": "Preguntas Frecuentes: Hardware y Seguridad",
        "lead_en": "Technical answers to common investor and franchise operator questions.",
        "lead_es": "Respuestas técnicas a preguntas frecuentes de inversores y franquiciadores.",
        "faqs_en": [
            {"q": "What happens if a store manager unplugs a sensor?", "a": "Disconnection breaks correlation continuity. The local gateway logs an immediate tamper alert on-chain and freezes payout approval until audited."},
            {"q": "Can staff forge data by simulating dummy weights?", "a": "No, because the multi-point engine requires electrical oven current and optical packaging counters to match simultaneously within strict time bounds."},
            {"q": "How long does installation take per store?", "a": "Between 2 to 4 hours. All sensor nodes use non-invasive clip-on current sensors and plug-and-play load cells with zero kitchen downtime."},
            {"q": "What if the store loses internet connection?", "a": "The encrypted gateway stores up to 30 days of signed telemetry locally in tamper-proof flash memory and syncs automatically upon reconnection."}
        ],
        "faqs_es": [
            {"q": "¿Qué pasa si un administrador desconecta un sensor?", "a": "La desconexión rompe la correlación. La pasarela registra una alerta inmediata en blockchain y congela la liquidación hasta ser auditada."},
            {"q": "¿El personal puede falsear datos simulando pesos falsos?", "a": "No, porque el motor multi-punto exige que el consumo del horno y el conteo óptico de cajas coincidan en la misma ventana de tiempo."},
            {"q": "¿Cuánto tarda la instalación por local?", "a": "Entre 2 y 4 horas. Los sensores usan pinzas amperimétricas no invasivas e insertos plug-and-play sin interrumpir la operación del restaurante."},
            {"q": "¿Qué ocurre si el local se queda sin internet?", "a": "La pasarela almacena hasta 30 días de telemetría firmada en memoria local y se sincroniza automáticamente al restablecer la red."}
        ],
        "image": "extracted_media_arcana/image8.png",
        "punchline_en": "Fail-safe hardware security built for real restaurant environments.",
        "punchline_es": "Seguridad de hardware a prueba de fallos creada para restaurantes reales."
    },
    {
        "id": 24,
        "num": "23",
        "category_en": "FAQ APPENDIX 2",
        "category_es": "APÉNDICE FAQ 2",
        "title_en": "Frequently Asked Questions: Financial & Legal",
        "title_es": "Preguntas Frecuentes: Finanzas y Legal",
        "lead_en": "Direct answers regarding USDC settlement, tax compliance, and legal structures.",
        "lead_es": "Respuestas directas sobre liquidación en USDC, impuestos y estructura jurídica.",
        "faqs_en": [
            {"q": "Why use USDC instead of traditional bank wires?", "a": "Bank wires take 3–5 business days, cost $35+ per international transfer, and cannot be automated programmatically via smart contracts on a daily basis."},
            {"q": "How do franchise owners handle local tax reporting?", "a": "The Arcana portal generates standard accounting exports and invoices mapped to local tax standards (e.g. DIAN in Colombia, SAT in Mexico)."},
            {"q": "Can investors convert USDC back to fiat currency?", "a": "Yes, investors can off-ramp USDC to local bank accounts instantly via regulated on/off-ramp partners like Circle, Bitso, or local banks."}
        ],
        "faqs_es": [
            {"q": "¿Por qué usar USDC en lugar de transferencias bancarias?", "a": "Las transferencias tardan 3 a 5 días, cobran $35+ USD por giro internacional y no pueden automatizarse diariamente por código."},
            {"q": "¿Cómo reporta impuestos el dueño del local?", "a": "El portal de Arcana genera reportes contables certificados y facturas compatibles con entidades fiscales (DIAN, SAT, IRS)."},
            {"q": "¿Los inversionistas pueden convertir USDC a moneda local?", "a": "Sí, los inversionistas pueden retirar USDC a cuentas bancarias locales al instante mediante aliados regulados como Circle o Bitso."}
        ],
        "image": "extracted_media_arcana/image5.png",
        "punchline_en": "Compliant, instant, and frictionless global settlement.",
        "punchline_es": "Liquidación global regulada, instantánea y sin fricciones."
    },
    {
        "id": 25,
        "num": "24",
        "category_en": "VISUAL CONTEXT 1",
        "category_es": "CONTEXTO VISUAL 1",
        "title_en": "Arcana Network Architecture & Node Topology",
        "title_es": "Topología de Red y Arquitectura de Nodos de Arcana",
        "lead_en": "End-to-end telemetry flow from physical kitchen sensors to Polygon on-chain settlement.",
        "lead_es": "Flujo de telemetría de punta a punta desde los sensores de cocina hasta la liquidación en Polygon.",
        "image": "extracted_media_arcana/image1.png",
        "punchline_en": "Complete schematic of the physical-to-digital trust pipeline.",
        "punchline_es": "Esquema completo de la tubería de confianza física a digital."
    },
    {
        "id": 26,
        "num": "25",
        "category_en": "VISUAL CONTEXT 2",
        "category_es": "CONTEXTO VISUAL 2",
        "title_en": "The Manager vs. Remote Investor Trust Dilemma",
        "title_es": "El Dilema de Confianza: Administrador vs. Inversor Remoto",
        "lead_en": "Visualizing how information asymmetry creates fraud risk and how cryptographic hardware resolves it.",
        "lead_es": "Visualizando cómo la asimetría de información genera riesgo de fraude y cómo el hardware criptográfico lo resuelve.",
        "image": "extracted_media_arcana/image2.png",
        "punchline_en": "Bridging the transparency gap in distributed physical franchises.",
        "punchline_es": "Cerrando la brecha de transparencia en franquicias físicas distribuidas."
    },
    {
        "id": 27,
        "num": "26",
        "category_en": "VISUAL CONTEXT 3",
        "category_es": "CONTEXTO VISUAL 3",
        "title_en": "The Immutable Daily Close Protocol Flow",
        "title_es": "Flujo del Protocolo de Cierre Diario Inalterable",
        "lead_en": "Step-by-step breakdown of data hashing, Merkle proof creation, and Polygon notarization.",
        "lead_es": "Desglose paso a paso del empaquetado de datos, generación de pruebas Merkle y notarización en Polygon.",
        "image": "extracted_media_arcana/image3.png",
        "punchline_en": "Mathematical finality achieved in seconds.",
        "punchline_es": "Finalidad matemática alcanzada en segundos."
    },
    {
        "id": 28,
        "num": "27",
        "category_en": "VISUAL CONTEXT 4",
        "category_es": "CONTEXTO VISUAL 4",
        "title_en": "IoT Hardware Sensor Kit & Cryptochip Security",
        "title_es": "Kit de Sensores IoT y Seguridad con Chip Criptográfico",
        "lead_en": "Inspection of the industrial ESP32 microcontroller, load cells, current clamps, and ATECC608 chip.",
        "lead_es": "Inspección del microcontrolador industrial ESP32, celdas de carga, pinzas amperimétricas y chip ATECC608.",
        "image": "extracted_media_arcana/image4.png",
        "punchline_en": "Hardened embedded devices engineered for kitchen environments.",
        "punchline_es": "Dispositivos embebidos blindados y diseñados para entornos de cocina."
    },
    {
        "id": 29,
        "num": "28",
        "category_en": "VISUAL CONTEXT 5",
        "category_es": "CONTEXTO VISUAL 5",
        "title_en": "USDC 1:1 Reserves & Smart Contract Settlement Engine",
        "title_es": "Reservas USDC 1:1 y Motor de Liquidación por Contrato",
        "lead_en": "Visualizing the mint/burn token cycle and deterministic revenue split algorithms.",
        "lead_es": "Visualizando el ciclo de emisión/quema de tokens y los algoritmos de reparto de ingresos.",
        "image": "extracted_media_arcana/image5.png",
        "punchline_en": "Zero volatility, 100% auditable liquidity.",
        "punchline_es": "Cero volatilidad, liquidez 100% auditable."
    },
    {
        "id": 30,
        "num": "29",
        "category_en": "VISUAL CONTEXT 6",
        "category_es": "CONTEXTO VISUAL 6",
        "title_en": "Multi-Vector Fraud Detection & Correlation Matrix",
        "title_es": "Detección de Fraude Multi-Vector y Matriz de Correlación",
        "lead_en": "How weight, thermal energy, optical counts, and POS entries correlate in real time.",
        "lead_es": "Cómo se correlacionan en tiempo real el peso, la energía térmica, los conteos ópticos y el POS.",
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "Multi-layered physical verification eliminates false positives.",
        "punchline_es": "Verificación física multicapa que elimina falsos positivos."
    },
    {
        "id": 31,
        "num": "30",
        "category_en": "VISUAL CONTEXT 7",
        "category_es": "CONTEXTO VISUAL 7",
        "title_en": "Daily Yield Distribution & Investor Portal Telemetry",
        "title_es": "Distribución Diaria de Rendimientos y Telemetría del Portal",
        "lead_en": "Dashboard view displaying live equipment performance, inventory graphs, and wallet payouts.",
        "lead_es": "Vista del panel mostrando rendimiento de maquinaria en vivo, inventarios y pagos a billeteras.",
        "image": "extracted_media_arcana/image7.png",
        "punchline_en": "Complete transparency from kitchen floor to investor wallet.",
        "punchline_es": "Transparencia total desde la cocina hasta la billetera del inversionista."
    },
    {
        "id": 32,
        "num": "31",
        "category_en": "VISUAL CONTEXT 8",
        "category_es": "CONTEXTO VISUAL 8",
        "title_en": "Franchise Expansion Flywheel & Network Effects",
        "title_es": "Efecto de Red y Expansión de la Red de Franquicias",
        "lead_en": "How verified physical data accelerates location funding and franchisee onboarding.",
        "lead_es": "Cómo los datos físicos verificados aceleran el financiamiento y la apertura de nuevas sedes.",
        "image": "extracted_media_arcana/image8.png",
        "punchline_en": "Unlocking global capital for physical restaurant brands.",
        "punchline_es": "Desbloqueando capital global para marcas físicas de restaurantes."
    },
    {
        "id": 33,
        "num": "32",
        "category_en": "DEEP-DIVE ARCHITECTURE",
        "category_es": "PROFUNDIZACIÓN · ARQUITECTURA",
        "title_en": "Cryptographic Ledger Security Specification",
        "title_es": "Especificación de Seguridad del Libro Criptográfico",
        "lead_en": "Detailed mathematical specification of digital signatures, hashing algorithms, and on-chain verification.",
        "lead_es": "Especificación matemática detallada de firmas digitales, algoritmos de hash y verificación on-chain.",
        "image": "extracted_media_arcana/image1.png",
        "punchline_en": "Institutional security standards applied to physical commerce.",
        "punchline_es": "Estándares de seguridad institucional aplicados al comercio físico."
    },
    {
        "id": 34,
        "num": "33",
        "category_en": "DEEP-DIVE SENSORS",
        "category_es": "PROFUNDIZACIÓN · SENSORES",
        "title_en": "Sensor Mesh Calibration & Accuracy Metrics",
        "title_es": "Calibración de la Malla de Sensores y Métricas de Precisión",
        "lead_en": "Load cell tolerance within ±0.5%, current transformer sampling at 100Hz, and zero calibration drift.",
        "lead_es": "Tolerancia de celdas de carga en ±0.5%, muestreo eléctrico a 100Hz y cero descalibración.",
        "image": "extracted_media_arcana/image4.png",
        "punchline_en": "Industrial-grade hardware reliability.",
        "punchline_es": "Fiabilidad de hardware de grado industrial."
    },
    {
        "id": 35,
        "num": "34",
        "category_en": "DEEP-DIVE TOKENOMICS",
        "category_es": "PROFUNDIZACIÓN · TOKENÓMICA",
        "title_en": "Liquidity Pool & Reserve Custody Architecture",
        "title_es": "Custodia de Reservas y Arquitectura de Liquidez",
        "lead_en": "Multi-sig escrow smart contracts ensuring 100% solvency and instant redemption capability.",
        "lead_es": "Contratos inteligentes en custodia multi-firma asegurando 100% de solvencia y rescate inmediato.",
        "image": "extracted_media_arcana/image5.png",
        "punchline_en": "Provable 1:1 reserve solvency at all times.",
        "punchline_es": "Solvencia de reservas 1:1 demostrable en todo momento."
    },
    {
        "id": 36,
        "num": "35",
        "category_en": "DEEP-DIVE GOVERNANCE",
        "category_es": "PROFUNDIZACIÓN · GOBERNANZA",
        "title_en": "Oracle Governance & Decentralized Dispute Resolution",
        "title_es": "Gobernanza del Oráculo y Resolución de Disputas",
        "lead_en": "Decentralized arbitration protocol for resolving physical inventory anomalies with independent inspectors.",
        "lead_es": "Protocolo de arbitraje descentralizado para resolver discrepancias físicas con inspectores independientes.",
        "image": "extracted_media_arcana/image6.png",
        "punchline_en": "Fair, auditable dispute resolution without court delays.",
        "punchline_es": "Resolución de disputas justa y auditable sin demoras judiciales."
    },
    {
        "id": 37,
        "num": "36",
        "category_en": "DEEP-DIVE DATA ASSET",
        "category_es": "PROFUNDIZACIÓN · ACTIVO DE DATOS",
        "title_en": "The Proprietary Operational Data Moat",
        "title_es": "El Moat de Datos Operativos Propietarios",
        "lead_en": "Accumulating millions of verified commercial hours to benchmark global franchise efficiency.",
        "lead_es": "Acumulando millones de horas comerciales verificadas para comparar la eficiencia de franquicias a nivel global.",
        "image": "extracted_media_arcana/image7.png",
        "punchline_en": "The Bloomberg Terminal for physical franchise operations.",
        "punchline_es": "La terminal de datos definitiva para operaciones de franquicias físicas."
    },
    {
        "id": 38,
        "num": "37",
        "category_en": "DEEP-DIVE GLOBAL EXPANSION",
        "category_es": "PROFUNDIZACIÓN · EXPANSIÓN GLOBAL",
        "title_en": "Cross-Border Capital Routing for Real-World Assets",
        "title_es": "Ruteo de Capital Transfronterizo para Activos Reales",
        "lead_en": "How institutional investors in the US, Europe, and Asia can finance physical franchise units globally.",
        "lead_es": "Cómo inversionistas institucionales en EE.UU., Europa y Asia pueden financiar franquicias físicas en todo el mundo.",
        "image": "extracted_media_arcana/image8.png",
        "punchline_en": "Frictionless global investment into high-yield physical retail.",
        "punchline_es": "Inversión global sin fricciones en locales comerciales de alto rendimiento."
    },
    {
        "id": 39,
        "num": "38",
        "category_en": "EXECUTIVE SUMMARY",
        "category_es": "RESUMEN EJECUTIVO",
        "title_en": "Arcana: Complete Investor Summary",
        "title_es": "Arcana: Resumen Ejecutivo para Inversionistas",
        "lead_en": "The trust infrastructure turning physical stores into mathematical, auditable dividend engines.",
        "lead_es": "La infraestructura de confianza que convierte locales físicos en motores de dividendos auditables.",
        "cards_en": [
            {"title": "Hardware Truth", "desc": "Signed IoT sensors eliminate underreporting and fraud at the source."},
            {"title": "On-Chain Notarization", "desc": "Polygon smart contracts execute daily close and automated USDC payout splits."},
            {"title": "Huge Market Opportunity", "desc": "Targeting $800B global franchise sector with high-margin SaaS and settlement take-rates."},
            {"title": "Defensible Data Moat", "desc": "Proprietary cryptographic hardware and verified operational benchmarks."}
        ],
        "cards_es": [
            {"title": "Verdad en Hardware", "desc": "Sensores IoT firmados eliminan el subreporte y el fraude en el origen físico."},
            {"title": "Notarización On-Chain", "desc": "Contratos en Polygon ejecutan el cierre diario y reparten dividendos en USDC."},
            {"title": "Mercado Gigantesco", "desc": "Enfocado en el sector de franquicias de $800B USD con SaaS y comisiones de liquidación."},
            {"title": "Foso de Datos Defendible", "desc": "Hardware criptográfico propietario y métricas operativas verificadas."}
        ],
        "image": "extracted_media_arcana/image1.png",
        "punchline_en": "Verifiable trust, not blind trust. Welcome to Arcana.",
        "punchline_es": "Confianza verificable, no confianza ciega. Bienvenidos a Arcana."
    }
]

with open('deck_arcana_data.json', 'w', encoding='utf-8') as f:
    json.dump(slides_data, f, ensure_ascii=False, indent=2)

print(f"Generated deck_arcana_data.json with {len(slides_data)} slides for Arcana.")
