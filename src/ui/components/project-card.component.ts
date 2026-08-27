import { ProjectSummaryEntity } from '../../modules/project/domain/entities/project-summary.entity';

export function renderProjectCard(project: ProjectSummaryEntity, _onSelect?: (id: string) => void): string {
  const themeClass = project.getTheme() ? `theme-${project.getTheme()}` : '';
  const kickerEs = project.getKicker()?.es || 'VENTURE';
  const kickerEn = project.getKicker()?.en || 'VENTURE';
  const slides = project.getTotalSlides() ? `${project.getTotalSlides()} Slides` : '';

  return `
    <article class="feature-card project-card ${themeClass}" data-project-id="${project.getId()}" data-slug="${project.getSlug()}">
      <div class="card-text-group">
        <div class="card-meta-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span class="tech-badge" style="text-transform: uppercase; font-size: 0.68rem;">
            <span class="lang-es">${kickerEs}</span>
            <span class="lang-en">${kickerEn}</span>
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold); opacity: 0.8;">${slides}</span>
        </div>
        <h3 class="card-title" style="margin-bottom: 6px;">${project.getName()}</h3>
        <p class="card-desc">${project.getDescription()}</p>
      </div>
      <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
        <button type="button" class="btn-nav btn-nav-primary" onclick="window.VentureHubBridge && window.VentureHubBridge.launchProject('${project.getId()}')" style="cursor: pointer;">
          <span class="lang-es">Ver Presentación</span>
          <span class="lang-en">Open Deck</span>
          <span class="pill-icon">→</span>
        </button>
      </div>
    </article>
  `;
}
