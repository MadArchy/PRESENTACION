import { DocumentArtifactEntity } from '../entities/document-artifact.entity';
import { FreshnessRule } from '../data-room.types';

export class DocumentFreshnessPolicy {
  static evaluate(doc: DocumentArtifactEntity, rule?: FreshnessRule, now = new Date()): 'CURRENT' | 'AGING' | 'STALE' | 'EXPIRED' {
    if (doc.getExpiresAt()) {
      const expDate = new Date(doc.getExpiresAt()!);
      if (expDate < now) {
        return 'EXPIRED';
      }
    }

    if (rule?.maxAgeDays && doc.getEffectiveAt()) {
      const effDate = new Date(doc.getEffectiveAt()!);
      const diffMs = now.getTime() - effDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (diffDays > rule.maxAgeDays) {
        return 'STALE';
      } else if (diffDays > rule.maxAgeDays * 0.75) {
        return 'AGING';
      }
    }

    if (doc.getStatus() === 'SUPERSEDED' || doc.getStatus() === 'EXPIRED') {
      return 'EXPIRED';
    }

    return 'CURRENT';
  }
}
