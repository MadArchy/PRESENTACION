import { AiModelPort } from '../../domain/ports/ai-model.port';
import {
  AiModelCapabilities,
  AiCompletionRequest,
  AiCompletionResponse,
  CopilotFinding,
  CopilotProposal,
  CopilotCitation
} from '../../domain/copilot.types';

export class MockAiModelAdapter implements AiModelPort {
  async getCapabilities(): Promise<AiModelCapabilities> {
    return {
      provider: 'MOCK',
      modelId: 'mock-deterministic-v1',
      supportsText: true,
      supportsStructuredOutput: true,
      supportsStreaming: false,
      supportsLargeContext: true
    };
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    let taskType = 'PROJECT_ANALYSIS';
    try {
      if (request.contextJson) {
        const parsed = JSON.parse(request.contextJson);
        if (parsed.taskType) taskType = parsed.taskType;
      }
    } catch {
      // Fallback
    }

    const { summary, findings, proposals, citations } = this.generateMockResponse(taskType);

    return {
      rawText: summary,
      structuredJson: {
        summary,
        findings,
        proposals,
        citations,
        grounding: {
          sourcesAnalyzedCount: citations.length,
          claimsReferencedCount: findings.length,
          evidenceItemsReferencedCount: citations.length,
          limitationsAcknowledged: true
        }
      },
      tokensUsed: { prompt: 450, completion: 220, total: 670 },
      providerMetadata: {
        provider: 'MOCK',
        modelId: 'mock-deterministic-v1',
        deterministic: true
      }
    };
  }

  private generateMockResponse(taskType: string): {
    summary: string;
    findings: CopilotFinding[];
    proposals: CopilotProposal[];
    citations: CopilotCitation[];
  } {
    const citations: CopilotCitation[] = [
      { id: 'cit-01', sourceType: 'PROJECT_SECTION', sourceRef: 'section:TECHNOLOGY', snippet: 'ESP32-S3 Sentinel hardware notarization on Polygon L2' },
      { id: 'cit-02', sourceType: 'CLAIM', sourceRef: 'claim-arcana-001', snippet: 'High materiality fact on cryptographic trust infrastructure' }
    ];

    switch (taskType) {
      case 'TRUST_REVIEW':
        return {
          summary: 'La gobernanza del proyecto muestra una base sólida con 15/16 claims respaldados. Se detectó 1 afirmación de mercado sin evidencia formal vinculada.',
          findings: [
            {
              id: 'find-trust-01',
              type: 'TRUST_CONCERN',
              title: 'Cálculo de TAM sin fuente regulatoria adjunta',
              explanation: 'El tamaño de mercado de $4.8B en cadena de frío está categorizado como ESTIMATE sin documento de soporte primario.',
              severity: 'MEDIUM',
              sourceRefs: ['claim-arcana-003', 'section:MARKET']
            },
            {
              id: 'find-trust-02',
              type: 'INSIGHT',
              title: 'Prueba criptográfica completamente verificada',
              explanation: 'La arquitectura de notarización en Polygon L2 cuenta con enlace de evidencia técnica de nivel DOCUMENT verificado.',
              severity: 'INFO',
              sourceRefs: ['claim-arcana-001', 'evidence-arcana-001']
            }
          ],
          proposals: [],
          citations
        };

      case 'NARRATIVE_CRITIQUE':
      case 'CONTENT_REWRITE_PROPOSAL':
        return {
          summary: 'La narrativa actual es técnicamente precisa pero puede sintetizarse para maximizar impacto ejecutivo en audiencias inversionistas.',
          findings: [
            {
              id: 'find-narrative-01',
              type: 'NARRATIVE_CONCERN',
              title: 'Sobrecarga de detalles de microcontrolador en apertura',
              explanation: 'La sección de problema dedica 45s a especificaciones de hardware antes de presentar la pérdida económica del cliente.',
              severity: 'LOW',
              sourceRefs: ['section:PROBLEM', 'step-2']
            }
          ],
          proposals: [
            {
              id: `prop-${Date.now()}-01`,
              proposalType: 'SECTION_TEXT_UPDATE',
              target: { entityType: 'PROJECT_SECTION', entityId: 'sec-problem', field: 'summary' },
              rationale: 'Enfocar el gancho inicial en el impacto financiero ($12k/mes en pérdidas) antes del detalle técnico.',
              currentValue: 'Las plantas industriales sufren pérdidas por telemetría IoT vulnerable.',
              proposedValue: 'Las fallas no detectadas en cadena de frío generan pérdidas promedio de $12k/mes por planta sin trazabilidad auditable.',
              sourceRefs: ['claim-arcana-002'],
              status: 'PROPOSED'
            }
          ],
          citations
        };

      case 'EXECUTIVE_SUMMARY_DRAFT':
        return {
          summary: 'Borrador de resumen ejecutivo generado a partir de los pilares validados del Project Twin.',
          findings: [
            {
              id: 'find-draft-01',
              type: 'INSIGHT',
              title: 'Propuesta de valor condensada en 3 ejes',
              explanation: 'Hardware Sentinel + Notarización L2 + Modelo SaaS B2B.',
              severity: 'INFO',
              sourceRefs: ['section:IDENTITY', 'section:SOLUTION']
            }
          ],
          proposals: [
            {
              id: `prop-${Date.now()}-02`,
              proposalType: 'EXECUTIVE_SUMMARY_UPDATE',
              target: { entityType: 'PROJECT_SECTION', entityId: 'sec-exec-summary', field: 'summary' },
              rationale: 'Condensar visión para presentaciones ejecutivas breves.',
              proposedValue: 'Arcana convierte telemetría física en evidencia criptográfica inmutable para auditorías sanitarias y de seguros en tiempo real.',
              sourceRefs: ['claim-arcana-001', 'section:SOLUTION'],
              status: 'PROPOSED'
            }
          ],
          citations
        };

      case 'PRESENTER_QA_PREPARATION':
        return {
          summary: '4 preguntas difíciles anticipadas con notas de respuesta basadas en la arquitectura real.',
          findings: [
            {
              id: 'find-qa-01',
              type: 'QUESTION',
              title: 'Pregunta sobre latencia de red y modo offline',
              explanation: 'Los inversionistas cuestionarán qué sucede durante cortes prolongados de conectividad.',
              severity: 'HIGH',
              sourceRefs: ['section:TECHNOLOGY']
            }
          ],
          proposals: [
            {
              id: `prop-${Date.now()}-03`,
              proposalType: 'QA_CARD_SUGGESTION',
              target: { entityType: 'QA_CARD', entityId: 'qa-new-01' },
              rationale: 'Incorporar respuesta formal sobre el buffer flash de 30 días.',
              proposedValue: {
                question: '¿Qué pasa si una planta pierde internet por 2 semanas?',
                answerNotes: 'Sentinel almacena hashes en flash local encriptada y sincroniza el árbol de Merkle en lote al reanudar conexión.'
              },
              sourceRefs: ['section:TECHNOLOGY'],
              status: 'PROPOSED'
            }
          ],
          citations
        };

      default:
        return {
          summary: `Análisis de Copilot completado con éxito para la tarea '${taskType}'.`,
          findings: [
            {
              id: 'find-general-01',
              type: 'INSIGHT',
              title: 'Alineación estratégica sólida',
              explanation: 'Los datos del Project Twin demuestran coherencia entre solución, modelo de negocio y roadmap técnico.',
              severity: 'INFO',
              sourceRefs: ['section:IDENTITY', 'section:ROADMAP']
            }
          ],
          proposals: [],
          citations
        };
    }
  }
}
