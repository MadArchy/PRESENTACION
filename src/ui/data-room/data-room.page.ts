import { ProjectAggregate } from '../../modules/project/domain/entities/project.aggregate';
import {
  DocumentArtifactEntity
} from '../../modules/data-room/domain/entities/document-artifact.entity';
import {
  DiligenceRequestEntity
} from '../../modules/data-room/domain/entities/diligence-request.entity';
import {
  DiligenceCoverageReport,
  DiligenceReadinessExplanation,
  DiligenceGap
} from '../../modules/data-room/domain/data-room.types';
import { renderDataRoomHeader } from './components/data-room-header.component';
import { renderDataRoomDocuments } from './components/data-room-documents.component';
import { renderDataRoomCoverage } from './components/data-room-coverage.component';
import { renderDataRoomRequests } from './components/data-room-requests.component';
import { renderDataRoomGaps } from './components/data-room-gaps.component';
import { renderDataRoomReadiness } from './components/data-room-readiness.component';

export function renderDataRoomPage(
  project: ProjectAggregate,
  documents: DocumentArtifactEntity[],
  requests: DiligenceRequestEntity[],
  coverage: DiligenceCoverageReport,
  readiness: DiligenceReadinessExplanation,
  gaps: DiligenceGap[],
  activeTab: 'DOCUMENTS' | 'COVERAGE' | 'REQUESTS' | 'GAPS' | 'READINESS' = 'DOCUMENTS'
): string {
  let contentHtml = '';

  if (activeTab === 'DOCUMENTS') {
    contentHtml = renderDataRoomDocuments(documents);
  } else if (activeTab === 'COVERAGE') {
    contentHtml = renderDataRoomCoverage(coverage);
  } else if (activeTab === 'REQUESTS') {
    contentHtml = renderDataRoomRequests(requests);
  } else if (activeTab === 'GAPS') {
    contentHtml = renderDataRoomGaps(gaps);
  } else if (activeTab === 'READINESS') {
    contentHtml = renderDataRoomReadiness(readiness);
  }

  return `
    <div class="dataroom-workspace-container" style="position: fixed; inset: 0; background: #030712; color: #f8fafc; display: flex; flex-direction: column; overflow: hidden; z-index: 10000; font-family: 'Inter', -apple-system, sans-serif;">
      
      ${renderDataRoomHeader(project.getName(), project.getCurrentVersion(), readiness.readiness, activeTab)}

      <main style="flex: 1; padding: 20px 24px; overflow-y: auto;">
        <div style="max-width: 1200px; margin: 0 auto;">
          ${contentHtml}
        </div>
      </main>

    </div>
  `;
}
