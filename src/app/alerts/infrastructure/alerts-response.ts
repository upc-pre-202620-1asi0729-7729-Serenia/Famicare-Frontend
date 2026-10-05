export interface AlertResource {
  id:         number;
  type:       string;
  occurredAt: string;
  status:     string;
  handledBy:  string | null;
  origin:     string;
  params:     Record<string, string | number>;
}

export type AlertResponse = AlertResource[];
