import { DiligenceReadiness } from '../../../modules/data-room/domain/data-room.types';

export function renderDataRoomHeader(
  projectName: string,
  projectVersion: string,
  readiness: DiligenceReadiness,
  activeTab: string
): string {
  let readinessColor = '#10b981';
  let readinessBg = 'rgba(16,185,129,0.12)';
  let readinessLabel = 'DILIGENCE READY';

  if (readiness === 'DILIGENCE_READY_WITH_WARNINGS') {
    readinessColor = '#f59e0b';
    readinessBg = 'rgba(245,158,11,0.12)';
    readinessLabel = 'READY WITH WARNINGS';
  } else if (readiness === 'DILIGENCE_NOT_READY') {
    readinessColor = '#ef4444';
    readinessBg = 'rgba(239,68,68,0.12)';
    readinessLabel = 'NOT READY';
  }

  const tabs = [
    { id: 'DOCUMENTS', label: 'Documentos' },
    { id: 'COVERAGE', label: 'Matriz de Cobertura' },
    { id: 'REQUESTS', label: 'Solicitudes Diligence' },
    { id: 'GAPS', label: 'Brechas & Hallazgos' },
    { id: 'READINESS', label: 'Dictamen de Readiness' }
  ];

  return `
    <header style="background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 16px 24px 0 24px;">
      
      <!-- Top Title Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <button onclick="window.VentureHubBridge.closeDataRoomWorkspace()" style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
            ✕ Volver al Hub
          </button>
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h1 style="font-size: 1.15rem; font-weight: 700; margin: 0; color: #ffffff;">
                📁 Due Diligence Data Room: ${projectName}
              </h1>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; color: var(--gold); background: rgba(201,164,106,0.12); padding: 2px 6px; border-radius: 4px;">
                v${projectVersion}
              </span>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; color: ${readinessColor}; background: ${readinessBg}; border: 1px solid ${readinessColor}44; padding: 4px 10px; border-radius: 4px;">
            ${readinessLabel}
          </span>
        </div>
      </div>

      <!-- Security Notice Banner -->
      <div style="background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.2); border-radius: 6px; padding: 8px 12px; margin-bottom: 14px; font-size: 0.74rem; color: #fbbf24; display: flex; align-items: center; gap: 8px;">
        <span>⚠️</span>
        <div>
          <strong>Aviso Informativo de Seguridad:</strong> Las etiquetas de confidencialidad (PUBLIC, INTERNAL, CONFIDENTIAL, HIGHLY_CONFIDENTIAL) son metadatos de gobernanza. El control de acceso y autenticación formal se implementará en la Fase 008.
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 8px;">
        ${tabs.map(t => {
          const isActive = t.id === activeTab;
          return `
            <button onclick="window.VentureHubBridge.setDataRoomTab('${t.id}')" style="background: ${isActive ? 'rgba(255,255,255,0.08)' : 'transparent'}; border: none; border-bottom: 2px solid ${isActive ? 'var(--gold)' : 'transparent'}; color: ${isActive ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.82rem; font-weight: ${isActive ? '700' : '500'}; cursor: pointer; border-radius: 4px 4px 0 0;">
              ${t.label}
            </button>
          `;
        }).join('')}
      </div>

    </header>
  `;
}
