export type PresenterSessionStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'ENDED';

export type PresenterMode = 'PRESENTER_VIEW' | 'AUDIENCE_VIEW' | 'REHEARSAL';

export type SceneRuntimeState = 'NOT_VISITED' | 'CURRENT' | 'VISITED' | 'SKIPPED';

export type TimingState = 'ON_TRACK' | 'AHEAD' | 'BEHIND' | 'OVERTIME';

export type PresenterNoteType = 'TALKING_POINT' | 'TRANSITION' | 'REMINDER' | 'CAUTION' | 'Q_AND_A';

export type PresenterNoteSource = 'STATIC' | 'MANUAL' | 'MIGRATED';

export type QaCategory =
  | 'STRATEGY'
  | 'MARKET'
  | 'BUSINESS_MODEL'
  | 'FINANCIALS'
  | 'TECHNOLOGY'
  | 'RISK'
  | 'TRACTION'
  | 'TEAM'
  | 'ASK'
  | 'TRUST'
  | 'OTHER';

export interface PresenterNote {
  id: string;
  presentationId: string;
  sceneId: string;
  type: PresenterNoteType;
  text: string;
  visibility: 'PRESENTER_ONLY';
  source: PresenterNoteSource;
}

export interface PresenterTrustAlert {
  id: string;
  sceneId: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  code: string;
  message: string;
  claimId?: string;
  acknowledged?: boolean;
}

export interface QaPreparationCard {
  id: string;
  sceneId?: string;
  category: QaCategory;
  question: string;
  answerNotes?: string;
  source: 'STATIC' | 'MANUAL' | 'MIGRATED';
  reviewed?: boolean;
}

export interface TimingDeviation {
  expectedCumulativeSeconds: number;
  actualElapsedSeconds: number;
  deltaSeconds: number;
  deltaPercent: number;
  state: TimingState;
}

export interface PresenterTimingState {
  targetSeconds: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  sceneTargetSeconds: number;
  sceneElapsedSeconds: number;
  deviation: TimingDeviation;
}

export interface PresenterSessionEvent {
  type:
    | 'SESSION_STARTED'
    | 'SESSION_PAUSED'
    | 'SESSION_RESUMED'
    | 'SESSION_ENDED'
    | 'SCENE_ENTERED'
    | 'SCENE_EXITED'
    | 'SCENE_SKIPPED'
    | 'FULLSCREEN_ENTERED'
    | 'FULLSCREEN_EXITED'
    | 'NOTES_OPENED'
    | 'QA_OPENED'
    | 'TRUST_ALERT_VIEWED';
  timestamp: string;
  sceneId?: string;
  metadata?: Record<string, unknown>;
}

export interface PresenterSessionSummary {
  sessionId: string;
  presentationId: string;
  targetSeconds: number;
  actualSeconds: number;
  deltaSeconds: number;
  deltaPercent: number;
  scenesVisited: number;
  scenesSkipped: number;
  totalScenes: number;
  finalTimingState: TimingState;
  warningsSeen: number;
  endedAt: string;
}

export interface PresenterSessionData {
  id: string;
  presentationId: string;
  status: PresenterSessionStatus;
  mode: PresenterMode;
  currentSceneIndex: number;
  startedAt?: string;
  pausedAt?: string;
  endedAt?: string;
  totalElapsedSeconds: number;
  sceneElapsedSeconds: number;
  sceneRuntimeStates: Record<number, SceneRuntimeState>;
  events: PresenterSessionEvent[];
}
