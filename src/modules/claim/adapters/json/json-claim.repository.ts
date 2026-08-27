import { ClaimRepository } from '../../domain/ports/claim-repository.port';
import { ClaimEntity } from '../../domain/entities/claim.entity';
import { ClaimData } from '../../domain/claim.types';
import { ProjectSectionType } from '../../../project/domain/project.types';

export class JsonClaimRepository implements ClaimRepository {
  private claims: Map<string, ClaimEntity> = new Map();
  private isLoaded = false;

  constructor(private readonly provider?: () => Promise<ClaimData[]> | ClaimData[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.provider) {
      const dataList = await this.provider();
      for (const data of dataList) {
        const entity = new ClaimEntity(data);
        this.claims.set(entity.getId(), entity);
      }
    } else {
      // In static web bundle, fallback to built-in Arcana pilot data if no provider supplied
      const defaultArcanaClaims: ClaimData[] = [
        {
          id: 'claim-arcana-001',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'IDENTITY',
          text: {
            es: 'Arcana Trust Network es una infraestructura deeptech de confianza y notarización criptográfica para operaciones físicas y retail.',
            en: 'Arcana Trust Network is a deeptech decentralized trust infrastructure and cryptographic notarization platform for physical retail.'
          },
          type: 'FACT',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'HIGH',
          evidenceLinkIds: ['link-arcana-001'],
          sourceRefs: [{ type: 'document', reference: 'sources/pptx/Arcana_Investor_Presentation_EN_VISUAL.pptx', locator: 'slide-1' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-002',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'EXECUTIVE_SUMMARY',
          text: {
            es: 'Arcana convierte cada día operativo en un capítulo contable sellado matemáticamente en Polygon a un costo menor a $0.02 USD por local.',
            en: 'Arcana converts every operational day into a mathematically sealed accounting chapter on Polygon at less than $0.02 USD per store.'
          },
          type: 'FACT',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'CRITICAL',
          evidenceLinkIds: ['link-arcana-002'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-2' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-003',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'PROBLEM',
          text: {
            es: 'Los restaurantes y franquicias sufren entre 8% y 18% de fuga de ingresos debido a cancelaciones no registradas y descuadre operativo.',
            en: 'Restaurants and franchises suffer between 8% and 18% revenue leakage due to unrecorded cancellations and operational discrepancies.'
          },
          type: 'ESTIMATE',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'HIGH',
          evidenceLinkIds: ['link-arcana-003'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-3' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-004',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'CUSTOMER',
          text: {
            es: 'El cliente objetivo primario son cadenas y franquicias gastronómicas con 3 o más sucursales que operan múltiples canales de venta.',
            en: 'The primary target customer is restaurant chains and franchises with 3 or more branches operating multiple sales channels.'
          },
          type: 'ASSUMPTION',
          status: 'ACTIVE',
          supportStatus: 'NOT_REQUIRED',
          reviewStatus: 'REVIEWED',
          materiality: 'MEDIUM',
          evidenceLinkIds: ['link-arcana-004'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-4' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-005',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'SOLUTION',
          text: {
            es: 'Módulos de telemetría física en cada local empaquetan cada evento en árboles de Merkle y los anclan en Polygon.',
            en: 'Physical telemetry modules in each store package every event into Merkle trees and anchor them on Polygon.'
          },
          type: 'FACT',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'CRITICAL',
          evidenceLinkIds: ['link-arcana-005'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-5' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-006',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'PRODUCT',
          text: {
            es: 'El hardware Arcana Sentinel utiliza microcontroladores ESP32-S3 con Secure Boot v2 y almacenamiento protegido.',
            en: 'Arcana Sentinel hardware utilizes ESP32-S3 microcontrollers with Secure Boot v2 and protected storage.'
          },
          type: 'FACT',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'HIGH',
          evidenceLinkIds: ['link-arcana-006'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-7' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-007',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'BUSINESS_MODEL',
          text: {
            es: 'Precio objetivo del kit de hardware de $250 USD pago único por local.',
            en: 'Target pricing for hardware node kit of $250 USD one-time fee per branch.'
          },
          type: 'TARGET',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'HIGH',
          evidenceLinkIds: ['link-arcana-007'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-8' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-008',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'BUSINESS_MODEL',
          text: {
            es: 'Suscripción SaaS recurrente proyectada en $49 USD mensuales por sucursal activa.',
            en: 'Projected recurring SaaS subscription fee of $49 USD monthly per active branch.'
          },
          type: 'TARGET',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'HIGH',
          evidenceLinkIds: ['link-arcana-008'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-8' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-009',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'BUSINESS_MODEL',
          text: {
            es: 'Margen bruto estimado del 78% en ingresos de suscripción recurrente.',
            en: 'Estimated 78% gross margin on recurring SaaS subscription revenue.'
          },
          type: 'ESTIMATE',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'MEDIUM',
          evidenceLinkIds: ['link-arcana-009'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-8' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-010',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'TECHNOLOGY',
          text: {
            es: 'El protocolo realiza firmas criptográficas Ed25519 en el microcontrolador antes de emitir telemetría.',
            en: 'The protocol performs Ed25519 cryptographic signatures on microcontroller hardware before telemetry broadcast.'
          },
          type: 'FACT',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'HIGH',
          evidenceLinkIds: ['link-arcana-010'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-9' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-011',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'RISKS',
          text: {
            es: 'El buffer local no volátil almacena hasta 30 días de operaciones para tolerar cortes prolongados de energía o red.',
            en: 'Non-volatile local buffer stores up to 30 days of operations to tolerate prolonged network or power cuts.'
          },
          type: 'FACT',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'HIGH',
          evidenceLinkIds: ['link-arcana-011'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-10' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-012',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'ROADMAP',
          text: {
            es: 'Fase 1 completada con piloto cerrado en 5 locales comerciales de prueba en Cúcuta.',
            en: 'Phase 1 completed with closed pilot in 5 trial commercial locations in Cúcuta.'
          },
          type: 'FACT',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'CRITICAL',
          evidenceLinkIds: ['link-arcana-012'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-11' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-013',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'ROADMAP',
          text: {
            es: 'Objetivo de despliegue a 250 sucursales activas en Colombia y México en Fase 3.',
            en: 'Deployment target of 250 active branches across Colombia and Mexico in Phase 3.'
          },
          type: 'TARGET',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'MEDIUM',
          evidenceLinkIds: ['link-arcana-013'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-11' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-014',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'ASK',
          text: {
            es: 'Ronda objetivo de inversión de $350,000 USD mediante instrumento SAFE para 18 meses de runway.',
            en: 'Fundraising target round of $350,000 USD via SAFE note instrument for 18 months of runway.'
          },
          type: 'TARGET',
          status: 'ACTIVE',
          supportStatus: 'SUPPORTED',
          reviewStatus: 'REVIEWED',
          materiality: 'CRITICAL',
          evidenceLinkIds: ['link-arcana-014'],
          sourceRefs: [{ type: 'legacy-deck', reference: 'data/decks/deck_arcana_15.json', locator: 'slide-12' }],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-015',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'COMPETITION',
          text: {
            es: 'Ningún competidor directo en Latinoamérica ofrece actualmente notarización criptográfica a costo sub-centavo para puntos de venta.',
            en: 'No direct competitor in Latin America currently provides sub-cent cryptographic notarization for point-of-sale hardware.'
          },
          type: 'HYPOTHESIS',
          status: 'ACTIVE',
          supportStatus: 'NOT_REQUIRED',
          reviewStatus: 'UNREVIEWED',
          materiality: 'MEDIUM',
          evidenceLinkIds: [],
          sourceRefs: [],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        },
        {
          id: 'claim-arcana-016',
          projectId: 'arcana',
          projectVersion: '0.1.0',
          sectionType: 'MARKET',
          text: {
            es: 'El mercado total direccionable (TAM) en telemetría antifraude gastronómica en LatAm es de $4,200M USD.',
            en: 'Total addressable market (TAM) for anti-fraud restaurant telemetry in LatAm is $4,200M USD.'
          },
          type: 'ESTIMATE',
          status: 'ACTIVE',
          supportStatus: 'UNSUPPORTED',
          reviewStatus: 'REVIEW_REQUIRED',
          materiality: 'HIGH',
          evidenceLinkIds: [],
          sourceRefs: [],
          createdAt: '2026-08-26T15:00:00Z',
          updatedAt: '2026-08-26T15:00:00Z'
        }
      ];

      for (const data of defaultArcanaClaims) {
        const entity = new ClaimEntity(data);
        this.claims.set(entity.getId(), entity);
      }
    }

    this.isLoaded = true;
  }

  async listByProject(projectId: string, projectVersion?: string): Promise<ClaimEntity[]> {
    await this.ensureLoaded();
    const all = Array.from(this.claims.values());
    return all.filter(c => c.getProjectId() === projectId && (!projectVersion || c.getProjectVersion() === projectVersion));
  }

  async findById(id: string): Promise<ClaimEntity | null> {
    await this.ensureLoaded();
    return this.claims.get(id) || null;
  }

  async listBySection(projectId: string, sectionType: ProjectSectionType, projectVersion?: string): Promise<ClaimEntity[]> {
    const list = await this.listByProject(projectId, projectVersion);
    return list.filter(c => c.getSectionType() === sectionType);
  }
}
