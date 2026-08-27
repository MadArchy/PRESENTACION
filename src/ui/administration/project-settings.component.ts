import { ProjectSettings } from '../../modules/administration/domain/administration.types';

export function renderProjectSettingsComponent(settings: ProjectSettings): string {
  return `
    <div class="admin-card" id="project-settings-card">
      <div class="admin-card-header">
        <h3>Configuración del Proyecto</h3>
        <span class="badge badge-info">ID: ${settings.projectId}</span>
      </div>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Nombre Mostrado</label>
          <input type="text" id="project-display-name-input" class="form-control" value="${settings.displayName}" />
        </div>
        <div class="form-group">
          <label>Idioma Predeterminado</label>
          <select id="project-default-lang-select" class="form-control">
            <option value="es" ${settings.defaultLanguage === 'es' ? 'selected' : ''}>Español (es)</option>
            <option value="en" ${settings.defaultLanguage === 'en' ? 'selected' : ''}>English (en)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Audiencia Narrativa por Defecto</label>
          <select id="project-default-audience-select" class="form-control">
            <option value="INVESTOR" ${settings.defaultNarrativeAudience === 'INVESTOR' ? 'selected' : ''}>INVESTOR</option>
            <option value="EXECUTIVE" ${settings.defaultNarrativeAudience === 'EXECUTIVE' ? 'selected' : ''}>EXECUTIVE</option>
            <option value="TECHNICAL" ${settings.defaultNarrativeAudience === 'TECHNICAL' ? 'selected' : ''}>TECHNICAL</option>
          </select>
        </div>
        <div class="form-group">
          <label>Duración Narrativa por Defecto</label>
          <select id="project-default-duration-select" class="form-control">
            <option value="THREE_MINUTES" ${settings.defaultNarrativeDuration === 'THREE_MINUTES' ? 'selected' : ''}>3 Minutos</option>
            <option value="FIVE_MINUTES" ${settings.defaultNarrativeDuration === 'FIVE_MINUTES' ? 'selected' : ''}>5 Minutos</option>
            <option value="TEN_MINUTES" ${settings.defaultNarrativeDuration === 'TEN_MINUTES' ? 'selected' : ''}>10 Minutos</option>
          </select>
        </div>
      </div>

      <div class="module-toggles-section">
        <h4>Módulos Habilitados</h4>
        <div class="toggle-group">
          <label class="toggle-switch">
            <input type="checkbox" id="toggle-data-room" ${settings.dataRoomEnabled ? 'checked' : ''} />
            <span>Due Diligence Data Room</span>
          </label>
          <label class="toggle-switch">
            <input type="checkbox" id="toggle-copilot" ${settings.copilotEnabled ? 'checked' : ''} />
            <span>AI Copilot Sandbox</span>
          </label>
          <label class="toggle-switch">
            <input type="checkbox" id="toggle-presenter" ${settings.presenterEnabled ? 'checked' : ''} />
            <span>Executive Presenter Cockpit</span>
          </label>
        </div>
      </div>

      <div class="admin-card-footer">
        <button id="btn-save-project-settings" class="btn btn-primary">Guardar Configuración del Proyecto</button>
      </div>
    </div>
  `;
}
