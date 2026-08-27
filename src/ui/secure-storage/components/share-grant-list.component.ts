import { ShareGrant } from '../../../modules/secure-storage/domain/secure-storage.types';

export function renderShareGrantListComponent(grants: ShareGrant[]): string {
  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0 0 2px 0;">Concesiones de Acceso a Revisores Externos (ShareGrants)</h3>
          <div style="font-size: 0.72rem; color: #94a3b8;">Acceso temporal y delimitado por confidencialidad máxima</div>
        </div>
        <button onclick="const uid = prompt('ID de Usuario Externo:'); if(uid) window.VentureHubBridge.createShareGrant(uid, 'PROJECT_DATA_ROOM', 'CONFIDENTIAL');" style="background: var(--gold); border: none; color: #000; font-weight: 700; font-size: 0.78rem; padding: 6px 12px; border-radius: 6px; cursor: pointer;">
          + Nueva Concesión
        </button>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8;">
              <th style="padding: 10px;">ID Concesión</th>
              <th style="padding: 10px;">Revisor Externo</th>
              <th style="padding: 10px;">Alcance</th>
              <th style="padding: 10px;">Límite de Confidencialidad</th>
              <th style="padding: 10px;">Estado</th>
              <th style="padding: 10px;">Expiración</th>
              <th style="padding: 10px; text-align: right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${grants.length === 0 ? `
              <tr><td colspan="7" style="padding: 16px; text-align: center; color: #64748b;">No hay concesiones activas.</td></tr>
            ` : grants.map(g => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 12px 10px; font-family: var(--font-mono); font-weight: 600;">${g.id}</td>
                <td style="padding: 12px 10px; font-family: var(--font-mono); color: #38bdf8;">${g.granteeUserId}</td>
                <td style="padding: 12px 10px; color: #cbd5e1;">${g.scope}</td>
                <td style="padding: 12px 10px;">
                  <span style="border: 1px solid rgba(245,158,11,0.3); background: rgba(245,158,11,0.1); color: #f59e0b; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.7rem; font-family: var(--font-mono);">
                    ${g.confidentialityCeiling}
                  </span>
                </td>
                <td style="padding: 12px 10px;">
                  <span style="color: ${g.status === 'ACTIVE' ? '#4ade80' : '#ef4444'}; font-weight: 600;">
                    ● ${g.status}
                  </span>
                </td>
                <td style="padding: 12px 10px; color: #94a3b8; font-family: var(--font-mono); font-size: 0.75rem;">
                  ${g.expiresAt ? g.expiresAt.slice(0, 10) : 'Sin límite'}
                </td>
                <td style="padding: 12px 10px; text-align: right;">
                  ${g.status === 'ACTIVE' ? `
                    <button onclick="window.VentureHubBridge.revokeShareGrant('${g.id}')" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer;">
                      Revocar
                    </button>
                  ` : `<span style="color: #64748b; font-size: 0.72rem;">Revocada</span>`}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
