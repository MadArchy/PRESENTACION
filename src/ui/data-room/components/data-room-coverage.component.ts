import { DiligenceCoverageReport } from '../../../modules/data-room/domain/data-room.types';

export function renderDataRoomCoverage(report: DiligenceCoverageReport): string {
  const categories = Object.values(report.categoryCoverage);

  return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <!-- Top Metrics Summary -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
        <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px; text-align: center;">
          <div style="font-size: 1.4rem; font-weight: 700; color: #ffffff;">${report.totalDocuments}</div>
          <div style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase;">Total Documentos</div>
        </div>
        <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px; text-align: center;">
          <div style="font-size: 1.4rem; font-weight: 700; color: #10b981;">${report.satisfiedRequests} / ${report.totalRequests}</div>
          <div style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase;">Solicitudes Satisfechas</div>
        </div>
        <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px; text-align: center;">
          <div style="font-size: 1.4rem; font-weight: 700; color: #f59e0b;">${report.openRequests}</div>
          <div style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase;">Solicitudes Abiertas</div>
        </div>
        <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px; text-align: center;">
          <div style="font-size: 1.4rem; font-weight: 700; color: #ef4444;">${report.missingDocuments}</div>
          <div style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase;">Documentos Faltantes</div>
        </div>
      </div>

      <!-- Categories Coverage Matrix -->
      <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 16px;">
        <h3 style="font-size: 0.88rem; font-weight: 700; color: var(--gold); text-transform: uppercase; margin: 0 0 14px 0;">
          Cobertura por Categoría de Diligencia
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px;">
          ${categories.map(c => {
            let barColor = '#10b981';
            if (c.coveragePercent < 50) barColor = '#ef4444';
            else if (c.coveragePercent < 100) barColor = '#f59e0b';

            return `
              <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 6px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 0.82rem; font-weight: 700; color: #ffffff;">
                    ${c.category}
                  </span>
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: ${barColor};">
                    ${c.coveragePercent}%
                  </span>
                </div>

                <!-- Progress Bar -->
                <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; margin-bottom: 8px;">
                  <div style="height: 100%; width: ${c.coveragePercent}%; background: ${barColor};"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #64748b; font-family: var(--font-mono);">
                  <span>Docs: <strong style="color:#cbd5e1;">${c.currentDocuments}</strong></span>
                  <span>Satisfechas: <strong style="color:#10b981;">${c.satisfiedItems}</strong></span>
                  <span>Abiertas: <strong style="color:#f59e0b;">${c.openItems}</strong></span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  `;
}
