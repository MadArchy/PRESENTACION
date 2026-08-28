/**
 * Venture Hub OS — Contextual Copilot Side Panel Component
 */

export interface CopilotSidePanelProps {
  currentModule: string;
  projectName: string;
  isOpen: boolean;
}

export function renderCopilotSidePanel(props: CopilotSidePanelProps): string {
  const openClass = props.isOpen ? 'copilot-panel--open' : '';

  return `
    <aside id="copilotSidePanel" class="copilot-side-panel ${openClass}" aria-label="Contextual Copilot Side Panel">
      <div class="copilot-side-panel__header">
        <div class="copilot-side-panel__title-group">
          <span class="sparkle-icon">✨</span>
          <h3 class="copilot-side-panel__title">Copilot: ${props.projectName}</h3>
        </div>
        <button type="button" class="btn-close-panel" onclick="window.VentureHubBridge?.toggleCopilotSidePanel(false)" aria-label="Close Copilot Panel">✕</button>
      </div>

      <div class="copilot-side-panel__context-badge">
        <span>Context: <strong>${props.currentModule.toUpperCase()}</strong></span>
      </div>

      <div id="sidePanelMessages" class="copilot-side-panel__messages">
        <div class="side-panel-welcome">
          <p>Ask a question about this ${props.currentModule} context or request an analytical summary.</p>
        </div>
      </div>

      <div class="copilot-side-panel__composer">
        <form onsubmit="window.VentureHubBridge?.onSidePanelSubmit(event); return false;">
          <input id="sidePanelInput" type="text" class="side-panel-input" placeholder="Ask about this module..." />
          <button type="submit" class="side-panel-send-btn">↑</button>
        </form>
      </div>
    </aside>
  `.trim();
}
