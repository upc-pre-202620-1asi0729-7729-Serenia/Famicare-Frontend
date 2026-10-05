import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type RoutineEventType = 'LEFT_HOME' | 'ARRIVED_PARK' | 'WALKING_PARK';
export type RoutineEventState = 'DONE' | 'CURRENT';

/** Hito del día de Elena ("Salió de casa", "Llegó al parque"…). */
export class RoutineEvent implements BaseEntity {
  readonly id: number;
  /** "HH:mm" o "NOW" para el hito en curso. */
  readonly time: string;
  readonly type: RoutineEventType;
  readonly state: RoutineEventState;

  constructor(props: { id: number; time: string; type: RoutineEventType; state: RoutineEventState }) {
    this.id = props.id;
    this.time = props.time;
    this.type = props.type;
    this.state = props.state;
  }

  get isCurrent(): boolean { return this.state === 'CURRENT'; }
}
