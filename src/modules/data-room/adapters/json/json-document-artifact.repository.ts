import { DocumentArtifactRepository } from '../../domain/ports/document-artifact-repository.port';
import { DocumentArtifactEntity } from '../../domain/entities/document-artifact.entity';
import { DocumentArtifactData, DiligenceCategoryType } from '../../domain/data-room.types';

export class JsonDocumentArtifactRepository implements DocumentArtifactRepository {
  private readonly documents = new Map<string, DocumentArtifactEntity>();

  constructor() {
    this.seedArcanaDocuments();
  }

  private seedArcanaDocuments(): void {
    const rawDocs: DocumentArtifactData[] = [
      {
        id: 'doc-arcana-corp-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'Arcana Trust Network Delaware Certificate of Incorporation',
        description: 'Certificado formal de constitución societaria y estatutos fundacionales.',
        kind: 'CORPORATE',
        category: 'CORPORATE',
        status: 'CURRENT',
        confidentiality: 'CONFIDENTIAL',
        source: { type: 'REPOSITORY_ASSET', reference: 'sources/legal/incorporation.pdf' },
        issuedAt: '2024-01-15T00:00:00Z',
        effectiveAt: '2024-01-15T00:00:00Z',
        projectSectionRefs: ['sec-identity'],
        claimRefs: ['claim-arcana-001'],
        evidenceRefs: ['evidence-arcana-001'],
        requestRefs: ['req-arcana-01'],
        tags: ['corporate', 'incorporation'],
        sourceRefs: [{ type: 'document', reference: 'sources/legal/incorporation.pdf' }],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'doc-arcana-tech-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'Sentinel ESP32-S3 Hardware Architecture & Telemetry Firmware Spec',
        description: 'Especificación técnica de microcontroladores y firmware de captura criptográfica.',
        kind: 'TECHNICAL',
        category: 'TECHNOLOGY',
        status: 'CURRENT',
        confidentiality: 'INTERNAL',
        source: { type: 'PROJECT_SOURCE', reference: 'sources/technical/sentinel_spec.md' },
        issuedAt: '2025-06-01T00:00:00Z',
        effectiveAt: '2025-06-01T00:00:00Z',
        projectSectionRefs: ['sec-technology'],
        claimRefs: ['claim-arcana-001'],
        evidenceRefs: ['evidence-arcana-001'],
        requestRefs: ['req-arcana-02'],
        tags: ['hardware', 'sentinel'],
        sourceRefs: [{ type: 'document', reference: 'sources/technical/sentinel_spec.md' }],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'doc-arcana-tech-02',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'Polygon L2 Merkle Root Batch Notarization Specification',
        description: 'Diseño de protocolo de notarización descentralizada y optimización de gas.',
        kind: 'TECHNICAL',
        category: 'TECHNOLOGY',
        status: 'CURRENT',
        confidentiality: 'INTERNAL',
        source: { type: 'PROJECT_SOURCE', reference: 'sources/technical/l2_notarization.md' },
        issuedAt: '2025-08-10T00:00:00Z',
        effectiveAt: '2025-08-10T00:00:00Z',
        projectSectionRefs: ['sec-technology', 'sec-solution'],
        claimRefs: ['claim-arcana-001'],
        evidenceRefs: ['evidence-arcana-001'],
        requestRefs: ['req-arcana-02'],
        tags: ['blockchain', 'l2'],
        sourceRefs: [{ type: 'document', reference: 'sources/technical/l2_notarization.md' }],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'doc-arcana-fin-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'Arcana 3-Year Pro-Forma Financial Model & Unit Economics',
        description: 'Modelo de ingresos recurrentes SaaS, margen de hardware y proyección de caja.',
        kind: 'FINANCIAL',
        category: 'FINANCIAL',
        status: 'CURRENT',
        confidentiality: 'CONFIDENTIAL',
        source: { type: 'REPOSITORY_ASSET', reference: 'sources/financials/arcana_model_v1.xlsx' },
        issuedAt: '2026-01-10T00:00:00Z',
        effectiveAt: '2026-01-10T00:00:00Z',
        projectSectionRefs: ['sec-financials', 'sec-business-model'],
        claimRefs: ['claim-arcana-004'],
        evidenceRefs: [],
        requestRefs: ['req-arcana-03'],
        tags: ['financial-model', 'unit-economics'],
        sourceRefs: [{ type: 'document', reference: 'sources/financials/arcana_model_v1.xlsx' }],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'doc-arcana-legal-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'Master Enterprise SaaS & Hardware Pilot Standard Contract',
        description: 'Modelo contractual estándar de despliegue en plantas industriales.',
        kind: 'CONTRACT',
        category: 'LEGAL',
        status: 'CURRENT',
        confidentiality: 'CONFIDENTIAL',
        source: { type: 'REPOSITORY_ASSET', reference: 'sources/legal/master_saas_pilot.pdf' },
        issuedAt: '2025-09-01T00:00:00Z',
        effectiveAt: '2025-09-01T00:00:00Z',
        projectSectionRefs: ['sec-business-model'],
        claimRefs: [],
        evidenceRefs: [],
        requestRefs: ['req-arcana-01'],
        tags: ['contract', 'enterprise-agreement'],
        sourceRefs: [{ type: 'document', reference: 'sources/legal/master_saas_pilot.pdf' }],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'doc-arcana-ip-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'USPTO Provisional Patent Application: Cryptographic Physical Sensor Notarization',
        description: 'Solicitud de patente provisional para arquitectura de firmware anti-tamper.',
        kind: 'IP',
        category: 'INTELLECTUAL_PROPERTY',
        status: 'CURRENT',
        confidentiality: 'HIGHLY_CONFIDENTIAL',
        source: { type: 'REPOSITORY_ASSET', reference: 'sources/ip/uspto_provisional_63_arcana.pdf' },
        issuedAt: '2025-03-20T00:00:00Z',
        effectiveAt: '2025-03-20T00:00:00Z',
        projectSectionRefs: ['sec-technology', 'sec-competition'],
        claimRefs: ['claim-arcana-001'],
        evidenceRefs: ['evidence-arcana-001'],
        requestRefs: ['req-arcana-04'],
        tags: ['patent', 'ip'],
        sourceRefs: [{ type: 'document', reference: 'sources/ip/uspto_provisional_63_arcana.pdf' }],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'doc-arcana-sec-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'Smart Contract & Sentinel Hardware Security Audit Report',
        description: 'Reporte independiente de auditoría de seguridad y penetración de hardware.',
        kind: 'SECURITY',
        category: 'SECURITY',
        status: 'CURRENT',
        confidentiality: 'CONFIDENTIAL',
        source: { type: 'REPOSITORY_ASSET', reference: 'sources/security/arcana_sec_audit_2025.pdf' },
        issuedAt: '2025-11-15T00:00:00Z',
        effectiveAt: '2025-11-15T00:00:00Z',
        projectSectionRefs: ['sec-technology', 'sec-risks'],
        claimRefs: ['claim-arcana-001'],
        evidenceRefs: ['evidence-arcana-001'],
        requestRefs: ['req-arcana-02'],
        tags: ['security', 'audit'],
        sourceRefs: [{ type: 'document', reference: 'sources/security/arcana_sec_audit_2025.pdf' }],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      },
      {
        id: 'doc-arcana-reg-01',
        projectId: 'arcana',
        projectVersion: '1.0.0',
        title: 'EU DIN EN 12830 Cold-Chain Compliance Pre-Assessment Roadmap',
        description: 'Estudio preparatorio de certificación regulatoria europea para termógrafos de transporte.',
        kind: 'REGULATORY',
        category: 'REGULATORY',
        status: 'MISSING',
        confidentiality: 'INTERNAL',
        source: { type: 'MANUAL_METADATA', reference: 'sources/regulatory/din_en_12830_pre.pdf' },
        projectSectionRefs: ['sec-roadmap', 'sec-risks'],
        claimRefs: [],
        evidenceRefs: [],
        requestRefs: [],
        tags: ['regulatory', 'compliance'],
        sourceRefs: [],
        createdAt: '2026-08-26T18:00:00Z',
        updatedAt: '2026-08-26T18:00:00Z'
      }
    ];

    rawDocs.forEach(d => this.documents.set(d.id, new DocumentArtifactEntity(d)));
  }

  async listByProject(projectId: string, _projectVersion?: string): Promise<DocumentArtifactEntity[]> {
    return Array.from(this.documents.values()).filter(d => d.getProjectId() === projectId);
  }

  async findById(id: string): Promise<DocumentArtifactEntity | null> {
    return this.documents.get(id) || null;
  }

  async listByCategory(projectId: string, category: DiligenceCategoryType): Promise<DocumentArtifactEntity[]> {
    return Array.from(this.documents.values()).filter(
      d => d.getProjectId() === projectId && d.getCategory() === category
    );
  }
}
