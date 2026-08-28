import { SupportedSpeechLanguage } from '../domain/speech-utterance.entity';

export interface IBilingualTranslator {
  translate(text: string, from: SupportedSpeechLanguage, to: SupportedSpeechLanguage): Promise<string>;
  translateInstant(text: string, from: SupportedSpeechLanguage, to: SupportedSpeechLanguage): string;
  detectLanguage(text: string): SupportedSpeechLanguage;
}

export class BilingualTranslatorAdapter implements IBilingualTranslator {
  private readonly translationCache: Map<string, string> = new Map();

  private readonly esToEnDictionary: Record<string, string> = {
    // Pitch / ops extras (instant path)
    'franquicia': 'franchise',
    'franquicias': 'franchises',
    'locales': 'stores',
    'piloto': 'pilot',
    'margen': 'margin',
    'contabilidad': 'accounting',
    'inalterable': 'immutable',
    'confianza': 'trust',
    'auditoría': 'audit',
    'auditoria': 'audit',
    'telemetría': 'telemetry',
    'telemetria': 'telemetry',
    'operaciones': 'operations',
    'operación': 'operation',
    'operacion': 'operation',
    'ronda': 'round',
    'inversores': 'investors',
    'hablamos': 'we talk',
    'explicamos': 'we explain',
    'demuestra': 'demonstrates',
    'permite': 'allows',
    'reduce': 'reduces',
    'aumenta': 'increases',
    'mejora': 'improves',
    // Domain: Arcana / Web3 / FoodTech / Tutor
    'arcana': 'arcana',
    'libro mayor': 'ledger',
    'cadena de custodia': 'chain of custody',
    'prueba de integridad': 'integrity proof',
    'hash': 'hash',
    'nodo': 'node',
    'smart contract': 'smart contract',
    'contrato inteligente': 'smart contract',
    'tokenización': 'tokenization',
    'tokenizacion': 'tokenization',
    'foodtech': 'foodtech',
    'comida rápida': 'quick service restaurant',
    'comida rapida': 'quick service restaurant',
    'punto de venta': 'point of sale',
    'ticket promedio': 'average ticket',
    'unidad económica': 'unit economics',
    'unidad economica': 'unit economics',
    'tutor': 'tutor',
    'tutoría': 'tutoring',
    'tutoria': 'tutoring',
    'estudiante': 'student',
    'estudiantes': 'students',
    'aprendizaje': 'learning',
    'currículo': 'curriculum',
    'curriculo': 'curriculum',
    'diapositiva activa': 'active slide',
    'pregunta del inversor': 'investor question',
    'objeción': 'objection',
    'objecion': 'objection',
    'due diligence': 'due diligence',
    'sala de datos': 'data room',
    'go to market': 'go to market',
    'salida a mercado': 'go to market',
    'unit economics': 'unit economics',
    'runway': 'runway',
    'pista de aterrizaje': 'runway',
    // Terminology & Business
    'presentación': 'presentation',
    'presentacion': 'presentation',
    'diapositiva': 'slide',
    'lámina': 'slide',
    'lamina': 'slide',
    'escena': 'scene',
    'objetivo': 'objective',
    'audiencia': 'audience',
    'modelo de negocio': 'business model',
    'propuesta de valor': 'value proposition',
    'ventaja competitiva': 'competitive advantage',
    'retorno de inversión': 'return on investment',
    'retorno de inversion': 'return on investment',
    'margen bruto': 'gross margin',
    'margen neto': 'net margin',
    'crecimiento': 'growth',
    'ingresos': 'revenue',
    'ganancias': 'profits',
    'costos': 'costs',
    'gastos': 'expenses',
    'inversión': 'investment',
    'inversion': 'investment',
    'inversionistas': 'investors',
    'inversor': 'investor',
    'ronda semilla': 'seed round',
    'capital semilla': 'seed capital',
    'mercado': 'market',
    'clientes': 'customers',
    'usuarios': 'users',
    'producto': 'product',
    'solución': 'solution',
    'solucion': 'solution',
    'problema': 'problem',
    'oportunidad': 'opportunity',
    'tracción': 'traction',
    'traccion': 'traction',
    'validación': 'validation',
    'validacion': 'validation',
    'inteligencia artificial': 'artificial intelligence',
    'aprendizaje automático': 'machine learning',
    'red neuronal': 'neural network',
    'seguridad': 'security',
    'privacidad': 'privacy',
    'arquitectura': 'architecture',
    'escalabilidad': 'scalability',
    'eficiencia': 'efficiency',
    'automatización': 'automation',
    'automatizacion': 'automation',
    'cadena de bloques': 'blockchain',
    'restaurante': 'restaurant',
    'restaurantes': 'restaurants',
    'cocina': 'kitchen',
    'pedidos': 'orders',
    'plataforma': 'platform',
    'infraestructura': 'infrastructure',
    'gobernanza': 'governance',
    'evidencia': 'evidence',
    'datos': 'data',
    'análisis': 'analysis',
    'analisis': 'analysis',
    'resumen': 'summary',
    'conclusión': 'conclusion',
    'conclusion': 'conclusion',
    'preguntas': 'questions',
    'respuestas': 'answers',
    'gracias': 'thank you',
    'bienvenidos': 'welcome',
    'buenos días': 'good morning',
    'buenas tardes': 'good afternoon',
    'buenas noches': 'good evening',
    'hola a todos': 'hello everyone',
    'hola': 'hello',
    'hoy vamos a ver': 'today we are going to see',
    'hoy vamos a hablar': 'today we are going to talk',
    'como pueden observar': 'as you can observe',
    'como pueden ver': 'as you can see',
    'en esta lámina': 'in this slide',
    'en esta diapositiva': 'in this slide',
    'el siguiente paso es': 'the next step is',
    'nuestro equipo': 'our team',
    'visión': 'vision',
    'misión': 'mission',
    'estrategia': 'strategy',
    'proyecto': 'project',
    'negocio': 'business',
    'empresa': 'company',
    'startup': 'startup',
    'ventas': 'sales',
    'dinero': 'money',
    'tiempo': 'time',
    'mundo': 'world',
    'persona': 'person',
    'personas': 'people',
    'año': 'year',
    'años': 'years',
    'mes': 'month',
    'meses': 'months',
    'día': 'day',
    'días': 'days',
    'trabajo': 'work',
    'desarrollo': 'development',
    'sistema': 'system',
    'sistemas': 'systems',
    'servicio': 'service',
    'servicios': 'services',
    'tecnología': 'technology',
    'tecnologia': 'technology',
    'delicioso': 'delicious',
    'ayudaba': 'helped',
    'distraerme': 'distract me',
    'algo': 'something',
    'todo': 'everything',
    'nada': 'nothing',
    'mucho': 'a lot',
    'poco': 'little',
    'grande': 'big',
    'pequeño': 'small',
    'nuevo': 'new',
    'nueva': 'new',
    'bueno': 'good',
    'buena': 'good',
    'mejor': 'better',
    'primero': 'first',
    'segundo': 'second',
    'tercero': 'third',
    'importante': 'important',
    'principal': 'main',
    'ahora': 'now',
    'después': 'after',
    'despues': 'after',
    'antes': 'before',
    'siempre': 'always',
    'nunca': 'never',
    'también': 'also',
    'tambien': 'also',
    'pero': 'but',
    'porque': 'because',
    'donde': 'where',
    'cuando': 'when',
    'quien': 'who',
    'cómo': 'how',
    'como': 'as',
    'que': 'that',
    'para': 'for',
    'con': 'with',
    'sin': 'without',
    'sobre': 'about',
    'entre': 'between',
    'este': 'this',
    'esta': 'this',
    'estos': 'these',
    'estas': 'these',
    'ese': 'that',
    'esa': 'that',
    'esos': 'those',
    'esas': 'those',
    'es': 'is',
    'son': 'are',
    'somos': 'we are',
    'está': 'is',
    'están': 'are',
    'estan': 'are',
    'estamos': 'we are',
    'fue': 'was',
    'fueron': 'were',
    'será': 'will be',
    'seran': 'will be',
    'tener': 'to have',
    'tiene': 'has',
    'tienen': 'have',
    'tenemos': 'we have',
    'hacer': 'to make',
    'hace': 'makes',
    'hacen': 'make',
    'hacemos': 'we make',
    'poder': 'to be able',
    'puede': 'can',
    'pueden': 'can',
    'podemos': 'we can',
    'decir': 'to say',
    'dice': 'says',
    'dicen': 'say',
    'decimos': 'we say',
    'ver': 'to see',
    'vemos': 'we see',
    'mostrar': 'to show',
    'mostramos': 'we show'
  };

  private readonly enToEsDictionary: Record<string, string> = {
    'presentation': 'presentación',
    'slide': 'diapositiva',
    'scene': 'escena',
    'objective': 'objetivo',
    'audience': 'audiencia',
    'business model': 'modelo de negocio',
    'value proposition': 'propuesta de valor',
    'competitive advantage': 'ventaja competitiva',
    'return on investment': 'retorno de inversión',
    'gross margin': 'margen bruto',
    'net margin': 'margen neto',
    'growth': 'crecimiento',
    'revenue': 'ingresos',
    'profits': 'ganancias',
    'costs': 'costos',
    'expenses': 'gastos',
    'investment': 'inversión',
    'investors': 'inversionistas',
    'investor': 'inversor',
    'seed round': 'ronda semilla',
    'seed capital': 'capital semilla',
    'market': 'mercado',
    'customers': 'clientes',
    'users': 'usuarios',
    'product': 'producto',
    'solution': 'solución',
    'problem': 'problema',
    'opportunity': 'oportunidad',
    'traction': 'tracción',
    'validation': 'validación',
    'artificial intelligence': 'inteligencia artificial',
    'machine learning': 'aprendizaje automático',
    'neural network': 'red neuronal',
    'security': 'seguridad',
    'privacy': 'privacidad',
    'architecture': 'arquitectura',
    'scalability': 'escalabilidad',
    'efficiency': 'eficiencia',
    'automation': 'automatización',
    'blockchain': 'cadena de bloques',
    'restaurant': 'restaurante',
    'restaurants': 'restaurantes',
    'fast food': 'comida rápida',
    'quick service restaurant': 'comida rápida',
    'kitchen': 'cocina',
    'orders': 'pedidos',
    'platform': 'plataforma',
    'infrastructure': 'infraestructura',
    'governance': 'gobernanza',
    'evidence': 'evidencia',
    'data': 'datos',
    'analysis': 'análisis',
    'summary': 'resumen',
    'conclusion': 'conclusión',
    'questions': 'preguntas',
    'answers': 'respuestas',
    'thank you': 'gracias',
    'welcome': 'bienvenidos',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good evening': 'buenas noches',
    'hello everyone': 'hola a todos',
    'hello': 'hola',
    'today we are going to': 'hoy vamos a',
    'as you can see': 'como pueden ver',
    'in this slide': 'en esta diapositiva',
    'the next step is': 'el siguiente paso es',
    'our team': 'nuestro equipo',
    'vision': 'visión',
    'mission': 'misión',
    'strategy': 'estrategia',
    'project': 'proyecto',
    'business': 'negocio',
    'company': 'empresa',
    'sales': 'ventas',
    'money': 'dinero',
    'time': 'tiempo',
    'world': 'mundo',
    'person': 'persona',
    'people': 'personas',
    'year': 'año',
    'years': 'años',
    'month': 'mes',
    'months': 'meses',
    'day': 'día',
    'days': 'días',
    'work': 'trabajo',
    'development': 'desarrollo',
    'system': 'sistema',
    'systems': 'sistemas',
    'service': 'servicio',
    'services': 'servicios',
    'technology': 'tecnología',
    'delicious': 'delicioso',
    'helped': 'ayudó',
    'something': 'algo',
    'everything': 'todo',
    'nothing': 'nada',
    'a lot': 'mucho',
    'little': 'poco',
    'big': 'grande',
    'small': 'pequeño',
    'new': 'nuevo',
    'good': 'bueno',
    'better': 'mejor',
    'first': 'primero',
    'second': 'segundo',
    'third': 'tercero',
    'important': 'importante',
    'main': 'principal',
    'now': 'ahora',
    'after': 'después',
    'before': 'antes',
    'always': 'siempre',
    'never': 'nunca',
    'also': 'también',
    'but': 'pero',
    'because': 'porque',
    'where': 'donde',
    'when': 'cuando',
    'who': 'quien',
    'how': 'cómo',
    'that': 'que',
    'for': 'para',
    'with': 'con',
    'without': 'sin',
    'about': 'sobre',
    'between': 'entre',
    'this': 'este',
    'these': 'estos',
    'those': 'esos',
    'is': 'es',
    'are': 'son',
    'was': 'fue',
    'were': 'fueron',
    'will be': 'será',
    'has': 'tiene',
    'have': 'tienen',
    'can': 'puede',
    'we can': 'podemos',
    'we have': 'tenemos',
    'see': 'ver',
    'we see': 'vemos',
    'show': 'mostrar',
    // Domain reverse
    'ledger': 'libro mayor',
    'chain of custody': 'cadena de custodia',
    'integrity proof': 'prueba de integridad',
    'smart contract': 'contrato inteligente',
    'tokenization': 'tokenización',
    'point of sale': 'punto de venta',
    'average ticket': 'ticket promedio',
    'unit economics': 'economía unitaria',
    'tutoring': 'tutoría',
    'student': 'estudiante',
    'students': 'estudiantes',
    'learning': 'aprendizaje',
    'curriculum': 'currículo',
    'active slide': 'diapositiva activa',
    'investor question': 'pregunta del inversor',
    'objection': 'objeción',
    'due diligence': 'due diligence',
    'data room': 'sala de datos',
    'go to market': 'salida a mercado',
    'runway': 'pista de aterrizaje',
    'franchise': 'franquicia',
    'franchises': 'franquicias',
    'immutable': 'inalterable',
    'accounting': 'contabilidad',
    'telemetry': 'telemetría',
    'operations': 'operaciones'
  };

  private readonly spanishGrammarWords = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'en', 'para', 'por', 'con', 'sin',
    'sobre', 'entre', 'que', 'como', 'cuando', 'donde', 'porque', 'este', 'esta', 'estos', 'estas', 'ese', 'esa',
    'nosotros', 'ellos', 'ellas', 'ustedes', 'somos', 'estamos', 'tenemos', 'podemos', 'hacer', 'decir', 'ver',
    'es', 'son', 'fue', 'será', 'está', 'están', 'muy', 'más', 'pero', 'también', 'aquí', 'ahora', 'algo', 'ayudaba'
  ]);

  private readonly englishGrammarWords = new Set([
    'the', 'a', 'an', 'of', 'in', 'to', 'for', 'with', 'without', 'on', 'at', 'by', 'from', 'about', 'between',
    'that', 'which', 'who', 'what', 'when', 'where', 'why', 'how', 'because', 'this', 'that', 'these', 'those',
    'we', 'they', 'you', 'he', 'she', 'it', 'are', 'is', 'am', 'were', 'was', 'have', 'has', 'had', 'can', 'will',
    'would', 'should', 'could', 'make', 'say', 'see', 'very', 'more', 'but', 'also', 'here', 'now', 'our', 'their'
  ]);

  detectLanguage(text: string): SupportedSpeechLanguage {
    const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').split(/\s+/).filter(Boolean);
    if (words.length === 0) return 'es';

    let esScore = 0;
    let enScore = 0;

    for (const w of words) {
      if (this.spanishGrammarWords.has(w)) esScore += 2;
      if (this.englishGrammarWords.has(w)) enScore += 2;
      if (/[áéíóúñ¿¡]/.test(w)) esScore += 3;
      if (this.esToEnDictionary[w]) esScore += 1;
      if (this.enToEsDictionary[w]) enScore += 1;
    }

    return enScore > esScore ? 'en' : 'es';
  }

  translateInstant(text: string, from: SupportedSpeechLanguage, to: SupportedSpeechLanguage): string {
    const trimmed = text.trim();
    if (!trimmed) return '';
    if (from === to) return trimmed;

    const cacheKey = `instant_${from}_${to}_${trimmed}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    const result = this.algorithmicTranslate(trimmed, from, to);
    this.setCached(cacheKey, result);
    return result;
  }

  async translate(text: string, from: SupportedSpeechLanguage, to: SupportedSpeechLanguage): Promise<string> {
    const trimmed = text.trim();
    if (!trimmed) return '';
    if (from === to) return trimmed;

    const cacheKey = `${from}_${to}_${trimmed}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    // Race paid API + GTX + MyMemory; first valid wins (overall ~1.2s)
    const winner = await this.raceNetworkProviders(trimmed, from, to);
    if (winner) {
      this.setCached(cacheKey, winner);
      this.setCached(`instant_${from}_${to}_${trimmed}`, winner);
      return winner;
    }

    const result = this.algorithmicTranslate(trimmed, from, to);
    this.setCached(cacheKey, result);
    return result;
  }

  private getCached(key: string): string | null {
    if (this.translationCache.has(key)) {
      return this.translationCache.get(key)!;
    }
    try {
      if (typeof sessionStorage !== 'undefined') {
        const hit = sessionStorage.getItem(`vh_tr_${key}`);
        if (hit) {
          this.translationCache.set(key, hit);
          return hit;
        }
      }
    } catch {
      /* private mode */
    }
    return null;
  }

  private setCached(key: string, value: string): void {
    this.translationCache.set(key, value);
    try {
      if (typeof sessionStorage !== 'undefined' && value.length < 2000) {
        sessionStorage.setItem(`vh_tr_${key}`, value);
      }
    } catch {
      /* quota / private mode */
    }
  }

  private translateApiBase(): string {
    if (typeof window === 'undefined') return '/translate-api';
    const override = (window as any).__TRANSLATE_API_BASE__;
    if (typeof override === 'string' && override.trim()) {
      return override.replace(/\/$/, '') + '/translate-api';
    }
    return '/translate-api';
  }

  private canUseDevProxy(): boolean {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1';
  }

  /** First successful provider within the timeout budget. */
  private async raceNetworkProviders(
    text: string,
    from: SupportedSpeechLanguage,
    to: SupportedSpeechLanguage
  ): Promise<string | null> {
    const tasks: Array<Promise<string | null>> = [
      this.translateViaPaidApi(text, from, to),
      this.translateViaGtx(text, from, to),
      this.translateViaMyMemory(text, from, to)
    ];

    return new Promise((resolve) => {
      let settled = 0;
      let done = false;
      const finish = (value: string | null) => {
        if (done) return;
        done = true;
        resolve(value);
      };

      // Budget allows DeepL/Google (~0.5s) or Gemma LLM (~3–4s)
      const timer = setTimeout(() => finish(null), 5000);

      for (const task of tasks) {
        task.then((result) => {
          settled += 1;
          if (result && result.trim()) {
            clearTimeout(timer);
            finish(result.trim());
            return;
          }
          if (settled >= tasks.length) {
            clearTimeout(timer);
            finish(null);
          }
        }).catch(() => {
          settled += 1;
          if (settled >= tasks.length) {
            clearTimeout(timer);
            finish(null);
          }
        });
      }
    });
  }

  private async translateViaPaidApi(
    text: string,
    from: SupportedSpeechLanguage,
    to: SupportedSpeechLanguage
  ): Promise<string | null> {
    if (typeof fetch === 'undefined' || navigator?.onLine === false) return null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      const url =
        `${this.translateApiBase()}?q=${encodeURIComponent(text)}&from=${from}&to=${to}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) return null;
      const data = await response.json();
      const out = String(data?.translatedText || '').trim();
      if (!out || data?.error) return null;
      return out;
    } catch {
      return null;
    }
  }

  private async translateViaGtx(
    text: string,
    from: SupportedSpeechLanguage,
    to: SupportedSpeechLanguage
  ): Promise<string | null> {
    if (typeof fetch === 'undefined' || navigator?.onLine === false) return null;
    // Direct Google gtx is blocked by CORS in browsers — only use Vite proxy.
    if (!this.canUseDevProxy()) return null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      const url =
        `/translate-gtx?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) return null;
      const data = await response.json();
      if (!Array.isArray(data) || !Array.isArray(data[0])) return null;
      const joined = data[0]
        .map((chunk: any) => (Array.isArray(chunk) ? chunk[0] : ''))
        .join('')
        .trim();
      return joined || null;
    } catch {
      return null;
    }
  }

  private async translateViaMyMemory(
    text: string,
    from: SupportedSpeechLanguage,
    to: SupportedSpeechLanguage
  ): Promise<string | null> {
    if (typeof fetch === 'undefined' || navigator?.onLine === false) return null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1100);
      const path = `/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
      const url = this.canUseDevProxy()
        ? `/translate-mymemory${path}`
        : `https://api.mymemory.translated.net${path}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) return null;
      const data = await response.json();
      const apiResult = String(data?.responseData?.translatedText || '').trim();
      if (!apiResult || apiResult.includes('MYMEMORY WARNING')) return null;
      return apiResult;
    } catch {
      return null;
    }
  }

  private algorithmicTranslate(text: string, from: SupportedSpeechLanguage, to: SupportedSpeechLanguage): string {
    const dict = from === 'es' ? this.esToEnDictionary : this.enToEsDictionary;
    let result = text;

    // 1. Replace multi-word phrases using Unicode-aware boundaries
    const phrases = Object.keys(dict).filter(k => k.includes(' ')).sort((a, b) => b.length - a.length);
    for (const phrase of phrases) {
      const regex = new RegExp(`(?<![\\p{L}\\p{N}])${this.escapeRegExp(phrase)}(?![\\p{L}\\p{N}])`, 'giu');
      result = result.replace(regex, dict[phrase]);
    }

    // 2. Tokenize preserving words and delimiters
    const tokens = result.split(/([^\p{L}\p{N}]+)/u);
    const translatedTokens = tokens.map(token => {
      const lower = token.toLowerCase();
      if (dict[lower]) {
        // preserve casing
        if (token === token.toUpperCase() && token.length > 1) return dict[lower].toUpperCase();
        if (token[0] === token[0].toUpperCase()) return dict[lower].charAt(0).toUpperCase() + dict[lower].slice(1);
        return dict[lower];
      }
      return token;
    });

    let translated = translatedTokens.join('');

    // 3. Grammar clean-up with Unicode boundaries
    if (from === 'es' && to === 'en') {
      translated = translated
        .replace(/(?<![\p{L}\p{N}])de el(?![\p{L}\p{N}])/giu, 'of the')
        .replace(/(?<![\p{L}\p{N}])para el(?![\p{L}\p{N}])/giu, 'for the')
        .replace(/(?<![\p{L}\p{N}])en el(?![\p{L}\p{N}])/giu, 'in the')
        .replace(/(?<![\p{L}\p{N}])es un(?![\p{L}\p{N}])/giu, 'is a')
        .replace(/(?<![\p{L}\p{N}])es una(?![\p{L}\p{N}])/giu, 'is a')
        .replace(/(?<![\p{L}\p{N}])tenemos que(?![\p{L}\p{N}])/giu, 'we have to')
        .replace(/(?<![\p{L}\p{N}])podemos ver(?![\p{L}\p{N}])/giu, 'we can see')
        .replace(/(?<![\p{L}\p{N}])por qué(?![\p{L}\p{N}])/giu, 'why')
        .replace(/(?<![\p{L}\p{N}])porque(?![\p{L}\p{N}])/giu, 'because')
        .replace(/(?<![\p{L}\p{N}])con el(?![\p{L}\p{N}])/giu, 'with the')
        .replace(/(?<![\p{L}\p{N}])y el(?![\p{L}\p{N}])/giu, 'and the')
        .replace(/(?<![\p{L}\p{N}])o el(?![\p{L}\p{N}])/giu, 'or the');
    } else {
      translated = translated
        .replace(/(?<![\p{L}\p{N}])of the(?![\p{L}\p{N}])/giu, 'del')
        .replace(/(?<![\p{L}\p{N}])for the(?![\p{L}\p{N}])/giu, 'para el')
        .replace(/(?<![\p{L}\p{N}])in the(?![\p{L}\p{N}])/giu, 'en el')
        .replace(/(?<![\p{L}\p{N}])is a(?![\p{L}\p{N}])/giu, 'es un')
        .replace(/(?<![\p{L}\p{N}])we have to(?![\p{L}\p{N}])/giu, 'tenemos que')
        .replace(/(?<![\p{L}\p{N}])we can see(?![\p{L}\p{N}])/giu, 'podemos ver')
        .replace(/(?<![\p{L}\p{N}])with the(?![\p{L}\p{N}])/giu, 'con el')
        .replace(/(?<![\p{L}\p{N}])and the(?![\p{L}\p{N}])/giu, 'y el');
    }

    return translated;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
