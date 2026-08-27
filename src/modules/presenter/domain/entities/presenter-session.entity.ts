import {
  PresenterSessionData,
  PresenterSessionStatus,
  PresenterMode,
  SceneRuntimeState,
  PresenterSessionEvent,
  PresenterTimingState,
  PresenterSessionSummary
} from '../presenter.types';
import { SessionStatusVo } from '../value-objects/session-status.vo';
import { PresenterTimingPolicy } from '../policies/presenter-timing.policy';
import {
  InvalidPresenterSessionTransitionError,
  InvalidSceneNavigationError
} from '../errors/presenter-domain.error';
import { PresentationDefinitionEntity } from '../../../presentation/domain/entities/presentation-definition.entity';

export class PresenterSessionEntity {
  private readonly id: string;
  private readonly presentationId: string;
  private status: SessionStatusVo;
  private mode: PresenterMode;
  private currentSceneIndex: number;
  private startedAt?: string;
  private pausedAt?: string;
  private endedAt?: string;
  private totalElapsedSeconds: number;
  private sceneElapsedSeconds: number;
  private readonly sceneRuntimeStates: Map<number, SceneRuntimeState>;
  private readonly events: PresenterSessionEvent[];

  constructor(data: PresenterSessionData) {
    this.id = data.id;
    this.presentationId = data.presentationId;
    this.status = new SessionStatusVo(data.status);
    this.mode = data.mode || 'PRESENTER_VIEW';
    this.currentSceneIndex = data.currentSceneIndex || 0;
    this.startedAt = data.startedAt;
    this.pausedAt = data.pausedAt;
    this.endedAt = data.endedAt;
    this.totalElapsedSeconds = data.totalElapsedSeconds || 0;
    this.sceneElapsedSeconds = data.sceneElapsedSeconds || 0;
    this.sceneRuntimeStates = new Map(
      Object.entries(data.sceneRuntimeStates || {}).map(([k, v]) => [Number(k), v])
    );
    this.events = [...(data.events || [])];
  }

  getId(): string { return this.id; }
  getPresentationId(): string { return this.presentationId; }
  getStatus(): PresenterSessionStatus { return this.status.getValue(); }
  getMode(): PresenterMode { return this.mode; }
  getCurrentSceneIndex(): number { return this.currentSceneIndex; }
  getTotalElapsedSeconds(): number { return this.totalElapsedSeconds; }
  getSceneElapsedSeconds(): number { return this.sceneElapsedSeconds; }
  getEvents(): PresenterSessionEvent[] { return [...this.events]; }
  getSceneRuntimeState(index: number): SceneRuntimeState {
    return this.sceneRuntimeStates.get(index) || 'NOT_VISITED';
  }

  start(timestamp = new Date().toISOString()): void {
    if (this.getStatus() !== 'IDLE') {
      throw new InvalidPresenterSessionTransitionError(this.getStatus(), 'RUNNING');
    }
    this.status = new SessionStatusVo('RUNNING');
    this.startedAt = timestamp;
    this.sceneRuntimeStates.set(this.currentSceneIndex, 'CURRENT');
    this.recordEvent('SESSION_STARTED', timestamp, `scene-${this.currentSceneIndex + 1}`);
    this.recordEvent('SCENE_ENTERED', timestamp, `scene-${this.currentSceneIndex + 1}`);
  }

  pause(timestamp = new Date().toISOString()): void {
    if (this.getStatus() !== 'RUNNING') {
      throw new InvalidPresenterSessionTransitionError(this.getStatus(), 'PAUSED');
    }
    this.status = new SessionStatusVo('PAUSED');
    this.pausedAt = timestamp;
    this.recordEvent('SESSION_PAUSED', timestamp);
  }

  resume(timestamp = new Date().toISOString()): void {
    if (this.getStatus() !== 'PAUSED') {
      throw new InvalidPresenterSessionTransitionError(this.getStatus(), 'RUNNING');
    }
    this.status = new SessionStatusVo('RUNNING');
    this.recordEvent('SESSION_RESUMED', timestamp);
  }

  end(timestamp = new Date().toISOString()): void {
    if (this.getStatus() === 'ENDED') {
      throw new InvalidPresenterSessionTransitionError('ENDED', 'ENDED');
    }
    this.status = new SessionStatusVo('ENDED');
    this.endedAt = timestamp;
    this.recordEvent('SESSION_ENDED', timestamp);
  }

  tick(seconds = 1): void {
    if (this.getStatus() === 'RUNNING') {
      this.totalElapsedSeconds += seconds;
      this.sceneElapsedSeconds += seconds;
    }
  }

  goToScene(targetIndex: number, totalScenes: number, timestamp = new Date().toISOString()): void {
    if (this.getStatus() === 'ENDED') {
      throw new InvalidSceneNavigationError('Cannot navigate an ended presentation session');
    }
    if (targetIndex < 0 || targetIndex >= totalScenes) {
      throw new InvalidSceneNavigationError(`Target scene index ${targetIndex} out of range [0..${totalScenes - 1}]`);
    }

    const prevIndex = this.currentSceneIndex;
    if (targetIndex === prevIndex) return;

    this.sceneRuntimeStates.set(prevIndex, 'VISITED');

    // If jumping forward skipping intermediate scenes
    if (targetIndex > prevIndex + 1) {
      for (let i = prevIndex + 1; i < targetIndex; i++) {
        this.sceneRuntimeStates.set(i, 'SKIPPED');
        this.recordEvent('SCENE_SKIPPED', timestamp, `scene-${i + 1}`);
      }
    }

    this.currentSceneIndex = targetIndex;
    this.sceneElapsedSeconds = 0;
    this.sceneRuntimeStates.set(targetIndex, 'CURRENT');
    this.recordEvent('SCENE_ENTERED', timestamp, `scene-${targetIndex + 1}`);
  }

  next(totalScenes: number, timestamp = new Date().toISOString()): void {
    if (this.currentSceneIndex < totalScenes - 1) {
      this.goToScene(this.currentSceneIndex + 1, totalScenes, timestamp);
    }
  }

  prev(totalScenes: number, timestamp = new Date().toISOString()): void {
    if (this.currentSceneIndex > 0) {
      this.goToScene(this.currentSceneIndex - 1, totalScenes, timestamp);
    }
  }

  recordEvent(type: PresenterSessionEvent['type'], timestamp = new Date().toISOString(), sceneId?: string, metadata?: Record<string, unknown>): void {
    this.events.push({
      type,
      timestamp,
      sceneId,
      metadata
    });
  }

  calculateTiming(presentation: PresentationDefinitionEntity): PresenterTimingState {
    const totalTarget = presentation.getTotalEstimatedSeconds();
    const scenes = presentation.getScenes();
    const currentScene = scenes[this.currentSceneIndex];
    const sceneTarget = currentScene ? currentScene.getEstimatedSeconds() : 60;

    let expectedCumulative = 0;
    for (let i = 0; i <= this.currentSceneIndex && i < scenes.length; i++) {
      expectedCumulative += scenes[i].getEstimatedSeconds();
    }

    const deviation = PresenterTimingPolicy.evaluate(
      this.totalElapsedSeconds,
      expectedCumulative,
      totalTarget
    );

    return {
      targetSeconds: totalTarget,
      elapsedSeconds: this.totalElapsedSeconds,
      remainingSeconds: Math.max(0, totalTarget - this.totalElapsedSeconds),
      sceneTargetSeconds: sceneTarget,
      sceneElapsedSeconds: this.sceneElapsedSeconds,
      deviation
    };
  }

  buildSummary(presentation: PresentationDefinitionEntity): PresenterSessionSummary {
    const timing = this.calculateTiming(presentation);
    const scenes = presentation.getScenes();

    let visitedCount = 0;
    let skippedCount = 0;
    for (let i = 0; i < scenes.length; i++) {
      const st = this.getSceneRuntimeState(i);
      if (st === 'VISITED' || st === 'CURRENT') visitedCount++;
      if (st === 'SKIPPED') skippedCount++;
    }

    return {
      sessionId: this.id,
      presentationId: this.presentationId,
      targetSeconds: timing.targetSeconds,
      actualSeconds: this.totalElapsedSeconds,
      deltaSeconds: timing.deviation.deltaSeconds,
      deltaPercent: timing.deviation.deltaPercent,
      scenesVisited: visitedCount,
      scenesSkipped: skippedCount,
      totalScenes: scenes.length,
      finalTimingState: timing.deviation.state,
      warningsSeen: presentation.getWarnings().length,
      endedAt: this.endedAt || new Date().toISOString()
    };
  }

  toJSON(): PresenterSessionData {
    const states: Record<number, SceneRuntimeState> = {};
    for (const [k, v] of this.sceneRuntimeStates.entries()) {
      states[k] = v;
    }

    return {
      id: this.id,
      presentationId: this.presentationId,
      status: this.getStatus(),
      mode: this.mode,
      currentSceneIndex: this.currentSceneIndex,
      startedAt: this.startedAt,
      pausedAt: this.pausedAt,
      endedAt: this.endedAt,
      totalElapsedSeconds: this.totalElapsedSeconds,
      sceneElapsedSeconds: this.sceneElapsedSeconds,
      sceneRuntimeStates: states,
      events: this.getEvents()
    };
  }
}
