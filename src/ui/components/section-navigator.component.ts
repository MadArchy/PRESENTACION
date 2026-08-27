import { ProjectSectionEntity } from '../../modules/project/domain/entities/project-section.entity';
import { ProjectSectionStatus } from '../../modules/project/domain/project.types';

export function renderSectionNavigator(sections: ProjectSectionEntity[], activeSectionId?: string): string {
  const statusBadges: Record<ProjectSectionStatus, { label: string; color: string }> = {
    VALIDATED: { label: '● Validated', color: '#10b981' },
    DRAFT: { label: '● Draft', color: '#f59e0b' },
    IN_REVIEW: { label: '● Review', color: '#06b6d4' },
    EMPTY: { label: '○ Empty', color: '#64748b' },
    NOT_APPLICABLE: { label: '– N/A', color: '#475569' }
  };

  const navItems = sections.map((sec, idx) => {
    const isActive = activeSectionId ? sec.getId() === activeSectionId : idx === 0;
    const activeClass = isActive ? 'active-section-nav' : '';
    const badge = statusBadges[sec.getStatus()] || statusBadges.DRAFT;

    return `
      <li class="section-nav-item ${activeClass}" onclick="window.VentureHubBridge && window.VentureHubBridge.selectSection('${sec.getId()}')" style="padding: 10px 16px; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; transition: all 0.2s ease; ${isActive ? 'background: rgba(201, 164, 106, 0.15); border-left: 3px solid var(--gold);' : 'background: transparent;'}">
        <span style="font-size: 0.88rem; font-weight: 500; color: ${isActive ? '#fff' : 'var(--text-secondary)'};">
          ${sec.getTitle().es}
        </span>
        <span style="font-family: var(--font-mono); font-size: 0.68rem; color: ${badge.color};">
          ${badge.label}
        </span>
      </li>
    `;
  }).join('\n');

  return `
    <aside class="workspace-section-nav" style="width: 280px; flex-shrink: 0; background: rgba(6, 11, 24, 0.7); border-right: 1px solid rgba(255,255,255,0.08); padding: 18px 14px;">
      <div style="font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.1em; color: var(--gold); text-transform: uppercase; margin-bottom: 12px; padding-left: 6px;">
        SECCIONES DEL TWIN (${sections.length})
      </div>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${navItems}
      </ul>
    </aside>
  `;
}
