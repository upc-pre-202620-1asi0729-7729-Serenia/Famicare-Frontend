import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type CaregiverRole = 'PRIMARY_CAREGIVER';
export type SubscriptionPlan = 'FAMILY';

/** Persona cuidadora que usa FamiCare (la usuaria autenticada). */
export class User implements BaseEntity {
  private _id:       number;
  private _fullName: string;
  private _email:    string;
  private _phone:    string;
  private _role:     CaregiverRole;
  private _plan:     SubscriptionPlan;

  constructor(props: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    role: CaregiverRole;
    plan: SubscriptionPlan;
  }) {
    this._id       = props.id;
    this._fullName = props.fullName;
    this._email    = props.email;
    this._phone    = props.phone;
    this._role     = props.role;
    this._plan     = props.plan;
  }

  get id():       number { return this._id; }
  set id(v: number)      { this._id = v; }
  get fullName(): string { return this._fullName; }
  get email():    string { return this._email; }
  get phone():    string { return this._phone; }
  get role():     CaregiverRole { return this._role; }
  get plan():     SubscriptionPlan { return this._plan; }

  get firstName(): string { return this._fullName.trim().split(/\s+/)[0] ?? ''; }

  get initials(): string {
    return this._fullName.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
}
