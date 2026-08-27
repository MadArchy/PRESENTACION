import { CopilotRequestEntity } from '../entities/copilot-request.entity';
import { CopilotContextBundle, AiCompletionRequest } from '../copilot.types';
import { PromptSafetyPolicy } from '../policies/prompt-safety.policy';

export class PromptAssemblerService {
  assemble(request: CopilotRequestEntity, context: CopilotContextBundle): AiCompletionRequest {
    const task = request.getTaskType();
    const userInstruction = PromptSafetyPolicy.sanitizeUserInput(request.getUserInstruction());

    const taskInstructions: Record<string, string> = {
      PROJECT_ANALYSIS: 'Analyze the venture completeness, value proposition, and business model clarity.',
      GAP_ANALYSIS: 'Identify critical missing data, validation gaps, or unaddressed market risks.',
      NARRATIVE_CRITIQUE: 'Critique the storyline flow, audience engagement hook, and pacing.',
      PRESENTATION_CRITIQUE: 'Review slide density, visual hierarchy, and trust badge placements.',
      TRUST_REVIEW: 'Audit factual integrity, identify unsupported claims, and flag forward-looking risks.',
      RISK_REVIEW: 'Detail operational, market, regulatory, and technological vulnerabilities.',
      EXECUTIVE_SUMMARY_DRAFT: 'Draft an authoritative, concise bilingual executive summary.',
      CONTENT_REWRITE_PROPOSAL: 'Propose concrete text and bullet point revisions to maximize clarity.',
      PRESENTER_QA_PREPARATION: 'Anticipate tough investor/technical questions and formulate vetted answer points.',
      PRESENTER_TALKING_POINTS: 'Suggest key spoken emphasis points and natural slide transition cues.',
      COMPARISON: 'Highlight key competitive advantages and market differentiators.',
      EXPLANATION: 'Provide a crisp, jargon-free explanation of the core technical architecture.'
    };

    const specificTaskPrompt = taskInstructions[task] || 'Perform advisory analysis on the provided venture context.';

    const systemPrompt = `
${PromptSafetyPolicy.SYSTEM_SAFETY_PREAMBLE}

TASK GOAL:
You are assigned to execute task: "${task}".
${specificTaskPrompt}

OUTPUT FORMAT:
Respond with structured analytical findings and, where applicable, concrete actionable change proposals.
`.trim();

    const userPrompt = `
PROJECT ID: ${request.getProjectId()} (v${request.getProjectVersion()})
TASK TYPE: ${task}
LANGUAGE: ${request.getLanguage()}
${userInstruction ? `ADDITIONAL INSTRUCTIONS: ${userInstruction}` : ''}

Please analyze the following context payload:
${PromptSafetyPolicy.wrapContextPayload(JSON.stringify(context, null, 2))}
`.trim();

    return {
      systemPrompt,
      userPrompt,
      contextJson: JSON.stringify({ taskType: task, projectId: request.getProjectId() }),
      temperature: request.getProviderConfig().temperature ?? 0.2,
      maxTokens: 1500
    };
  }
}
