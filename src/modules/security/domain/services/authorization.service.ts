import {
  AuthenticatedIdentity,
  UserProfile,
  Organization,
  OrganizationMembership,
  ProjectAccessAssignment,
  Permission,
  AuthorizationDecision,
  ResourceSecurityEnvelope
} from '../security.types';
import { RolePermissionPolicy } from '../policies/role-permission.policy';

export interface AuthorizeRequest {
  identity?: AuthenticatedIdentity;
  userProfile?: UserProfile;
  organization?: Organization;
  membership?: OrganizationMembership;
  projectAccess?: ProjectAccessAssignment;
  requiredPermission: Permission;
  resource?: ResourceSecurityEnvelope;
  requireEmailVerification?: boolean;
}

export class AuthorizationService {
  public static readonly POLICY_VERSION = '1.0';

  authorize(req: AuthorizeRequest): AuthorizationDecision {
    const requiredPermissions: Permission[] = [req.requiredPermission];
    const policyVersion = AuthorizationService.POLICY_VERSION;

    // 1. Authenticated Identity Check
    if (!req.identity || !req.identity.userId) {
      return {
        allowed: false,
        reasonCode: 'UNAUTHENTICATED',
        requiredPermissions,
        grantedPermissions: [],
        policyVersion,
        message: 'Acceso denegado: El usuario no se encuentra autenticado.'
      };
    }

    // 2. Email Verification Check (if policy enabled)
    if (req.requireEmailVerification && !req.identity.emailVerified && req.identity.platformRole !== 'PLATFORM_ADMIN') {
      return {
        allowed: false,
        reasonCode: 'EMAIL_NOT_VERIFIED',
        requiredPermissions,
        grantedPermissions: [],
        policyVersion,
        message: 'Acceso denegado: Se requiere verificar la dirección de correo electrónico.'
      };
    }

    // 3. User Profile Status Check
    if (req.userProfile && req.userProfile.status !== 'ACTIVE') {
      return {
        allowed: false,
        reasonCode: 'USER_SUSPENDED',
        requiredPermissions,
        grantedPermissions: [],
        policyVersion,
        message: 'Acceso denegado: La cuenta de usuario se encuentra suspendida o desactivada.'
      };
    }

    // 4. Platform Admin Bypass (Global administrative authority)
    if (req.identity.platformRole === 'PLATFORM_ADMIN') {
      return {
        allowed: true,
        reasonCode: 'ALLOW',
        requiredPermissions,
        grantedPermissions: [...requiredPermissions],
        policyVersion,
        message: 'Acceso concedido: Autoridad de Administrador de Plataforma.'
      };
    }

    // 5. Organization Check
    if (req.resource?.organizationId) {
      if (!req.organization || req.organization.id !== req.resource.organizationId) {
        return {
          allowed: false,
          reasonCode: 'ORGANIZATION_NOT_FOUND',
          requiredPermissions,
          grantedPermissions: [],
          organizationId: req.resource.organizationId,
          policyVersion,
          message: 'Acceso denegado: La organización solicitada no existe o no está disponible.'
        };
      }

      if (req.organization.status !== 'ACTIVE') {
        return {
          allowed: false,
          reasonCode: 'ORGANIZATION_SUSPENDED',
          requiredPermissions,
          grantedPermissions: [],
          organizationId: req.organization.id,
          policyVersion,
          message: 'Acceso denegado: La organización se encuentra suspendida o archivada.'
        };
      }

      // 6. Organization Membership Check
      if (!req.membership || req.membership.organizationId !== req.organization.id || req.membership.userId !== req.identity.userId) {
        return {
          allowed: false,
          reasonCode: 'MEMBERSHIP_MISSING',
          requiredPermissions,
          grantedPermissions: [],
          organizationId: req.organization.id,
          policyVersion,
          message: 'Acceso denegado: El usuario no es miembro de esta organización.'
        };
      }

      if (req.membership.status !== 'ACTIVE') {
        return {
          allowed: false,
          reasonCode: 'MEMBERSHIP_INACTIVE',
          requiredPermissions,
          grantedPermissions: [],
          organizationId: req.organization.id,
          policyVersion,
          message: 'Acceso denegado: La membresía en la organización se encuentra suspendida o revocada.'
        };
      }
    }

    // 7. Project Access Check
    if (req.resource?.projectId) {
      // Organization owners have implicit project admin capabilities across all org projects
      const isOrgOwner = req.membership?.role === 'ORG_OWNER';
      
      if (!isOrgOwner) {
        if (!req.projectAccess || req.projectAccess.projectId !== req.resource.projectId || req.projectAccess.userId !== req.identity.userId) {
          return {
            allowed: false,
            reasonCode: 'PROJECT_ACCESS_MISSING',
            requiredPermissions,
            grantedPermissions: [],
            organizationId: req.organization?.id,
            projectId: req.resource.projectId,
            policyVersion,
            message: 'Acceso denegado: El usuario no tiene asignado acceso a este proyecto.'
          };
        }

        if (req.projectAccess.status !== 'ACTIVE') {
          return {
            allowed: false,
            reasonCode: 'PROJECT_ACCESS_INACTIVE',
            requiredPermissions,
            grantedPermissions: [],
            organizationId: req.organization?.id,
            projectId: req.resource.projectId,
            policyVersion,
            message: 'Acceso denegado: El acceso a este proyecto ha sido suspendido o revocado.'
          };
        }
      }
    }

    // 8. Calculate Effective Granted Permissions
    const orgRole = req.membership?.role;
    const projectRole = req.projectAccess?.role;
    const grantedPermissions = RolePermissionPolicy.getEffectivePermissions(orgRole, projectRole);

    // 9. Confidentiality Capability Check for Data Room
    if (req.resource?.confidentiality) {
      if (req.resource.confidentiality === 'CONFIDENTIAL') {
        if (!grantedPermissions.includes('data_room.read_confidential')) {
          return {
            allowed: false,
            reasonCode: 'CONFIDENTIALITY_PERMISSION_MISSING',
            requiredPermissions: ['data_room.read_confidential'],
            grantedPermissions,
            organizationId: req.organization?.id,
            projectId: req.resource.projectId,
            policyVersion,
            message: 'Acceso denegado: Requiere permiso para leer material CONFIDENCIAL.'
          };
        }
      } else if (req.resource.confidentiality === 'HIGHLY_CONFIDENTIAL') {
        if (!grantedPermissions.includes('data_room.read_highly_confidential')) {
          return {
            allowed: false,
            reasonCode: 'CONFIDENTIALITY_PERMISSION_MISSING',
            requiredPermissions: ['data_room.read_highly_confidential'],
            grantedPermissions,
            organizationId: req.organization?.id,
            projectId: req.resource.projectId,
            policyVersion,
            message: 'Acceso denegado: Requiere permiso para leer material ALTAMENTE CONFIDENCIAL.'
          };
        }
      }
    }

    // 10. Required Permission Resolution
    if (!grantedPermissions.includes(req.requiredPermission)) {
      return {
        allowed: false,
        reasonCode: 'PERMISSION_MISSING',
        requiredPermissions,
        grantedPermissions,
        organizationId: req.organization?.id,
        projectId: req.resource?.projectId,
        policyVersion,
        message: `Acceso denegado: Se requiere el permiso '${req.requiredPermission}'.`
      };
    }

    return {
      allowed: true,
      reasonCode: 'ALLOW',
      requiredPermissions,
      grantedPermissions,
      organizationId: req.organization?.id,
      projectId: req.resource?.projectId,
      policyVersion,
      message: 'Acceso concedido por política RBAC v1.0.'
    };
  }
}
