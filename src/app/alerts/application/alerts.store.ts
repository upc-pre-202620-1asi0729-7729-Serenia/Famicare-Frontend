import { computed, inject, Injectable, signal } from '@angular/core';
import { AlertsApi } from '../infrastructure/alerts-api';
import { CareAlert } from '../domain/model/care-alert.entity';

export type AlertFilter = 'ALL' | 'PENDING' | 'HANDLED';

@Injectable({ providedIn: 'root' })
export class AlertsStore {
  private readonly api = inject(AlertsApi);

  private readonly alertsSignal   = signal<CareAlert[]>([]);
  private readonly loadingSignal  = signal(false);
  private readonly errorSignal    = signal<string | null>(null);
  private readonly filterSignal   = signal<AlertFilter>('ALL');
  /** Última alerta que la persona cambió en esta sesión (para poder "Reabrir" desde el Inicio). */
  private readonly lastToggledId  = signal<number | null>(null);

  readonly alerts  = this.alertsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error   = this.errorSignal.asReadonly();
  readonly filter  = this.filterSignal.asReadonly();

  readonly pending      = computed(() => this.alertsSignal().filter(a => a.isPending));
  readonly pendingCount = computed(() => this.pending().length);
  readonly handledCount = computed(() => this.alertsSignal().length - this.pendingCount());

  readonly filtered = computed(() => {
    const f = this.filterSignal();
    return this.alertsSignal().filter(a => f === 'ALL' || (f === 'PENDING') === a.isPending);
  });

  /** Alerta destacada del Inicio: la primera pendiente, o la última que se acaba de atender. */
  readonly spotlight = computed<CareAlert | null>(() => {
    const first = this.pending()[0];
    if (first) return first;
    const id = this.lastToggledId();
    return id === null ? null : (this.alertsSignal().find(a => a.id === id) ?? null);
  });

  constructor() { this.load(); }

  load(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getAlerts().subscribe({
      next: alerts => { this.alertsSignal.set(this.sorted(alerts)); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.loadingSignal.set(false); },
    });
  }

  setFilter(filter: AlertFilter): void { this.filterSignal.set(filter); }

  byId(id: number): CareAlert | undefined { return this.alertsSignal().find(a => a.id === id); }

  handle(alert: CareAlert): void {
    this.lastToggledId.set(alert.id);
    this.api.handleAlert(alert.id).subscribe({ next: saved => this.replace(saved) });
  }

  reopen(alert: CareAlert): void {
    this.lastToggledId.set(alert.id);
    this.api.reopenAlert(alert.id).subscribe({ next: saved => this.replace(saved) });
  }

  /** Marca como atendidas todas las alertas pendientes. */
  handleAll(): void {
    this.pending().forEach(alert => this.api.handleAlert(alert.id).subscribe({ next: saved => this.replace(saved) }));
  }

  private replace(alert: CareAlert): void {
    this.alertsSignal.update(list => list.map(a => (a.id === alert.id ? alert : a)));
  }

  private sorted(alerts: CareAlert[]): CareAlert[] {
    return [...alerts].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  }
}
