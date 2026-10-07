import {inject, Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {SignUpApiEndpoint} from './sign-up-api-endpoint';
import {SignInApiEndpoint} from './sign-in-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {SignUpAssembler} from './sign-up-assembler';
import {SignInAssembler} from './sign-in-assembler';
import {SignUpCommand} from '../domain/model/sign-up.command';
import {Observable} from 'rxjs';
import {SignUpResource} from './sign-up-response';
import {SignInCommand} from '../domain/model/sign-in.command';
import {SignInResource} from './sign-in-response';

/**
 * Infrastructure facade that exposes IAM endpoint operations.
 */
@Injectable({providedIn: 'root'})
export class IamApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly signUpEndpoint = new SignUpApiEndpoint(this.http, new SignUpAssembler());
  private readonly signInEndpoint = new SignInApiEndpoint(this.http, new SignInAssembler());

  /**
   * Registers a new user account.
   * @param signUpCommand - Command containing credential values.
   * @returns Stream with the created user resource.
   */
  signUp = (signUpCommand: SignUpCommand): Observable<SignUpResource> =>
    this.signUpEndpoint.signUp(signUpCommand);

  /**
   * Authenticates an existing user.
   * @param signInCommand - Command containing credential values.
   * @returns Stream with the authenticated user resource and token.
   */
  signIn = (signInCommand: SignInCommand): Observable<SignInResource> =>
    this.signInEndpoint.signIn(signInCommand);
}
