import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type CaregiverKind = 'PRIMARY' | 'COLLABORATOR' | 'PROFESSIONAL';
export type CaregiverAvailability = 'ONLINE' | 'AVAILABLE' | 'SCHEDULED' | 'INVITED';
export type AvatarTone = 'coral' | 'yellow' | 'mint';

export const INVITABLE_KINDS: CaregiverKind[] = ['COLLABORATOR', 'PROFESSIONAL'];

/** Persona que acompaña a Elena (familia o cuidadora profesional). */
export class Caregiver implements BaseEntity {
  readonly id: number;
  readonly fullName: string;
  readonly initials: string;
  readonly kind: CaregiverKind;
  readonly availability: CaregiverAvailability;
  readonly shiftStart: string | null;
  readonly shiftEnd: string | null;
  readonly phone: string;
  readonly email: string;
  readonly tone: AvatarTone;

  constructor(props: {
    id: number; fullName: string; initials: string; kind: CaregiverKind; availability: CaregiverAvailability;
    shiftStart: string | null; shiftEnd: string | null; phone: string; email: string; tone: AvatarTone;
  }) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.initials = props.initials;
    this.kind = props.kind;
    this.availability = props.availability;
    this.shiftStart = props.shiftStart;
    this.shiftEnd = props.shiftEnd;
    this.phone = props.phone;
    this.email = props.email;
    this.tone = props.tone;
  }

  get isPrimary(): boolean { return this.kind === 'PRIMARY'; }
  get hasShift(): boolean { return !!this.shiftStart && !!this.shiftEnd; }
}
