import { FileRecord, ShareGrant, StorageAuditEvent } from '../../modules/secure-storage/domain/secure-storage.types';
import { SecurityContext } from '../../modules/security/domain/security.types';
import { renderSecureFileListComponent } from './components/secure-file-list.component';
import { renderShareGrantListComponent } from './components/share-grant-list.component';

export interface SecureStoragePageProps {
  context: SecurityContext | null;
  activeTab: 'FILES' | 'SHARING' | 'AUDIT' | 'UPLOAD_PREFLIGHT';
  files: FileRecord[];
  grants: ShareGrant[];
  auditEvents: StorageAuditEvent[];
  errorMessage?: string;
  successMessage?: string;
}

export function renderSecureStoragePage(props: SecureStoragePageProps): string {
  const { context, activeTab, files, grants, auditEvents, errorMessage, successMessage } = props;

  return `
    <div id="secureStorageRoot" class="workspace-page" style="padding: 24px; max-width: 1280px; margin: 0 auto; color: #ffffff; font-family: var(--font-sans, system-ui);">
      
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="background: rgba(56,189,248,0.15); border: 1px solid rgba(56,189,248,0.3); color: #38bdf8; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono);">
              SECURE BINARY STORAGE (PHASE 009)
            </span>
            <span style="font-size: 0.72rem; color: #94a3b8; font-family: var(--font-mono);">
              POLICY v1.0 · UPLOAD v1.0 · STORAGE RULES v2
            </span>
          </div>
          <h1 style="font-size: 1.6rem; font-weight: 800; margin: 0 0 4px 0; background: linear-gradient(135deg, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Almacenamiento Seguro & Entrega Controlada de Documentos
          </h1>
          <div style="font-size: 0.85rem; color: #94a3b8;">
            Proyecto: <strong style="color: #ffffff;">Arcana Trust Network</strong> (arcana) · Almacén Binario Privado de Diligencia
            ${context ? `· Usuario: <span style="color: #38bdf8;">${context.identity.displayName || context.identity.email}</span>` : ''}
          </div>
        </div>

        <div style="display: flex; gap: 10px;">
          <button onclick="window.VentureHubBridge.openUploadModal()" style="background: var(--gold); border: none; color: #000000; font-weight: 700; padding: 8px 16px; border-radius: 6px; font-size: 0.82rem; cursor: pointer;">
            + Subir Archivo Seguro
          </button>
        </div>
      </div>

      <!-- Informational alerts -->
      ${errorMessage ? `
        <div style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #f87171; border-radius: 6px; padding: 12px 16px; font-size: 0.8rem; margin-bottom: 20px;">
          ⚠️ ${errorMessage}
        </div>
      ` : ''}

      ${successMessage ? `
        <div style="background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: #4ade80; border-radius: 6px; padding: 12px 16px; font-size: 0.8rem; margin-bottom: 20px;">
          ✓ ${successMessage}
        </div>
      ` : ''}

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; overflow-x: auto; padding-bottom: 4px;">
        <button onclick="window.VentureHubBridge.setSecureStorageTab('FILES')" style="background: ${activeTab === 'FILES' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'FILES' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'FILES' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          📁 Archivos del Proyecto (${files.length})
        </button>
        <button onclick="window.VentureHubBridge.setSecureStorageTab('SHARING')" style="background: ${activeTab === 'SHARING' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'SHARING' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'SHARING' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          🔗 Compartición Controlada (${grants.length})
        </button>
        <button onclick="window.VentureHubBridge.setSecureStorageTab('AUDIT')" style="background: ${activeTab === 'AUDIT' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'AUDIT' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'AUDIT' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          📜 Auditoría de Descargas & Storage (${auditEvents.length})
        </button>
      </div>

      <!-- Tab Content -->
      ${renderTab(activeTab, files, grants, auditEvents)}

    </div>
  `;
}

function renderTab(
  tab: string,
  files: FileRecord[],
  grants: ShareGrant[],
  auditEvents: StorageAuditEvent[]
): string {
  switch (tab) {
    case 'SHARING':
      return renderShareGrantListComponent(grants);
    case 'AUDIT':
      return renderAuditTab(auditEvents);
    case 'FILES':
    default:
      return renderSecureFileListComponent(files);
  }
}

function renderAuditTab(events: StorageAuditEvent[]): string {
  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
      <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0 0 16px 0;">Registro de Auditoría de Almacenamiento & Acceso</h3>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.78rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8;">
              <th style="padding: 10px;">Fecha / Hora</th>
              <th style="padding: 10px;">Actor</th>
              <th style="padding: 10px;">Evento</th>
              <th style="padding: 10px;">Recurso</th>
              <th style="padding: 10px;">Detalles</th>
            </tr>
          </thead>
          <tbody>
            ${events.length === 0 ? `
              <tr><td colspan="5" style="padding: 16px; text-align: center; color: #64748b;">No hay eventos registrados.</td></tr>
            ` : events.map(e => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 10px; color: #94a3b8; font-family: var(--font-mono);">${e.occurredAt.slice(0, 19).replace('T', ' ')}</td>
                <td style="padding: 10px; font-weight: 600; font-family: var(--font-mono);">${e.actorUserId}</td>
                <td style="padding: 10px;">
                  <span style="background: ${e.type.includes('DENIED') ? 'rgba(239,68,68,0.15)' : 'rgba(56,189,248,0.15)'}; border: 1px solid ${e.type.includes('DENIED') ? '#ef4444' : '#38bdf8'}40; color: ${e.type.includes('DENIED') ? '#f87171' : '#38bdf8'}; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.7rem; font-family: var(--font-mono);">
                    ${e.type}
                  </span>
                </td>
                <td style="padding: 10px; font-family: var(--font-mono);">${e.targetType}: ${e.targetId}</td>
                <td style="padding: 10px; color: #94a3b8; font-family: var(--font-mono); font-size: 0.7rem;">${JSON.stringify(e.metadata || {})}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
