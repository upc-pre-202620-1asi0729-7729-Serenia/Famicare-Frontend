import { computed, inject, Injectable, signal } from '@angular/core';
import { LocationApi } from '../infrastructure/location-api';
import { LocationRecord } from '../domain/model/location-record.entity';

@Injectable({ providedIn: 'root' })
export class LocationStore {
  private static readonly POLL_INTERVAL_MS = 30_000;

  private readonly api = inject(LocationApi);

  private readonly currentSignal    = signal<LocationRecord | null>(null);
  private readonly historySignal    = signal<LocationRecord[]>([]);
  private readonly loadingSignal    = signal(false);
  private readonly refreshingSignal = signal(false);
  private readonly errorSignal      = signal<string | null>(null);

  readonly current    = this.currentSignal.asReadonly();
  readonly history    = this.historySignal.asReadonly();
  readonly loading    = this.loadingSignal.asReadonly();
  readonly refreshing = this.refreshingSignal.asReadonly();
  readonly error      = this.errorSignal.asReadonly();

  /** true cuando la última posición está dentro de una zona segura. */
  readonly insideSafeZone = computed(() => this.currentSignal()?.insideSafeZone ?? false);

  constructor() {
    this.load();
    setInterval(() => this.poll(), LocationStore.POLL_INTERVAL_MS);
  }

  load(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getCurrent().subscribe({
      next: record => { this.currentSignal.set(record); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.loadingSignal.set(false); },
    });
  }

  loadHistory(): void {
    this.api.getHistory().subscribe({
      next: records => this.historySignal.set(records),
      error: err => this.errorSignal.set(err.message ?? 'error'),
    });
  }

  /** Pide a la pulsera una posición nueva. */
  refresh(): void {
    this.refreshingSignal.set(true);
    this.api.refresh().subscribe({
      next: record => { this.currentSignal.set(record); this.refreshingSignal.set(false); },
      error: () => this.refreshingSignal.set(false),
    });
  }

  private poll(): void {
    this.api.getCurrent().subscribe({ next: record => this.currentSignal.set(record), error: () => undefined });
  }
}
