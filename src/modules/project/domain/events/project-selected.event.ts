export interface ProjectSelectedEventPayload {
  projectId: string;
  slug: string;
  selectedAt: string;
}

export class ProjectSelectedEvent {
  readonly eventName = 'project.selected';
  readonly payload: ProjectSelectedEventPayload;

  constructor(projectId: string, slug: string) {
    this.payload = {
      projectId,
      slug,
      selectedAt: new Date().toISOString()
    };
  }
}
