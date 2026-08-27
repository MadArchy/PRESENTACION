import { PlatformAdministrationSummary, OperationalHealthSummary, OrganizationAdministrationRecord } from '../../modules/administration/domain/administration.types';
import { renderOperationalHealthComponent } from './operational-health.component';

export function renderPlatformAdminPage(params: {
  summary: PlatformAdministrationSummary;
  health: OperationalHealthSummary;
  organizations: OrganizationAdministrationRecord[];
}): string {
  const orgRows = params.organizations.map(o => `
    <tr id="platform-org-${o.organizationId}">
      <td><strong>${o.name}</strong><br/><small class="text-muted">Slug: ${o.slug} | ID: ${o.organizationId}</small></td>
      <td><span class="badge ${o.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}">${o.status}</span></td>
      <td><code>${o.ownerUserId}</code></td>
      <td>${o.memberCount}</td>
      <td>${o.activeProjectCount}</td>
      <td>${(o.storageUsageBytes / (1024 * 1024)).toFixed(2)} MB</td>
      <td>
        <button class="btn btn-xs btn-outline-primary btn-inspect-org" data-org-id="${o.organizationId}">Inspeccionar</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="admin-page-container" id="platform-admin-page">
      <header class="admin-header">
        <div>
          <h2>Consola de Administración de Plataforma</h2>
          <p class="text-muted">Venture Hub OS — Visión Global Multi-Tenant</p>
        </div>
        <button id="btn-back-to-workspace" class="btn btn-outline-secondary">Volver al Workspace</button>
      </header>

      <div class="platform-summary-cards">
        <div class="stat-box">
          <span class="stat-value">${params.summary.organizations}</span>
          <span class="stat-label">Organizaciones (${params.summary.activeOrganizations} activas)</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${params.summary.projects}</span>
          <span class="stat-label">Proyectos (${params.summary.activeProjects} activos)</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${params.summary.users}</span>
          <span class="stat-label">Usuarios Globales</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${(params.summary.storageBytes / (1024 * 1024)).toFixed(2)} MB</span>
          <span class="stat-label">Almacenamiento Global</span>
        </div>
      </div>

      <div class="admin-grid-layout">
        <div class="admin-card">
          <div class="admin-card-header">
            <h3>Organizaciones Registradas</h3>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Organización</th>
                  <th>Estado</th>
                  <th>Propietario</th>
                  <th>Miembros</th>
                  <th>Proyectos</th>
                  <th>Storage</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${orgRows}
              </tbody>
            </table>
          </div>
        </div>

        ${renderOperationalHealthComponent(params.health)}
      </div>
    </div>
  `;
}
