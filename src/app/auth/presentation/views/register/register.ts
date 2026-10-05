import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '../../../application/auth.store';
import { LanguageSwitcher } from '../../../../shared/presentation/components/language-switcher/language-switcher';

const passwordsMatch = (group: AbstractControl): ValidationErrors | null =>
  group.get('password')?.value === group.get('confirm')?.value ? null : { mismatch: true };

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule, LanguageSwitcher],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly submitted = signal(false);
  readonly errorKey = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[+0-9 ()-]{6,20}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required]],
    },
    { validators: passwordsMatch }
  );

  invalid(control: 'fullName' | 'email' | 'phone' | 'password' | 'confirm'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  get mismatch(): boolean {
    return this.form.hasError('mismatch') && (this.form.controls.confirm.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);
    this.errorKey.set(null);
    if (this.form.invalid) return;

    this.loading.set(true);
    const v = this.form.getRawValue();
    this.auth.signUp({ fullName: v.fullName.trim(), email: v.email.trim().toLowerCase(), phone: v.phone.trim(), password: v.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.loading.set(false);
        this.errorKey.set(this.auth.errorCode(err) === 'EMAIL_TAKEN' ? 'auth.errors.EMAIL_TAKEN' : 'errors.generic');
      },
    });
  }
}
