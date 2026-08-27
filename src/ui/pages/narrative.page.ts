import { ProjectAggregate } from '../../modules/project/domain/entities/project.aggregate';
import { NarrativePlanEntity } from '../../modules/narrative/domain/entities/narrative-plan.entity';
import { NarrativeRequest } from '../../modules/narrative/domain/narrative.types';
import { renderWorkspaceHeader } from '../components/workspace-header.component';
import { renderNarrativeBuilder } from '../components/narrative-builder.component';
import { renderNarrativePreview } from '../components/narrative-preview.component';

export function renderNarrativePage(
  project: ProjectAggregate,
  plan?: NarrativePlanEntity,
  currentReq?: Partial<NarrativeRequest>
): string {
  return `
    <div class="narrative-workspace-container" style="min-height: 100vh; background: var(--bg-primary, #030712); color: #fff; display: flex; flex-direction: column;">
      ${renderWorkspaceHeader(project)}

      <main class="narrative-workspace-main" style="max-width: 1100px; margin: 0 auto; width: 100%; padding: 28px 20px; flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <h1 style="font-family: var(--font-heading); font-size: 1.8rem; margin: 0 0 6px 0;">
              Adaptive Narrative Workspace
            </h1>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">
              Transforma el Project Twin canónico en planes narrativos específicos por audiencia y objetivo estratégico.
            </p>
          </div>

          <div style="display: flex; gap: 10px;">
            <button type="button" class="btn-nav" onclick="window.VentureHubBridge && window.VentureHubBridge.openWorkspace('${project.getId()}')" style="cursor: pointer;">
              Ver Secciones Twin 📁
            </button>
          </div>
        </div>

        ${renderNarrativeBuilder(project.getId(), currentReq || plan?.getRequest())}

        ${plan ? renderNarrativePreview(plan) : '<p style="color: var(--text-muted); text-align: center; padding: 40px 0;">Selecciona una configuración y pulsa Compilar Narrativa.</p>'}
      </main>
    </div>
  `;
}
