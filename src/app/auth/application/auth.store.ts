import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthApi, AuthSession } from '../infrastructure/auth-api';
import { SignInRequest, SignUpRequest, UpdateProfileRequest } from '../infrastructure/auth-request';
import { UserAssembler } from '../infrastructure/user-assembler';
import { User } from '../domain/model/user.entity';

const TOKEN_KEY = 'famicare_token';
const USER_KEY  = 'famicare_user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly api       = inject(AuthApi);
  private readonly assembler = new UserAssembler();

  private readonly tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly userSignal  = signal<User | null>(this.restoreUser());

  readonly token           = this.tokenSignal.asReadonly();
  readonly currentUser     = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenSignal() && !!this.userSignal());

  signIn(request: SignInRequest): Observable<AuthSession> {
    return this.api.signIn(request).pipe(tap(session => this.startSession(session)));
  }

  signUp(request: SignUpRequest): Observable<AuthSession> {
    return this.api.signUp(request).pipe(tap(session => this.startSession(session)));
  }

  forgotPassword(email: string): Observable<void> {
    return this.api.forgotPassword(email);
  }

  updateProfile(request: UpdateProfileRequest): Observable<User> {
    return this.api.updateProfile(request).pipe(tap(user => this.persistUser(user)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  /** Código de error amigable para mostrar en formularios (se traduce en la vista). */
  errorCode(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const code = error.error?.message;
      if (typeof code === 'string' && code) return code;
    }
    return 'UNKNOWN';
  }

  private startSession(session: AuthSession): void {
    localStorage.setItem(TOKEN_KEY, session.token);
    this.tokenSignal.set(session.token);
    this.persistUser(session.user);
  }

  private persistUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(this.assembler.toResourceFromEntity(user)));
    this.userSignal.set(user);
  }

  private restoreUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? this.assembler.toEntityFromResource(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }
}
