import { ProjectAdministrationRecord } from '../../modules/administration/domain/administration.types';

export function renderOrganizationProjectsComponent(projects: ProjectAdministrationRecord[]): string {
  const rows = projects.map(p => `
    <tr id="project-row-${p.projectId}">
      <td>
        <strong>${p.name}</strong><br/>
        <small class="text-muted">Slug: ${p.slug} | ID: ${p.projectId}</small>
      </td>
      <td><span class="badge ${p.status === 'ACTIVE' ? 'badge-success' : p.status === 'PAUSED' ? 'badge-warning' : 'badge-secondary'}">${p.status}</span></td>
      <td><code>${p.ownerUserId}</code></td>
      <td>${p.createdAt.split('T')[0]}</td>
      <td>
        <button class="btn btn-xs btn-outline-primary btn-manage-project" data-project-id="${p.projectId}">Administrar</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="admin-card" id="org-projects-card">
      <div class="admin-card-header">
        <h3>Proyectos de la Organización (${projects.length})</h3>
        <button id="btn-create-new-project" class="btn btn-sm btn-primary">+ Nuevo Proyecto</button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Estado</th>
              <th>Propietario</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length > 0 ? rows : '<tr><td colspan="5" class="text-center text-muted">No hay proyectos registrados</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
