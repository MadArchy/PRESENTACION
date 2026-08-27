import { AuthenticatedIdentity } from '../security.types';

export interface AuthenticationPort {
  getCurrentIdentity(): Promise<AuthenticatedIdentity | null>;
  signInWithEmailPassword(email: string, password: string): Promise<AuthenticatedIdentity>;
  signOut(): Promise<void>;
  onAuthStateChanged(callback: (identity: AuthenticatedIdentity | null) => void): () => void;
}
