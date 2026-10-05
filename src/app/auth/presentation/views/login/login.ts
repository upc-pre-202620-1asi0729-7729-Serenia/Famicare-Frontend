import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '../../../application/auth.store';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';
import { LanguageSwitcher } from '../../../../shared/presentation/components/language-switcher/language-switcher';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule, IconComponent, LanguageSwitcher],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  readonly showPassword = signal(false);
  readonly loading = signal(false);
  readonly errorKey = signal<string | null>(null);
  readonly submitted = signal(false);

  readonly demo = { email: 'valeria@famicare.com', password: 'famicare123' };

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  invalid(control: 'email' | 'password'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  useDemo(): void { this.form.setValue(this.demo); }

  submit(): void {
    this.submitted.set(true);
    this.errorKey.set(null);
    if (this.form.invalid) return;

    this.loading.set(true);
    const { email, password } = this.form.getRawValue();
    this.auth.signIn({ email: email.trim().toLowerCase(), password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.loading.set(false);
        this.errorKey.set(this.auth.errorCode(err) === 'INVALID_CREDENTIALS' ? 'auth.errors.INVALID_CREDENTIALS' : 'errors.generic');
      },
    });
  }
}
