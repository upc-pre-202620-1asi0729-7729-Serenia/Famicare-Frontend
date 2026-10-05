export interface CaregiverResource {
  id:           number;
  fullName:     string;
  initials:     string;
  role:         string;
  availability: string;
  shiftStart:   string | null;
  shiftEnd:     string | null;
  phone:        string;
  email:        string;
  tone:         string;
}

export type CaregiverResponse = CaregiverResource[];
