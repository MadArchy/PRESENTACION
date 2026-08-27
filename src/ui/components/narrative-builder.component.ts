import { NarrativeRequest } from '../../modules/narrative/domain/narrative.types';

export function renderNarrativeBuilder(projectId: string, currentReq?: Partial<NarrativeRequest>): string {
  const audience = currentReq?.audience || 'INVESTOR';
  const objective = currentReq?.objective || 'RAISE_CAPITAL';
  const duration = currentReq?.duration || 'TEN_MINUTES';
  const language = currentReq?.language || 'EN';
  const depth = currentReq?.depth || 'STANDARD';

  return `
    <div class="narrative-builder-card" style="background: rgba(13, 22, 42, 0.9); border: 1px solid rgba(201, 164, 106, 0.3); border-radius: 12px; padding: 22px; margin-bottom: 24px;">
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">
        ADAPTIVE NARRATIVE ENGINE · SPEC-002
      </div>
      <h2 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin: 0 0 16px 0;">
        Generador Contextual de Narrativa
      </h2>

      <form id="narrativeConfigForm" onsubmit="window.VentureHubBridge && window.VentureHubBridge.handleNarrativeSubmit(event, '${projectId}'); return false;" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
        <div class="form-group">
          <label style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 6px;">AUDIENCIA</label>
          <select name="audience" class="vhos-select" style="width: 100%; background: #030712; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <option value="INVESTOR" ${audience === 'INVESTOR' ? 'selected' : ''}>INVESTOR (Inversionista)</option>
            <option value="EXECUTIVE" ${audience === 'EXECUTIVE' ? 'selected' : ''}>EXECUTIVE (Comité Ejecutivo)</option>
            <option value="TECHNICAL" ${audience === 'TECHNICAL' ? 'selected' : ''}>TECHNICAL (Revisión Técnica)</option>
            <option value="BOARD" ${audience === 'BOARD' ? 'selected' : ''}>BOARD (Junta Directiva)</option>
            <option value="COMMERCIAL" ${audience === 'COMMERCIAL' ? 'selected' : ''}>COMMERCIAL (Cliente B2B)</option>
            <option value="DEMO_DAY" ${audience === 'DEMO_DAY' ? 'selected' : ''}>DEMO_DAY (Pitch Concurso)</option>
          </select>
        </div>

        <div class="form-group">
          <label style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 6px;">OBJETIVO</label>
          <select name="objective" class="vhos-select" style="width: 100%; background: #030712; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <option value="RAISE_CAPITAL" ${objective === 'RAISE_CAPITAL' ? 'selected' : ''}>RAISE_CAPITAL (Levantamiento)</option>
            <option value="DECISION_SUPPORT" ${objective === 'DECISION_SUPPORT' ? 'selected' : ''}>DECISION_SUPPORT (Decisión)</option>
            <option value="ARCHITECTURE_REVIEW" ${objective === 'ARCHITECTURE_REVIEW' ? 'selected' : ''}>ARCHITECTURE_REVIEW (Arquitectura)</option>
            <option value="INFORM" ${objective === 'INFORM' ? 'selected' : ''}>INFORM (Informativo)</option>
            <option value="SELL" ${objective === 'SELL' ? 'selected' : ''}>SELL (Venta Comercial)</option>
            <option value="ALIGN" ${objective === 'ALIGN' ? 'selected' : ''}>ALIGN (Alineación Interna)</option>
          </select>
        </div>

        <div class="form-group">
          <label style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 6px;">DURACIÓN</label>
          <select name="duration" class="vhos-select" style="width: 100%; background: #030712; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <option value="THREE_MINUTES" ${duration === 'THREE_MINUTES' ? 'selected' : ''}>3 Minutos (Lightning)</option>
            <option value="FIVE_MINUTES" ${duration === 'FIVE_MINUTES' ? 'selected' : ''}>5 Minutos (Executive)</option>
            <option value="TEN_MINUTES" ${duration === 'TEN_MINUTES' ? 'selected' : ''}>10 Minutos (Standard Pitch)</option>
            <option value="TWENTY_MINUTES" ${duration === 'TWENTY_MINUTES' ? 'selected' : ''}>20 Minutos (Deep Dive)</option>
          </select>
        </div>

        <div class="form-group">
          <label style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 6px;">PROFUNDIDAD</label>
          <select name="depth" class="vhos-select" style="width: 100%; background: #030712; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <option value="BRIEF" ${depth === 'BRIEF' ? 'selected' : ''}>BRIEF (Ejecutiva / Resumida)</option>
            <option value="STANDARD" ${depth === 'STANDARD' ? 'selected' : ''}>STANDARD (Equilibrada)</option>
            <option value="DEEP" ${depth === 'DEEP' ? 'selected' : ''}>DEEP (Detallada y Técnica)</option>
          </select>
        </div>

        <div class="form-group">
          <label style="display: block; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 6px;">IDIOMA</label>
          <select name="language" class="vhos-select" style="width: 100%; background: #030712; border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
            <option value="EN" ${language === 'EN' ? 'selected' : ''}>English (EN)</option>
            <option value="ES" ${language === 'ES' ? 'selected' : ''}>Español (ES)</option>
          </select>
        </div>

        <div class="form-group" style="display: flex; align-items: flex-end;">
          <button type="submit" class="btn-nav btn-nav-primary" style="width: 100%; padding: 9px 16px; cursor: pointer; justify-content: center; font-weight: 600;">
            Compilar Narrativa ⚡
          </button>
        </div>
      </form>
    </div>
  `;
}
