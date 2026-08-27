import { AuthenticatedIdentity, PlatformRole } from '../security.types';
import { SecurityDomainError } from '../errors/security-domain.error';

export class AuthenticatedIdentityEntity {
  private readonly userId: string;
  private readonly email?: string;
  private readonly displayName?: string;
  private readonly emailVerified: boolean;
  private readonly authProviderIds: string[];
  private readonly platformRole?: PlatformRole;

  constructor(data: AuthenticatedIdentity) {
    if (!data.userId || data.userId.trim().length === 0) {
      throw new SecurityDomainError('userId cannot be empty in AuthenticatedIdentity');
    }
    this.userId = data.userId.trim();
    this.email = data.email ? data.email.trim().toLowerCase() : undefined;
    this.displayName = data.displayName?.trim();
    this.emailVerified = !!data.emailVerified;
    this.authProviderIds = [...(data.authProviderIds || [])];
    this.platformRole = data.platformRole;
  }

  getUserId(): string { return this.userId; }
  getEmail(): string | undefined { return this.email; }
  getDisplayName(): string | undefined { return this.displayName; }
  isEmailVerified(): boolean { return this.emailVerified; }
  getAuthProviderIds(): string[] { return [...this.authProviderIds]; }
  getPlatformRole(): PlatformRole | undefined { return this.platformRole; }
  isPlatformAdmin(): boolean { return this.platformRole === 'PLATFORM_ADMIN'; }

  toJSON(): AuthenticatedIdentity {
    return {
      userId: this.userId,
      email: this.email,
      displayName: this.displayName,
      emailVerified: this.emailVerified,
      authProviderIds: this.getAuthProviderIds(),
      platformRole: this.platformRole
    };
  }
}
