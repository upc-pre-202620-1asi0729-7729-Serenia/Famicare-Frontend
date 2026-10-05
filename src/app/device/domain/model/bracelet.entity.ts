import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type GpsSignal = 'HIGH' | 'MEDIUM' | 'LOW';

/** Pulsera vinculada a Elena. */
export class Bracelet implements BaseEntity {
  readonly id: number;
  readonly serialNumber: string;
  readonly model: string;
  readonly connected: boolean;
  readonly batteryPercent: number;
  readonly estimatedDaysLeft: number;
  readonly lastSignalAt: string;
  readonly gpsSignal: GpsSignal;
  readonly gpsAccuracyMeters: number;
  readonly firmwareVersion: string;
  readonly lastHelpTestAt: string | null;

  constructor(props: {
    id: number; serialNumber: string; model: string; connected: boolean; batteryPercent: number;
    estimatedDaysLeft: number; lastSignalAt: string; gpsSignal: GpsSignal; gpsAccuracyMeters: number;
    firmwareVersion: string; lastHelpTestAt: string | null;
  }) {
    this.id = props.id;
    this.serialNumber = props.serialNumber;
    this.model = props.model;
    this.connected = props.connected;
    this.batteryPercent = props.batteryPercent;
    this.estimatedDaysLeft = props.estimatedDaysLeft;
    this.lastSignalAt = props.lastSignalAt;
    this.gpsSignal = props.gpsSignal;
    this.gpsAccuracyMeters = props.gpsAccuracyMeters;
    this.firmwareVersion = props.firmwareVersion;
    this.lastHelpTestAt = props.lastHelpTestAt;
  }

  get lowBattery(): boolean { return this.batteryPercent <= 20; }
}
