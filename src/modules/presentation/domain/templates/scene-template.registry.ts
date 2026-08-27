import { SceneType, SceneTemplate } from '../presentation.types';

export class SceneTemplateRegistry {
  private static readonly templates: Map<SceneType, SceneTemplate> = new Map([
    [
      'EXECUTIVE_HERO',
      {
        sceneType: 'EXECUTIVE_HERO',
        defaultRole: 'OPENING',
        supportedLayouts: ['HERO', 'SPLIT', 'FULL_BLEED_MEDIA'],
        defaultLayout: 'HERO',
        requiredBindingTypes: ['TEXT'],
        optionalBindingTypes: ['METRIC_SET', 'MEDIA', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: true
      }
    ],
    [
      'SECTION_DIVIDER',
      {
        sceneType: 'SECTION_DIVIDER',
        defaultRole: 'CONTEXT',
        supportedLayouts: ['MINIMAL', 'HERO'],
        defaultLayout: 'MINIMAL',
        requiredBindingTypes: ['TEXT'],
        optionalBindingTypes: [],
        supportsTrust: false,
        supportsMedia: false
      }
    ],
    [
      'PROBLEM_FRAME',
      {
        sceneType: 'PROBLEM_FRAME',
        defaultRole: 'PROBLEM',
        supportedLayouts: ['SPLIT', 'STACKED', 'GRID'],
        defaultLayout: 'SPLIT',
        requiredBindingTypes: ['TEXT', 'BULLET_LIST'],
        optionalBindingTypes: ['METRIC', 'CLAIM', 'MEDIA'],
        supportsTrust: true,
        supportsMedia: true,
        maxItems: 4
      }
    ],
    [
      'WHY_NOW',
      {
        sceneType: 'WHY_NOW',
        defaultRole: 'OPPORTUNITY',
        supportedLayouts: ['SPLIT', 'GRID'],
        defaultLayout: 'SPLIT',
        requiredBindingTypes: ['TEXT', 'BULLET_LIST'],
        optionalBindingTypes: ['METRIC_SET', 'CLAIM'],
        supportsTrust: true,
        supportsMedia: true
      }
    ],
    [
      'SOLUTION_OVERVIEW',
      {
        sceneType: 'SOLUTION_OVERVIEW',
        defaultRole: 'SOLUTION',
        supportedLayouts: ['GRID', 'SPLIT', 'STACKED'],
        defaultLayout: 'GRID',
        requiredBindingTypes: ['TEXT', 'BULLET_LIST'],
        optionalBindingTypes: ['MEDIA', 'METRIC_SET', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: true
      }
    ],
    [
      'PRODUCT_OVERVIEW',
      {
        sceneType: 'PRODUCT_OVERVIEW',
        defaultRole: 'SOLUTION',
        supportedLayouts: ['SPLIT', 'GRID', 'FULL_BLEED_MEDIA'],
        defaultLayout: 'SPLIT',
        requiredBindingTypes: ['TEXT'],
        optionalBindingTypes: ['BULLET_LIST', 'MEDIA', 'KEY_VALUE'],
        supportsTrust: true,
        supportsMedia: true
      }
    ],
    [
      'MARKET_OVERVIEW',
      {
        sceneType: 'MARKET_OVERVIEW',
        defaultRole: 'OPPORTUNITY',
        supportedLayouts: ['METRIC_WALL', 'GRID', 'SPLIT'],
        defaultLayout: 'METRIC_WALL',
        requiredBindingTypes: ['TEXT', 'METRIC_SET'],
        optionalBindingTypes: ['BULLET_LIST', 'CLAIM'],
        supportsTrust: true,
        supportsMedia: false
      }
    ],
    [
      'BUSINESS_MODEL',
      {
        sceneType: 'BUSINESS_MODEL',
        defaultRole: 'ECONOMICS',
        supportedLayouts: ['SPLIT', 'GRID', 'METRIC_WALL'],
        defaultLayout: 'SPLIT',
        requiredBindingTypes: ['TEXT', 'KEY_VALUE'],
        optionalBindingTypes: ['METRIC_SET', 'BULLET_LIST', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: false
      }
    ],
    [
      'COMPETITIVE_LANDSCAPE',
      {
        sceneType: 'COMPETITIVE_LANDSCAPE',
        defaultRole: 'DIFFERENTIATION',
        supportedLayouts: ['MATRIX', 'GRID', 'SPLIT'],
        defaultLayout: 'MATRIX',
        requiredBindingTypes: ['TEXT', 'COMPARISON'],
        optionalBindingTypes: ['BULLET_LIST', 'CLAIM'],
        supportsTrust: true,
        supportsMedia: false
      }
    ],
    [
      'TRACTION',
      {
        sceneType: 'TRACTION',
        defaultRole: 'PROOF',
        supportedLayouts: ['METRIC_WALL', 'TIMELINE', 'GRID'],
        defaultLayout: 'METRIC_WALL',
        requiredBindingTypes: ['TEXT', 'METRIC_SET'],
        optionalBindingTypes: ['BULLET_LIST', 'CLAIM_SET', 'EVIDENCE_SUMMARY'],
        supportsTrust: true,
        supportsMedia: true
      }
    ],
    [
      'FINANCIAL_OVERVIEW',
      {
        sceneType: 'FINANCIAL_OVERVIEW',
        defaultRole: 'ECONOMICS',
        supportedLayouts: ['GRID', 'METRIC_WALL', 'SPLIT'],
        defaultLayout: 'GRID',
        requiredBindingTypes: ['TEXT', 'METRIC_SET'],
        optionalBindingTypes: ['TABLE', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: false
      }
    ],
    [
      'TECHNOLOGY_OVERVIEW',
      {
        sceneType: 'TECHNOLOGY_OVERVIEW',
        defaultRole: 'DIFFERENTIATION',
        supportedLayouts: ['SPLIT', 'GRID', 'DIAGRAM'],
        defaultLayout: 'SPLIT',
        requiredBindingTypes: ['TEXT', 'BULLET_LIST'],
        optionalBindingTypes: ['ARCHITECTURE_NODES', 'MEDIA', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: true
      }
    ],
    [
      'ARCHITECTURE_MAP',
      {
        sceneType: 'ARCHITECTURE_MAP',
        defaultRole: 'SOLUTION',
        supportedLayouts: ['DIAGRAM', 'SPLIT'],
        defaultLayout: 'DIAGRAM',
        requiredBindingTypes: ['TEXT', 'ARCHITECTURE_NODES'],
        optionalBindingTypes: ['ARCHITECTURE_EDGES', 'BULLET_LIST', 'MEDIA'],
        supportsTrust: true,
        supportsMedia: true
      }
    ],
    [
      'RISK_OVERVIEW',
      {
        sceneType: 'RISK_OVERVIEW',
        defaultRole: 'RISK',
        supportedLayouts: ['STACKED', 'GRID', 'SPLIT'],
        defaultLayout: 'STACKED',
        requiredBindingTypes: ['TEXT', 'RISK_LIST'],
        optionalBindingTypes: ['CLAIM_SET', 'BULLET_LIST'],
        supportsTrust: true,
        supportsMedia: false,
        maxItems: 6
      }
    ],
    [
      'ROADMAP',
      {
        sceneType: 'ROADMAP',
        defaultRole: 'EXECUTION',
        supportedLayouts: ['TIMELINE', 'GRID', 'STACKED'],
        defaultLayout: 'TIMELINE',
        requiredBindingTypes: ['TEXT', 'ROADMAP'],
        optionalBindingTypes: ['BULLET_LIST', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: false,
        maxItems: 8
      }
    ],
    [
      'TEAM',
      {
        sceneType: 'TEAM',
        defaultRole: 'PROOF',
        supportedLayouts: ['GRID', 'SPLIT'],
        defaultLayout: 'GRID',
        requiredBindingTypes: ['TEXT'],
        optionalBindingTypes: ['BULLET_LIST', 'MEDIA'],
        supportsTrust: false,
        supportsMedia: true
      }
    ],
    [
      'EVIDENCE_OVERVIEW',
      {
        sceneType: 'EVIDENCE_OVERVIEW',
        defaultRole: 'PROOF',
        supportedLayouts: ['CONTENT_PLUS_EVIDENCE', 'GRID'],
        defaultLayout: 'CONTENT_PLUS_EVIDENCE',
        requiredBindingTypes: ['TEXT', 'EVIDENCE_SUMMARY'],
        optionalBindingTypes: ['CLAIM_SET', 'METRIC_SET'],
        supportsTrust: true,
        supportsMedia: false
      }
    ],
    [
      'DECISION_FRAME',
      {
        sceneType: 'DECISION_FRAME',
        defaultRole: 'DECISION',
        supportedLayouts: ['SPLIT', 'STACKED', 'HERO'],
        defaultLayout: 'SPLIT',
        requiredBindingTypes: ['TEXT', 'BULLET_LIST'],
        optionalBindingTypes: ['KEY_VALUE', 'METRIC'],
        supportsTrust: true,
        supportsMedia: false
      }
    ],
    [
      'ASK',
      {
        sceneType: 'ASK',
        defaultRole: 'ASK',
        supportedLayouts: ['HERO', 'SPLIT', 'METRIC_WALL'],
        defaultLayout: 'HERO',
        requiredBindingTypes: ['TEXT'],
        optionalBindingTypes: ['METRIC_SET', 'KEY_VALUE', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: false
      }
    ],
    [
      'CLOSING',
      {
        sceneType: 'CLOSING',
        defaultRole: 'CLOSING',
        supportedLayouts: ['HERO', 'MINIMAL'],
        defaultLayout: 'HERO',
        requiredBindingTypes: ['TEXT'],
        optionalBindingTypes: ['MEDIA', 'KEY_VALUE'],
        supportsTrust: false,
        supportsMedia: true
      }
    ],
    [
      'GENERIC_CONTENT',
      {
        sceneType: 'GENERIC_CONTENT',
        defaultRole: 'CONTEXT',
        supportedLayouts: ['STACKED', 'SPLIT', 'GRID'],
        defaultLayout: 'STACKED',
        requiredBindingTypes: ['TEXT'],
        optionalBindingTypes: ['BULLET_LIST', 'KEY_VALUE', 'METRIC_SET', 'CLAIM_SET'],
        supportsTrust: true,
        supportsMedia: true
      }
    ]
  ]);

  static get(sceneType: SceneType): SceneTemplate {
    return this.templates.get(sceneType) || this.templates.get('GENERIC_CONTENT')!;
  }

  static has(sceneType: SceneType): boolean {
    return this.templates.has(sceneType);
  }

  static list(): SceneTemplate[] {
    return Array.from(this.templates.values());
  }
}
