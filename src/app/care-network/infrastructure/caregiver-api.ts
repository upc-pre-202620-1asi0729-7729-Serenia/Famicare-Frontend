import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Caregiver } from '../domain/model/caregiver.entity';
import { CaregiverApiEndpoint } from './caregiver-api-endpoint';

@Injectable({ providedIn: 'root' })
export class CaregiverApi extends BaseApi {
  private readonly endpoint: CaregiverApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.endpoint = new CaregiverApiEndpoint(http);
  }

  getCaregivers():                    Observable<Caregiver[]> { return this.endpoint.getAll(); }
  inviteCaregiver(entity: Caregiver): Observable<Caregiver>   { return this.endpoint.create(entity); }
  removeCaregiver(id: number):        Observable<void>        { return this.endpoint.delete(id); }
}
