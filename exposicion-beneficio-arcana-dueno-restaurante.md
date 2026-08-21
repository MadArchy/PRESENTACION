# Cómo beneficia Arcana al dueño de un restaurante

Exposición orientada al **dueño / operador**. Cruza el problema documentado de madurez operativa y fugas de capital con evidencia adicional del sector (Loomis, National Restaurant Association, Rewards Network) y la propuesta de producto Arcana.

| Documento / fuente | Uso en esta exposición |
| --- | --- |
| `exposicion-madurez-operativa-y-fraude-restaurantes.md` | Madurez, tres fugas, checkpoints, EBITDA |
| `presentacion-inversores.md` | IoT firmado, correlación física, cierre auditable |
| [Loomis — 4 estrategias anti-robo](https://www.loomis.us/resources/insights/four-strategies-preventing-employee-theft) | Cultura, caja, inventario, POS; stats 75% |
| [NRA — Digital Security 101](https://restaurant.org/education-and-resources/resource-library/intro-to-digital-security-101-how-to-protect-your-restaurant%E2%80%99s-data/) | Riesgo digital, costo de breaches, marco NIST |
| [Rewards Network — Restaurant theft](https://www.rewardsnetwork.com/blog/restaurant-theft-it-doesnt-have-to-happen-to-you/) | FACES (comida, alcohol, efectivo…); señales en números; QSR −7% ventas |

---

## 1. Glosario de términos

Términos que aparecen en esta exposición, explicados en lenguaje de dueño de restaurante.

### Operación y finanzas del local

| Término | En cristiano |
| --- | --- |
| **Margen neto** | Lo que queda de utilidad después de casi todos los costos. En restaurantes suele ser bajo: **3–9%** de las ventas. |
| **EBITDA** | Utilidad operativa antes de intereses, impuestos, depreciación y amortización. Sirve para ver si el negocio “gana” antes de la estructura financiera. |
| **Food cost** | Porcentaje de las ventas que se va en comida (e insumos relacionados). Rango sano típico citado en sector: **~28–35%**. |
| **Food cost teórico** | Lo que *debería* costar la comida según fichas técnicas / recetas costeadas y lo vendido. |
| **Food cost real** | Lo que *realmente* se consumió de inventario (compras ± cambios de stock). |
| **Food cost variance** | Diferencia entre real y teórico, relativa a ventas. Si se dispara (p. ej. **> 2%**), hay fuga o error. |
| **Merma** | Producto que se pierde (desperdicio, rotura, robo, sobreporcionado) y no se convierte en venta limpia. |
| **Merma no operativa** | Producto que sale del inventario **sin generar venta** (robo hormiga, comidas no registradas, etc.). Infla el variance sin explicación clara. |
| **Fuga de capital** | Dinero o producto que sale del negocio sin rastro de venta legítima. Suele ser un goteo, no un atraco. |
| **P&L / estado de resultados** | El reporte de ingresos y gastos del periodo. El goteo diario a veces no se ve claro hasta el cierre mensual. |
| **Ticket / ticket promedio** | Venta por cuenta o por cliente. Dos locales con el mismo ticket pueden tener márgenes muy distintos si uno controla merma y el otro no. |

### Robo, fraude y señales

| Término | En cristiano |
| --- | --- |
| **Employee theft / robo interno** | Hurto o fraude cometido por personal (efectivo, comida, tiempo, datos). |
| **Shrink / shortage** | Faltante de inventario: lo que “debería haber” vs. lo que hay. Gran parte se asocia a robo interno (~**75%** en cifras de industria). |
| **Robo hormiga** | Hurtos chicos y repetidos (un corte, una bebida) que suman miles al año. |
| **Sweethearting** | Dar producto gratis o con descuento indebido a amigos/familiares. |
| **Short-ringing** | Cobrar de menos en caja y quedarse con la diferencia o favorecer a alguien. |
| **Skimming** | Sacarse efectivo de la caja antes de registrarlo bien. |
| **Void / anulación** | Cancelar un ticket o línea. Legítimo a veces; abusivo si oculta cobro en efectivo. |
| **Comanda fantasma** | Pedido que se cocina o se cobra de forma que no cuadra con el sistema (o al revés: se cobra sin registrar). |
| **Caja floja** | Omisiones de cobro, tickets vacíos, olvidos “convenientes” al cierre. |
| **FACES** | Acrónimo de áreas de robo: **F**ood, **A**lcohol, **C**ash, **E**quipment, **S**upplies. |
| **QSR** | *Quick Service Restaurant*: comida rápida / alto volumen. |

### Controles clásicos del sector

| Término | En cristiano |
| --- | --- |
| **POS** | Punto de venta / caja registradora del local. Arcana **no lo reemplaza**: lo ata a lo físico. |
| **SOP** | Procedimiento operativo estándar: cómo se hace cada tarea (caja, comps, recepción). |
| **Employee meal / cortesía** | Comida de personal o “invita la casa”. Debe tener regla y, idealmente, autorización. |
| **Exception-based reporting** | Reportes del POS que marcan transacciones raras (muchos voids, descuentos fuera de rango). |
| **Smart safe / cash recycler** | Caja fuerte inteligente o reciclador de efectivo: guarda, cuenta y deja rastro de quién depositó. |
| **Teórico vs. real** | Comparar lo que “debía” usarse según ventas con lo que el inventario muestra. Base de toda auditoría de fugas. |
| **Inventario ciego** | Contar stock **sin mirar** el número teórico, para no sesgar el conteo. |

### Arcana y tecnología (sin magia)

| Término | En cristiano |
| --- | --- |
| **Arcana** | Sistema de contabilidad del local donde **las máquinas firman** lo que vieron (peso, cocina, caja…) y el cierre del día queda auditable. |
| **IoT** | Aparatos conectados que miden y reportan (nevera, horno, báscula, etc.). |
| **ESP32** | Mini-computador barato que va en cada equipo: lee sensores y firma eventos. |
| **Correlación** | Varios hechos deben cuadrar juntos (ej.: 10 porciones salidas ≈ cocción ≈ 10 ventas, o merma declarada). |
| **Firma digital (del dispositivo)** | Sello criptográfico de ese aparato sobre un evento. Otro puede verificarlo sin conocer el secreto del aparato. |
| **Cierre del día** | Resumen firmado de lo que pasó en el local ese día. |
| **Merkle / ancla** | “Sello del sobre”: una sola huella del día entero. Si alguien cambia un dato después, el sello ya no cuadra. |
| **Polygon** | Red blockchain barata donde Arcana **sella** el cierre y puede liquidar tesorería. No es donde se cocina el día a día. |
| **USDC** | Dólar digital (~1 USDC ≈ 1 USD). Respaldo del token del local, no una moneda para especular. |
| **Token del local** | Ficha interna de liquidación (1 token ≈ 1 USDC bruto). Sirve para pagar deudas operativas y repartir; no es “memecoin”. |
| **Contrato inteligente** | Programa en blockchain que aplica reglas de dinero sin “arreglos” manuales del viernes. |
| **Override** | Operar “a mano” cuando falla la red o un control. En Arcana queda **registrado** y con **límite/umbral** pactado. |
| **Gas** | Peaje pequeño por escribir en Polygon. Por eso no se publica cada pizza: se sella el día. |

### Datos y seguridad digital

| Término | En cristiano |
| --- | --- |
| **Breach / filtración** | Robo o fuga de datos (tarjetas, clientes, empleados). Puede costar decenas o cientos de miles. |
| **PCI** | Normas de seguridad para quien acepta tarjetas. Obligatorio en la práctica si cobras con plástico. |
| **NIST (marco)** | Guía de ciberseguridad: Identificar → Proteger → Detectar → Responder → Recuperar. La NRA lo adapta a restaurantes como un “HACCP digital”. |
| **Phishing / ransomware** | Engaños por correo y secuestro de datos a cambio de pago. Riesgo distinto al robo de caja, igual de caro. |

---

## 2. La pregunta del dueño (en una frase)

> Con margen neto de **3–9%**, y con solo **4% de ventas** perdidas al año en fugas/theft (estimación conservadora), un local mediano se deja **~$48.000 USD** sobre la mesa —¿puedo demostrar que lo comprado, cocinado y vendido **realmente pasó**, sin vivir encima del local?

**Arcana responde:** el local deja un rastro físico firmado por las máquinas. Mentir en una sola caja, un void del POS o un Excel ya no basta.

---

## 3. Qué le duele hoy al dueño (antes de Arcana)

### 3.1 Estimación de pérdidas anuales por tamaño de negocio

Escenario base: **4% de las ventas anuales** se pierden por fugas operativas / employee theft (estimación conservadora dentro del rango sectorial; en QSR el techo citado llega a **7%** de ventas).

| Tamaño del restaurante | Ventas anuales promedio | Pérdida anual estimada (4%) |
| --- | --- | --- |
| **Pequeño** (cafetería / local pequeño) | $500,000 USD | **$20,000 USD** |
| **Mediano** (servicio completo independiente) | $1,200,000 USD | **$48,000 USD** |
| **Grande** (alto volumen / franquicia) | $3,000,000 USD | **$120,000 USD** |

**Cómo leer esta tabla (dueño):**

- Con margen neto sectorial de **3–9%**, una pérdida del **4% de ventas** no es “un gasto más”: puede ser **casi todo el beneficio del año** (o más, en el piso del 3%).
- Ejemplo mediano: $1.2M de ventas → utilidad neta típica ~$36k–$108k; perder **$48k** en fugas puede **borrar o partir a la mitad** ese resultado.
- Si el local está más cerca del escenario QSR (**hasta 7%**), la pérdida anual estimada sería ~**$35k / $84k / $210k** respectivamente —peor aún.
- Recuperar **solo la mitad** del 4% (bajar de 4% a 2% de ventas) ya son **~$10k / $24k / $60k** al año según tamaño —antes de sumar mejor acceso a capital por evidencia auditable.

*Nota:* el 4% es un **modelo de estimación** para dimensionar el dolor en dólares; no es una garantía de pérdida ni de recuperación con Arcana. Medir el % real del local (merma + variance + voids + faltantes) es el primer paso.

### 3.2 Las cifras que el dueño ya debería conocer

| Dato | Implicación para el dueño | Fuente |
| --- | --- | --- |
| **~4% de ventas** en pérdidas anuales (modelo) | $20k / $48k / $120k según tamaño (tabla 3.1) | Estimación de pérdidas por negocio (escenario 4%) |
| **75%** de empleados roba al menos una vez; **la mitad** lo repite | El riesgo no es “el ladrón ocasional”; es estructural | U.S. Chamber / NRA vía [Loomis](https://www.loomis.us/resources/insights/four-strategies-preventing-employee-theft) y [Rewards Network](https://www.rewardsnetwork.com/blog/restaurant-theft-it-doesnt-have-to-happen-to-you/) |
| **75%** de faltantes de inventario por robo interno | La merma “misteriosa” suele ser gente, no magia | NRA (mismas fuentes) |
| QSR: hasta **7% de ventas** perdidas por employee theft | El 4% de la tabla es conservador frente a ese techo | NRA vía Rewards Network |
| Fugas técnicas: **2–5 pts EBITDA** en goteo | Merma no operativa + comandas + facturación | Masterestaurant / Meseros.ai |
| Breach de tarjetas: fácilmente **$100.000+** en pérdidas, multas y forense; pyme típica **$36k–$50k**; multas mayores pueden superar **$500k** | Un breach puede superar un año entero de pérdida “tipo 4%” en un local pequeño | [NRA Digital Security 101](https://restaurant.org/education-and-resources/resource-library/intro-to-digital-security-101-how-to-protect-your-restaurant%E2%80%99s-data/) |

### 3.3 El mapa del dolor (operación + caja + datos)

| Problema del dueño | Qué dice el sector | Por qué POS / Excel / cámaras solas no alcanzan |
| --- | --- | --- |
| Merma alta e invisible | 4–10% compras desperdiciadas; 75% merma inventario = robo interno | El POS registra tickets, no el peso que salió de la nevera |
| Front-of-house vulnerable | Tip adjustments fraudulentos, *short-ringing*, skimming de caja ([Loomis](https://www.loomis.us/resources/insights/four-strategies-preventing-employee-theft)) | Muchos locales blindan BOH con video y dejan FOH expuesto |
| Señales en números (antes de “pillar” a alguien) | Food cost sube; cajones over/under; cancel/re-ring; tips raros; inventario que “se echa a perder” ([Rewards Network](https://www.rewardsnetwork.com/blog/restaurant-theft-it-doesnt-have-to-happen-to-you/)) | Sin correlación física, solo hay sospecha tardía |
| Proveedor que entrega de menos | Entregas cortas, sustituciones | Sin báscula firmada, el recibo del proveedor es la “verdad” |
| Datos y reputación | Tarjetas, lealtad, nómina, recetas, precios de proveedores | Un click de phishing o un POS débil puede costar más que meses de merma |
| No puede demostrar que opera bien | Dueño honesto pierde discusiones con socios remotos | Reportes editables = confianza humana, no evidencia |

**Tesis del dueño:** la mayoría del equipo es honesta ([Rewards Network](https://www.rewardsnetwork.com/blog/restaurant-theft-it-doesnt-have-to-happen-to-you/)). No necesita cacería permanente. Necesita **diseño de control** + **prueba del cierre del día** —sin reglas tan duras que espanten al buen personal.

---

## 4. Qué es Arcana (para el dueño, sin jerga)

**Arcana = contabilidad del local que las máquinas firman.**

- Sensores y mini-controladores (IoT) en nevera, horno, dispensadores, inventario por peso y caja.
- Varios dispositivos **tienen que coincidir** (correlación): si salen 10 porciones, debe haber cocción y ~10 ventas —o merma justificada.
- Al final del día se sella un resumen auditable (ancla en Polygon).
- No reemplaza el POS: **lo ata** a lo físico (complementa lo que Loomis pide al evaluar el POS: exception reporting no basta si la nevera no firma).
- No es una criptomoneda especulativa: token del local como unidad de liquidación respaldada 1:1 por USDC cuando exista tesorería.

**Promesa honesta:**

- **Sí garantiza:** rastro correlacionado y firmado; cierre del día auditable.
- **No garantiza:** override imposible dentro del umbral (sí visible y acotado); “imposible de hackear”; inocuidad alimentaria por sí sola.

---

## 5. Las 4 estrategias del sector (Loomis) → qué gana el dueño con Arcana

[Loomis](https://www.loomis.us/resources/insights/four-strategies-preventing-employee-theft) resume cuatro palancas clásicas. Arcana no sustituye cultura ni smart safes: **refuerza donde el fraude deja de ser un Excel**.

| Estrategia Loomis | Qué recomienda el sector | Beneficio Arcana para el dueño |
| --- | --- | --- |
| **1. Cultura de accountability** | Onboarding claro (reloj, breaks, comps con gerente); límites de employee meals; monitorear transacciones/video | Arcana no crea cultura; hace que el monitoreo sea **evidencia correlacionada**, no solo “te estamos viendo”. Las merma/comps quedan declaradas en el rastro. |
| **2. Mejor manejo de efectivo** | Limitar efectivo en cajón; drops; smart safes / recyclers; **separar roles** | Arcana ata la caja a porciones y cocción: skimming / short-ringing chocan con la física. No reemplaza Loomis SafePoint; reduce el espacio donde el efectivo “no cuadra” con lo servido. |
| **3. Control de inventario** | Conteos de refrigerador (p. ej. bi-semanales); comparar vs. ventas; menos *sweethearting* y waste | Inventario por **peso firmado** + actividad de servicio: el “faltante vs. ventas” deja de depender solo del conteo humano. |
| **4. Evaluar el POS** | Exception-based reporting; huella/ID en terminal; investigar voids raros | El POS robusto detecta anomalías; Arcana exige que esas anomalías **cuadran con nevera/horno/peso**. Mentir en el POS solo ya no alcanza. |

---

## 6. FACES del robo (Rewards Network) → cobertura Arcana

Rewards Network resume el robo interno como **FACES**: Food, Alcohol, Cash, Equipment, Supplies ([artículo](https://www.rewardsnetwork.com/blog/restaurant-theft-it-doesnt-have-to-happen-to-you/)).

| Cara (FACES) | Señales típicas | Cómo beneficia Arcana al dueño |
| --- | --- | --- |
| **F — Food** | Food cost sube; porciones; waste; comidas de personal | Correlación porción → cocción → venta; merma debe registrarse |
| **A — Alcohol** | Pours, botellas, acceso al inventario | Misma lógica de inventario/actividad donde haya sensores de dispensado/peso (roadmap de equipos) |
| **C — Cash** | Over/under, voids, promos, tips raros, reimpresiones de tarjeta | Caja firmada en la red del local + cierre diario; voids no viven solos en el POS |
| **E — Equipment / smallwares** | Inventario mensual, “to-go” en vajilla del local | Menos foco directo de Arcana MVP; sigue siendo proceso + conteo |
| **S — Supplies** | Cinta, papel, insumos “inocentes” | Control de acceso + inventario de valor; Arcana prioriza flujo producto–caja de alto impacto |

**Señales que el dueño debe mirar ya** (antes o con Arcana): food cost al alza, cajones descuadrados, cancel/re-ring, tips fuera de rango, perecederos que “se dañan” demasiado rápido. Arcana convierte esas señales en **incidentes con rastro**, no solo en intuición de fin de mes.

---

## 7. Beneficios concretos para el dueño

### 7.1 Recupera margen que hoy se evapora

| Palanca sectorial | Cómo Arcana la acelera |
| --- | --- |
| Teórico vs. real (alerta si variance > 2%) | Peso + máquina + ventas firman el mismo día |
| Inventario vs. ventas (Loomis / Rewards Network) | Menos sweethearting invisible |
| Comandas vs. facturación | Fantasmas chocan con la física |
| Proveedores | Peso real vs. pedido |
| **~4% de ventas** en pérdidas anuales (modelo) | Dimensiona el upside: $20k / $48k / $120k al año según tamaño |

**En dólares (modelo 4%, no promesa Arcana):**

| Si el dueño… | Pequeño ($500k) | Mediano ($1.2M) | Grande ($3M) |
| --- | --- | --- | --- |
| Sigue perdiendo el 4% | −$20,000/año | −$48,000/año | −$120,000/año |
| Recorta la fuga a la mitad (4% → 2%) | +$10,000/año | +$24,000/año | +$60,000/año |
| Escenario QSR agresivo (7% de ventas) | −$35,000/año | −$84,000/año | −$210,000/año |

Con margen neto 3–9%, recuperar $24k en un local mediano suele pesar **más** que subir el ticket promedio un poco: es utilidad que ya “estaba” en las ventas y se escapaba.

### 7.2 Deja de pelear “mi Excel vs. tu Excel”

- Socios e inversores auditan el cierre sin estar en el local.
- Overrides del administrador: registrados y con techo pactado.
- El dueño honesto **puede demostrar** operación real (dolor explícito en la tesis Arcana).

### 7.3 Sube de madurez operativa (sin comprar caos)

| Nivel | Sin Arcana | Con Arcana |
| --- | --- | --- |
| 1–2 Reactivo | Merma 8–10%; robo invisible | Primero documentar (cultura + SOPs Loomis); luego instrumentar |
| 3–4 Estandarizado | Gerente revisa a mano | Evidencia continua teórico vs. real |
| 5–6 Sistematizado | Dato decide | Sensores + correlación + cierre sellado |

### 7.4 Cierra las tres fugas técnicas + el frente digital

| Fuga / riesgo | Beneficio Arcana | Complemento necesario |
| --- | --- | --- |
| Merma no operativa | Salida sin venta coherente fuera de “en regla” | Conteos, porciones, employee meals con reglas claras |
| Fraude en comandas / caja floja | Coordinar nevera + cocción + caja | Separación de roles, drops de efectivo (Loomis) |
| Errores / abusos de facturación | Cierre diario reduce escondite hasta el P&L | Exception reporting del POS |
| **Breach / ransomware / phishing** ([NRA](https://restaurant.org/education-and-resources/resource-library/intro-to-digital-security-101-how-to-protect-your-restaurant%E2%80%99s-data/)) | Arcana **no es** el plan PCI/NIST completo; aporta integridad del cierre operativo y reduce dependencia de reportes editables | Plan NIST: Identify → Protect → Detect → Respond → Recover (como un “HACCP digital”) |

**Lectura para el dueño:** un breach de tarjetas puede costar de decenas a cientos de miles. Arcana no sustituye PCI ni entrenamiento anti-phishing; sí evita que la *única* verdad del negocio viva en un Excel o un dashboard que cualquiera con acceso pueda “arreglar”.

### 7.5 Protege activos que el dueño sí siente

1. Integridad de lo vendido y comprado  
2. Inventario (el 75% del problema de shortages)  
3. Evidencia de peso, temperatura, energía, caja  
4. Cadena de frío (neveras se **miden**, no se apagan)  
5. Reputación / franquicia (también dañada por breaches y por fraude visible)  
6. Relación con capital (inversor y socios)

### 7.6 Facilita crecer con dinero ajeno

El inversor puede exigir Arcana como condición de cheque; el dueño lo acepta porque se protege a sí mismo. Misma regla en varios locales = auditoría comparable.

---

## 8. Cómo se ve un día con Arcana (vista dueño)

```text
Apertura
  → crédito / permiso vigente del local
Operación
  → pedido, inventario (peso), cocina, caja
  → cada equipo firma lo que vio
  → la red local exige coincidencia (nadie manda solo)
Cierre
  → todos firman el mismo resumen del día
  → se ancla la prueba (Polygon)
  → se liquida la deuda operativa del día
Día siguiente
  → se habilita en regla cuando el anterior quedó saldado
```

**Override con límite:** operar si falla la red es posible; abusar del override dispara alerta.

---

## 9. Checklist: ¿Arcana me beneficia *a mí* como dueño?

- [ ] Sé si soy pequeño / mediano / grande y qué implica el **4%** ($20k / $48k / $120k) en *mi* P&L.
- [ ] Food cost o merma suben sin explicación clara.
- [ ] Cajones over/under, voids/cancel/re-ring o tips fuera de rango.
- [ ] Inventario (nevera) no cuadra con ventas; sospecho sweethearting o proveedor corto.
- [ ] Tengo (o quiero) socios/inversores remotos.
- [ ] Ya tengo (o haré) cultura + SOPs de caja/comidas; no quiero solo “más cámaras”.
- [ ] Entiendo que PCI/NIST es paralelo: Arcana no es mi único escudo digital.
- [ ] Quiero que la merma se **declare**, no que desaparezca.
- [ ] Acepto overrides visibles con límite.

Si marcas 3 o más: el beneficio no es “crypto”; es **margen recuperable en dólares + prueba de operación + menos dependencia de confianza ciega**.

---

## 10. Mensaje de cierre

El sector ya lo dijo con números duros: el **75%** del problema de inventario es interno; en QSR el theft puede comerse hasta **7% de las ventas**. En un escenario conservador del **4%**, eso son **$20.000, $48.000 o $120.000 al año** según el tamaño del local —plata que ya entró por la puerta y se fue por merma, caja o comandas. Un breach digital puede costar otro tanto. Loomis, la NRA y Rewards Network coinciden en la cura parcial: cultura, caja, inventario, POS y ciberhigiene.

**Arcana no inventa ese diagnóstico.** Lo vuelve **difícil de falsificar**: nevera, cocina, peso y caja deben contar la misma historia, y el cierre queda sellado para el dueño —y para quien ponga el capital— sin vivir en el local.

> Contabilidad que no se puede mentir.  
> El dueño deja de pedir que le crean. Empieza a poder **demostrar**.

---

## 11. Fuentes

**Internas**

1. `exposicion-madurez-operativa-y-fraude-restaurantes.md`  
2. `presentacion-inversores.md`

**Sector**

3. Loomis. *Four Restaurant Strategies for Preventing Employee Theft*.  
   https://www.loomis.us/resources/insights/four-strategies-preventing-employee-theft  
4. National Restaurant Association. *Intro to Digital Security 101: How to protect your restaurant’s data*.  
   https://restaurant.org/education-and-resources/resource-library/intro-to-digital-security-101-how-to-protect-your-restaurant%E2%80%99s-data/  
5. Rewards Network. *Restaurant Theft – It Happens but It Doesn’t Have to Happen to You*.  
   https://www.rewardsnetwork.com/blog/restaurant-theft-it-doesnt-have-to-happen-to-you/

**Modelo de estimación**

6. Estimación de pérdidas anuales por negocio al **4% de ventas**: pequeño $500k → $20k; mediano $1.2M → $48k; grande $3M → $120k.

*Las cifras citadas son del sector, de las fuentes enlazadas o modelos de estimación explícitos —no un compromiso de retorno de Arcana. Verificar siempre contra la operación real.*
