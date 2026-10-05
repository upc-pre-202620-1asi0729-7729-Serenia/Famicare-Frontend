import { computed, inject, Injectable, signal } from '@angular/core';
import { SafeZoneApi } from '../infrastructure/safe-zone-api';
import { SafeZone, SafeZoneType } from '../domain/model/safe-zone.entity';

@Injectable({ providedIn: 'root' })
export class SafeZoneStore {
  private readonly api = inject(SafeZoneApi);

  private readonly zonesSignal   = signal<SafeZone[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly savingSignal  = signal(false);
  private readonly errorSignal   = signal<string | null>(null);

  readonly zones   = this.zonesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly saving  = this.savingSignal.asReadonly();
  readonly error   = this.errorSignal.asReadonly();

  readonly activeCount = computed(() => this.zonesSignal().filter(z => z.active).length);

  constructor() { this.load(); }

  load(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getSafeZones().subscribe({
      next: zones => { this.zonesSignal.set(zones); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.loadingSignal.set(false); },
    });
  }

  create(props: { name: string; type: SafeZoneType; radiusMeters: number; address: string }, onDone?: () => void): void {
    this.savingSignal.set(true);
    this.errorSignal.set(null);
    this.api.createSafeZone(new SafeZone({ id: 0, active: true, ...props })).subscribe({
      next: zone => {
        this.zonesSignal.update(list => [...list, zone]);
        this.savingSignal.set(false);
        onDone?.();
      },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.savingSignal.set(false); },
    });
  }

  toggle(zone: SafeZone): void {
    const next = !zone.active;
    // Actualización optimista; si falla se revierte.
    this.replace(zone.withActive(next));
    this.api.setActive(zone.id, next).subscribe({
      next: saved => this.replace(saved),
      error: () => this.replace(zone),
    });
  }

  remove(id: number): void {
    const previous = this.zonesSignal();
    this.zonesSignal.set(previous.filter(z => z.id !== id));
    this.api.deleteSafeZone(id).subscribe({ error: () => this.zonesSignal.set(previous) });
  }

  private replace(zone: SafeZone): void {
    this.zonesSignal.update(list => list.map(z => (z.id === zone.id ? zone : z)));
  }
}
