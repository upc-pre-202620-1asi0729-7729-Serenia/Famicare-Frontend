import { BaseEntity } from '../../../shared/infrastructure/base-entity';

/** Persona mayor cuidada ("Elena"). */
export class Senior implements BaseEntity {
  readonly id: number;
  readonly firstName: string;
  readonly fullName: string;
  readonly initials: string;
  readonly age: number;

  constructor(props: { id: number; firstName: string; fullName: string; initials: string; age: number }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.fullName = props.fullName;
    this.initials = props.initials;
    this.age = props.age;
  }
}
