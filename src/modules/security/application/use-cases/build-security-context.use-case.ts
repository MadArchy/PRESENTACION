import { AuthenticationPort } from '../../domain/ports/authentication.port';
import {
  UserProfileRepository,
  OrganizationRepository,
  OrganizationMembershipRepository,
  ProjectAccessRepository
} from '../../domain/ports/user-profile-repository.port';
import { SecurityContextBuilderService } from '../../domain/services/security-context-builder.service';
import { AuthorizationService } from '../../domain/services/authorization.service';
import {
  SecurityContext,
  Permission,
  AuthorizationDecision,
  ResourceSecurityEnvelope
} from '../../domain/security.types';

export class BuildSecurityContextUseCase {
  constructor(
    private readonly authPort: AuthenticationPort,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly membershipRepository: OrganizationMembershipRepository,
    private readonly projectAccessRepository: ProjectAccessRepository,
    private readonly contextBuilder = new SecurityContextBuilderService()
  ) {}

  async execute(orgId?: string, projectId?: string): Promise<SecurityContext | null> {
    const identity = await this.authPort.getCurrentIdentity();
    if (!identity) return null;

    const userProfile = (await this.userProfileRepository.findUserProfileById(identity.userId)) || undefined;
    const organization = orgId ? ((await this.organizationRepository.findOrgById(orgId)) || undefined) : undefined;
    const membership = orgId ? ((await this.membershipRepository.findMembership(orgId, identity.userId)) || undefined) : undefined;
    const projectAccess = (orgId && projectId)
      ? ((await this.projectAccessRepository.findProjectAccess(orgId, projectId, identity.userId)) || undefined)
      : undefined;

    return this.contextBuilder.buildContext({
      identity,
      userProfile,
      organization,
      membership,
      projectAccess
    });
  }
}

export class AuthorizePermissionUseCase {
  constructor(
    private readonly buildContextUseCase: BuildSecurityContextUseCase,
    private readonly authService = new AuthorizationService()
  ) {}

  async execute(
    requiredPermission: Permission,
    resource?: ResourceSecurityEnvelope
  ): Promise<AuthorizationDecision> {
    const context = await this.buildContextUseCase.execute(
      resource?.organizationId,
      resource?.projectId
    );

    if (!context) {
      return {
        allowed: false,
        reasonCode: 'UNAUTHENTICATED',
        requiredPermissions: [requiredPermission],
        grantedPermissions: [],
        policyVersion: AuthorizationService.POLICY_VERSION,
        message: 'Acceso denegado: Sesión no iniciada.'
      };
    }

    return this.authService.authorize({
      identity: context.identity,
      userProfile: context.userProfile,
      organization: context.organization,
      membership: context.membership,
      projectAccess: context.projectAccess,
      requiredPermission,
      resource
    });
  }
}
