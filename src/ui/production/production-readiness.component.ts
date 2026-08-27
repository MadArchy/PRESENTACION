/**
 * Venture Hub OS — Production Readiness UI Component
 * SPEC-011: Production Hardening, Observability & Deployment
 */

import { ProductionReadinessSummary } from '../../modules/production/domain/production.types';

export function renderProductionReadiness(summary: ProductionReadinessSummary): string {
  const statusColors: Record<string, string> = {
    READY: '#10B981',
    READY_WITH_WARNINGS: '#F59E0B',
    NOT_READY: '#EF4444',
    UNKNOWN: '#6B7280'
  };

  const badgeColor = statusColors[summary.overallStatus] || '#6B7280';

  const checkRows = summary.checks
    .map(
      c => `
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
      <td style="padding: 12px; font-weight: 500;">
        <span style="font-size: 11px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.08); margin-right: 8px;">${c.category}</span>
        ${c.title}
      </td>
      <td style="padding: 12px;">
        <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; background: ${
          c.status === 'PASS' ? 'rgba(16,185,129,0.15)' : c.status === 'WARN' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)'
        }; color: ${c.status === 'PASS' ? '#10B981' : c.status === 'WARN' ? '#F59E0B' : '#EF4444'};">
          ${c.status}
        </span>
      </td>
      <td style="padding: 12px; font-size: 12px; color: rgba(255,255,255,0.65);">
        ${c.evidence.join(' &bull; ')}
      </td>
    </tr>
  `
    )
    .join('');

  return `
    <div class="production-readiness-panel" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 24px; color: #fff;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 600;">Production Readiness Dashboard</h2>
          <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Environment: <strong>${summary.environment}</strong> &bull; Evaluated: ${new Date(
    summary.evaluatedAt
  ).toLocaleString()}</div>
        </div>
        <div style="padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 13px; background: ${badgeColor}22; color: ${badgeColor}; border: 1px solid ${badgeColor}44;">
          ${summary.overallStatus}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
        <div style="background: rgba(255,255,255,0.04); padding: 14px; border-radius: 6px; text-align: center;">
          <div style="font-size: 22px; font-weight: 700;">${summary.summary.total}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.5);">Total Checks</div>
        </div>
        <div style="background: rgba(16,185,129,0.08); padding: 14px; border-radius: 6px; text-align: center;">
          <div style="font-size: 22px; font-weight: 700; color: #10B981;">${summary.summary.passed}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.5);">Passed</div>
        </div>
        <div style="background: rgba(245,158,11,0.08); padding: 14px; border-radius: 6px; text-align: center;">
          <div style="font-size: 22px; font-weight: 700; color: #F59E0B;">${summary.summary.warnings}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.5);">Warnings</div>
        </div>
        <div style="background: rgba(239,68,68,0.08); padding: 14px; border-radius: 6px; text-align: center;">
          <div style="font-size: 22px; font-weight: 700; color: #EF4444;">${summary.summary.failed}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.5);">Failed</div>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.6);">
              <th style="padding: 10px 12px; font-weight: 600;">CHECK / CATEGORY</th>
              <th style="padding: 10px 12px; font-weight: 600;">STATUS</th>
              <th style="padding: 10px 12px; font-weight: 600;">EVIDENCE</th>
            </tr>
          </thead>
          <tbody>
            ${checkRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
