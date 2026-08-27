import { AuthorizationDecision } from '../../../modules/security/domain/security.types';

export function renderAccessDeniedComponent(decision: AuthorizationDecision): string {
  return `
    <div style="background: #0f172a; border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 32px; max-width: 520px; margin: 40px auto; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
      <div style="font-size: 2.5rem; margin-bottom: 12px;">🚫</div>
      <h2 style="font-size: 1.25rem; font-weight: 700; color: #ef4444; margin: 0 0 8px 0;">
        Acceso No Autorizado
      </h2>
      <div style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 20px; line-height: 1.5;">
        ${decision.message || 'La política de seguridad RBAC v1.0 ha denegado la solicitud para este recurso.'}
      </div>

      <div style="background: #030712; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px; text-align: left; font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8; margin-bottom: 24px;">
        <div style="margin-bottom: 4px;"><strong style="color: #cbd5e1;">Código de Razón:</strong> <span style="color: #f87171;">${decision.reasonCode}</span></div>
        <div style="margin-bottom: 4px;"><strong style="color: #cbd5e1;">Permisos Requeridos:</strong> <span style="color: #38bdf8;">${decision.requiredPermissions.join(', ')}</span></div>
        <div><strong style="color: #cbd5e1;">Versión de Política:</strong> ${decision.policyVersion}</div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button onclick="window.VentureHubBridge.openSecurityDashboard()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: #ffffff; padding: 8px 16px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer;">
          Panel de Seguridad
        </button>
        <button onclick="window.VentureHubBridge.openWorkspace('hub')" style="background: var(--gold); border: none; color: #000000; padding: 8px 16px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
          Volver al Inicio
        </button>
      </div>
    </div>
  `;
}
