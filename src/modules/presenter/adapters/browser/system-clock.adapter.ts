import { ClockPort } from '../../domain/ports/clock.port';

export class SystemClockAdapter implements ClockPort {
  now(): Date {
    return new Date();
  }
}
