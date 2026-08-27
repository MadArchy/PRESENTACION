import {
  DiligenceCategoryType,
  CategoryCoverage,
  DiligenceCoverageReport
} from '../data-room.types';
import { DocumentArtifactEntity } from '../entities/document-artifact.entity';
import { DiligenceRequestEntity } from '../entities/diligence-request.entity';
import { DiligenceChecklistEntity } from '../entities/diligence-checklist.entity';
import { VALID_DILIGENCE_CATEGORIES } from '../value-objects/diligence-category.vo';

export class DiligenceCoverageEvaluatorService {
  evaluate(
    projectId: string,
    projectVersion: string,
    documents: DocumentArtifactEntity[],
    requests: DiligenceRequestEntity[],
    checklist: DiligenceChecklistEntity
  ): DiligenceCoverageReport {
    const categoryCoverage: Record<DiligenceCategoryType, CategoryCoverage> = {} as any;

    for (const cat of VALID_DILIGENCE_CATEGORIES) {
      const catDocs = documents.filter(d => d.getCategory() === cat);
      const catReqs = requests.filter(r => r.getCategory() === cat);
      const catChecklistItems = checklist.getItems().filter(i => i.getCategory() === cat);

      const requiredItems = catChecklistItems.length;
      const satisfiedItems = catReqs.filter(r => r.isSatisfied()).length;
      const partialItems = catReqs.filter(r => r.getStatus() === 'PARTIALLY_SATISFIED').length;
      const openItems = catReqs.filter(r => r.getStatus() === 'OPEN').length;
      const blockedItems = catReqs.filter(r => r.isBlocked()).length;

      const currentDocuments = catDocs.filter(d => d.isCurrent()).length;
      const staleDocuments = catDocs.filter(d => d.isStaleOrInvalid()).length;
      const missingDocuments = catDocs.filter(d => d.isMissing()).length;

      const baseDenominator = Math.max(requiredItems, catReqs.length, 1);
      const coveragePercent = Math.min(100, Math.round((satisfiedItems / baseDenominator) * 100));

      categoryCoverage[cat] = {
        category: cat,
        requiredItems,
        satisfiedItems,
        partialItems,
        openItems,
        blockedItems,
        currentDocuments,
        staleDocuments,
        missingDocuments,
        coveragePercent
      };
    }

    const totalDocuments = documents.length;
    const currentDocuments = documents.filter(d => d.isCurrent()).length;
    const missingDocuments = documents.filter(d => d.isMissing()).length;
    const staleDocuments = documents.filter(d => d.isStaleOrInvalid()).length;

    const totalRequests = requests.length;
    const satisfiedRequests = requests.filter(r => r.isSatisfied()).length;
    const openRequests = requests.filter(r => r.getStatus() === 'OPEN').length;
    const blockedRequests = requests.filter(r => r.isBlocked()).length;

    return {
      projectId,
      projectVersion,
      totalDocuments,
      currentDocuments,
      missingDocuments,
      staleDocuments,
      totalRequests,
      satisfiedRequests,
      openRequests,
      blockedRequests,
      categoryCoverage,
      evaluatedAt: new Date().toISOString()
    };
  }
}
