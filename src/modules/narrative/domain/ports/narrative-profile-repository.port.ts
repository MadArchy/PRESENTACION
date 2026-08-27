import { NarrativeProfile, AudienceType } from '../narrative.types';

export interface NarrativeProfileRepository {
  findById(id: string): Promise<NarrativeProfile | null>;
  findByAudience(audience: AudienceType): Promise<NarrativeProfile | null>;
  list(): Promise<NarrativeProfile[]>;
}
