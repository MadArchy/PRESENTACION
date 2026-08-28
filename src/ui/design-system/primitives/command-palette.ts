/**
 * Venture Hub OS — Design System V2: Command Palette & Source Chip
 */

export interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Copilot' | 'Entities';
  shortcut?: string;
  icon?: string;
  action: string;
}

export function renderCommandPalette(items: CommandItem[]): string {
  const categories = Array.from(new Set(items.map(i => i.category)));

  const categoriesHtml = categories.map(cat => {
    const catItems = items.filter(i => i.category === cat);
    return `
      <div class="cmd-palette__group">
        <div class="cmd-palette__group-title">${cat}</div>
        <div class="cmd-palette__list">
          ${catItems.map(item => `
            <div class="cmd-palette__item" onclick="${item.action}" role="button" tabindex="0" data-cmd-id="${item.id}">
              <div class="cmd-palette__item-left">
                ${item.icon ? `<span class="cmd-palette__icon">${item.icon}</span>` : ''}
                <span class="cmd-palette__label">${item.title}</span>
              </div>
              ${item.shortcut ? `<kbd class="cmd-palette__shortcut">${item.shortcut}</kbd>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div id="globalCommandPalette" class="cmd-palette-backdrop" style="display: none;" onclick="if(event.target===this) window.VentureHubBridge?.toggleCommandPalette(false)">
      <div class="cmd-palette" role="dialog" aria-modal="true" aria-label="Global Command Palette">
        <div class="cmd-palette__search">
          <span class="cmd-palette__search-icon" aria-hidden="true">🔍</span>
          <input id="cmdPaletteInput" type="text" class="cmd-palette__input" placeholder="Type a command, search entity, or ask Copilot (⌘K)..." autocomplete="off" />
          <kbd class="cmd-palette__esc-hint">ESC</kbd>
        </div>
        <div class="cmd-palette__content">
          ${categoriesHtml}
        </div>
        <div class="cmd-palette__footer">
          <span>Navigate <kbd>↑</kbd><kbd>↓</kbd></span>
          <span>Select <kbd>↵</kbd></span>
          <span>Close <kbd>ESC</kbd></span>
        </div>
      </div>
    </div>
  `.trim();
}

export interface SourceChipProps {
  sourceType: string;
  sourceId: string;
  label: string;
  navigationTarget?: string;
}

export function renderSourceChip(props: SourceChipProps): string {
  const onclickAttr = props.navigationTarget ? `onclick="window.VentureHubBridge?.navigateToSource('${props.sourceType}', '${props.sourceId}', '${props.navigationTarget}')"` : '';

  return `
    <button type="button" class="source-chip-v2" ${onclickAttr} data-source-type="${props.sourceType}" data-source-id="${props.sourceId}">
      <span class="source-chip-v2__icon">🔗</span>
      <span class="source-chip-v2__type">${props.sourceType}</span>
      <span class="source-chip-v2__label">${props.label}</span>
    </button>
  `.trim();
}
