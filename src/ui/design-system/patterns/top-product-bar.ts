/**
 * Venture Hub OS — Design System V2: Top Product Bar & Context Sidebar
 */

export interface TopProductBarProps {
  organizationName: string;
  projectName: string;
  projectId: string;
  currentMode: 'light' | 'dark';
  userEmail?: string;
}

export function renderTopProductBar(props: TopProductBarProps): string {
  return `
    <header class="top-product-bar" role="banner">
      <div class="top-product-bar__left">
        <a href="#hub" class="top-product-bar__logo" onclick="window.VentureHubBridge?.openOrganizationHome()">
          <span class="logo-mark">✦</span>
          <span class="logo-text">Venture Hub OS</span>
        </a>
        <div class="top-product-bar__breadcrumbs" aria-label="Breadcrumb">
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-org">${props.organizationName}</span>
          <span class="breadcrumb-separator">/</span>
          <button type="button" class="breadcrumb-project-btn" onclick="window.VentureHubBridge?.toggleProjectSwitcher()">
            <span class="project-indicator">●</span>
            <span class="project-title">${props.projectName}</span>
            <span class="dropdown-chevron">▾</span>
          </button>
        </div>
      </div>

      <div class="top-product-bar__center">
        <button type="button" class="global-search-trigger" onclick="window.VentureHubBridge?.toggleCommandPalette(true)" aria-label="Search or Ask Copilot (Cmd+K)">
          <span class="search-icon">🔍</span>
          <span class="search-placeholder">Search project, claims, evidence or Ask Copilot...</span>
          <kbd class="shortcut-badge">⌘K</kbd>
        </button>
      </div>

      <div class="top-product-bar__right">
        <button type="button" class="btn-copilot-quick" onclick="window.VentureHubBridge?.openCopilotWorkspace()" aria-label="Open Copilot Workspace">
          <span class="copilot-sparkle">✨</span>
          <span>Ask Copilot</span>
        </button>
        <button type="button" class="theme-toggle-btn" onclick="window.VentureHubBridge?.toggleTheme()" aria-label="Toggle light/dark theme">
          <span class="theme-icon">${props.currentMode === 'dark' ? '☀️' : '🌙'}</span>
        </button>
        <div class="user-avatar-badge" title="${props.userEmail || 'Executive User'}">
          ${(props.userEmail || 'U').charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  `.trim();
}

export interface ContextSidebarProps {
  activeModule: string;
  projectId: string;
}

export function renderContextSidebar(props: ContextSidebarProps): string {
  const items = [
    { id: 'overview', label: 'Overview', icon: '📊', target: 'openExecutiveOverview' },
    { id: 'twin', label: 'Project Twin', icon: '🏛️', target: 'openProjectTwinWorkspace' },
    { id: 'copilot', label: 'Intelligence', icon: '✨', target: 'openCopilotWorkspace' },
    { id: 'governance', label: 'Evidence', icon: '⚖️', target: 'openGovernanceWorkspace' },
    { id: 'presentations', label: 'Presentations', icon: '📽️', target: 'openPresentationWorkspace' },
    { id: 'dataroom', label: 'Data Room', icon: '🗄️', target: 'openDataRoomWorkspace' },
    { id: 'storage', label: 'Secure Files', icon: '🔒', target: 'openSecureStorageWorkspace' },
    { id: 'admin', label: 'Administration', icon: '⚙️', target: 'openAdminWorkspace' }
  ];

  return `
    <nav class="context-sidebar-v2" aria-label="Main Navigation">
      <div class="context-sidebar-v2__nav">
        ${items.map(item => {
          const isActive = props.activeModule === item.id ? 'active' : '';
          return `
            <a href="#${item.id}" class="context-sidebar-v2__item ${isActive}" onclick="window.VentureHubBridge?.${item.target}(); return false;" data-module-id="${item.id}">
              <span class="context-sidebar-v2__icon" aria-hidden="true">${item.icon}</span>
              <span class="context-sidebar-v2__label">${item.label}</span>
            </a>
          `;
        }).join('')}
      </div>

      <div class="context-sidebar-v2__footer">
        <div class="sidebar-v2-system-status">
          <span class="status-dot status-dot--online"></span>
          <span class="status-text">v1.1.0 Evolution</span>
        </div>
      </div>
    </nav>
  `.trim();
}
