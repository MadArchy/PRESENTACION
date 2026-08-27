import { ProjectSummaryEntity } from '../../modules/project/domain/entities/project-summary.entity';
import { renderProjectCard } from '../components/project-card.component';

export function renderHubProjectsGrid(projects: ProjectSummaryEntity[]): string {
  const cardsHtml = projects.map(p => renderProjectCard(p)).join('\n');
  return `
    <div class="projects-registry-grid cards-grid-3" style="width: 100%; margin-top: 14px;">
      ${cardsHtml}
    </div>
  `;
}
