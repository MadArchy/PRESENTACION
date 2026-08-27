import { NarrativeRequest } from '../../domain/narrative.types';
import { AudienceTypeVo } from '../../domain/value-objects/audience-type.vo';
import { NarrativeObjectiveVo } from '../../domain/value-objects/narrative-objective.vo';
import { NarrativeDurationVo } from '../../domain/value-objects/narrative-duration.vo';
import { NarrativeDepthVo } from '../../domain/value-objects/narrative-depth.vo';

export interface ValidationSummary {
  valid: boolean;
  errors: string[];
}

export class ValidateNarrativeRequestUseCase {
  execute(request: NarrativeRequest): ValidationSummary {
    const errors: string[] = [];

    if (!request.projectId) {
      errors.push('projectId is required');
    }

    try {
      new AudienceTypeVo(request.audience);
    } catch (e: any) {
      errors.push(e.message);
    }

    try {
      new NarrativeObjectiveVo(request.objective);
    } catch (e: any) {
      errors.push(e.message);
    }

    try {
      new NarrativeDurationVo(request.duration);
    } catch (e: any) {
      errors.push(e.message);
    }

    try {
      new NarrativeDepthVo(request.depth);
    } catch (e: any) {
      errors.push(e.message);
    }

    if (!['ES', 'EN'].includes(request.language?.toUpperCase())) {
      errors.push(`Language must be 'ES' or 'EN', got '${request.language}'`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
