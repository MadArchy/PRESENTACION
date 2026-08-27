export interface MemberRowView {
  userId: string;
  email: string;
  role: string;
  status: string;
  projectCount: number;
  joinedAt: string;
}

export function renderOrganizationMembersComponent(members: MemberRowView[], _currentUserId?: string): string {
  const rows = members.map(m => `
    <tr id="member-row-${m.userId}">
      <td><strong>${m.email}</strong><br/><small class="text-muted">ID: ${m.userId}</small></td>
      <td><span class="badge badge-secondary">${m.role}</span></td>
      <td><span class="badge ${m.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}">${m.status}</span></td>
      <td>${m.projectCount} proyectos</td>
      <td>${m.joinedAt.split('T')[0]}</td>
      <td>
        ${m.status === 'SUSPENDED' ? `<button class="btn btn-xs btn-outline-success btn-reactivate-member" data-user-id="${m.userId}">Reactivar</button>` : ''}
        ${m.status === 'ACTIVE' && m.role !== 'ORG_OWNER' ? `<button class="btn btn-xs btn-outline-warning btn-suspend-member" data-user-id="${m.userId}">Suspender</button>` : ''}
      </td>
    </tr>
  `).join('');

  return `
    <div class="admin-card" id="org-members-card">
      <div class="admin-card-header">
        <h3>Miembros de la Organización (${members.length})</h3>
        <button id="btn-invite-member" class="btn btn-sm btn-primary">+ Invitar Miembro</button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol Org</th>
              <th>Estado</th>
              <th>Proyectos</th>
              <th>Fecha Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
