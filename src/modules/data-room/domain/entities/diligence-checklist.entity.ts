import {
  DiligenceChecklistData,
  DiligenceChecklistItemData,
  DiligenceCategoryType,
  DocumentKind,
  DiligencePriority,
  FreshnessRule
} from '../data-room.types';
import { DiligenceCategoryVo, DiligencePriorityVo } from '../value-objects/diligence-category.vo';
import { DocumentKindVo } from '../value-objects/document-kind.vo';

export class DiligenceChecklistItemEntity {
  private readonly id: string;
  private readonly category: DiligenceCategoryVo;
  private readonly title: string;
  private readonly description?: string;
  private readonly priority: DiligencePriorityVo;
  private readonly expectedDocumentKinds: DocumentKindVo[];
  private readonly evidenceRequired: boolean;
  private readonly claimCoverageRequired: boolean;
  private readonly freshnessRule?: FreshnessRule;

  constructor(data: DiligenceChecklistItemData) {
    this.id = data.id.trim();
    this.category = new DiligenceCategoryVo(data.category);
    this.title = data.title.trim();
    this.description = data.description;
    this.priority = new DiligencePriorityVo(data.priority);
    this.expectedDocumentKinds = (data.expectedDocumentKinds || []).map(k => new DocumentKindVo(k));
    this.evidenceRequired = !!data.evidenceRequired;
    this.claimCoverageRequired = !!data.claimCoverageRequired;
    this.freshnessRule = data.freshnessRule ? { ...data.freshnessRule } : undefined;
  }

  getId(): string { return this.id; }
  getCategory(): DiligenceCategoryType { return this.category.getValue(); }
  getTitle(): string { return this.title; }
  getDescription(): string | undefined { return this.description; }
  getPriority(): DiligencePriority { return this.priority.getValue(); }
  getExpectedDocumentKinds(): DocumentKind[] { return this.expectedDocumentKinds.map(k => k.getValue()); }
  isEvidenceRequired(): boolean { return this.evidenceRequired; }
  isClaimCoverageRequired(): boolean { return this.claimCoverageRequired; }
  getFreshnessRule(): FreshnessRule | undefined { return this.freshnessRule ? { ...this.freshnessRule } : undefined; }

  toJSON(): DiligenceChecklistItemData {
    return {
      id: this.id,
      category: this.getCategory(),
      title: this.title,
      description: this.description,
      priority: this.getPriority(),
      expectedDocumentKinds: this.getExpectedDocumentKinds(),
      evidenceRequired: this.evidenceRequired,
      claimCoverageRequired: this.claimCoverageRequired,
      freshnessRule: this.getFreshnessRule()
    };
  }
}

export class DiligenceChecklistEntity {
  private readonly id: string;
  private readonly version: string;
  private readonly name: string;
  private readonly projectType?: string;
  private readonly items: DiligenceChecklistItemEntity[];

  constructor(data: DiligenceChecklistData) {
    this.id = data.id.trim();
    this.version = data.version || '1.0';
    this.name = data.name.trim();
    this.projectType = data.projectType;
    this.items = (data.items || []).map(i => new DiligenceChecklistItemEntity(i));
  }

  getId(): string { return this.id; }
  getVersion(): string { return this.version; }
  getName(): string { return this.name; }
  getProjectType(): string | undefined { return this.projectType; }
  getItems(): DiligenceChecklistItemEntity[] { return [...this.items]; }

  toJSON(): DiligenceChecklistData {
    return {
      id: this.id,
      version: this.version,
      name: this.name,
      projectType: this.projectType,
      items: this.items.map(i => i.toJSON())
    };
  }
}
