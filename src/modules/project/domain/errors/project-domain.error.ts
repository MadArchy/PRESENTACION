export class ProjectDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectDomainError';
  }
}

export class InvalidProjectDataError extends ProjectDomainError {
  constructor(field: string, reason: string) {
    super(`Invalid project data for '${field}': ${reason}`);
    this.name = 'InvalidProjectDataError';
  }
}

export class ProjectNotFoundError extends ProjectDomainError {
  constructor(projectId: string) {
    super(`Project with identifier '${projectId}' was not found`);
    this.name = 'ProjectNotFoundError';
  }
}
