import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export interface DayActivity {
  /** Fecha ISO (YYYY-MM-DD) del día. */
  date: string;
  steps: number;
  /** Altura de la barra (0–91 %), relativa al mejor día. */
  heightPercent: number;
  isToday: boolean;
}

/** Reporte semanal de actividad de Elena. */
export class ActivityReport implements BaseEntity {
  readonly id: number;
  readonly weekStart: string;
  readonly dailySteps: number[];
  readonly averageSteps: number;
  readonly weeklyChangePercent: number;
  readonly outings: number;
  readonly outingsInsideSafeZones: number;
  readonly routineStable: boolean;

  constructor(props: {
    id: number; weekStart: string; dailySteps: number[]; averageSteps: number; weeklyChangePercent: number;
    outings: number; outingsInsideSafeZones: number; routineStable: boolean;
  }) {
    this.id = props.id;
    this.weekStart = props.weekStart;
    this.dailySteps = props.dailySteps;
    this.averageSteps = props.averageSteps;
    this.weeklyChangePercent = props.weeklyChangePercent;
    this.outings = props.outings;
    this.outingsInsideSafeZones = props.outingsInsideSafeZones;
    this.routineStable = props.routineStable;
  }

  get allOutingsSafe(): boolean { return this.outings === this.outingsInsideSafeZones; }

  /** Los 7 días de la semana con su barra (el mejor día llega al 91 % como en el diseño). */
  get days(): DayActivity[] {
    const max = Math.max(...this.dailySteps, 1);
    const start = new Date(`${this.weekStart}T12:00:00`);
    const today = new Date().toISOString().slice(0, 10);
    return this.dailySteps.map((steps, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      return { date: iso, steps, heightPercent: Math.round((steps / max) * 91), isToday: iso === today };
    });
  }
}
