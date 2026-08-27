import { PresentationDefinitionEntity } from '../../../presentation/domain/entities/presentation-definition.entity';
import { PresenterSessionEntity } from '../../domain/entities/presenter-session.entity';
import { PresenterNotesRepository } from '../../domain/ports/presenter-notes-repository.port';
import { QaRepository } from '../../domain/ports/qa-repository.port';
import { PresenterNote, PresenterTrustAlert, QaPreparationCard, PresenterTimingState } from '../../domain/presenter.types';
import { PresentationSceneEntity } from '../../../presentation/domain/entities/presentation-scene.entity';

export interface PresenterContext {
  session: PresenterSessionEntity;
  currentScene: PresentationSceneEntity;
  nextScene: PresentationSceneEntity | null;
  timing: PresenterTimingState;
  notes: PresenterNote[];
  trustAlerts: PresenterTrustAlert[];
  qaCards: QaPreparationCard[];
}

export class GetPresenterContextUseCase {
  constructor(
    private readonly notesRepository: PresenterNotesRepository,
    private readonly qaRepository: QaRepository
  ) {}

  async execute(
    presentation: PresentationDefinitionEntity,
    session: PresenterSessionEntity
  ): Promise<PresenterContext> {
    const scenes = presentation.getScenes();
    const currentIndex = session.getCurrentSceneIndex();
    const currentScene = scenes[currentIndex] || scenes[0];
    const nextScene = currentIndex < scenes.length - 1 ? scenes[currentIndex + 1] : null;

    const timing = session.calculateTiming(presentation);
    const notes = await this.notesRepository.listByScene(presentation.getId(), currentScene.getId());
    const qaCards = await this.qaRepository.listByProject(presentation.getProjectId());

    // Map Trust Alerts for current scene
    const trustAlerts: PresenterTrustAlert[] = currentScene.getTrustBindings().map((tb, idx) => {
      const isCritical = tb.warningCode === 'CLAIM_CONTRADICTED';
      const isWarning = tb.warningCode === 'FACT_UNSUPPORTED';
      const severity = isCritical ? 'CRITICAL' : (isWarning ? 'WARNING' : 'INFO');

      return {
        id: `alert-${currentScene.getId()}-${idx}`,
        sceneId: currentScene.getId(),
        severity,
        code: tb.warningCode || `CLAIM_${tb.claimType}`,
        message: tb.message || `Claim ${tb.claimId} (${tb.claimType})`,
        claimId: tb.claimId
      };
    });

    return {
      session,
      currentScene,
      nextScene,
      timing,
      notes,
      trustAlerts,
      qaCards
    };
  }
}
