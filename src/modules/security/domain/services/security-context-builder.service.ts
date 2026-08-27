import {
  AuthenticatedIdentity,
  UserProfile,
  Organization,
  OrganizationMembership,
  ProjectAccessAssignment,
  SecurityContext,
  Permission
} from '../security.types';
import { RolePermissionPolicy } from '../policies/role-permission.policy';

export class SecurityContextBuilderService {
  buildContext(params: {
    identity: AuthenticatedIdentity;
    userProfile?: UserProfile;
    organization?: Organization;
    membership?: OrganizationMembership;
    projectAccess?: ProjectAccessAssignment;
  }): SecurityContext {
    const effectivePermissions: Permission[] = RolePermissionPolicy.getEffectivePermissions(
      params.membership?.role,
      params.projectAccess?.role
    );

    return {
      identity: params.identity,
      userProfile: params.userProfile,
      organization: params.organization,
      membership: params.membership,
      projectAccess: params.projectAccess,
      effectivePermissions
    };
  }
}
