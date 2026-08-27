import { OrganizationSettings } from '../../modules/administration/domain/administration.types';

export function renderOrganizationSettingsComponent(settings: OrganizationSettings): string {
  return `
    <div class="admin-card" id="org-settings-card">
      <div class="admin-card-header">
        <h3>Configuración de Organización</h3>
        <span class="badge badge-info">ID: ${settings.organizationId}</span>
      </div>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Nombre Mostrado</label>
          <input type="text" id="org-display-name-input" class="form-control" value="${settings.displayName}" />
        </div>
        <div class="form-group">
          <label>Idioma Predeterminado</label>
          <select id="org-default-lang-select" class="form-control">
            <option value="es" ${settings.defaultLanguage === 'es' ? 'selected' : ''}>Español (es)</option>
            <option value="en" ${settings.defaultLanguage === 'en' ? 'selected' : ''}>English (en)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Zona Horaria</label>
          <input type="text" id="org-timezone-input" class="form-control" value="${settings.timezone}" />
        </div>
        <div class="form-group">
          <label>Política de Invitación</label>
          <select id="org-invite-policy-select" class="form-control">
            <option value="ADMINS_ONLY" ${settings.invitePolicy === 'ADMINS_ONLY' ? 'selected' : ''}>Solo Administradores</option>
            <option value="OWNERS_ONLY" ${settings.invitePolicy === 'OWNERS_ONLY' ? 'selected' : ''}>Solo Propietarios</option>
          </select>
        </div>
        <div class="form-group">
          <label>Confidencialidad Data Room por Defecto</label>
          <select id="org-data-room-conf-select" class="form-control">
            <option value="PUBLIC" ${settings.dataRoomDefaultConfidentiality === 'PUBLIC' ? 'selected' : ''}>PUBLIC</option>
            <option value="INTERNAL" ${settings.dataRoomDefaultConfidentiality === 'INTERNAL' ? 'selected' : ''}>INTERNAL</option>
            <option value="CONFIDENTIAL" ${settings.dataRoomDefaultConfidentiality === 'CONFIDENTIAL' ? 'selected' : ''}>CONFIDENTIAL</option>
            <option value="HIGHLY_CONFIDENTIAL" ${settings.dataRoomDefaultConfidentiality === 'HIGHLY_CONFIDENTIAL' ? 'selected' : ''}>HIGHLY_CONFIDENTIAL</option>
          </select>
        </div>
      </div>
      <div class="admin-card-footer">
        <button id="btn-save-org-settings" class="btn btn-primary">Guardar Configuración</button>
      </div>
    </div>
  `;
}
