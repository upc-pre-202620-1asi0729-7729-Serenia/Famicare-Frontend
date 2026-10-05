export interface SeniorResource {
  id:        number;
  firstName: string;
  fullName:  string;
  initials:  string;
  age:       number;
}

export type SeniorResponse = SeniorResource[];
