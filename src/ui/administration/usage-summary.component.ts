import { OrganizationUsage, ProjectUsage } from '../../modules/administration/domain/administration.types';

export function renderOrganizationUsageComponent(usage: OrganizationUsage): string {
  const formatMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  return `
    <div class="admin-card" id="org-usage-card">
      <div class="admin-card-header">
        <h3>Métricas de Uso de la Organización</h3>
        <span class="badge badge-info">Organización: ${usage.organizationId}</span>
      </div>
      <div class="usage-stats-grid">
        <div class="stat-box">
          <span class="stat-value">${usage.activeMembers}</span>
          <span class="stat-label">Miembros Activos</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.activeProjects}</span>
          <span class="stat-label">Proyectos Activos</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.archivedProjects}</span>
          <span class="stat-label">Proyectos Archivados</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.fileCount}</span>
          <span class="stat-label">Archivos Seguros</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.fileVersionCount}</span>
          <span class="stat-label">Versiones de Archivo</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${formatMB(usage.storageBytes)} MB</span>
          <span class="stat-label">Almacenamiento (${usage.storageBytes.toLocaleString()} bytes)</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.activeShareGrants}</span>
          <span class="stat-label">Share Grants Activos</span>
        </div>
      </div>
    </div>
  `;
}

export function renderProjectUsageComponent(usage: ProjectUsage): string {
  const formatMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  return `
    <div class="admin-card" id="project-usage-card">
      <div class="admin-card-header">
        <h3>Uso del Proyecto</h3>
        <span class="badge badge-info">${usage.projectId}</span>
      </div>
      <div class="usage-stats-grid">
        <div class="stat-box">
          <span class="stat-value">${usage.memberCount}</span>
          <span class="stat-label">Miembros Asignados</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.fileCount}</span>
          <span class="stat-label">Archivos Seguros</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${formatMB(usage.storageBytes)} MB</span>
          <span class="stat-label">Almacenamiento (${usage.storageBytes.toLocaleString()} bytes)</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.claimsCount || 0}</span>
          <span class="stat-label">Claims de Negocio</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.evidenceCount || 0}</span>
          <span class="stat-label">Evidencias</span>
        </div>
        <div class="stat-box">
          <span class="stat-value">${usage.presentationsCount || 0}</span>
          <span class="stat-label">Presentaciones</span>
        </div>
      </div>
    </div>
  `;
}
