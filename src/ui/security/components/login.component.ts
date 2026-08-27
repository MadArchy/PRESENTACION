import { AuthenticatedIdentity } from '../../../modules/security/domain/security.types';

export function renderLoginComponent(
  identity: AuthenticatedIdentity | null,
  errorMessage?: string
): string {
  if (identity) {
    return `
      <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), #b45309); color: #000; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">
            ${(identity.displayName || identity.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <div style="font-size: 0.9rem; font-weight: 700; color: #ffffff;">
              ${identity.displayName || identity.email}
            </div>
            <div style="font-size: 0.72rem; color: #94a3b8; font-family: var(--font-mono);">
              ${identity.email} ${identity.platformRole === 'PLATFORM_ADMIN' ? '· <span style="color: var(--gold); font-weight:700;">PLATFORM_ADMIN</span>' : ''}
            </div>
          </div>
        </div>

        <button onclick="window.VentureHubBridge.securitySignOut()" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 6px 14px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
          Cerrar Sesión
        </button>
      </div>
    `;
  }

  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 24px; max-width: 420px; margin: 40px auto; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 1.5rem; margin-bottom: 6px;">🔐</div>
        <h2 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin: 0 0 4px 0;">
          Iniciar Sesión en Venture Hub OS
        </h2>
        <div style="font-size: 0.78rem; color: #94a3b8;">
          Control de Acceso Seguro & RBAC (Fase 008)
        </div>
      </div>

      ${errorMessage ? `
        <div style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; border-radius: 6px; padding: 10px 14px; font-size: 0.78rem; margin-bottom: 16px;">
          ⚠️ ${errorMessage}
        </div>
      ` : ''}

      <form onsubmit="event.preventDefault(); const email = document.getElementById('loginEmail').value; const pass = document.getElementById('loginPassword').value; window.VentureHubBridge.securitySignIn(email, pass);" style="display: flex; flex-direction: column; gap: 14px;">
        <div>
          <label style="display: block; font-size: 0.75rem; color: #cbd5e1; font-weight: 600; margin-bottom: 6px;">
            Correo Electrónico
          </label>
          <input id="loginEmail" type="email" placeholder="usuario@arcana.network" required style="width: 100%; background: #030712; border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem; box-sizing: border-box;" />
        </div>

        <div>
          <label style="display: block; font-size: 0.75rem; color: #cbd5e1; font-weight: 600; margin-bottom: 6px;">
            Contraseña
          </label>
          <input id="loginPassword" type="password" placeholder="••••••••" required style="width: 100%; background: #030712; border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem; box-sizing: border-box;" />
        </div>

        <button type="submit" style="background: var(--gold); border: none; color: #000000; font-weight: 700; padding: 10px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; margin-top: 6px;">
          Ingresar al Sistema
        </button>
      </form>
    </div>
  `;
}
