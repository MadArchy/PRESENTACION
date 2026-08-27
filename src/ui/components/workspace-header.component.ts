import { ProjectAggregate } from '../../modules/project/domain/entities/project.aggregate';

export function renderWorkspaceHeader(project: ProjectAggregate): string {
  const statusColors: Record<string, string> = {
    pilot: '#10b981',
    active: '#06b6d4',
    validation: '#f59e0b',
    concept: '#a855f7',
    paused: '#94a3b8',
    archived: '#64748b'
  };

  const statusColor = statusColors[project.getStatus()] || '#94a3b8';

  return `
    <header class="workspace-header" style="background: rgba(8, 14, 28, 0.95); border-bottom: 1px solid rgba(201, 164, 106, 0.25); padding: 18px 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
      <div class="workspace-brand-col">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; color: var(--gold); text-transform: uppercase;">
            PROJECT TWIN · ${project.getType()}
          </span>
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${statusColor};"></span>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; color: ${statusColor};">
            ${project.getStatus()}
          </span>
        </div>
        <h1 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; margin: 0; color: #fff; letter-spacing: -0.02em;">
          ${project.getName()}
        </h1>
      </div>

      <div class="workspace-meta-badges" style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <div class="badge-item" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 12px; font-family: var(--font-mono); font-size: 0.75rem;">
          <span style="color: var(--text-muted);">v:</span> <strong style="color: #fff;">${project.getCurrentVersion()}</strong>
          <span style="color: var(--text-muted); margin-left: 8px;">schema:</span> <strong style="color: var(--gold);">${project.getSchemaVersion()}</strong>
        </div>

        <button type="button" class="btn-nav btn-nav-primary" onclick="window.VentureHubBridge && window.VentureHubBridge.launchProject('${project.getId()}')" style="cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span class="lang-es">Lanzar Presentación</span>
          <span class="lang-en">Launch Deck</span>
          <span>⚡</span>
        </button>

        <button type="button" class="btn-nav" onclick="window.VentureHubBridge && window.VentureHubBridge.openHub()" style="cursor: pointer;">
          <span class="lang-es">Volver al Hub</span>
          <span class="lang-en">Back to Hub</span>
        </button>
      </div>
    </header>
  `;
}
