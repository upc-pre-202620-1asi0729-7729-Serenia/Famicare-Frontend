import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';
import { CareNetworkStore } from '../../../application/care-network.store';
import { SeniorStore } from '../../../../senior/application/senior.store';
import { Caregiver, CaregiverKind, INVITABLE_KINDS } from '../../../domain/model/caregiver.entity';

/** "Red de cuidado": las personas que acompañan a la persona mayor. */
@Component({
  selector: 'app-care-network',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, PageHeadingComponent, IconComponent],
  templateUrl: './care-network.component.html',
  styleUrl: './care-network.component.css',
})
export class CareNetworkComponent {
  readonly store = inject(CareNetworkStore);
  readonly senior = inject(SeniorStore).senior;
  private readonly fb = inject(FormBuilder);

  readonly kinds = INVITABLE_KINDS;
  readonly modalOpen = signal(false);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email:    ['', [Validators.required, Validators.email]],
    kind:     ['COLLABORATOR' as CaregiverKind, Validators.required],
  });

  readonly descriptionKey = computed(() => {
    const n = this.store.activeCount();
    return n === 1 ? 'careNetwork.description.one' : 'careNetwork.description.many';
  });

  /** "Cuidadora principal · En línea" · "Cuidadora profesional · 08:00–14:00". */
  availabilityKey(c: Caregiver): string { return `careNetwork.availability.${c.availability}`; }

  shift(c: Caregiver): string { return c.hasShift ? `${c.shiftStart}–${c.shiftEnd}` : ''; }

  isShiftBased(c: Caregiver): boolean { return c.availability === 'SCHEDULED' && c.hasShift; }

  openModal(): void {
    this.form.reset({ fullName: '', email: '', kind: 'COLLABORATOR' });
    this.submitted.set(false);
    this.modalOpen.set(true);
  }

  closeModal(): void { this.modalOpen.set(false); }

  invalid(control: 'fullName' | 'email'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.store.invite({ fullName: v.fullName.trim(), email: v.email.trim().toLowerCase(), kind: v.kind }, () => this.closeModal());
  }
}
