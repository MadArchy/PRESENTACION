import { ProjectAdministrationRecord } from '../../modules/administration/domain/administration.types';

export function renderProjectLifecycleComponent(project: ProjectAdministrationRecord): string {
  return `
    <div class="admin-card" id="project-lifecycle-card">
      <div class="admin-card-header">
        <h3>Ciclo de Vida del Proyecto</h3>
        <span class="badge ${project.status === 'ACTIVE' ? 'badge-success' : project.status === 'PAUSED' ? 'badge-warning' : 'badge-secondary'}">
          Estado Actual: ${project.status}
        </span>
      </div>
      <div class="lifecycle-controls">
        <p class="text-muted">
          ${project.status === 'ACTIVE' ? 'El proyecto está ACTIVO y permite operaciones de lectura y edición normales.' : ''}
          ${project.status === 'PAUSED' ? 'El proyecto está PAUSADO. Las operaciones de escritura y generación están bloqueadas.' : ''}
          ${project.status === 'ARCHIVED' ? 'El proyecto está ARCHIVADO. El acceso es de solo lectura histórica.' : ''}
        </p>

        <div class="btn-toolbar">
          ${project.status === 'ACTIVE' ? `
            <button id="btn-pause-project" class="btn btn-warning" data-project-id="${project.projectId}">Pausar Proyecto</button>
            <button id="btn-archive-project" class="btn btn-danger" data-project-id="${project.projectId}">Archivar Proyecto</button>
          ` : ''}
          ${project.status === 'PAUSED' ? `
            <button id="btn-reactivate-project" class="btn btn-success" data-project-id="${project.projectId}">Reactivar Proyecto</button>
            <button id="btn-archive-project" class="btn btn-danger" data-project-id="${project.projectId}">Archivar Proyecto</button>
          ` : ''}
          ${project.status === 'ARCHIVED' ? `
            <button id="btn-reactivate-project" class="btn btn-success" data-project-id="${project.projectId}">Reactivar a Activo</button>
          ` : ''}
        </div>
      </div>

      <div class="ownership-section mt-4">
        <h4>Propiedad del Proyecto</h4>
        <p>Propietario Actual: <code>${project.ownerUserId}</code></p>
        <div class="input-group">
          <input type="text" id="new-project-owner-input" class="form-control" placeholder="ID del nuevo propietario (miembro activo)" />
          <button id="btn-transfer-project-owner" class="btn btn-outline-primary" data-project-id="${project.projectId}">Transferir Ownership</button>
        </div>
      </div>
    </div>
  `;
}
