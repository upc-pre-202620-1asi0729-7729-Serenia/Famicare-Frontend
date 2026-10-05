import { inject, Injectable, signal } from '@angular/core';
import { BraceletApi } from '../infrastructure/bracelet-api';
import { Bracelet } from '../domain/model/bracelet.entity';
import { AlertsStore } from '../../alerts/application/alerts.store';

@Injectable({ providedIn: 'root' })
export class DeviceStore {
  private readonly api    = inject(BraceletApi);
  private readonly alerts = inject(AlertsStore);

  private readonly braceletSignal = signal<Bracelet | null>(null);
  private readonly loadingSignal  = signal(false);
  private readonly syncingSignal  = signal(false);
  private readonly testingSignal  = signal(false);
  private readonly errorSignal    = signal<string | null>(null);

  readonly bracelet = this.braceletSignal.asReadonly();
  readonly loading  = this.loadingSignal.asReadonly();
  readonly syncing  = this.syncingSignal.asReadonly();
  readonly testing  = this.testingSignal.asReadonly();
  readonly error    = this.errorSignal.asReadonly();

  constructor() { this.load(); }

  load(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getBracelet().subscribe({
      next: b => { this.braceletSignal.set(b); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.loadingSignal.set(false); },
    });
  }

  sync(): void {
    this.syncingSignal.set(true);
    this.api.syncBracelet().subscribe({
      next: b => { this.braceletSignal.set(b); this.syncingSignal.set(false); },
      error: () => this.syncingSignal.set(false),
    });
  }

  /** Prueba del botón de ayuda: el backend registra una alerta de prueba, así que se recarga el centro de alertas. */
  testHelpButton(): void {
    this.testingSignal.set(true);
    this.api.testHelpButton().subscribe({
      next: b => { this.braceletSignal.set(b); this.testingSignal.set(false); this.alerts.load(); },
      error: () => this.testingSignal.set(false),
    });
  }
}
