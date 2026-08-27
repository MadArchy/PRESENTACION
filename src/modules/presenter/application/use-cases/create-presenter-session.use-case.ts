import { PresentationDefinitionEntity } from '../../../presentation/domain/entities/presentation-definition.entity';
import { PresenterSessionEntity } from '../../domain/entities/presenter-session.entity';
import { PresentationNotReadyForSessionError } from '../../domain/errors/presenter-domain.error';

export interface CreatePresenterSessionRequest {
  presentation: PresentationDefinitionEntity;
  mode?: 'PRESENTER_VIEW' | 'AUDIENCE_VIEW' | 'REHEARSAL';
  allowWarnings?: boolean;
}

export class CreatePresenterSessionUseCase {
  execute(req: CreatePresenterSessionRequest): PresenterSessionEntity {
    const readiness = req.presentation.getReadiness();

    if (readiness === 'PRESENTATION_NOT_READY' && req.mode !== 'REHEARSAL') {
      throw new PresentationNotReadyForSessionError(readiness);
    }

    const sessionId = `session-${req.presentation.getId()}-${Date.now()}`;

    return new PresenterSessionEntity({
      id: sessionId,
      presentationId: req.presentation.getId(),
      status: 'IDLE',
      mode: req.mode || 'PRESENTER_VIEW',
      currentSceneIndex: 0,
      totalElapsedSeconds: 0,
      sceneElapsedSeconds: 0,
      sceneRuntimeStates: { 0: 'NOT_VISITED' },
      events: []
    });
  }
}
