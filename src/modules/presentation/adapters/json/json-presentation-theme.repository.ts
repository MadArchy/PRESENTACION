import { PresentationThemeRepository } from '../../domain/ports/presentation-theme-repository.port';
import { PresentationTheme } from '../../domain/presentation.types';

export class JsonPresentationThemeRepository implements PresentationThemeRepository {
  private themes: Map<string, PresentationTheme> = new Map();
  private isLoaded = false;

  constructor(private readonly provider?: () => Promise<PresentationTheme[]> | PresentationTheme[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.provider) {
      const list = await this.provider();
      for (const t of list) {
        this.themes.set(t.id, t);
      }
    } else {
      const defaultThemes: PresentationTheme[] = [
        {
          id: 'executive-dark',
          version: '1.0',
          name: 'Executive Dark Midnight',
          mode: 'DARK',
          tokens: {
            color: {
              background: '#030712',
              surface: '#0f172a',
              surfaceElevated: '#1e293b',
              surfaceHover: 'rgba(255, 255, 255, 0.05)',
              border: 'rgba(255, 255, 255, 0.08)',
              borderSubtle: 'rgba(255, 255, 255, 0.04)',
              textPrimary: '#f8fafc',
              textSecondary: '#94a3b8',
              textMuted: '#64748b',
              accent: '#38bdf8',
              accentSubtle: 'rgba(56, 189, 248, 0.12)',
              gold: '#c9a46a',
              statusSuccess: '#10b981',
              statusWarning: '#f59e0b',
              statusDanger: '#ef4444',
              statusInfo: "#3b82f6"
            },
            typography: {
              fontFamilySans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontFamilyMono: "'JetBrains Mono', 'Fira Code', monospace",
              fontSizeDisplay: '2.75rem',
              fontSizeHeadline: '1.85rem',
              fontSizeSubheadline: '1.25rem',
              fontSizeBody: '0.95rem',
              fontSizeCaption: '0.75rem'
            },
            spacing: {
              scenePadding: '3rem 4rem',
              blockGap: '1.75rem',
              elementGap: '1rem'
            },
            radius: {
              card: '12px',
              pill: '9999px',
              button: '8px'
            },
            elevation: {
              card: '0 10px 30px rgba(0, 0, 0, 0.5)',
              modal: '0 25px 50px rgba(0, 0, 0, 0.75)'
            },
            motion: {
              transitionFast: '0.15s ease',
              transitionNormal: '0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }
          }
        },
        {
          id: 'executive-light',
          version: '1.0',
          name: 'Executive Clean Light',
          mode: 'LIGHT',
          tokens: {
            color: {
              background: '#f8fafc',
              surface: '#ffffff',
              surfaceElevated: '#f1f5f9',
              surfaceHover: 'rgba(0, 0, 0, 0.03)',
              border: 'rgba(0, 0, 0, 0.08)',
              borderSubtle: 'rgba(0, 0, 0, 0.04)',
              textPrimary: '#0f172a',
              textSecondary: '#475569',
              textMuted: '#94a3b8',
              accent: '#0284c7',
              accentSubtle: 'rgba(2, 132, 199, 0.1)',
              gold: '#b48c48',
              statusSuccess: '#059669',
              statusWarning: '#d97706',
              statusDanger: '#dc2626',
              statusInfo: '#2563eb'
            },
            typography: {
              fontFamilySans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontFamilyMono: "'JetBrains Mono', 'Fira Code', monospace",
              fontSizeDisplay: '2.75rem',
              fontSizeHeadline: '1.85rem',
              fontSizeSubheadline: '1.25rem',
              fontSizeBody: '0.95rem',
              fontSizeCaption: '0.75rem'
            },
            spacing: {
              scenePadding: '3rem 4rem',
              blockGap: '1.75rem',
              elementGap: '1rem'
            },
            radius: {
              card: '12px',
              pill: '9999px',
              button: '8px'
            },
            elevation: {
              card: '0 4px 20px rgba(0, 0, 0, 0.06)',
              modal: '0 20px 40px rgba(0, 0, 0, 0.15)'
            },
            motion: {
              transitionFast: '0.15s ease',
              transitionNormal: '0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }
          }
        }
      ];

      for (const t of defaultThemes) {
        this.themes.set(t.id, t);
      }
    }

    this.isLoaded = true;
  }

  async list(): Promise<PresentationTheme[]> {
    await this.ensureLoaded();
    return Array.from(this.themes.values());
  }

  async findById(id: string): Promise<PresentationTheme | null> {
    await this.ensureLoaded();
    return this.themes.get(id) || null;
  }
}
