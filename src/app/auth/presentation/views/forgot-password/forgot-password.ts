import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '../../../application/auth.store';
import { LanguageSwitcher } from '../../../../shared/presentation/components/language-switcher/language-switcher';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule, LanguageSwitcher],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthStore);

  readonly loading = signal(false);
  readonly sent = signal(false);
  readonly submitted = signal(false);
  readonly failed = signal(false);

  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });

  get invalid(): boolean {
    const c = this.form.controls.email;
    return c.invalid && (c.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);
    this.failed.set(false);
    if (this.form.invalid) return;

    this.loading.set(true);
    this.auth.forgotPassword(this.form.getRawValue().email.trim().toLowerCase()).subscribe({
      next: () => { this.loading.set(false); this.sent.set(true); },
      error: () => { this.loading.set(false); this.failed.set(true); },
    });
  }
}
