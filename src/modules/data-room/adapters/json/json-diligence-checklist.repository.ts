import { DiligenceChecklistRepository } from '../../domain/ports/diligence-checklist-repository.port';
import { DiligenceChecklistEntity } from '../../domain/entities/diligence-checklist.entity';
import { DiligenceChecklistData } from '../../domain/data-room.types';

export class JsonDiligenceChecklistRepository implements DiligenceChecklistRepository {
  private readonly checklists = new Map<string, DiligenceChecklistEntity>();

  constructor() {
    this.seedDefaultChecklist();
  }

  private seedDefaultChecklist(): void {
    const defaultData: DiligenceChecklistData = {
      id: 'STANDARD_VENTURE_DILIGENCE',
      version: '1.0',
      name: 'Standard Venture Due Diligence Checklist',
      projectType: 'DEEPTECH_SAAS',
      items: [
        {
          id: 'chk-corp-01',
          category: 'CORPORATE',
          title: 'Certificado de Constitución y Estatutos',
          description: 'Documentos fundacionales constitutivos válidos y vigentes.',
          priority: 'CRITICAL',
          expectedDocumentKinds: ['CORPORATE', 'LEGAL'],
          evidenceRequired: true
        },
        {
          id: 'chk-tech-01',
          category: 'TECHNOLOGY',
          title: 'Arquitectura Técnica y Diagrama de Sistema',
          description: 'Especificación detallada de arquitectura hardware/software.',
          priority: 'CRITICAL',
          expectedDocumentKinds: ['TECHNICAL'],
          evidenceRequired: true
        },
        {
          id: 'chk-sec-01',
          category: 'SECURITY',
          title: 'Auditoría de Seguridad y Pruebas de Penetración',
          description: 'Reporte de seguridad independiente.',
          priority: 'HIGH',
          expectedDocumentKinds: ['SECURITY', 'REPORT'],
          evidenceRequired: true
        },
        {
          id: 'chk-fin-01',
          category: 'FINANCIAL',
          title: 'Modelo Financiero y Proyecciones',
          description: 'Modelo de ingresos, costos unitarios y proyección de caja.',
          priority: 'HIGH',
          expectedDocumentKinds: ['FINANCIAL', 'MODEL'],
          evidenceRequired: false
        },
        {
          id: 'chk-legal-01',
          category: 'LEGAL',
          title: 'Contrato Comercial Maestro / Términos de Servicio',
          description: 'Contratos estándar con clientes y distribuidores.',
          priority: 'HIGH',
          expectedDocumentKinds: ['CONTRACT', 'LEGAL'],
          evidenceRequired: false
        },
        {
          id: 'chk-ip-01',
          category: 'INTELLECTUAL_PROPERTY',
          title: 'Registro de Propiedad Intelectual y Patentes',
          description: 'Patentes concedidas, solicitudes provisionales y marcas.',
          priority: 'HIGH',
          expectedDocumentKinds: ['IP'],
          evidenceRequired: true
        },
        {
          id: 'chk-reg-01',
          category: 'REGULATORY',
          title: 'Certificaciones Regulatorias y Normativas',
          description: 'Certificados de cumplimiento normativo aplicables a la industria.',
          priority: 'MEDIUM',
          expectedDocumentKinds: ['REGULATORY'],
          evidenceRequired: false
        }
      ]
    };

    this.checklists.set('STANDARD_VENTURE_DILIGENCE', new DiligenceChecklistEntity(defaultData));
  }

  async findById(id: string, _version?: string): Promise<DiligenceChecklistEntity | null> {
    return this.checklists.get(id) || null;
  }

  async getDefault(): Promise<DiligenceChecklistEntity> {
    const def = this.checklists.get('STANDARD_VENTURE_DILIGENCE');
    if (!def) throw new Error('Default checklist not initialized');
    return def;
  }
}
