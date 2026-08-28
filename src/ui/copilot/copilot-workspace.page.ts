/**
 * Venture Hub OS — Copilot Workspace Page (Full-Page Conversational Experience)
 */

import { renderTopProductBar, renderContextSidebar } from '../design-system/patterns/top-product-bar';
import { renderSourceChip } from '../design-system/primitives/command-palette';
import { CopilotConversation, CopilotMessage } from '../../modules/copilot/domain/copilot-conversation.types';

export interface CopilotWorkspaceProps {
  organizationName: string;
  projectName: string;
  projectId: string;
  conversation?: CopilotConversation;
}

export function renderCopilotWorkspacePage(props: CopilotWorkspaceProps): string {
  const topBarHtml = renderTopProductBar({
    organizationName: props.organizationName,
    projectName: props.projectName,
    projectId: props.projectId,
    currentMode: 'dark'
  });

  const sidebarHtml = renderContextSidebar({
    activeModule: 'copilot',
    projectId: props.projectId
  });

  const messages = props.conversation?.messages || [];

  const messagesHtml = messages.length === 0 ? `
    <div class="copilot-empty-hero">
      <div class="copilot-hero-icon">✨</div>
      <h2 class="copilot-hero-title">Ask anything about ${props.projectName}</h2>
      <p class="copilot-hero-subtitle">Grounded in verified Project Twin data, claims, evidence, and diligence records.</p>
      
      <div class="copilot-mode-selector-bar">
        <button type="button" class="mode-pill active" onclick="window.VentureHubBridge?.setCopilotMode('EXECUTIVE')">Executive</button>
        <button type="button" class="mode-pill" onclick="window.VentureHubBridge?.setCopilotMode('ANALYST')">Analyst</button>
        <button type="button" class="mode-pill" onclick="window.VentureHubBridge?.setCopilotMode('INVESTOR')">Investor</button>
        <button type="button" class="mode-pill" onclick="window.VentureHubBridge?.setCopilotMode('DUE_DILIGENCE')">Due Diligence</button>
        <button type="button" class="mode-pill" onclick="window.VentureHubBridge?.setCopilotMode('PRESENTER')">Presenter</button>
      </div>

      <div class="copilot-suggested-prompts-grid">
        <button type="button" class="prompt-chip-card" onclick="window.VentureHubBridge?.submitCopilotPrompt('Summarize this venture for an investor')">
          <span class="prompt-chip-icon">📄</span>
          <span class="prompt-chip-text">Summarize this venture for an investor</span>
        </button>
        <button type="button" class="prompt-chip-card" onclick="window.VentureHubBridge?.submitCopilotPrompt('What are the critical unsupported claims and diligence gaps?')">
          <span class="prompt-chip-icon">⚠️</span>
          <span class="prompt-chip-text">Show unsupported claims & diligence gaps</span>
        </button>
        <button type="button" class="prompt-chip-card" onclick="window.VentureHubBridge?.submitCopilotPrompt('Prepare talking points and investor objections for our 5-minute pitch')">
          <span class="prompt-chip-icon">🎤</span>
          <span class="prompt-chip-text">Prepare pitch talking points & objections</span>
        </button>
        <button type="button" class="prompt-chip-card" onclick="window.VentureHubBridge?.submitCopilotPrompt('What verified evidence supports our transaction finality claim?')">
          <span class="prompt-chip-icon">⚖️</span>
          <span class="prompt-chip-text">Inspect verified evidence for key claims</span>
        </button>
      </div>
    </div>
  ` : messages.map(msg => renderCopilotMessage(msg)).join('');

  return `
    <div class="app-layout-v2 theme-dark">
      ${topBarHtml}
      
      <div class="app-body-v2">
        ${sidebarHtml}

        <main class="main-content-surface copilot-workspace-layout" role="main">
          <div class="copilot-chat-container">
            <div id="copilotMessagesList" class="copilot-messages-scroll-area">
              ${messagesHtml}
            </div>

            <div class="copilot-composer-container">
              <form id="copilotForm" class="copilot-composer-form" onsubmit="window.VentureHubBridge?.onCopilotSubmit(event); return false;">
                <div class="copilot-composer-box">
                  <textarea id="copilotInput" class="copilot-composer-textarea" placeholder="Ask a question about ${props.projectName}..." rows="1" onkeydown="if(event.key==='Enter' && !event.shiftKey){ event.preventDefault(); window.VentureHubBridge?.onCopilotSubmit(event); }"></textarea>
                  <button type="submit" id="copilotSendBtn" class="copilot-send-btn" aria-label="Send message">
                    <span aria-hidden="true">↑</span>
                  </button>
                </div>
                <div class="copilot-composer-footer">
                  <span class="copilot-guardrail-hint">🔒 Grounded in verified project data • AI Output ≠ Project Truth</span>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  `.trim();
}

function renderCopilotMessage(msg: CopilotMessage): string {
  const isUser = msg.role === 'USER';
  const roleClass = isUser ? 'msg--user' : 'msg--assistant';

  if (isUser) {
    return `
      <div class="copilot-message ${roleClass}">
        <div class="msg-bubble">${msg.content}</div>
      </div>
    `;
  }

  const groundingBadge = msg.groundingStatus ? `
    <span class="grounding-badge grounding-badge--${msg.groundingStatus.toLowerCase()}">
      ${msg.groundingStatus === 'GROUNDED' ? '✓ Grounded' : msg.groundingStatus === 'PARTIALLY_GROUNDED' ? '⚡ Partially Grounded' : '⚠️ Insufficient Project Evidence'}
    </span>
  ` : '';

  const sourcesHtml = (msg.sources && msg.sources.length > 0) ? `
    <div class="msg-sources-section">
      <span class="msg-sources-title">Supporting Sources:</span>
      <div class="msg-sources-list">
        ${msg.sources.map(s => renderSourceChip({
          sourceType: s.sourceType,
          sourceId: s.sourceId,
          label: s.label,
          navigationTarget: s.navigationTarget
        })).join('')}
      </div>
    </div>
  ` : '';

  const actionsHtml = (msg.suggestedActions && msg.suggestedActions.length > 0) ? `
    <div class="msg-actions-section">
      ${msg.suggestedActions.map(a => `
        <button type="button" class="btn-action-suggestion" onclick="window.VentureHubBridge?.executeCopilotAction('${a.id}', '${a.actionType}', '${a.targetModule}', '${a.targetEntityId || ''}')">
          <span>${a.label}</span>
          <span aria-hidden="true">→</span>
        </button>
      `).join('')}
    </div>
  ` : '';

  const followUpsHtml = (msg.followUpPrompts && msg.followUpPrompts.length > 0) ? `
    <div class="msg-followups-section">
      ${msg.followUpPrompts.map(f => `
        <button type="button" class="btn-followup-chip" onclick="window.VentureHubBridge?.submitCopilotPrompt('${f.replace(/'/g, "\\'")}')">
          ${f}
        </button>
      `).join('')}
    </div>
  ` : '';

  return `
    <div class="copilot-message ${roleClass}">
      <div class="msg-header">
        <span class="assistant-avatar">✨</span>
        <span class="assistant-name">Project Copilot</span>
        ${groundingBadge}
      </div>
      <div class="msg-bubble formatted-content">
        ${msg.content.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>')}
      </div>
      ${sourcesHtml}
      ${actionsHtml}
      ${followUpsHtml}
    </div>
  `;
}
