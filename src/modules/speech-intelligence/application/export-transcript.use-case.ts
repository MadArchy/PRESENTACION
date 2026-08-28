import { SpeechSessionEntity } from '../domain/speech-session.entity';

export interface ExportTranscriptOptions {
  format: 'MARKDOWN' | 'TXT' | 'JSON';
  mode: 'BILINGUAL_DUAL' | 'SPANISH_ONLY' | 'ENGLISH_ONLY';
  includeTimestamps?: boolean;
}

export class ExportTranscriptUseCase {
  execute(session: SpeechSessionEntity, options: ExportTranscriptOptions): string {
    if (options.format === 'JSON') {
      return JSON.stringify(session.toJSON(), null, 2);
    }

    const utterances = session.getUtterances().filter(u =>
      u.getIsFinal() && u.getOriginalText().trim().length > 0
    );
    const dateStr = new Date(session.getStartedAt()).toLocaleString();
    const startedAt = session.getStartedAt();

    if (options.format === 'MARKDOWN') {
      let md = `# Minuta Ejecutiva & Transcripción de Presentación\n\n`;
      md += `**Proyecto:** \`${session.getProjectId().toUpperCase()}\` | **Deck:** \`${session.getDeckId()}\`\n`;
      md += `**Fecha de Sesión:** ${dateStr}\n`;
      md += `**Idioma Primario de Escucha:** ${session.getPrimaryListeningLanguage() === 'es' ? 'Español 🇪🇸' : 'English 🇬🇧'}\n`;
      md += `**Total Segmentos:** ${utterances.length} | **Palabras ES:** ${session.getTotalWordCount().spanish} | **Palabras EN:** ${session.getTotalWordCount().english}\n\n`;
      md += `---\n\n`;

      const slideMap = new Map<number, typeof utterances>();
      utterances.forEach(u => {
        const slide = Math.max(1, u.getSlideIndex() || 1);
        if (!slideMap.has(slide)) slideMap.set(slide, []);
        slideMap.get(slide)!.push(u);
      });

      if (slideMap.size === 0) {
        md += `*No se registraron fragmentos de voz durante esta sesión.*\n`;
      } else {
        const sorted = Array.from(slideMap.keys()).sort((a, b) => a - b);
        sorted.forEach(slideNum => {
          const items = slideMap.get(slideNum) || [];
          md += `### 📽️ Diapositiva ${slideNum}\n\n`;
          items.forEach(item => {
            const timeTag = options.includeTimestamps !== false ? `\`[${item.getFormattedTime(startedAt)}]\`` : '';
            if (options.mode === 'BILINGUAL_DUAL') {
              md += `- ${timeTag} **[ES]** ${item.getSpanishText()}\n`;
              md += `  > **[EN]** ${item.getEnglishText()}\n\n`;
            } else if (options.mode === 'SPANISH_ONLY') {
              md += `- ${timeTag} ${item.getSpanishText()}\n`;
            } else {
              md += `- ${timeTag} ${item.getEnglishText()}\n`;
            }
          });
          md += `\n`;
        });
      }

      md += `\n---\n*Generado automáticamente por el Motor de Inteligencia de Audio y Transcripción de 3i BAIRD LAB.*\n`;
      return md;
    }

    let txt = `MINUTA DE PRESENTACION - ${session.getProjectId().toUpperCase()} (${dateStr})\n`;
    txt += `========================================================================\n\n`;
    utterances.forEach(u => {
      const slide = Math.max(1, u.getSlideIndex() || 1);
      const timeTag = `[${u.getFormattedTime(startedAt)} - Slide ${slide}]`;
      if (options.mode === 'BILINGUAL_DUAL') {
        txt += `${timeTag} [ES]: ${u.getSpanishText()}\n`;
        txt += `               [EN]: ${u.getEnglishText()}\n\n`;
      } else if (options.mode === 'SPANISH_ONLY') {
        txt += `${timeTag} ${u.getSpanishText()}\n`;
      } else {
        txt += `${timeTag} ${u.getEnglishText()}\n`;
      }
    });

    return txt;
  }
}
