export interface BraceletResource {
  id:                number;
  serialNumber:      string;
  model:             string;
  connected:         boolean;
  batteryPercent:    number;
  estimatedDaysLeft: number;
  lastSignalAt:      string;
  gpsSignal:         string;
  gpsAccuracyMeters: number;
  firmwareVersion:   string;
  lastHelpTestAt:    string | null;
}

export type BraceletResponse = BraceletResource[];
