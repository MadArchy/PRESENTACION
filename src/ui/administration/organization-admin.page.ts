import {
  OrganizationAdministrationRecord,
  OrganizationSettings,
  OrganizationUsage,
  ProjectAdministrationRecord
} from '../../modules/administration/domain/administration.types';
import { AuditEvent } from '../../modules/security/domain/security.types';
import { renderOrganizationSettingsComponent } from './organization-settings.component';
import { renderOrganizationMembersComponent, MemberRowView } from './organization-members.component';
import { renderOrganizationProjectsComponent } from './organization-projects.component';
import { renderOrganizationUsageComponent } from './usage-summary.component';
import { renderAdminAuditComponent } from './admin-audit.component';

export function renderOrganizationAdminPage(params: {
  orgRecord: OrganizationAdministrationRecord;
  settings: OrganizationSettings;
  usage: OrganizationUsage;
  members: MemberRowView[];
  projects: ProjectAdministrationRecord[];
  auditEvents: AuditEvent[];
  currentUserId: string;
}): string {
  return `
    <div class="admin-page-container" id="organization-admin-page">
      <header class="admin-header">
        <div>
          <h2>Administración de Organización: ${params.orgRecord.name}</h2>
          <p class="text-muted">Slug: <code>${params.orgRecord.slug}</code> | Estado: <span class="badge ${params.orgRecord.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}">${params.orgRecord.status}</span></p>
        </div>
        <div class="header-actions">
          <button id="btn-back-to-workspace" class="btn btn-outline-secondary">Volver al Workspace</button>
        </div>
      </header>

      <div class="admin-tabs">
        <button class="tab-btn active" data-tab="tab-org-overview">Resumen y Proyectos</button>
        <button class="tab-btn" data-tab="tab-org-members">Miembros</button>
        <button class="tab-btn" data-tab="tab-org-settings">Configuración</button>
        <button class="tab-btn" data-tab="tab-org-usage">Uso y Cuotas</button>
        <button class="tab-btn" data-tab="tab-org-audit">Auditoría</button>
      </div>

      <div class="admin-tab-content active" id="tab-org-overview">
        <div class="admin-grid-layout">
          ${renderOrganizationProjectsComponent(params.projects)}
          ${renderOrganizationUsageComponent(params.usage)}
        </div>
      </div>

      <div class="admin-tab-content" id="tab-org-members">
        ${renderOrganizationMembersComponent(params.members, params.currentUserId)}
      </div>

      <div class="admin-tab-content" id="tab-org-settings">
        ${renderOrganizationSettingsComponent(params.settings)}
      </div>

      <div class="admin-tab-content" id="tab-org-usage">
        ${renderOrganizationUsageComponent(params.usage)}
      </div>

      <div class="admin-tab-content" id="tab-org-audit">
        ${renderAdminAuditComponent(params.auditEvents)}
      </div>
    </div>
  `;
}
