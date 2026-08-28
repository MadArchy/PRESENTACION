/**
 * Venture Hub OS — Design System V2: Metric & Insight Card Patterns
 */

export interface MetricCardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  trendLabel?: string;
  statusVariant?: 'neutral' | 'success' | 'warning' | 'critical' | 'accent';
  icon?: string;
  onClick?: string;
}

export function renderMetricCard(props: MetricCardProps): string {
  const statusClass = props.statusVariant ? `metric-card-v2--${props.statusVariant}` : '';
  const onclickAttr = props.onClick ? `onclick="${props.onClick}" role="button" tabindex="0"` : '';
  const idAttr = props.id ? `id="${props.id}"` : '';

  return `
    <div ${idAttr} class="metric-card-v2 ${statusClass}" ${onclickAttr}>
      <div class="metric-card-v2__top">
        <span class="metric-card-v2__title">${props.title}</span>
        ${props.icon ? `<span class="metric-card-v2__icon" aria-hidden="true">${props.icon}</span>` : ''}
      </div>
      <div class="metric-card-v2__value">${props.value}</div>
      ${props.subtitle || props.trendLabel ? `
        <div class="metric-card-v2__bottom">
          ${props.trendLabel ? `<span class="metric-card-v2__trend trend--${props.trend || 'neutral'}">${props.trendLabel}</span>` : ''}
          ${props.subtitle ? `<span class="metric-card-v2__subtitle">${props.subtitle}</span>` : ''}
        </div>
      ` : ''}
    </div>
  `.trim();
}

export interface InsightCardProps {
  title: string;
  description: string;
  category: 'Risk' | 'Diligence' | 'Evidence' | 'Narrative' | 'Operational';
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  actionLabel?: string;
  actionTarget?: string;
}

export function renderInsightCard(props: InsightCardProps): string {
  const severityClass = props.severity ? `insight-card-v2--${props.severity.toLowerCase()}` : '';

  return `
    <div class="insight-card-v2 ${severityClass}">
      <div class="insight-card-v2__header">
        <span class="insight-category-badge">${props.category}</span>
        ${props.severity ? `<span class="insight-severity-badge severity--${props.severity.toLowerCase()}">${props.severity}</span>` : ''}
      </div>
      <h4 class="insight-card-v2__title">${props.title}</h4>
      <p class="insight-card-v2__description">${props.description}</p>
      ${props.actionLabel ? `
        <div class="insight-card-v2__footer">
          <button type="button" class="insight-action-btn" onclick="${props.actionTarget || ''}">
            <span>${props.actionLabel}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ` : ''}
    </div>
  `.trim();
}
