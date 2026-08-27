import { ProjectAggregate } from '../../modules/project/domain/entities/project.aggregate';
import { CopilotTaskType, AiProviderType } from '../../modules/copilot/domain/copilot.types';
import { CopilotResultEntity } from '../../modules/copilot/domain/entities/copilot-result.entity';
import { renderCopilotFindings } from './components/copilot-findings.component';
import { renderCopilotProposals } from './components/copilot-proposals.component';
import { renderCopilotGrounding } from './components/copilot-grounding.component';

export function renderCopilotPage(
  project: ProjectAggregate,
  activeTask: CopilotTaskType = 'PROJECT_ANALYSIS',
  activeProvider: AiProviderType = 'MOCK',
  activeResult: CopilotResultEntity | null = null,
  isExecuting = false
): string {
  const taskOptions: { type: CopilotTaskType; label: string }[] = [
    { type: 'PROJECT_ANALYSIS', label: 'Análisis de Madurez del Proyecto' },
    { type: 'GAP_ANALYSIS', label: 'Detección de Brechas de Validación' },
    { type: 'TRUST_REVIEW', label: 'Auditoría de Claims y Factualidad' },
    { type: 'RISK_REVIEW', label: 'Evaluación de Riesgos y Vulnerabilidades' },
    { type: 'NARRATIVE_CRITIQUE', label: 'Crítica Narrativa & Storytelling' },
    { type: 'PRESENTATION_CRITIQUE', label: 'Revisión Visual de Escenas' },
    { type: 'EXECUTIVE_SUMMARY_DRAFT', label: 'Borrador de Resumen Ejecutivo' },
    { type: 'CONTENT_REWRITE_PROPOSAL', label: 'Propuesta de Reescritura de Sección' },
    { type: 'PRESENTER_QA_PREPARATION', label: 'Preparación de Preguntas Q&A' },
    { type: 'PRESENTER_TALKING_POINTS', label: 'Cues de Orador & Puntos Clave' },
    { type: 'COMPARISON', label: 'Comparativa de Diferenciación' },
    { type: 'EXPLANATION', label: 'Explicación Arquitectónica Concisa' }
  ];

  return `
    <div class="copilot-workspace-container" style="position: fixed; inset: 0; background: #030712; color: #f8fafc; display: flex; flex-direction: column; overflow: hidden; z-index: 10000; font-family: 'Inter', -apple-system, sans-serif;">
      
      <!-- Top Control Bar -->
      <header style="height: 64px; padding: 0 24px; background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; gap: 16px;">
        
        <div style="display: flex; align-items: center; gap: 14px;">
          <button onclick="window.VentureHubBridge.closeCopilotWorkspace()" style="background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;">
            ✕ Volver al Hub
          </button>
          <div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px;">
              <span>🤖 AI COPILOT: ${project.getName()}</span>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: var(--gold); background: rgba(201,164,106,0.12); padding: 2px 6px; border-radius: 4px;">
                v${project.getCurrentVersion()}
              </span>
            </div>
          </div>
        </div>

        <!-- Provider Selector -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 0.78rem; color: #94a3b8;">Proveedor AI:</span>
          <select id="copilotProviderSelect" onchange="window.VentureHubBridge.setCopilotProvider(this.value)" style="background: #1e293b; border: 1px solid rgba(255,255,255,0.12); color: #f8fafc; font-size: 0.78rem; padding: 5px 10px; border-radius: 4px;">
            <option value="MOCK" ${activeProvider === 'MOCK' ? 'selected' : ''}>Mock Determínico (Offline)</option>
            <option value="OPENAI" ${activeProvider === 'OPENAI' ? 'selected' : ''}>OpenAI (GPT-4o)</option>
            <option value="ANTHROPIC" ${activeProvider === 'ANTHROPIC' ? 'selected' : ''}>Anthropic (Claude 3.5)</option>
            <option value="GOOGLE" ${activeProvider === 'GOOGLE' ? 'selected' : ''}>Google (Gemini 1.5)</option>
            <option value="OLLAMA" ${activeProvider === 'OLLAMA' ? 'selected' : ''}>Ollama Local</option>
          </select>
        </div>

      </header>

      <!-- Main Two-Column Workspace -->
      <div style="flex: 1; display: grid; grid-template-columns: 380px 1fr; gap: 16px; padding: 16px; overflow: hidden;">
        
        <!-- Left Column: Task Config & Prompt Form -->
        <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 18px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto;">
          
          <div>
            <label style="font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 6px;">
              Tarea de Asistencia Ejecutiva
            </label>
            <select id="copilotTaskSelect" style="width: 100%; background: #1e293b; border: 1px solid rgba(255,255,255,0.12); color: #f8fafc; font-size: 0.82rem; padding: 8px 10px; border-radius: 6px;">
              ${taskOptions.map(t => `
                <option value="${t.type}" ${t.type === activeTask ? 'selected' : ''}>${t.label}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label style="font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 6px;">
              Instrucciones / Foco Específico (Opcional)
            </label>
            <textarea id="copilotUserInstruction" placeholder="Ej: Centrarse en el modelo de ingresos SaaS y los costos de hardware Sentinel..." style="width: 100%; height: 90px; background: #1e293b; border: 1px solid rgba(255,255,255,0.12); color: #f8fafc; font-size: 0.82rem; padding: 10px; border-radius: 6px; resize: none; font-family: inherit;"></textarea>
          </div>

          <button onclick="window.VentureHubBridge.runActiveCopilotTask('${project.getId()}')" ${isExecuting ? 'disabled' : ''} style="background: var(--gold); border: none; color: #000; font-weight: 700; padding: 10px; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
            ${isExecuting ? '⏳ Procesando...' : '⚡ Ejecutar Análisis'}
          </button>

          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 6px;">
            <div style="font-size: 0.72rem; color: #64748b; margin-bottom: 6px;">Límites de Seguridad:</div>
            <ul style="font-size: 0.7rem; color: #94a3b8; padding-left: 16px; margin: 0; line-height: 1.45;">
              <li>Lectura segura sin mutación automática.</li>
              <li>Propuestas de cambio sujetas a revisión humana.</li>
              <li>Aislamiento de contexto contra prompt injections.</li>
            </ul>
          </div>

        </div>

        <!-- Right Column: Results, Findings, Proposals, Citations -->
        <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;">
          
          ${activeResult ? `
            <!-- Result Summary Header -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0; color: #ffffff;">
                  Dictamen Ejecutivo de Copilot
                </h3>
                <span style="font-family: var(--font-mono); font-size: 0.68rem; color: #10b981; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); padding: 2px 8px; border-radius: 4px;">
                  ${activeResult.getProviderMetadata().provider} · ${activeResult.getProviderMetadata().durationMs}ms
                </span>
              </div>
              <div style="font-size: 0.88rem; color: #e2e8f0; line-height: 1.5;">
                ${activeResult.getSummary()}
              </div>
            </div>

            <!-- Findings Section -->
            <div>
              <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--gold); text-transform: uppercase; margin: 0 0 10px 0;">
                Hallazgos & Observaciones (${activeResult.getFindings().length})
              </h4>
              ${renderCopilotFindings(activeResult.getFindings())}
            </div>

            <!-- Proposals Section -->
            <div>
              <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--gold); text-transform: uppercase; margin: 0 0 10px 0;">
                Propuestas de Modificación (${activeResult.getProposals().length})
              </h4>
              ${renderCopilotProposals(activeResult.getProposals())}
            </div>

            <!-- Grounding Transparency -->
            ${renderCopilotGrounding(activeResult.getCitations(), activeResult.getGrounding())}
          ` : `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #64748b; text-align: center; padding: 40px;">
              <div style="font-size: 2.5rem; margin-bottom: 12px;">🤖</div>
              <div style="font-size: 1rem; font-weight: 600; color: #94a3b8; margin-bottom: 4px;">
                AI Copilot listo para asistir
              </div>
              <div style="font-size: 0.82rem; max-width: 420px; line-height: 1.45;">
                Selecciona una tarea de análisis o redacción en el panel izquierdo y presiona "Ejecutar Análisis" para generar hallazgos y propuestas estructuradas.
              </div>
            </div>
          `}

        </div>

      </div>

    </div>
  `;
}
