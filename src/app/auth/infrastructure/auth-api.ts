import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { environment } from '../../../environments/environment';
import { User } from '../domain/model/user.entity';
import { UserAssembler } from './user-assembler';
import { AuthResponse, UserResource } from './auth-response';
import { SignInRequest, SignUpRequest, UpdateProfileRequest } from './auth-request';

export interface AuthSession { token: string; user: User }

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseApi {
  private readonly url = `${environment.apiBase}/auth`;
  private readonly assembler = new UserAssembler();

  constructor(private readonly http: HttpClient) { super(); }

  signIn(request: SignInRequest): Observable<AuthSession> {
    return this.http.post<AuthResponse>(`${this.url}/sign-in`, request).pipe(map(r => this.toSession(r)));
  }

  signUp(request: SignUpRequest): Observable<AuthSession> {
    return this.http.post<AuthResponse>(`${this.url}/sign-up`, request).pipe(map(r => this.toSession(r)));
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.url}/forgot-password`, { email });
  }

  updateProfile(request: UpdateProfileRequest): Observable<User> {
    return this.http.patch<UserResource>(`${this.url}/me`, request).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    );
  }

  private toSession(r: AuthResponse): AuthSession {
    return { token: r.token, user: this.assembler.toEntityFromResource(r.user) };
  }
}
