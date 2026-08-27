import {
  ProjectAdministrationRecord,
  ProjectSettings,
  ProjectUsage
} from '../../modules/administration/domain/administration.types';
import { AuditEvent } from '../../modules/security/domain/security.types';
import { renderProjectSettingsComponent } from './project-settings.component';
import { renderProjectLifecycleComponent } from './project-lifecycle.component';
import { renderProjectAccessAdminComponent, ProjectAccessRowView } from './project-access-admin.component';
import { renderProjectUsageComponent } from './usage-summary.component';
import { renderAdminAuditComponent } from './admin-audit.component';

export function renderProjectAdminPage(params: {
  projectRecord: ProjectAdministrationRecord;
  settings: ProjectSettings;
  usage: ProjectUsage;
  accessList: ProjectAccessRowView[];
  auditEvents: AuditEvent[];
}): string {
  return `
    <div class="admin-page-container" id="project-admin-page">
      <header class="admin-header">
        <div>
          <h2>Administración de Proyecto: ${params.projectRecord.name}</h2>
          <p class="text-muted">
            ID: <code>${params.projectRecord.projectId}</code> |
            Organización: <code>${params.projectRecord.organizationId}</code> |
            Estado: <span class="badge ${params.projectRecord.status === 'ACTIVE' ? 'badge-success' : params.projectRecord.status === 'PAUSED' ? 'badge-warning' : 'badge-secondary'}">${params.projectRecord.status}</span>
          </p>
        </div>
        <div class="header-actions">
          <button id="btn-back-to-org-admin" class="btn btn-outline-secondary">Volver a Org Admin</button>
        </div>
      </header>

      <div class="admin-tabs">
        <button class="tab-btn active" data-tab="tab-proj-lifecycle">Ciclo de Vida y Propiedad</button>
        <button class="tab-btn" data-tab="tab-proj-settings">Configuración y Módulos</button>
        <button class="tab-btn" data-tab="tab-proj-access">Accesos</button>
        <button class="tab-btn" data-tab="tab-proj-usage">Uso</button>
        <button class="tab-btn" data-tab="tab-proj-audit">Auditoría</button>
      </div>

      <div class="admin-tab-content active" id="tab-proj-lifecycle">
        <div class="admin-grid-layout">
          ${renderProjectLifecycleComponent(params.projectRecord)}
          ${renderProjectUsageComponent(params.usage)}
        </div>
      </div>

      <div class="admin-tab-content" id="tab-proj-settings">
        ${renderProjectSettingsComponent(params.settings)}
      </div>

      <div class="admin-tab-content" id="tab-proj-access">
        ${renderProjectAccessAdminComponent(params.accessList, params.projectRecord.projectId)}
      </div>

      <div class="admin-tab-content" id="tab-proj-usage">
        ${renderProjectUsageComponent(params.usage)}
      </div>

      <div class="admin-tab-content" id="tab-proj-audit">
        ${renderAdminAuditComponent(params.auditEvents)}
      </div>
    </div>
  `;
}
