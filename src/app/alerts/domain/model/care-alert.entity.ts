import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type AlertType =
  | 'LOW_BATTERY' | 'BATTERY_RECHARGED' | 'SAFE_ZONE_RETURN' | 'SAFE_ZONE_EXIT' | 'HELP_BUTTON_TEST' | 'HELP_REQUEST';
export type AlertStatus = 'PENDING' | 'HANDLED';
export type AlertOrigin = 'AUTOMATIC' | 'MANUAL' | 'TEST';
export type AlertParams = Record<string, string | number>;

/** Evento del centro de alertas de la familia. */
export class CareAlert implements BaseEntity {
  readonly id: number;
  readonly type: AlertType;
  readonly occurredAt: string;
  readonly status: AlertStatus;
  readonly handledBy: string | null;
  readonly origin: AlertOrigin;
  readonly params: AlertParams;

  constructor(props: {
    id: number; type: AlertType; occurredAt: string; status: AlertStatus;
    handledBy: string | null; origin: AlertOrigin; params: AlertParams;
  }) {
    this.id = props.id;
    this.type = props.type;
    this.occurredAt = props.occurredAt;
    this.status = props.status;
    this.handledBy = props.handledBy;
    this.origin = props.origin;
    this.params = props.params;
  }

  get isPending(): boolean { return this.status === 'PENDING'; }

  /** Icono del diseño según el tipo de evento. */
  get icon(): 'battery' | 'shield' | 'bell' | 'warning' {
    switch (this.type) {
      case 'LOW_BATTERY':
      case 'BATTERY_RECHARGED': return 'battery';
      case 'SAFE_ZONE_RETURN':  return 'shield';
      case 'SAFE_ZONE_EXIT':    return 'warning';
      default:                  return 'bell';
    }
  }
}
