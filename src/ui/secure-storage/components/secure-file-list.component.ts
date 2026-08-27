import { FileRecord } from '../../../modules/secure-storage/domain/secure-storage.types';

export function renderSecureFileListComponent(files: FileRecord[]): string {
  if (files.length === 0) {
    return `
      <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 32px; text-align: center; color: #94a3b8;">
        📁 No hay archivos seguros registrados en este proyecto.
      </div>
    `;
  }

  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8;">
              <th style="padding: 10px;">Nombre Lógico / Archivo</th>
              <th style="padding: 10px;">Confidencialidad</th>
              <th style="padding: 10px;">Tamaño</th>
              <th style="padding: 10px;">Estado</th>
              <th style="padding: 10px;">Versión Activa</th>
              <th style="padding: 10px; text-align: right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${files.map(f => {
              const confColors: Record<string, string> = {
                PUBLIC: '#4ade80',
                INTERNAL: '#38bdf8',
                CONFIDENTIAL: '#f59e0b',
                HIGHLY_CONFIDENTIAL: '#ef4444'
              };
              const color = confColors[f.confidentiality] || '#cbd5e1';

              return `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  <td style="padding: 12px 10px;">
                    <div style="font-weight: 700; color: #ffffff;">${f.logicalName}</div>
                    <div style="font-size: 0.72rem; color: #94a3b8; font-family: var(--font-mono);">${f.originalFileName}</div>
                  </td>
                  <td style="padding: 12px 10px;">
                    <span style="border: 1px solid ${color}40; background: ${color}15; color: ${color}; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.7rem; font-family: var(--font-mono);">
                      ${f.confidentiality}
                    </span>
                  </td>
                  <td style="padding: 12px 10px; color: #cbd5e1; font-family: var(--font-mono); font-size: 0.75rem;">
                    ${(f.sizeBytes / 1024).toFixed(0)} KB
                  </td>
                  <td style="padding: 12px 10px;">
                    <span style="color: ${f.status === 'AVAILABLE' ? '#4ade80' : f.status === 'QUARANTINED' ? '#f59e0b' : '#f87171'}; font-weight: 600;">
                      ● ${f.status}
                    </span>
                  </td>
                  <td style="padding: 12px 10px; font-family: var(--font-mono); color: #94a3b8; font-size: 0.75rem;">
                    ${f.currentVersionId || 'v1'}
                  </td>
                  <td style="padding: 12px 10px; text-align: right;">
                    <button onclick="window.VentureHubBridge.downloadSecureFile('${f.id}')" style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3); color: #38bdf8; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 600; cursor: pointer; margin-right: 6px;">
                      ⬇️ Descargar
                    </button>
                    ${f.status === 'AVAILABLE' ? `
                      <button onclick="window.VentureHubBridge.quarantineSecureFile('${f.id}')" style="background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3); color: #f59e0b; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; margin-right: 6px;">
                        ⚠️ Cuarentena
                      </button>
                    ` : f.status === 'QUARANTINED' ? `
                      <button onclick="window.VentureHubBridge.restoreSecureFile('${f.id}')" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #4ade80; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; margin-right: 6px;">
                        ✓ Restaurar
                      </button>
                    ` : ''}
                    <button onclick="window.VentureHubBridge.deleteSecureFile('${f.id}')" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer;">
                      🗑️
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
