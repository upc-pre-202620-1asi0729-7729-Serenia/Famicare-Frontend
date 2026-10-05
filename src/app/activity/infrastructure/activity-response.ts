export interface ActivityReportResource {
  id:                     number;
  weekStart:              string;
  dailySteps:             number[];
  averageSteps:           number;
  weeklyChangePercent:    number;
  outings:                number;
  outingsInsideSafeZones: number;
  routineStable:          boolean;
}

export interface RoutineEventResource {
  id:    number;
  time:  string;
  type:  string;
  state: string;
}

export type ActivityReportResponse = ActivityReportResource[];
export type RoutineEventResponse   = RoutineEventResource[];
