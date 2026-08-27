import { ProjectSectionEntity } from '../../modules/project/domain/entities/project-section.entity';

export function renderSectionContent(section: ProjectSectionEntity): string {
  const content = section.getContent();
  const title = section.getTitle();
  const sourceRefs = section.getSourceRefs();

  let bodyHtml = '';

  if (typeof content === 'object' && content !== null) {
    bodyHtml = Object.entries(content).map(([key, val]) => {
      const fieldTitle = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

      if (typeof val === 'object' && val !== null && ('es' in val || 'en' in val)) {
        // Bilingual text field
        return `
          <div class="twin-field-group" style="margin-bottom: 16px;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold); text-transform: uppercase; margin-bottom: 4px;">${fieldTitle}</div>
            <p style="margin: 0; line-height: 1.6; color: #fff; font-size: 0.95rem;">
              <span class="lang-es">${(val as any).es}</span>
              <span class="lang-en">${(val as any).en || (val as any).es}</span>
            </p>
          </div>
        `;
      } else if (Array.isArray(val)) {
        // List field
        const items = val.map(item => {
          if (typeof item === 'object') {
            return `<li>${JSON.stringify(item)}</li>`;
          }
          return `<li style="margin-bottom: 6px; color: var(--text-secondary);">${item}</li>`;
        }).join('');

        return `
          <div class="twin-field-group" style="margin-bottom: 16px;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold); text-transform: uppercase; margin-bottom: 6px;">${fieldTitle}</div>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">${items}</ul>
          </div>
        `;
      } else {
        // Primitive field
        return `
          <div class="twin-field-group" style="margin-bottom: 16px;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold); text-transform: uppercase; margin-bottom: 4px;">${fieldTitle}</div>
            <div style="color: #fff; font-size: 0.95rem;">${val}</div>
          </div>
        `;
      }
    }).join('');
  } else {
    bodyHtml = `<p style="color: var(--text-muted); font-style: italic;">Sin contenido estructurado.</p>`;
  }

  // Provenance / source trace footer
  const sourcesHtml = sourceRefs.length > 0 ? `
    <div class="twin-sources-footer" style="margin-top: 24px; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.1); font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">
      <span>PROVENANCE:</span> ${sourceRefs.map(s => `[${s.type}: ${s.reference}]`).join(' ')}
    </div>
  ` : '';

  return `
    <section class="section-content-card" style="flex: 1; background: rgba(8, 14, 28, 0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px 28px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin: 0;">
          <span class="lang-es">${title.es}</span>
          <span class="lang-en">${title.en}</span>
        </h2>
        <span class="tech-badge" style="font-size: 0.7rem; font-family: var(--font-mono);">${section.getType()}</span>
      </div>

      <div class="section-fields-body">
        ${bodyHtml}
      </div>

      ${sourcesHtml}
    </section>
  `;
}
