import { DiligenceRequestRepository } from '../../domain/ports/diligence-request-repository.port';
import { DiligenceRequestEntity } from '../../domain/entities/diligence-request.entity';
import { DiligenceRequestData } from '../../domain/data-room.types';

export class JsonDiligenceRequestRepository implements DiligenceRequestRepository {
  private readonly requests = new Map<string, DiligenceRequestEntity>();

  constructor() {
    this.seedArcanaRequests();
  }

  private seedArcanaRequests(): void {
    const rawReqs: DiligenceRequestData[] = [
      {
        id: 'req-arcana-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        category: 'CORPORATE',
        title: 'Documentación Societaria y Estatutos Fundacionales',
        description: 'Certificado de incorporación en Delaware, estatutos y tabla de capitalización actual.',
        priority: 'CRITICAL',
        status: 'SATISFIED',
        requiredDocumentKinds: ['CORPORATE', 'LEGAL'],
        linkedDocumentIds: ['doc-arcana-corp-01'],
        linkedClaimIds: ['claim-arcana-001'],
        linkedEvidenceIds: ['evidence-arcana-001'],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'req-arcana-02',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        category: 'TECHNOLOGY',
        title: 'Arquitectura de Hardware y Auditoría de Seguridad',
        description: 'Especificación de hardware Sentinel ESP32-S3 y reporte de auditoría externa de smart contracts.',
        priority: 'CRITICAL',
        status: 'SATISFIED',
        requiredDocumentKinds: ['TECHNICAL', 'SECURITY'],
        linkedDocumentIds: ['doc-arcana-tech-01', 'doc-arcana-tech-02', 'doc-arcana-sec-01'],
        linkedClaimIds: ['claim-arcana-001'],
        linkedEvidenceIds: ['evidence-arcana-001'],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'req-arcana-03',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        category: 'FINANCIAL',
        title: 'Modelo Financiero Pro-Forma y Unit Economics Auditados',
        description: 'Proyecciones de flujo de caja a 3 años y desglose de CAC/LTV por vertical de cliente.',
        priority: 'HIGH',
        status: 'SATISFIED',
        requiredDocumentKinds: ['FINANCIAL', 'MODEL'],
        linkedDocumentIds: ['doc-arcana-fin-01'],
        linkedClaimIds: ['claim-arcana-004'],
        linkedEvidenceIds: [],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'req-arcana-04',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        category: 'INTELLECTUAL_PROPERTY',
        title: 'Solicitud de Patente y Registro de Propiedad Intelectual',
        description: 'Copia de la solicitud provisional USPTO sobre algoritmos de notarización de telemetría.',
        priority: 'HIGH',
        status: 'SATISFIED',
        requiredDocumentKinds: ['IP', 'LEGAL'],
        linkedDocumentIds: ['doc-arcana-ip-01'],
        linkedClaimIds: ['claim-arcana-001'],
        linkedEvidenceIds: ['evidence-arcana-001'],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      }
    ];

    rawReqs.forEach(r => this.requests.set(r.id, new DiligenceRequestEntity(r)));
  }

  async listByProject(projectId: string, _projectVersion?: string): Promise<DiligenceRequestEntity[]> {
    return Array.from(this.requests.values()).filter(r => r.getProjectId() === projectId);
  }

  async findById(id: string): Promise<DiligenceRequestEntity | null> {
    return this.requests.get(id) || null;
  }
}
