export interface SafeZoneResource {
  id:           number;
  name:         string;
  type:         string;
  radiusMeters: number;
  active:       boolean;
  address:      string;
}

export type SafeZoneResponse = SafeZoneResource[];
