import { computed, inject, Injectable, signal } from '@angular/core';
import { CaregiverApi } from '../infrastructure/caregiver-api';
import { Caregiver, CaregiverKind } from '../domain/model/caregiver.entity';

@Injectable({ providedIn: 'root' })
export class CareNetworkStore {
  private readonly api = inject(CaregiverApi);

  private readonly caregiversSignal = signal<Caregiver[]>([]);
  private readonly loadingSignal    = signal(false);
  private readonly savingSignal     = signal(false);
  private readonly errorSignal      = signal<string | null>(null);

  readonly caregivers = this.caregiversSignal.asReadonly();
  readonly loading    = this.loadingSignal.asReadonly();
  readonly saving     = this.savingSignal.asReadonly();
  readonly error      = this.errorSignal.asReadonly();

  /** Cuidadores que ya acompañan (las invitaciones pendientes no cuentan). */
  readonly activeCount = computed(() => this.caregiversSignal().filter(c => c.availability !== 'INVITED').length);

  /** Primera persona con turno definido (p. ej. la cuidadora profesional). */
  readonly onShift = computed(() => this.caregiversSignal().find(c => c.hasShift) ?? null);

  constructor() { this.load(); }

  load(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getCaregivers().subscribe({
      next: list => { this.caregiversSignal.set(list); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.loadingSignal.set(false); },
    });
  }

  invite(props: { fullName: string; email: string; kind: CaregiverKind }, onDone?: () => void): void {
    this.savingSignal.set(true);
    this.errorSignal.set(null);
    const draft = new Caregiver({
      id: 0, fullName: props.fullName, initials: '', kind: props.kind, availability: 'INVITED',
      shiftStart: null, shiftEnd: null, phone: '', email: props.email, tone: 'mint',
    });
    this.api.inviteCaregiver(draft).subscribe({
      next: created => {
        this.caregiversSignal.update(list => [...list, created]);
        this.savingSignal.set(false);
        onDone?.();
      },
      error: err => { this.errorSignal.set(err.message ?? 'error'); this.savingSignal.set(false); },
    });
  }

  remove(caregiver: Caregiver): void {
    const previous = this.caregiversSignal();
    this.caregiversSignal.set(previous.filter(c => c.id !== caregiver.id));
    this.api.removeCaregiver(caregiver.id).subscribe({ error: () => this.caregiversSignal.set(previous) });
  }
}
