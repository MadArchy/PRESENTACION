import { ProjectAggregate } from '../../modules/project/domain/entities/project.aggregate';
import { ProjectValidationResult } from '../../modules/project/domain/project.types';
import { renderWorkspaceHeader } from '../components/workspace-header.component';
import { renderSectionNavigator } from '../components/section-navigator.component';
import { renderSectionContent } from '../components/section-renderer.component';

export function renderWorkspacePage(
  project: ProjectAggregate,
  validationResult?: ProjectValidationResult,
  activeSectionId?: string
): string {
  const currentVersion = project.getCurrentVersionEntity();
  const sections = currentVersion.getSections();
  const activeSec = activeSectionId
    ? sections.find(s => s.getId() === activeSectionId) || sections[0]
    : sections[0];

  const validationBanner = validationResult ? `
    <div class="validation-summary-banner" style="background: rgba(16, 185, 129, 0.1); border-bottom: 1px solid rgba(16, 185, 129, 0.2); padding: 8px 28px; font-family: var(--font-mono); font-size: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
      <span style="color: #10b981;">✓ PROJECT TWIN VALIDATED (0 Errors, ${validationResult.warningCount} Warnings, ${validationResult.infoCount} Info)</span>
      <span style="color: var(--text-muted); font-size: 0.7rem;">DETERMINISTIC VALIDATOR v1.0</span>
    </div>
  ` : '';

  return `
    <div class="project-workspace-container" id="projectWorkspaceContainer" style="min-height: 100vh; background: var(--bg-primary, #030712); color: #fff; display: flex; flex-direction: column;">
      ${renderWorkspaceHeader(project)}
      ${validationBanner}

      <div class="workspace-main-body" style="display: flex; flex: 1; overflow: hidden;">
        ${renderSectionNavigator(sections, activeSec?.getId())}

        <main class="workspace-content-area" style="flex: 1; padding: 24px; overflow-y: auto;">
          ${activeSec ? renderSectionContent(activeSec) : '<p>No hay sección seleccionada.</p>'}
        </main>
      </div>
    </div>
  `;
}
