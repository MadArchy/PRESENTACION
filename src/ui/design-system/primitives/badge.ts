/**
 * Venture Hub OS — Design System V2: Badge & Card Primitives
 */

export interface BadgeProps {
  label: string;
  variant?: 'neutral' | 'success' | 'warning' | 'critical' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  icon?: string;
}

export function renderBadge(props: BadgeProps): string {
  const variantClass = `badge-v2--${props.variant || 'neutral'}`;
  const sizeClass = `badge-v2--${props.size || 'md'}`;
  const iconHtml = props.icon ? `<span class="badge-v2__icon" aria-hidden="true">${props.icon}</span>` : '';

  return `
    <span class="badge-v2 ${variantClass} ${sizeClass}">
      ${iconHtml}
      <span>${props.label}</span>
    </span>
  `.trim();
}

export interface CardProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: string;
  content: string;
  footer?: string;
  interactive?: boolean;
  onClick?: string;
}

export function renderCard(props: CardProps): string {
  const interactiveClass = props.interactive ? 'card-v2--interactive' : '';
  const idAttr = props.id ? `id="${props.id}"` : '';
  const onclickAttr = props.onClick ? `onclick="${props.onClick}"` : '';
  const customClass = props.className || '';

  const headerHtml = (props.title || props.subtitle || props.headerAction) ? `
    <div class="card-v2__header">
      <div class="card-v2__title-group">
        ${props.title ? `<h3 class="card-v2__title">${props.title}</h3>` : ''}
        ${props.subtitle ? `<p class="card-v2__subtitle">${props.subtitle}</p>` : ''}
      </div>
      ${props.headerAction ? `<div class="card-v2__action">${props.headerAction}</div>` : ''}
    </div>
  ` : '';

  const footerHtml = props.footer ? `
    <div class="card-v2__footer">
      ${props.footer}
    </div>
  ` : '';

  return `
    <div ${idAttr} class="card-v2 ${interactiveClass} ${customClass}" ${onclickAttr}>
      ${headerHtml}
      <div class="card-v2__body">
        ${props.content}
      </div>
      ${footerHtml}
    </div>
  `.trim();
}
