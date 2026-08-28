/**
 * Venture Hub OS — Design System V2 Tokens
 * Provides semantic, Apple-inspired minimal executive design tokens
 * for light and dark modes, spacing, typography, radii, shadows, and motion.
 */

export interface DesignTokensV2 {
  colors: {
    canvas: string;
    canvasSubtle: string;
    surface: string;
    surfaceElevated: string;
    surfaceTranslucent: string;
    border: string;
    borderSubtle: string;
    borderStrong: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    accentSubtle: string;
    success: string;
    successSubtle: string;
    warning: string;
    warningSubtle: string;
    critical: string;
    criticalSubtle: string;
  };
  typography: {
    fontFamily: string;
    fontFamilyMono: string;
    display: string;
    pageTitle: string;
    sectionTitle: string;
    cardTitle: string;
    body: string;
    bodySecondary: string;
    metadata: string;
    metricNumber: string;
    code: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    subtleDepth: string;
    elevatedGlow: string;
  };
  motion: {
    durationFast: string;
    durationNormal: string;
    durationSlow: string;
    easingStandard: string;
    easingDecelerate: string;
  };
}

export const lightTokensV2: DesignTokensV2 = {
  colors: {
    canvas: '#F8FAFC',
    canvasSubtle: '#F1F5F9',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceTranslucent: 'rgba(255, 255, 255, 0.85)',
    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    borderStrong: '#CBD5E1',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    accentSubtle: '#EFF6FF',
    success: '#059669',
    successSubtle: '#ECFDF5',
    warning: '#D97706',
    warningSubtle: '#FFFBEB',
    critical: '#DC2626',
    criticalSubtle: '#FEF2F2'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontFamilyMono: '"SF Mono", "Fira Code", Menlo, monospace',
    display: 'font-size: 2.25rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.025em;',
    pageTitle: 'font-size: 1.75rem; font-weight: 600; line-height: 1.25; letter-spacing: -0.02em;',
    sectionTitle: 'font-size: 1.25rem; font-weight: 600; line-height: 1.3; letter-spacing: -0.015em;',
    cardTitle: 'font-size: 1rem; font-weight: 600; line-height: 1.4;',
    body: 'font-size: 0.9375rem; font-weight: 400; line-height: 1.5;',
    bodySecondary: 'font-size: 0.875rem; font-weight: 400; line-height: 1.5;',
    metadata: 'font-size: 0.75rem; font-weight: 500; line-height: 1.4; letter-spacing: 0.02em;',
    metricNumber: 'font-size: 2rem; font-weight: 700; line-height: 1.1; letter-spacing: -0.03em;',
    code: 'font-size: 0.8125rem; font-family: "SF Mono", monospace;'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    subtleDepth: '0 0 0 1px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04)',
    elevatedGlow: '0 12px 24px -4px rgba(37, 99, 235, 0.12)'
  },
  motion: {
    durationFast: '150ms',
    durationNormal: '220ms',
    durationSlow: '300ms',
    easingStandard: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
    easingDecelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)'
  }
};

export const darkTokensV2: DesignTokensV2 = {
  ...lightTokensV2,
  colors: {
    canvas: '#0B0F17',
    canvasSubtle: '#111827',
    surface: '#161F2E',
    surfaceElevated: '#1E293B',
    surfaceTranslucent: 'rgba(22, 31, 46, 0.85)',
    border: '#1E293B',
    borderSubtle: '#172033',
    borderStrong: '#334155',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#3B82F6',
    accentHover: '#60A5FA',
    accentSubtle: 'rgba(59, 130, 246, 0.15)',
    success: '#10B981',
    successSubtle: 'rgba(16, 185, 129, 0.15)',
    warning: '#F59E0B',
    warningSubtle: 'rgba(245, 158, 11, 0.15)',
    critical: '#EF4444',
    criticalSubtle: 'rgba(239, 68, 68, 0.15)'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    subtleDepth: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.4)',
    elevatedGlow: '0 12px 28px -4px rgba(59, 130, 246, 0.25)'
  }
};
