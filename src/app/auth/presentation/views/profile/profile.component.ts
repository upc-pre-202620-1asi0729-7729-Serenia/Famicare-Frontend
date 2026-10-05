import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '../../../application/auth.store';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, PageHeadingComponent, IconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  readonly user = this.auth.currentUser;
  readonly saving = signal(false);
  readonly saved = signal(false);
  readonly failed = signal(false);
  readonly submitted = signal(false);

  readonly planFeatures = ['seniors', 'caregivers', 'history', 'support'] as const;

  readonly form = this.fb.nonNullable.group({
    fullName: [this.user()?.fullName ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    phone: [this.user()?.phone ?? '', [Validators.pattern(/^[+0-9 ()-]{6,20}$/)]],
  });

  invalid(control: 'fullName' | 'phone'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  save(): void {
    this.submitted.set(true);
    this.saved.set(false);
    this.failed.set(false);
    if (this.form.invalid) return;

    this.saving.set(true);
    const v = this.form.getRawValue();
    this.auth.updateProfile({ fullName: v.fullName.trim(), phone: v.phone.trim() }).subscribe({
      next: () => { this.saving.set(false); this.saved.set(true); },
      error: () => { this.saving.set(false); this.failed.set(true); },
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
