import { ProjectRepository } from '../../domain/ports/project-repository.port';
import { ProjectAggregate } from '../../domain/entities/project.aggregate';
import { ProjectVersionEntity } from '../../domain/entities/project-version.entity';
import { ProjectSummary, ProjectTwinData } from '../../domain/project.types';

export class JsonProjectRepository implements ProjectRepository {
  private aggregates: Map<string, ProjectAggregate> = new Map();
  private summaries: ProjectSummary[] = [];
  private isLoaded = false;

  constructor(private readonly dataProvider?: () => Promise<ProjectTwinData[]> | ProjectTwinData[]) {}

  private async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;

    if (this.dataProvider) {
      const dataList = await this.dataProvider();
      for (const data of dataList) {
        const agg = new ProjectAggregate(data);
        this.aggregates.set(agg.getId(), agg);
        this.aggregates.set(agg.getSlug(), agg);
      }
    } else {
      // Build Arcana Project Twin aggregate
      const arcanaData: ProjectTwinData = {
        id: 'arcana',
        slug: 'arcana',
        name: 'Arcana Trust Network',
        shortName: 'Arcana',
        type: 'DEEPTECH',
        status: 'pilot',
        schemaVersion: '1.0',
        currentVersion: '0.1.0',
        defaultLanguage: 'es',
        languages: ['es', 'en'],
        theme: 'arcana-purple',
        createdAt: '2026-08-20T10:00:00Z',
        updatedAt: '2026-08-26T15:00:00Z',
        kicker: {
          es: 'Web3 & IoT · Pitch inversor',
          en: 'Web3 & IoT · Investor pitch'
        },
        metadata: {
          blockchain: 'Polygon PoS L2',
          hardware: 'ESP32 IoT Sensor Edge'
        },
        versions: [
          {
            id: 'arcana-v0.1.0',
            projectId: 'arcana',
            version: '0.1.0',
            status: 'pilot',
            createdAt: '2026-08-20T10:00:00Z',
            createdBy: 'migration',
            changeSummary: 'Initial canonical Project Twin migration.',
            sections: [
              {
                id: 'sec-identity',
                type: 'IDENTITY',
                title: { es: 'Identidad y Marca', en: 'Identity & Brand' },
                status: 'VALIDATED',
                schemaVersion: '1.0',
                content: {
                  tagline: {
                    es: 'Infraestructura descentralizada de confianza y notarización criptográfica para operaciones físicas y retail.',
                    en: 'Decentralized trust infrastructure and cryptographic notarization for physical operations and retail.'
                  },
                  foundedYear: 2026,
                  stage: 'Seed / Pilot'
                },
                updatedAt: '2026-08-26T15:00:00Z'
              },
              {
                id: 'sec-executive-summary',
                type: 'EXECUTIVE_SUMMARY',
                title: { es: 'Resumen Ejecutivo', en: 'Executive Summary' },
                status: 'VALIDATED',
                schemaVersion: '1.0',
                content: {
                  elevatorPitch: {
                    es: 'Arcana conecta el hardware físico de locales comerciales con un libro mayor inmutable en Polygon para eliminar el fraude operativo.',
                    en: 'Arcana bridges physical retail hardware to an immutable ledger on Polygon to eliminate operational fraud.'
                  },
                  coreValueProposition: {
                    es: 'Cada día operativo se convierte en un capítulo contable cerrado, sellado matemáticamente y verificable públicamente con un costo menor a $0.02 USD por local.',
                    en: 'Every operational day becomes a closed, mathematically sealed, publicly verifiable accounting chapter at less than $0.02 USD per store.'
                  },
                  keyHighlights: [
                    'Sellos diarios on-chain en Polygon PoS L2',
                    'Microcontroladores Edge con buffer local tolerante a cortes de red',
                    'Eliminación demostrada de pérdidas invisibles en restaurantes y franquicias'
                  ]
                },
                updatedAt: '2026-08-26T15:00:00Z'
              },
              {
                id: 'sec-problem',
                type: 'PROBLEM',
                title: { es: 'Problema del Mercado', en: 'Market Problem' },
                status: 'VALIDATED',
                schemaVersion: '1.0',
                content: {
                  problemStatement: {
                    es: 'Los restaurantes y franquicias sufren entre 8% y 18% de fuga de ingresos debido a cancelaciones no registradas y auditorías manuales.',
                    en: 'Restaurants and franchises suffer 8% to 18% revenue leakage due to unrecorded cancellations and manual audits.'
                  },
                  affectedSegments: ['Franquicias gastronómicas', 'Retail físico multicomercio'],
                  currentInefficiencies: ['Cierres en papel editables', 'Falta de enlace directo con hardware de caja']
                },
                updatedAt: '2026-08-26T15:00:00Z'
              },
              {
                id: 'sec-solution',
                type: 'SOLUTION',
                title: { es: 'Solución y Propuesta de Valor', en: 'Solution & Value Proposition' },
                status: 'VALIDATED',
                schemaVersion: '1.0',
                content: {
                  solutionOverview: {
                    es: 'Módulos de telemetría física en cada local que empaquetan cada evento en árboles de Merkle y los anclan en Polygon.',
                    en: 'Physical telemetry modules in each store packaging every event into Merkle trees and anchoring them on Polygon.'
                  },
                  coreCapabilities: ['Notarización criptográfica en 2s', 'Verificación pública en Polygonscan']
                },
                updatedAt: '2026-08-26T15:00:00Z'
              },
              {
                id: 'sec-technology',
                type: 'TECHNOLOGY',
                title: { es: 'Tecnología e Infraestructura', en: 'Technology & Infrastructure' },
                status: 'VALIDATED',
                schemaVersion: '1.0',
                content: {
                  techStack: ['Polygon PoS', 'Rust', 'TypeScript', 'Solidity', 'ESP32 C/C++'],
                  cryptographicOrAiPrimitives: ['Árboles de Merkle SHA-256', 'Firmas Ed25519']
                },
                updatedAt: '2026-08-26T15:00:00Z'
              },
              {
                id: 'sec-risks',
                type: 'RISKS',
                title: { es: 'Matriz de Riesgos y Mitigaciones', en: 'Risk Matrix & Mitigations' },
                status: 'VALIDATED',
                schemaVersion: '1.0',
                content: {
                  identifiedRisks: [
                    {
                      risk: 'Cortes de energía o internet en locales físicos',
                      severity: 'MEDIUM',
                      mitigation: 'Buffer local no volátil que almacena hasta 30 días de operaciones.'
                    }
                  ]
                },
                updatedAt: '2026-08-26T15:00:00Z'
              },
              {
                id: 'sec-ask',
                type: 'ASK',
                title: { es: 'Ronda de Inversión', en: 'Investment Ask' },
                status: 'VALIDATED',
                schemaVersion: '1.0',
                content: {
                  targetAmount: '$350,000 USD',
                  instrument: 'SAFE',
                  runwayMonths: 18,
                  useOfFunds: [
                    { category: 'Ingeniería Hardware/Firmware', percentage: 40, allocationGoal: '500 kits de hardware' },
                    { category: 'Expansión Comercial', percentage: 35, allocationGoal: 'Ventas B2B en Colombia/México' }
                  ]
                },
                updatedAt: '2026-08-26T15:00:00Z'
              }
            ]
          }
        ]
      };

      const arcanaAgg = new ProjectAggregate(arcanaData);
      this.aggregates.set('arcana', arcanaAgg);
    }

    // Build project summaries list
    this.summaries = [
      {
        id: 'tutor',
        slug: 'tutor',
        name: 'Expert Multi-Agent Tutor',
        description: 'Autonomous enterprise-grade tutoring engine powered by 12 collaborative AI agents, knowledge graphs, and verifiable learning proof.',
        status: 'pilot',
        type: 'EDTECH',
        projectVersion: '0.1.0',
        schemaVersion: '1.0',
        defaultLanguage: 'es',
        availableLanguages: ['es', 'en'],
        theme: 'tutor-cyan',
        totalSlides: 15,
        kicker: { es: 'AI EdTech · Pitch inversor', en: 'AI EdTech · Investor pitch' }
      },
      {
        id: 'fastfood',
        slug: 'fastfood',
        name: 'Smart Fast-Food Franchise',
        description: 'Edge-AI and computer vision orchestration system for high-volume quick service restaurant operations.',
        status: 'pilot',
        type: 'FOODTECH',
        projectVersion: '0.1.0',
        schemaVersion: '1.0',
        defaultLanguage: 'es',
        availableLanguages: ['es', 'en'],
        theme: 'fastfood-emerald',
        totalSlides: 15,
        kicker: { es: 'FoodTech QSR · Pitch piloto', en: 'FoodTech QSR · Pilot pitch' }
      },
      {
        id: 'arcana',
        slug: 'arcana',
        name: 'Arcana Trust Network',
        description: 'Zero-knowledge verification and cryptographic hardware ledger for verifiable physical IoT operations.',
        status: 'pilot',
        type: 'DEEPTECH',
        projectVersion: '0.1.0',
        schemaVersion: '1.0',
        defaultLanguage: 'es',
        availableLanguages: ['es', 'en'],
        theme: 'arcana-purple',
        totalSlides: 15,
        kicker: { es: 'Web3 & IoT · Pitch inversor', en: 'Web3 & IoT · Investor pitch' }
      },
      {
        id: 'restaurante',
        slug: 'restaurante',
        name: 'Arcana Restaurantes Ops',
        description: 'Anti-fraud telemetry and automated inventory settlement chapter for multi-branch restaurant owners.',
        status: 'validation',
        type: 'FOODTECH',
        projectVersion: '0.1.0',
        schemaVersion: '1.0',
        defaultLanguage: 'es',
        availableLanguages: ['es', 'en'],
        theme: 'restaurante-amber',
        totalSlides: 10,
        kicker: { es: 'Arcana · Dueños de Restaurante', en: 'Arcana · Restaurant Owners' }
      },
      {
        id: 'comparativo',
        slug: 'comparativo',
        name: 'Estrategia Ejecutiva de Infraestructura para IA',
        description: 'Executive benchmark and progressive hardware financing strategy across 3 commercial stages.',
        status: 'active',
        type: 'INFRASTRUCTURE',
        projectVersion: '0.1.0',
        schemaVersion: '1.0',
        defaultLanguage: 'es',
        availableLanguages: ['es', 'en'],
        theme: 'comparativo-gold',
        totalSlides: 10,
        kicker: { es: 'Estrategia Ejecutiva · 3i BAIRD LAB', en: 'Executive Strategy · 3i BAIRD LAB' }
      }
    ];

    this.isLoaded = true;
  }

  async list(): Promise<ProjectSummary[]> {
    await this.ensureLoaded();
    return [...this.summaries];
  }

  async findById(id: string): Promise<ProjectAggregate | null> {
    await this.ensureLoaded();
    return this.aggregates.get(id) || null;
  }

  async findBySlug(slug: string): Promise<ProjectAggregate | null> {
    await this.ensureLoaded();
    return this.aggregates.get(slug) || null;
  }

  async findVersion(projectId: string, version: string): Promise<ProjectVersionEntity | null> {
    const project = await this.findById(projectId);
    if (!project) return null;
    return project.getVersion(version);
  }

  async listVersions(projectId: string): Promise<ProjectVersionEntity[]> {
    const project = await this.findById(projectId);
    if (!project) return [];
    return project.getVersions();
  }
}
