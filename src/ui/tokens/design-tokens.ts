export const DESIGN_TOKENS = {
  colors: {
    bgPrimary: 'var(--bg-primary, #030712)',
    bgSecondary: 'var(--bg-secondary, #080d1a)',
    bgCard: 'var(--bg-card, rgba(8, 14, 28, 0.85))',
    gold: 'var(--gold, #c9a46a)',
    cyan: 'var(--accent-cyan, #06b6d4)',
    purple: 'var(--accent-purple, #a855f7)',
    emerald: 'var(--accent-emerald, #10b981)',
    amber: 'var(--accent-amber, #f59e0b)',
    rose: 'var(--accent-rose, #f43f5e)',
    textPrimary: 'var(--text-primary, #ffffff)',
    textSecondary: 'var(--text-secondary, #cbd5e1)',
    textMuted: 'var(--text-muted, #94a3b8)'
  },
  fonts: {
    sans: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
    heading: "var(--font-heading, 'Outfit', sans-serif)",
    display: "var(--font-display, 'Fraunces', serif)",
    mono: "var(--font-mono, 'JetBrains Mono', monospace)"
  },
  radii: {
    sm: '8px',
    md: '14px',
    lg: '22px',
    full: '9999px'
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  }
} as const;
