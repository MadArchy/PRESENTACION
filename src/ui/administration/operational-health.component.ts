import { OperationalHealthSummary } from '../../modules/administration/domain/administration.types';

export function renderOperationalHealthComponent(health: OperationalHealthSummary): string {
  const checkRows = health.checks.map(c => `
    <tr id="health-check-${c.dimension.toLowerCase()}">
      <td><strong>${c.component}</strong></td>
      <td><code>${c.dimension}</code></td>
      <td>
        <span class="badge ${c.status === 'HEALTHY' ? 'badge-success' : c.status === 'DEGRADED' ? 'badge-warning' : 'badge-danger'}">
          ${c.status}
        </span>
      </td>
      <td>${c.message || 'Operacional'}</td>
      <td><small class="text-muted">${c.checkedAt.split('T')[1].split('.')[0]}</small></td>
    </tr>
  `).join('');

  return `
    <div class="admin-card" id="operational-health-card">
      <div class="admin-card-header">
        <h3>Salud Operacional de la Plataforma</h3>
        <span class="badge ${health.overallStatus === 'HEALTHY' ? 'badge-success' : 'badge-warning'}">
          Estado Global: ${health.overallStatus}
        </span>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Dimensión</th>
              <th>Estado</th>
              <th>Diagnóstico</th>
              <th>Hora Verificación</th>
            </tr>
          </thead>
          <tbody>
            ${checkRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
