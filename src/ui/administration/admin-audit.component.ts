import { AuditEvent } from '../../modules/security/domain/security.types';

export function renderAdminAuditComponent(events: AuditEvent[]): string {
  const rows = events.map(e => `
    <tr id="audit-event-${e.id}">
      <td><small class="text-muted">${e.occurredAt.replace('T', ' ').split('.')[0]}</small></td>
      <td><span class="badge badge-info">${e.type}</span></td>
      <td><code>${e.actorUserId}</code></td>
      <td>${e.targetType}</td>
      <td><code>${e.targetId || '-'}</code></td>
    </tr>
  `).join('');

  return `
    <div class="admin-card" id="admin-audit-card">
      <div class="admin-card-header">
        <h3>Auditoría Administrativa (${events.length} eventos)</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Tipo de Evento</th>
              <th>Actor</th>
              <th>Tipo Destino</th>
              <th>ID Destino</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length > 0 ? rows : '<tr><td colspan="5" class="text-center text-muted">No hay eventos de auditoría</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
