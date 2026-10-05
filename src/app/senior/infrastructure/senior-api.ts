import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { environment } from '../../../environments/environment';
import { Senior } from '../domain/model/senior.entity';
import { SeniorAssembler } from './senior-assembler';
import { SeniorResource } from './senior-response';

@Injectable({ providedIn: 'root' })
export class SeniorApi extends BaseApi {
  private readonly url = `${environment.apiBase}/seniors`;
  private readonly assembler = new SeniorAssembler();

  constructor(private readonly http: HttpClient) { super(); }

  getCurrent(): Observable<Senior> {
    return this.http.get<SeniorResource>(`${this.url}/current`).pipe(map(r => this.assembler.toEntityFromResource(r)));
  }
}
