export class PresenterDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PresenterDomainError';
  }
}

export class PresenterSessionNotFoundError extends PresenterDomainError {
  constructor(id: string) {
    super(`PresenterSession with id '${id}' was not found`);
    this.name = 'PresenterSessionNotFoundError';
  }
}

export class InvalidPresenterSessionTransitionError extends PresenterDomainError {
  constructor(from: string, to: string) {
    super(`Invalid PresenterSession transition from '${from}' to '${to}'`);
    this.name = 'InvalidPresenterSessionTransitionError';
  }
}

export class InvalidSceneNavigationError extends PresenterDomainError {
  constructor(reason: string) {
    super(`Invalid scene navigation: ${reason}`);
    this.name = 'InvalidSceneNavigationError';
  }
}

export class PresentationNotReadyForSessionError extends PresenterDomainError {
  constructor(readiness: string) {
    super(`Presentation cannot start live session in '${readiness}' state`);
    this.name = 'PresentationNotReadyForSessionError';
  }
}
