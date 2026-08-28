import { IBilingualTranslator } from '../adapters/bilingual-translator.adapter';
import { SupportedSpeechLanguage } from '../domain/speech-utterance.entity';

export interface BilingualTranslationResult {
  sourceLanguage: SupportedSpeechLanguage;
  originalText: string;
  spanishText: string;
  englishText: string;
  quality: 'instant' | 'network';
}

export class BilingualTranslationUseCase {
  constructor(private readonly translator: IBilingualTranslator) {}

  detectLanguage(text: string): SupportedSpeechLanguage {
    return this.translator.detectLanguage(text);
  }

  /**
   * Instant path for live subtitles:
   * - Source language line = original speech (always correct)
   * - Target language line = dictionary now, network upgrades later
   */
  executeInstant(rawText: string, forcedSourceLang?: SupportedSpeechLanguage): BilingualTranslationResult {
    const text = rawText.trim();
    if (!text) {
      return {
        sourceLanguage: forcedSourceLang || 'es',
        originalText: '',
        spanishText: '',
        englishText: '',
        quality: 'instant'
      };
    }

    const detectedLang = forcedSourceLang || this.translator.detectLanguage(text);

    if (detectedLang === 'es') {
      return {
        sourceLanguage: 'es',
        originalText: text,
        spanishText: text,
        englishText: this.translator.translateInstant(text, 'es', 'en'),
        quality: 'instant'
      };
    }

    return {
      sourceLanguage: 'en',
      originalText: text,
      spanishText: this.translator.translateInstant(text, 'en', 'es'),
      englishText: text,
      quality: 'instant'
    };
  }

  async execute(rawText: string, forcedSourceLang?: SupportedSpeechLanguage): Promise<BilingualTranslationResult> {
    const text = rawText.trim();
    if (!text) {
      return {
        sourceLanguage: forcedSourceLang || 'es',
        originalText: '',
        spanishText: '',
        englishText: '',
        quality: 'instant'
      };
    }

    const detectedLang = forcedSourceLang || this.translator.detectLanguage(text);
    let esText = '';
    let enText = '';

    if (detectedLang === 'es') {
      esText = text;
      enText = await this.translator.translate(text, 'es', 'en');
    } else {
      enText = text;
      esText = await this.translator.translate(text, 'en', 'es');
    }

    const opposite = detectedLang === 'es' ? enText : esText;
    const quality: 'instant' | 'network' =
      opposite && opposite.toLowerCase() !== text.toLowerCase() ? 'network' : 'instant';

    return {
      sourceLanguage: detectedLang,
      originalText: text,
      spanishText: esText,
      englishText: enText,
      quality
    };
  }
}
