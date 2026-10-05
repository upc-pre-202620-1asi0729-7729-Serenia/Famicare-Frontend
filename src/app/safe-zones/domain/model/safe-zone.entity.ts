import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type SafeZoneType = 'HOME' | 'PARK' | 'FAMILY' | 'CLINIC' | 'OTHER';

export const SAFE_ZONE_TYPES: SafeZoneType[] = ['HOME', 'PARK', 'FAMILY', 'CLINIC', 'OTHER'];
export const MIN_RADIUS_METERS = 50;
export const MAX_RADIUS_METERS = 1000;

/** Geocerca de confianza: mientras Elena esté dentro, la familia no recibe alertas de salida. */
export class SafeZone implements BaseEntity {
  readonly id: number;
  readonly name: string;
  readonly type: SafeZoneType;
  readonly radiusMeters: number;
  readonly active: boolean;
  readonly address: string;

  constructor(props: { id: number; name: string; type: SafeZoneType; radiusMeters: number; active: boolean; address: string }) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.radiusMeters = props.radiusMeters;
    this.active = props.active;
    this.address = props.address;
  }

  /** Devuelve una copia con el estado de activación cambiado. */
  withActive(active: boolean): SafeZone {
    return new SafeZone({ ...this, active });
  }
}
