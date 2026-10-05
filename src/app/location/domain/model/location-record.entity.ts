import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type MovementState = 'MOVING' | 'STILL';

/** Un registro de posición reportado por la pulsera. */
export class LocationRecord implements BaseEntity {
  readonly id: number;
  readonly seniorId: number;
  readonly placeName: string;
  readonly address: string;
  readonly district: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly recordedAt: string;
  readonly accuracyMeters: number;
  readonly movementState: MovementState;
  readonly insideSafeZone: boolean;
  readonly safeZoneId: number | null;

  constructor(props: {
    id: number; seniorId: number; placeName: string; address: string; district: string;
    latitude: number; longitude: number; recordedAt: string; accuracyMeters: number;
    movementState: MovementState; insideSafeZone: boolean; safeZoneId: number | null;
  }) {
    this.id = props.id;
    this.seniorId = props.seniorId;
    this.placeName = props.placeName;
    this.address = props.address;
    this.district = props.district;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.recordedAt = props.recordedAt;
    this.accuracyMeters = props.accuracyMeters;
    this.movementState = props.movementState;
    this.insideSafeZone = props.insideSafeZone;
    this.safeZoneId = props.safeZoneId;
  }

  get isMoving(): boolean { return this.movementState === 'MOVING'; }
}
