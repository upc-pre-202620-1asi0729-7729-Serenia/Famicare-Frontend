import { inject, Injectable, signal } from '@angular/core';
import { SeniorApi } from '../infrastructure/senior-api';
import { Senior } from '../domain/model/senior.entity';

/** Persona mayor que acompaña la familia. */
@Injectable({ providedIn: 'root' })
export class SeniorStore {
  private readonly api = inject(SeniorApi);

  private readonly seniorSignal = signal<Senior | null>(null);
  readonly senior = this.seniorSignal.asReadonly();

  constructor() { this.load(); }

  load(): void {
    this.api.getCurrent().subscribe({ next: s => this.seniorSignal.set(s), error: () => this.seniorSignal.set(null) });
  }
}
