import {
  PresentationScene,
  SceneType,
  SceneRole,
  SceneStatus,
  LayoutVariant,
  ContentBinding,
  TrustBinding,
  MediaBinding
} from '../presentation.types';
import { BilingualText, ProjectSectionType } from '../../../project/domain/project.types';
import { SceneTypeVo } from '../value-objects/scene-type.vo';
import { SceneRoleVo } from '../value-objects/scene-role.vo';
import { SceneStatusVo } from '../value-objects/scene-status.vo';
import { LayoutVariantVo } from '../value-objects/layout-variant.vo';
import { InvalidPresentationDataError } from '../errors/presentation-domain.error';

export class PresentationSceneEntity {
  private readonly id: string;
  private readonly order: number;
  private readonly type: SceneTypeVo;
  private readonly role: SceneRoleVo;
  private status: SceneStatusVo;
  private readonly title: BilingualText;
  private readonly eyebrow?: BilingualText;
  private readonly subtitle?: BilingualText;
  private layout: LayoutVariantVo;
  private readonly bindings: ContentBinding[];
  private readonly trustBindings: TrustBinding[];
  private readonly mediaBindings: MediaBinding[];
  private readonly sourceNarrativeStepId: string;
  private readonly sourceSectionType: ProjectSectionType;
  private readonly sourceSectionId?: string;
  private readonly estimatedSeconds: number;

  constructor(data: PresentationScene) {
    if (!data.id || data.id.trim().length === 0) {
      throw new InvalidPresentationDataError('id', 'Scene ID cannot be empty');
    }
    if (typeof data.order !== 'number' || data.order <= 0) {
      throw new InvalidPresentationDataError('order', 'Scene order must be a positive number');
    }

    this.id = data.id.trim();
    this.order = data.order;
    this.type = new SceneTypeVo(data.type);
    this.role = new SceneRoleVo(data.role);
    this.status = new SceneStatusVo(data.status);
    this.title = { ...data.title };
    this.eyebrow = data.eyebrow ? { ...data.eyebrow } : undefined;
    this.subtitle = data.subtitle ? { ...data.subtitle } : undefined;
    this.layout = new LayoutVariantVo(data.layout);
    this.bindings = [...(data.bindings || [])];
    this.trustBindings = [...(data.trustBindings || [])];
    this.mediaBindings = [...(data.mediaBindings || [])];
    this.sourceNarrativeStepId = data.sourceNarrativeStepId;
    this.sourceSectionType = data.sourceSectionType;
    this.sourceSectionId = data.sourceSectionId;
    this.estimatedSeconds = data.estimatedSeconds || 60;
  }

  getId(): string { return this.id; }
  getOrder(): number { return this.order; }
  getType(): SceneType { return this.type.getValue(); }
  getRole(): SceneRole { return this.role.getValue(); }
  getStatus(): SceneStatus { return this.status.getValue(); }
  getTitle(): BilingualText { return { ...this.title }; }
  getEyebrow(): BilingualText | undefined { return this.eyebrow ? { ...this.eyebrow } : undefined; }
  getSubtitle(): BilingualText | undefined { return this.subtitle ? { ...this.subtitle } : undefined; }
  getLayout(): LayoutVariant { return this.layout.getValue(); }
  getBindings(): ContentBinding[] { return [...this.bindings]; }
  getTrustBindings(): TrustBinding[] { return [...this.trustBindings]; }
  getMediaBindings(): MediaBinding[] { return [...this.mediaBindings]; }
  getSourceNarrativeStepId(): string { return this.sourceNarrativeStepId; }
  getSourceSectionType(): ProjectSectionType { return this.sourceSectionType; }
  getSourceSectionId(): string | undefined { return this.sourceSectionId; }
  getEstimatedSeconds(): number { return this.estimatedSeconds; }

  setLayout(layout: LayoutVariant): void {
    this.layout = new LayoutVariantVo(layout);
  }

  setStatus(status: SceneStatus): void {
    this.status = new SceneStatusVo(status);
  }

  toJSON(): PresentationScene {
    return {
      id: this.id,
      order: this.order,
      type: this.getType(),
      role: this.getRole(),
      status: this.getStatus(),
      title: this.getTitle(),
      eyebrow: this.getEyebrow(),
      subtitle: this.getSubtitle(),
      layout: this.getLayout(),
      bindings: this.getBindings(),
      trustBindings: this.getTrustBindings(),
      mediaBindings: this.getMediaBindings(),
      sourceNarrativeStepId: this.sourceNarrativeStepId,
      sourceSectionType: this.sourceSectionType,
      sourceSectionId: this.sourceSectionId,
      estimatedSeconds: this.estimatedSeconds
    };
  }
}
