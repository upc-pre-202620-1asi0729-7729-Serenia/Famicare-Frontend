import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivityApi } from '../infrastructure/activity-api';
import { ActivityReport } from '../domain/model/activity-report.entity';
import { RoutineEvent } from '../domain/model/routine-event.entity';

@Injectable({ providedIn: 'root' })
export class ActivityStore {
  private readonly api = inject(ActivityApi);

  private readonly reportSignal  = signal<ActivityReport | null>(null);
  private readonly todaySignal   = signal<RoutineEvent[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal   = signal<string | null>(null);

  readonly report  = this.reportSignal.asReadonly();
  readonly today   = this.todaySignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error   = this.errorSignal.asReadonly();

  readonly days = computed(() => this.reportSignal()?.days ?? []);

  constructor() { this.load(); }

  load(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getWeeklyReport().subscribe({
      next: report => { this.reportSignal.set(report); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.loadingSignal.set(false); },
    });
    this.api.getTodayRoutine().subscribe({ next: events => this.todaySignal.set(events), error: () => undefined });
  }
}
