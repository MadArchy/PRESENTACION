import { LegacyPresentationPort } from '../../domain/ports/legacy-presentation.port';
import { OpenLegacyPresentationCommand } from '../commands/open-legacy-presentation.command';

export class OpenLegacyPresentationUseCase {
  constructor(private readonly legacyAdapter: LegacyPresentationPort) {}

  async execute(command: OpenLegacyPresentationCommand): Promise<void> {
    await this.legacyAdapter.launchDeck(command.projectId);
  }
}
