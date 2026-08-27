import { AuthenticationPort } from '../../domain/ports/authentication.port';
import { AuthenticatedIdentity } from '../../domain/security.types';

export class GetCurrentIdentityUseCase {
  constructor(private readonly authPort: AuthenticationPort) {}

  async execute(): Promise<AuthenticatedIdentity | null> {
    return this.authPort.getCurrentIdentity();
  }
}

export class SignInUseCase {
  constructor(private readonly authPort: AuthenticationPort) {}

  async execute(email: string, pass: string): Promise<AuthenticatedIdentity> {
    return this.authPort.signInWithEmailPassword(email, pass);
  }
}

export class SignOutUseCase {
  constructor(private readonly authPort: AuthenticationPort) {}

  async execute(): Promise<void> {
    return this.authPort.signOut();
  }
}
