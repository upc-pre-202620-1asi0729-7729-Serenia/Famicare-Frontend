export interface LocationResource {
  id:             number;
  seniorId:       number;
  placeName:      string;
  address:        string;
  district:       string;
  latitude:       number;
  longitude:      number;
  recordedAt:     string;
  accuracyMeters: number;
  movementState:  string;
  insideSafeZone: boolean;
  safeZoneId:     number | null;
}

export type LocationResponse = LocationResource[];
