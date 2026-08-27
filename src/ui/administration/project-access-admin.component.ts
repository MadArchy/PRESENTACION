export interface ProjectAccessRowView {
  userId: string;
  role: string;
  status: string;
  grantedBy: string;
  grantedAt: string;
}

export function renderProjectAccessAdminComponent(assignments: ProjectAccessRowView[], projectId: string): string {
  const rows = assignments.map(a => `
    <tr id="access-row-${a.userId}">
      <td><code>${a.userId}</code></td>
      <td><span class="badge badge-secondary">${a.role}</span></td>
      <td><span class="badge ${a.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}">${a.status}</span></td>
      <td>${a.grantedBy}</td>
      <td>${a.grantedAt.split('T')[0]}</td>
      <td>
        ${a.status === 'SUSPENDED' ? `<button class="btn btn-xs btn-outline-success btn-reactivate-access" data-user-id="${a.userId}" data-project-id="${projectId}">Reactivar</button>` : ''}
        ${a.status === 'ACTIVE' && a.role !== 'PROJECT_ADMIN' ? `<button class="btn btn-xs btn-outline-warning btn-suspend-access" data-user-id="${a.userId}" data-project-id="${projectId}">Suspender</button>` : ''}
      </td>
    </tr>
  `).join('');

  return `
    <div class="admin-card" id="project-access-card">
      <div class="admin-card-header">
        <h3>Accesos al Proyecto (${assignments.length})</h3>
        <button id="btn-grant-project-access" class="btn btn-sm btn-primary">+ Otorgar Acceso</button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol en Proyecto</th>
              <th>Estado</th>
              <th>Otorgado Por</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length > 0 ? rows : '<tr><td colspan="6" class="text-center text-muted">No hay accesos configurados</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
