import { ClockPort } from '../../domain/ports/clock.port';

export class TestClockAdapter implements ClockPort {
  private currentTime: Date;

  constructor(initialTime = new Date('2026-08-26T12:00:00.000Z')) {
    this.currentTime = initialTime;
  }

  now(): Date {
    return new Date(this.currentTime.getTime());
  }

  setTime(time: Date): void {
    this.currentTime = new Date(time.getTime());
  }

  advanceSeconds(seconds: number): void {
    this.currentTime = new Date(this.currentTime.getTime() + seconds * 1000);
  }
}
