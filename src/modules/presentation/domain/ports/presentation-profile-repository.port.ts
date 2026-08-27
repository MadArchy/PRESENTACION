import { PresentationProfile } from '../presentation.types';

export interface PresentationProfileRepository {
  list(): Promise<PresentationProfile[]>;
  findById(id: string): Promise<PresentationProfile | null>;
}
