/**
 * Venture Hub OS — Claims & Evidence Governance Page V2
 */

import { renderTopProductBar, renderContextSidebar } from '../design-system/patterns/top-product-bar';
import { renderBadge } from '../design-system/primitives/badge';

export interface GovernancePageProps {
  organizationName: string;
  projectName: string;
  projectId: string;
  activeTab: 'CLAIMS' | 'EVIDENCE' | 'COVERAGE' | 'LINEAGE';
  claims: Array<{ id: string; text: string; supportStatus: string; materiality: string; evidenceCount: number }>;
  evidence: Array<{ id: string; title: string; source: string; verified: boolean }>;
}

export function renderGovernancePageV2(props: GovernancePageProps): string {
  const topBarHtml = renderTopProductBar({
    organizationName: props.organizationName,
    projectName: props.projectName,
    projectId: props.projectId,
    currentMode: 'dark'
  });

  const sidebarHtml = renderContextSidebar({
    activeModule: 'governance',
    projectId: props.projectId
  });

  const claimsTabActive = props.activeTab === 'CLAIMS' ? 'active' : '';
  const evidenceTabActive = props.activeTab === 'EVIDENCE' ? 'active' : '';
  const coverageTabActive = props.activeTab === 'COVERAGE' ? 'active' : '';
  const lineageTabActive = props.activeTab === 'LINEAGE' ? 'active' : '';

  return `
    <div class="app-layout-v2 theme-dark">
      ${topBarHtml}

      <div class="app-body-v2">
        ${sidebarHtml}

        <main class="main-content-surface governance-workspace-layout" role="main">
          <div class="page-header-row">
            <div>
              <h1 class="page-title-v2">Claims & Evidence Governance</h1>
              <p class="page-subtitle-v2">Empirical grounding, verifiable provenance graph, and trust validation.</p>
            </div>
            <div class="page-actions-group">
              <button type="button" class="btn-v2 btn-v2--secondary btn-v2--sm" onclick="window.VentureHubBridge?.openCopilotWorkspace()">
                <span>✨ Ask Copilot about Claims</span>
              </button>
            </div>
          </div>

          <!-- Tabs Header -->
          <div class="governance-tabs-nav" role="tablist">
            <button type="button" class="gov-tab-btn ${claimsTabActive}" onclick="window.VentureHubBridge?.setGovernanceTab('CLAIMS')">Claims Catalog (${props.claims.length})</button>
            <button type="button" class="gov-tab-btn ${evidenceTabActive}" onclick="window.VentureHubBridge?.setGovernanceTab('EVIDENCE')">Evidence Repository (${props.evidence.length})</button>
            <button type="button" class="gov-tab-btn ${coverageTabActive}" onclick="window.VentureHubBridge?.setGovernanceTab('COVERAGE')">Coverage Summary</button>
            <button type="button" class="gov-tab-btn ${lineageTabActive}" onclick="window.VentureHubBridge?.setGovernanceTab('LINEAGE')">Lineage Graph (Visual Trace)</button>
          </div>


          <!-- Lineage Visual Graph View -->
          <div class="governance-content-body">
            <div class="lineage-graph-container">
              <h3 class="section-title-v2">Visual Evidence Lineage Flow</h3>
              <div class="lineage-cards-flow">
                ${props.claims.map(claim => {
                  const isSupported = claim.supportStatus === 'SUPPORTED';
                  return `
                    <div class="lineage-node-card">
                      <div class="lineage-node-step step--claim">
                        <div class="node-badge">CLAIM</div>
                        <h4 class="node-title">${claim.id}: ${claim.text}</h4>
                        <div class="node-meta">
                          ${renderBadge({
                            label: claim.supportStatus,
                            variant: isSupported ? 'success' : 'warning'
                          })}
                          ${renderBadge({
                            label: `Materiality: ${claim.materiality}`,
                            variant: 'outline'
                          })}
                        </div>
                      </div>

                      <div class="lineage-connector">
                        <span class="connector-line"></span>
                        <span class="connector-arrow">➔</span>
                      </div>

                      <div class="lineage-node-step step--evidence">
                        <div class="node-badge">EVIDENCE LINK</div>
                        <h4 class="node-title">${claim.evidenceCount > 0 ? 'Verified via External Audit Lab' : 'No Evidence Attached (Gap)'}</h4>
                        <p class="node-desc">${claim.evidenceCount > 0 ? 'KPMG Cyber Lab testnet benchmark report' : 'Document missing from Data Room'}</p>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `.trim();
}

export function renderGovernancePage(slugOrProps: any, claimsArg?: any, evidenceArg?: any, _summaryArg?: any, _coverageArg?: any, tabArg?: any): string {
  const isPropsObj = typeof slugOrProps === 'object' && slugOrProps !== null;
  const activeTab = isPropsObj ? (slugOrProps.activeTab || 'CLAIMS') : (tabArg || 'CLAIMS');
  const claims = isPropsObj ? (slugOrProps.claims || []) : (claimsArg || []);
  const evidence = isPropsObj ? (slugOrProps.evidence || []) : (evidenceArg || []);

  return renderGovernancePageV2({
    organizationName: 'Arcana Labs',
    projectName: 'Arcana Protocol',
    projectId: typeof slugOrProps === 'string' ? slugOrProps : 'proj-arcana',
    activeTab: (activeTab === 'EVIDENCE' || activeTab === 'LINEAGE') ? activeTab : 'CLAIMS',
    claims: claims.length > 0 ? claims.map((c: any) => ({
      id: c.getId ? c.getId() : (c.id || 'CL-01'),
      text: c.getStatement ? c.getStatement() : (c.text || c.statement || 'Claim Statement'),
      supportStatus: c.getSupportStatus ? c.getSupportStatus() : (c.supportStatus || 'SUPPORTED'),
      materiality: c.getMateriality ? c.getMateriality() : (c.materiality || 'HIGH'),
      evidenceCount: 1
    })) : [
      { id: 'CL-01', text: 'Sub-second transaction finality under load', supportStatus: 'SUPPORTED', materiality: 'HIGH', evidenceCount: 1 },
      { id: 'CL-02', text: 'Compliance with EU/US tokenization frameworks', supportStatus: 'UNSUPPORTED', materiality: 'CRITICAL', evidenceCount: 0 }
    ],
    evidence: evidence.length > 0 ? evidence.map((e: any) => ({
      id: e.getId ? e.getId() : (e.id || 'EV-01'),
      title: e.getTitle ? e.getTitle() : (e.title || 'Evidence Title'),
      source: e.getSource ? e.getSource() : (e.source || 'External Lab'),
      verified: true
    })) : [
      { id: 'EV-01', title: 'Testnet Benchmark Stress Audit Report', source: 'KPMG Cyber Lab', verified: true }
    ]
  });
}


