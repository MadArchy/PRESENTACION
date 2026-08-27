import {
  FileRecord,
  FileVersion,
  ShareGrant,
  StorageAuthorizationDecision,
  StorageAuthorizationReasonCode
} from '../secure-storage.types';
import { SecurityContext, Permission } from '../../../security/domain/security.types';
import { SecureStoragePolicy } from '../policies/secure-storage.policy';

export interface StorageAuthRequest {
  context: SecurityContext;
  file?: FileRecord;
  version?: FileVersion;
  shareGrant?: ShareGrant;
  operation: 'READ' | 'UPLOAD' | 'REPLACE' | 'DELETE' | 'SHARE' | 'QUARANTINE' | 'MANAGE_VERSIONS';
  organizationId: string;
  projectId: string;
}

export class StorageAuthorizationService {
  public static readonly POLICY_VERSION = SecureStoragePolicy.SECURE_STORAGE_POLICY_VERSION;

  authorize(request: StorageAuthRequest): StorageAuthorizationDecision {
    const { context, file, version, shareGrant, operation, organizationId, projectId } = request;

    // 1. Identity check
    if (!context || !context.identity) {
      return this.deny('UNAUTHENTICATED', organizationId, projectId, file?.id, shareGrant?.id, 'Acceso denegado: Usuario no autenticado.');
    }

    // 2. User status check
    if (context.userProfile && context.userProfile.status !== 'ACTIVE') {
      return this.deny('USER_INACTIVE', organizationId, projectId, file?.id, shareGrant?.id, 'Acceso denegado: Perfil de usuario inactivo o suspendido.');
    }

    // 3. Platform Admin bypass
    if (context.identity.platformRole === 'PLATFORM_ADMIN') {
      return this.allow(organizationId, projectId, file?.id, shareGrant?.id);
    }

    // 4. Organization mismatch check
    if (context.organization && context.organization.id !== organizationId) {
      return this.deny('ORGANIZATION_MISMATCH', organizationId, projectId, file?.id, shareGrant?.id, 'Acceso denegado: Organización no coincide.');
    }

    // 5. Membership check
    if (!context.membership || context.membership.status !== 'ACTIVE') {
      return this.deny('MEMBERSHIP_INACTIVE', organizationId, projectId, file?.id, shareGrant?.id, 'Acceso denegado: Membresía inactiva o inexistente.');
    }

    // 6. Project access check
    if (!context.projectAccess || context.projectAccess.status !== 'ACTIVE') {
      return this.deny('PROJECT_ACCESS_INACTIVE', organizationId, projectId, file?.id, shareGrant?.id, 'Acceso denegado: Sin asignación activa al proyecto.');
    }

    if (context.projectAccess.projectId !== projectId) {
      return this.deny('PROJECT_MISMATCH', organizationId, projectId, file?.id, shareGrant?.id, 'Acceso denegado: El proyecto asignado no coincide.');
    }

    // 7. Operations other than READ
    if (operation === 'UPLOAD') {
      if (!context.effectivePermissions.includes('data_room.upload_file')) {
        return this.deny('PERMISSION_MISSING', organizationId, projectId, undefined, undefined, 'Acceso denegado: Permiso de subida faltante.', 'data_room.upload_file');
      }
      return this.allow(organizationId, projectId);
    }

    if (operation === 'REPLACE') {
      if (!context.effectivePermissions.includes('data_room.replace_file')) {
        return this.deny('PERMISSION_MISSING', organizationId, projectId, file?.id, undefined, 'Acceso denegado: Permiso de reemplazo de archivo faltante.', 'data_room.replace_file');
      }
      return this.allow(organizationId, projectId, file?.id);
    }

    if (operation === 'DELETE') {
      if (!context.effectivePermissions.includes('data_room.delete_file')) {
        return this.deny('PERMISSION_MISSING', organizationId, projectId, file?.id, undefined, 'Acceso denegado: Permiso de eliminación faltante.', 'data_room.delete_file');
      }
      return this.allow(organizationId, projectId, file?.id);
    }

    if (operation === 'SHARE') {
      if (!context.effectivePermissions.includes('data_room.share_file')) {
        return this.deny('PERMISSION_MISSING', organizationId, projectId, file?.id, undefined, 'Acceso denegado: Permiso de compartición faltante.', 'data_room.share_file');
      }
      return this.allow(organizationId, projectId, file?.id);
    }

    if (operation === 'QUARANTINE') {
      if (!context.effectivePermissions.includes('data_room.review_quarantined_file')) {
        return this.deny('PERMISSION_MISSING', organizationId, projectId, file?.id, undefined, 'Acceso denegado: Permiso de cuarentena faltante.', 'data_room.review_quarantined_file');
      }
      return this.allow(organizationId, projectId, file?.id);
    }

    if (operation === 'MANAGE_VERSIONS') {
      if (!context.effectivePermissions.includes('data_room.manage_file_versions')) {
        return this.deny('PERMISSION_MISSING', organizationId, projectId, file?.id, undefined, 'Acceso denegado: Permiso de gestión de versiones faltante.', 'data_room.manage_file_versions');
      }
      return this.allow(organizationId, projectId, file?.id);
    }

    // 8. READ Operation evaluation
    if (!file) {
      return this.deny('FILE_NOT_FOUND', organizationId, projectId, undefined, undefined, 'Archivo no encontrado.');
    }

    if (file.status === 'QUARANTINED') {
      return this.deny('FILE_QUARANTINED', organizationId, projectId, file.id, shareGrant?.id, 'El archivo se encuentra en cuarentena de seguridad.');
    }

    if (file.status === 'DELETED') {
      return this.deny('FILE_DELETED', organizationId, projectId, file.id, shareGrant?.id, 'El archivo ha sido eliminado.');
    }

    if (file.status !== 'AVAILABLE') {
      return this.deny('FILE_NOT_AVAILABLE', organizationId, projectId, file.id, shareGrant?.id, 'El archivo no está disponible.');
    }

    if (version) {
      if (version.status === 'QUARANTINED') {
        return this.deny('FILE_QUARANTINED', organizationId, projectId, file.id, shareGrant?.id, 'La versión solicitada se encuentra en cuarentena.');
      }
      if (version.status === 'DELETED') {
        return this.deny('FILE_DELETED', organizationId, projectId, file.id, shareGrant?.id, 'La versión solicitada ha sido eliminada.');
      }
      if (version.status !== 'AVAILABLE' && version.status !== 'SUPERSEDED') {
        return this.deny('VERSION_NOT_AVAILABLE', organizationId, projectId, file.id, shareGrant?.id, 'La versión solicitada no está disponible.');
      }
    }

    // 9. External Reviewer Share Grant Evaluation
    if (context.projectAccess.role === 'EXTERNAL_REVIEWER') {
      if (!shareGrant) {
        return this.deny('SHARE_GRANT_MISSING', organizationId, projectId, file.id, undefined, 'Acceso denegado: Sin concesión de acceso (ShareGrant).');
      }

      if (shareGrant.status === 'REVOKED') {
        return this.deny('SHARE_GRANT_REVOKED', organizationId, projectId, file.id, shareGrant.id, 'Acceso denegado: La concesión de acceso fue revocada.');
      }

      if (shareGrant.status === 'EXPIRED' || (shareGrant.expiresAt && new Date(shareGrant.expiresAt) <= new Date())) {
        return this.deny('SHARE_GRANT_EXPIRED', organizationId, projectId, file.id, shareGrant.id, 'Acceso denegado: La concesión de acceso ha expirado.');
      }

      if (shareGrant.scope === 'SELECTED_FILES' && !shareGrant.fileIds.includes(file.id)) {
        return this.deny('SHARE_SCOPE_MISMATCH', organizationId, projectId, file.id, shareGrant.id, 'Acceso denegado: Archivo fuera del alcance concedido.');
      }

      // Check Confidentiality Ceiling
      const confidentialityRank: Record<string, number> = {
        PUBLIC: 0,
        INTERNAL: 1,
        CONFIDENTIAL: 2,
        HIGHLY_CONFIDENTIAL: 3
      };

      const fileRank = confidentialityRank[file.confidentiality] ?? 1;
      const ceilingRank = confidentialityRank[shareGrant.confidentialityCeiling] ?? 1;

      if (fileRank > ceilingRank) {
        return this.deny('SHARE_CONFIDENTIALITY_EXCEEDED', organizationId, projectId, file.id, shareGrant.id, 'Acceso denegado: Nivel de confidencialidad excede el límite concedido.');
      }
    }

    // 10. Direct Confidentiality Permission Check
    if (file.confidentiality === 'CONFIDENTIAL') {
      if (!context.effectivePermissions.includes('data_room.read_confidential') && !context.effectivePermissions.includes('data_room.read_highly_confidential')) {
        return this.deny('CONFIDENTIALITY_PERMISSION_MISSING', organizationId, projectId, file.id, shareGrant?.id, 'Acceso denegado: Requiere permiso data_room.read_confidential.', 'data_room.read_confidential');
      }
    } else if (file.confidentiality === 'HIGHLY_CONFIDENTIAL') {
      if (!context.effectivePermissions.includes('data_room.read_highly_confidential')) {
        return this.deny('CONFIDENTIALITY_PERMISSION_MISSING', organizationId, projectId, file.id, shareGrant?.id, 'Acceso denegado: Requiere permiso data_room.read_highly_confidential.', 'data_room.read_highly_confidential');
      }
    } else {
      if (!context.effectivePermissions.includes('data_room.read')) {
        return this.deny('PERMISSION_MISSING', organizationId, projectId, file.id, shareGrant?.id, 'Acceso denegado: Requiere permiso data_room.read.', 'data_room.read');
      }
    }

    return this.allow(organizationId, projectId, file.id, shareGrant?.id);
  }

  private allow(organizationId: string, projectId: string, fileId?: string, shareGrantId?: string): StorageAuthorizationDecision {
    return {
      allowed: true,
      reasonCode: 'ALLOW',
      organizationId,
      projectId,
      fileId,
      shareGrantId,
      policyVersion: StorageAuthorizationService.POLICY_VERSION
    };
  }

  private deny(
    reasonCode: StorageAuthorizationReasonCode,
    organizationId: string,
    projectId: string,
    fileId?: string,
    shareGrantId?: string,
    message?: string,
    requiredPermission?: Permission
  ): StorageAuthorizationDecision {
    return {
      allowed: false,
      reasonCode,
      requiredPermission,
      organizationId,
      projectId,
      fileId,
      shareGrantId,
      policyVersion: StorageAuthorizationService.POLICY_VERSION,
      message
    };
  }
}
