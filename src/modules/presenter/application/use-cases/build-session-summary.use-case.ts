import { PresentationDefinitionEntity } from '../../../presentation/domain/entities/presentation-definition.entity';
import { PresenterSessionEntity } from '../../domain/entities/presenter-session.entity';
import { PresenterSessionSummary } from '../../domain/presenter.types';

export class BuildPresenterSessionSummaryUseCase {
  execute(
    presentation: PresentationDefinitionEntity,
    session: PresenterSessionEntity
  ): PresenterSessionSummary {
    return session.buildSummary(presentation);
  }
}
