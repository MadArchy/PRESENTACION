/**
 * Venture Hub OS — Design System V2: Button Primitive
 */

export interface ButtonProps {
  id?: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  onClick?: string;
  ariaLabel?: string;
}

export function renderButton(props: ButtonProps): string {
  const variantClass = `btn-v2--${props.variant || 'primary'}`;
  const sizeClass = `btn-v2--${props.size || 'md'}`;
  const disabledAttr = props.disabled ? 'disabled aria-disabled="true"' : '';
  const onclickAttr = props.onClick ? `onclick="${props.onClick}"` : '';
  const idAttr = props.id ? `id="${props.id}"` : '';
  const ariaAttr = props.ariaLabel ? `aria-label="${props.ariaLabel}"` : '';
  const iconHtml = props.icon ? `<span class="btn-v2__icon" aria-hidden="true">${props.icon}</span>` : '';

  return `
    <button ${idAttr} class="btn-v2 ${variantClass} ${sizeClass}" ${disabledAttr} ${onclickAttr} ${ariaAttr}>
      ${iconHtml}
      <span class="btn-v2__label">${props.label}</span>
    </button>
  `.trim();
}
