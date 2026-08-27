import {
  SecurityContext,
  OrganizationMembership,
  ProjectAccessAssignment,
  AuditEvent,
  OrganizationRole,
  ProjectRole
} from '../../modules/security/domain/security.types';
import { RolePermissionPolicy } from '../../modules/security/domain/policies/role-permission.policy';
import { renderLoginComponent } from './components/login.component';

export interface SecurityDashboardProps {
  context: SecurityContext | null;
  activeTab: 'MEMBERS' | 'PROJECT_ACCESS' | 'PERMISSION_INSPECTOR' | 'AUDIT_LOG' | 'STATUS';
  members: OrganizationMembership[];
  projectAccess: ProjectAccessAssignment[];
  auditEvents: AuditEvent[];
  selectedRoleForInspector?: OrganizationRole | ProjectRole;
  errorMessage?: string;
  successMessage?: string;
}

export function renderSecurityDashboardPage(props: SecurityDashboardProps): string {
  const { context, activeTab, members, projectAccess, auditEvents, errorMessage, successMessage } = props;

  if (!context) {
    return `
      <div class="workspace-page" style="padding: 24px; max-width: 1200px; margin: 0 auto; color: #ffffff; font-family: var(--font-sans, system-ui);">
        ${renderLoginComponent(null, errorMessage)}
      </div>
    `;
  }

  return `
    <div id="securityDashboardRoot" class="workspace-page" style="padding: 24px; max-width: 1280px; margin: 0 auto; color: #ffffff; font-family: var(--font-sans, system-ui);">
      
      <!-- Top Navigation & Profile Bar -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: #4ade80; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono);">
              CONTROL PLANE ACTIVE
            </span>
            <span style="font-size: 0.72rem; color: #94a3b8; font-family: var(--font-mono);">
              POLICY v${RolePermissionPolicy.SECURITY_POLICY_VERSION} · RBAC CATALOG v${RolePermissionPolicy.PERMISSION_CATALOG_VERSION}
            </span>
          </div>
          <h1 style="font-size: 1.6rem; font-weight: 800; margin: 0 0 4px 0; background: linear-gradient(135deg, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Security, Authentication & RBAC Control Plane
          </h1>
          <div style="font-size: 0.85rem; color: #94a3b8;">
            Organización Activa: <strong style="color: #ffffff;">${context.organization?.name || 'Arcana Trust Network Org'}</strong> (${context.organization?.id || 'org-arcana'})
          </div>
        </div>

        <div style="display: flex; gap: 12px; align-items: center;">
          <div style="text-align: right;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #ffffff;">
              ${context.identity.displayName || context.identity.email}
            </div>
            <div style="font-size: 0.72rem; color: #cbd5e1; font-family: var(--font-mono);">
              Rol Org: <span style="color: var(--gold); font-weight: 700;">${context.membership?.role || 'ORG_OWNER'}</span>
            </div>
          </div>
          <button onclick="window.VentureHubBridge.securitySignOut()" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
            Salir
          </button>
        </div>
      </div>

      <!-- Informational Notices -->
      ${errorMessage ? `
        <div style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #f87171; border-radius: 6px; padding: 12px 16px; font-size: 0.8rem; margin-bottom: 20px;">
          ⚠️ ${errorMessage}
        </div>
      ` : ''}

      ${successMessage ? `
        <div style="background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: #4ade80; border-radius: 6px; padding: 12px 16px; font-size: 0.8rem; margin-bottom: 20px;">
          ✓ ${successMessage}
        </div>
      ` : ''}

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; overflow-x: auto; padding-bottom: 4px;">
        <button onclick="window.VentureHubBridge.setSecurityTab('MEMBERS')" style="background: ${activeTab === 'MEMBERS' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'MEMBERS' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'MEMBERS' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          👥 Miembros (${members.length})
        </button>
        <button onclick="window.VentureHubBridge.setSecurityTab('PROJECT_ACCESS')" style="background: ${activeTab === 'PROJECT_ACCESS' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'PROJECT_ACCESS' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'PROJECT_ACCESS' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          📁 Acceso a Proyectos (${projectAccess.length})
        </button>
        <button onclick="window.VentureHubBridge.setSecurityTab('PERMISSION_INSPECTOR')" style="background: ${activeTab === 'PERMISSION_INSPECTOR' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'PERMISSION_INSPECTOR' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'PERMISSION_INSPECTOR' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          🔍 Inspector de Permisos
        </button>
        <button onclick="window.VentureHubBridge.setSecurityTab('AUDIT_LOG')" style="background: ${activeTab === 'AUDIT_LOG' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'AUDIT_LOG' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'AUDIT_LOG' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          📜 Registro de Auditoría (${auditEvents.length})
        </button>
        <button onclick="window.VentureHubBridge.setSecurityTab('STATUS')" style="background: ${activeTab === 'STATUS' ? 'rgba(255,255,255,0.1)' : 'transparent'}; border: none; border-bottom: 2px solid ${activeTab === 'STATUS' ? 'var(--gold)' : 'transparent'}; color: ${activeTab === 'STATUS' ? '#ffffff' : '#94a3b8'}; padding: 8px 16px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
          🛡️ Estado de Seguridad
        </button>
      </div>

      <!-- Tab Contents -->
      ${renderTabContent(props)}

    </div>
  `;
}

function renderTabContent(props: SecurityDashboardProps): string {
  switch (props.activeTab) {
    case 'MEMBERS':
      return renderMembersTab(props.members);
    case 'PROJECT_ACCESS':
      return renderProjectAccessTab(props.projectAccess);
    case 'PERMISSION_INSPECTOR':
      return renderPermissionInspectorTab();
    case 'AUDIT_LOG':
      return renderAuditLogTab(props.auditEvents);
    case 'STATUS':
    default:
      return renderStatusTab();
  }
}

function renderMembersTab(members: OrganizationMembership[]): string {
  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0;">Membresías de la Organización</h3>
        <button onclick="const email = prompt('Email del nuevo miembro:'); if(email) window.VentureHubBridge.addOrganizationMember(email, 'ORG_MEMBER');" style="background: var(--gold); border: none; color: #000; font-weight: 700; font-size: 0.78rem; padding: 6px 12px; border-radius: 6px; cursor: pointer;">
          + Agregar Miembro
        </button>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8;">
              <th style="padding: 10px;">ID Usuario</th>
              <th style="padding: 10px;">Rol de Organización</th>
              <th style="padding: 10px;">Estado</th>
              <th style="padding: 10px;">Fecha Asignación</th>
              <th style="padding: 10px; text-align: right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${members.map(m => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 12px 10px; font-weight: 600; font-family: var(--font-mono);">${m.userId}</td>
                <td style="padding: 12px 10px;">
                  <span style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3); color: #38bdf8; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.72rem; font-family: var(--font-mono);">
                    ${m.role}
                  </span>
                </td>
                <td style="padding: 12px 10px;">
                  <span style="color: ${m.status === 'ACTIVE' ? '#4ade80' : '#f87171'}; font-weight: 600;">
                    ● ${m.status}
                  </span>
                </td>
                <td style="padding: 12px 10px; color: #94a3b8; font-family: var(--font-mono); font-size: 0.75rem;">${m.createdAt.slice(0, 10)}</td>
                <td style="padding: 12px 10px; text-align: right;">
                  ${m.role !== 'ORG_OWNER' ? `
                    <button onclick="window.VentureHubBridge.changeMemberRole('${m.userId}', '${m.role === 'ORG_ADMIN' ? 'ORG_MEMBER' : 'ORG_ADMIN'}')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; margin-right: 6px;">
                      Cambiar Rol
                    </button>
                    <button onclick="window.VentureHubBridge.suspendMember('${m.userId}')" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer;">
                      Suspender
                    </button>
                  ` : `<span style="color: #64748b; font-size: 0.72rem;">Propietario Principal</span>`}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderProjectAccessTab(accessList: ProjectAccessAssignment[]): string {
  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0;">Asignaciones de Acceso a Proyectos</h3>
        <button onclick="const uid = prompt('ID de Usuario:'); if(uid) window.VentureHubBridge.grantProjectAccess('arcana', uid, 'PROJECT_EDITOR');" style="background: var(--gold); border: none; color: #000; font-weight: 700; font-size: 0.78rem; padding: 6px 12px; border-radius: 6px; cursor: pointer;">
          + Conceder Acceso
        </button>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8;">
              <th style="padding: 10px;">Proyecto</th>
              <th style="padding: 10px;">ID Usuario</th>
              <th style="padding: 10px;">Rol de Proyecto</th>
              <th style="padding: 10px;">Estado</th>
              <th style="padding: 10px; text-align: right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${accessList.map(a => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 12px 10px; font-weight: 700; color: #ffffff;">${a.projectId}</td>
                <td style="padding: 12px 10px; font-family: var(--font-mono);">${a.userId}</td>
                <td style="padding: 12px 10px;">
                  <span style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3); color: #c084fc; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.72rem; font-family: var(--font-mono);">
                    ${a.role}
                  </span>
                </td>
                <td style="padding: 12px 10px;">
                  <span style="color: ${a.status === 'ACTIVE' ? '#4ade80' : '#f87171'}; font-weight: 600;">
                    ● ${a.status}
                  </span>
                </td>
                <td style="padding: 12px 10px; text-align: right;">
                  <button onclick="window.VentureHubBridge.changeProjectRole('${a.projectId}', '${a.userId}', '${a.role === 'PROJECT_EDITOR' ? 'PROJECT_ADMIN' : 'PROJECT_EDITOR'}')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; margin-right: 6px;">
                    Cambiar Rol
                  </button>
                  <button onclick="window.VentureHubBridge.revokeProjectAccess('${a.projectId}', '${a.userId}')" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 4px 8px; border-radius: 4px; font-size: 0.72rem; cursor: pointer;">
                    Revocar
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderPermissionInspectorTab(): string {
  const roles: ProjectRole[] = [
    'PROJECT_ADMIN',
    'PROJECT_EDITOR',
    'PROJECT_ANALYST',
    'PROJECT_REVIEWER',
    'PROJECT_PRESENTER',
    'PROJECT_VIEWER',
    'EXTERNAL_REVIEWER'
  ];

  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
      <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0 0 16px 0;">Matriz de Permisos por Rol de Proyecto (Catálogo v1.0)</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        ${roles.map(role => {
          const perms = RolePermissionPolicy.getPermissionsForProjectRole(role);
          return `
            <div style="background: #030712; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 14px;">
              <div style="font-weight: 700; font-size: 0.85rem; color: var(--gold); margin-bottom: 8px; font-family: var(--font-mono);">
                ${role} (${perms.length} permisos)
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.75rem; color: #94a3b8; font-family: var(--font-mono); line-height: 1.6;">
                ${perms.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderAuditLogTab(events: AuditEvent[]): string {
  return `
    <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0 0 2px 0;">Registro de Auditoría de Seguridad (Append-Only)</h3>
          <div style="font-size: 0.72rem; color: #94a3b8;">Eventos autoritativos inmutables generados por TRUSTED_FUNCTION</div>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.78rem; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8;">
              <th style="padding: 10px;">Fecha / Hora</th>
              <th style="padding: 10px;">Actor</th>
              <th style="padding: 10px;">Tipo de Evento</th>
              <th style="padding: 10px;">Objetivo</th>
              <th style="padding: 10px;">Fuente</th>
            </tr>
          </thead>
          <tbody>
            ${events.length === 0 ? `
              <tr><td colspan="5" style="padding: 16px; text-align: center; color: #64748b;">No hay eventos de auditoría registrados en este período.</td></tr>
            ` : events.map(e => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 10px; color: #94a3b8; font-family: var(--font-mono);">${e.occurredAt.slice(0, 19).replace('T', ' ')}</td>
                <td style="padding: 10px; font-weight: 600; font-family: var(--font-mono);">${e.actorUserId}</td>
                <td style="padding: 10px;">
                  <span style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); color: #4ade80; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.7rem; font-family: var(--font-mono);">
                    ${e.type}
                  </span>
                </td>
                <td style="padding: 10px; color: #cbd5e1; font-family: var(--font-mono);">${e.targetType} ${e.targetId ? `(${e.targetId})` : ''}</td>
                <td style="padding: 10px; color: #64748b; font-family: var(--font-mono); font-size: 0.7rem;">${e.source}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderStatusTab(): string {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
      <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
        <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--gold); margin: 0 0 12px 0;">
          🛡️ Control Plane Status
        </h3>
        <div style="font-size: 0.8rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px;">
          <div><strong>Firebase Auth:</strong> <span style="color: #4ade80;">Active (Email/Password)</span></div>
          <div><strong>Firestore Control Plane:</strong> <span style="color: #4ade80;">Active (Security Rules v2)</span></div>
          <div><strong>Trusted Functions:</strong> <span style="color: #4ade80;">Active (Server Authorization)</span></div>
          <div><strong>Audit Storage:</strong> <span style="color: #4ade80;">Append-Only Verified</span></div>
          <div><strong>Email Verification Policy:</strong> <span style="color: #38bdf8;">Enforced</span></div>
        </div>
      </div>

      <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px;">
        <h3 style="font-size: 0.95rem; font-weight: 700; color: #38bdf8; margin: 0 0 12px 0;">
          📦 Static Asset Security Gate
        </h3>
        <div style="font-size: 0.8rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px;">
          <div><strong>PUBLIC Binaries:</strong> <span style="color: #4ade80;">Allowed</span></div>
          <div><strong>INTERNAL Exposed:</strong> <span style="color: #4ade80;">0</span></div>
          <div><strong>CONFIDENTIAL Exposed:</strong> <span style="color: #4ade80;">0</span></div>
          <div><strong>HIGHLY_CONFIDENTIAL Exposed:</strong> <span style="color: #4ade80;">0</span></div>
          <div><strong>Pending Non-Public Delivery:</strong> <span style="color: #f59e0b;">SECURE_STORAGE_PENDING (Phase 009)</span></div>
        </div>
      </div>
    </div>
  `;
}
