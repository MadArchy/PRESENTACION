/**
 * Venture Hub OS — Organization Home Page V2
 */

import { renderTopProductBar } from '../design-system/patterns/top-product-bar';
import { renderMetricCard, renderInsightCard } from '../design-system/patterns/metric-card';

export interface OrgHomeProjectSummary {
  id: string;
  name: string;
  lifecycleStatus: string;
  unsupportedClaims: number;
  missingDocs: number;
}

export interface OrganizationHomeProps {
  organizationName: string;
  projects: OrgHomeProjectSummary[];
}

export function renderOrganizationHomePage(props: OrganizationHomeProps): string {
  const topBarHtml = renderTopProductBar({
    organizationName: props.organizationName,
    projectName: 'Portfolio Overview',
    projectId: 'all',
    currentMode: 'dark'
  });

  const totalProjects = props.projects.length;
  const activeProjects = props.projects.filter(p => p.lifecycleStatus === 'ACTIVE').length;
  const totalUnsupported = props.projects.reduce((sum, p) => sum + p.unsupportedClaims, 0);
  const totalMissingDocs = props.projects.reduce((sum, p) => sum + p.missingDocs, 0);

  return `
    <div class="app-layout-v2 theme-dark org-home-layout">
      ${topBarHtml}

      <main class="main-content-surface container-narrow" role="main">
        <div class="org-home-hero">
          <h1 class="org-home-hero__greeting">Good evening</h1>
          <p class="org-home-hero__sub">Venture Portfolio Intelligence for <strong>${props.organizationName}</strong></p>
        </div>

        <div class="signals-metric-grid">
          ${renderMetricCard({
            title: 'Active Ventures',
            value: `${activeProjects} / ${totalProjects}`,
            subtitle: 'Portfolio entities',
            statusVariant: 'accent'
          })}
          ${renderMetricCard({
            title: 'Portfolio Unsupported Claims',
            value: totalUnsupported,
            subtitle: 'Across all ventures',
            statusVariant: totalUnsupported > 0 ? 'warning' : 'success'
          })}
          ${renderMetricCard({
            title: 'Diligence Document Gaps',
            value: totalMissingDocs,
            subtitle: 'Missing requirements',
            statusVariant: totalMissingDocs > 0 ? 'critical' : 'success'
          })}
        </div>

        <section class="org-projects-section">
          <div class="section-header-row">
            <h2 class="section-title-v2">Your Ventures</h2>
            <button type="button" class="btn-v2 btn-v2--primary btn-v2--sm" onclick="window.VentureHubBridge?.createNewProject()">+ New Venture</button>
          </div>

          <div class="venture-cards-grid">
            ${props.projects.map(p => `
              <div class="venture-card-v2" onclick="window.VentureHubBridge?.selectProject('${p.id}')">
                <div class="venture-card-v2__top">
                  <span class="venture-icon">✦</span>
                  <span class="status-pill status--${p.lifecycleStatus.toLowerCase()}">${p.lifecycleStatus}</span>
                </div>
                <h3 class="venture-card-v2__name">${p.name}</h3>
                <div class="venture-card-v2__signals">
                  <span>${p.unsupportedClaims} unsupported claims</span>
                  <span>•</span>
                  <span>${p.missingDocs} diligence gaps</span>
                </div>
                <div class="venture-card-v2__footer">
                  <span>Open Executive Overview →</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="org-insights-section">
          <h2 class="section-title-v2">Portfolio AI Insights</h2>
          <div class="insights-grid-v2">
            ${renderInsightCard({
              title: 'Arcana Diligence Gap Requires Attention',
              description: 'Regulatory compliance opinion is pending for Arcana Protocol before investor review.',
              category: 'Diligence',
              severity: 'HIGH',
              actionLabel: 'Open Arcana Overview',
              actionTarget: "window.VentureHubBridge?.selectProject('proj-arcana')"
            })}
          </div>
        </section>
      </main>
    </div>
  `.trim();
}
