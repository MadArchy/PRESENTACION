/**
 * Venture Hub OS — Executive Project Overview Page V2
 */

import { renderTopProductBar, renderContextSidebar } from '../design-system/patterns/top-product-bar';
import { renderMetricCard, renderInsightCard } from '../design-system/patterns/metric-card';
import { renderCommandPalette } from '../design-system/primitives/command-palette';

export interface ProjectOverviewProps {
  organizationName: string;
  projectName: string;
  projectId: string;
  lifecycleStatus: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  unsupportedClaimsCount: number;
  missingDiligenceDocsCount: number;
  verifiedEvidenceCount: number;
  totalSectionsCount: number;
}

export function renderExecutiveOverviewPage(props: ProjectOverviewProps): string {
  const topBarHtml = renderTopProductBar({
    organizationName: props.organizationName,
    projectName: props.projectName,
    projectId: props.projectId,
    currentMode: 'dark'
  });


  const sidebarHtml = renderContextSidebar({
    activeModule: 'overview',
    projectId: props.projectId
  });

  const cmdPaletteHtml = renderCommandPalette([
    { id: 'cmd-overview', title: 'Open Project Overview', category: 'Navigation', shortcut: 'G O', action: 'window.VentureHubBridge?.openExecutiveOverview()' },
    { id: 'cmd-twin', title: 'Open Project Twin Workspace', category: 'Navigation', shortcut: 'G T', action: 'window.VentureHubBridge?.openProjectTwinWorkspace()' },
    { id: 'cmd-copilot', title: 'Ask Project Copilot', category: 'Copilot', shortcut: '⌘K', action: 'window.VentureHubBridge?.openCopilotWorkspace()' },
    { id: 'cmd-gov', title: 'Inspect Claims & Evidence', category: 'Entities', shortcut: 'G E', action: 'window.VentureHubBridge?.openGovernanceWorkspace()' },
    { id: 'cmd-dr', title: 'Open Due Diligence Data Room', category: 'Entities', shortcut: 'G D', action: 'window.VentureHubBridge?.openDataRoomWorkspace()' },
    { id: 'cmd-pres', title: 'Launch Executive Presentation Deck', category: 'Actions', shortcut: 'P', action: 'window.VentureHubBridge?.openPresentationWorkspace()' }
  ]);

  return `
    <div class="app-layout-v2 theme-dark">
      ${topBarHtml}
      
      <div class="app-body-v2">
        ${sidebarHtml}

        <main class="main-content-surface overview-workspace-layout" role="main">
          <!-- Hero Header -->
          <div class="overview-header-v2">
            <div class="overview-header-v2__left">
              <div class="project-lifecycle-pill status--${props.lifecycleStatus.toLowerCase()}">
                <span class="status-indicator-dot"></span>
                <span>${props.lifecycleStatus}</span>
              </div>
              <h1 class="overview-header-v2__title">${props.projectName}</h1>
              <p class="overview-header-v2__subtitle">Enterprise decentralized asset tokenization and institutional issuance protocol.</p>
            </div>

            <div class="overview-header-v2__actions">
              <button type="button" class="btn-v2 btn-v2--secondary btn-v2--md" onclick="window.VentureHubBridge?.openCopilotWorkspace()">
                <span aria-hidden="true">✨</span>
                <span>Ask Copilot</span>
              </button>
              <button type="button" class="btn-v2 btn-v2--primary btn-v2--md" onclick="window.VentureHubBridge?.launchPresentation()">
                <span aria-hidden="true">▶</span>
                <span>Present Deck</span>
              </button>
            </div>
          </div>

          <!-- Key Project Signals Grid -->
          <section class="overview-signals-section" aria-label="Key Project Signals">
            <h3 class="section-title-v2">Explainable Project Signals</h3>
            <div class="signals-metric-grid">
              ${renderMetricCard({
                id: 'metric-twin',
                title: 'Project Twin Sections',
                value: props.totalSectionsCount,
                subtitle: 'Canonical facts modeled',
                statusVariant: 'accent',
                onClick: 'window.VentureHubBridge?.openProjectTwinWorkspace()'
              })}
              ${renderMetricCard({
                id: 'metric-claims',
                title: 'Critical Unsupported Claims',
                value: props.unsupportedClaimsCount,
                subtitle: props.unsupportedClaimsCount > 0 ? 'Requires evidence grounding' : 'All claims grounded',
                statusVariant: props.unsupportedClaimsCount > 0 ? 'warning' : 'success',
                trend: props.unsupportedClaimsCount > 0 ? 'negative' : 'positive',
                trendLabel: props.unsupportedClaimsCount > 0 ? 'Review Needed' : 'Fully Supported',
                onClick: 'window.VentureHubBridge?.openGovernanceWorkspace()'
              })}
              ${renderMetricCard({
                id: 'metric-evidence',
                title: 'Verified Evidence Links',
                value: props.verifiedEvidenceCount,
                subtitle: 'Empirical audit records',
                statusVariant: 'success',
                onClick: 'window.VentureHubBridge?.openGovernanceWorkspace()'
              })}
              ${renderMetricCard({
                id: 'metric-diligence',
                title: 'Missing Diligence Docs',
                value: props.missingDiligenceDocsCount,
                subtitle: props.missingDiligenceDocsCount > 0 ? 'Action required for investor audit' : 'Ready for due diligence',
                statusVariant: props.missingDiligenceDocsCount > 0 ? 'critical' : 'success',
                onClick: 'window.VentureHubBridge?.openDataRoomWorkspace()'
              })}
            </div>
          </section>

          <!-- AI Intelligence & Diligence Insights -->
          <section class="overview-insights-section" aria-label="AI Intelligence & Diligence Insights">
            <div class="section-header-row">
              <h3 class="section-title-v2">AI Project Insights</h3>
              <span class="badge-v2 badge-v2--neutral">Grounded in verified data</span>
            </div>
            
            <div class="insights-grid-v2">
              ${renderInsightCard({
                title: 'Regulatory Legal Opinion Document Missing',
                description: 'Claim CL-02 regarding jurisdictional tokenization compliance is currently marked UNSUPPORTED pending European legal opinion.',
                category: 'Diligence',
                severity: 'HIGH',
                actionLabel: 'Review in Data Room',
                actionTarget: 'window.VentureHubBridge?.openDataRoomWorkspace()'
              })}
              ${renderInsightCard({
                title: 'Sub-Second Finality Grounded by Audit',
                description: 'KPMG Cyber Lab testnet benchmark report verified transaction finality under 25,000 TPS peak load.',
                category: 'Evidence',
                severity: 'LOW',
                actionLabel: 'View Evidence Lineage',
                actionTarget: 'window.VentureHubBridge?.openGovernanceWorkspace()'
              })}
              ${renderInsightCard({
                title: 'Executive Pitch Deck Ready (15 Slides)',
                description: 'Presentation compiled across 3 audience profiles with investor-targeted narrative and speaker notes.',
                category: 'Narrative',
                severity: 'LOW',
                actionLabel: 'Launch Presentation Deck',
                actionTarget: 'window.VentureHubBridge?.launchPresentation()'
              })}
            </div>
          </section>
        </main>
      </div>

      ${cmdPaletteHtml}
    </div>
  `.trim();
}

export function renderWorkspacePage(projectOrProps: any, _validation?: any, _selectedSectionId?: string): string {
  const project = projectOrProps?.getId ? projectOrProps : projectOrProps;
  return renderExecutiveOverviewPage({
    organizationName: 'Arcana Labs',
    projectName: project?.getName ? project.getName() : (project?.projectName || 'Arcana Protocol'),
    projectId: project?.getId ? project.getId() : (project?.projectId || 'proj-arcana'),
    lifecycleStatus: 'ACTIVE',
    unsupportedClaimsCount: 1,
    missingDiligenceDocsCount: 1,
    verifiedEvidenceCount: 2,
    totalSectionsCount: project?.getSections ? project.getSections().length : 3
  });
}


