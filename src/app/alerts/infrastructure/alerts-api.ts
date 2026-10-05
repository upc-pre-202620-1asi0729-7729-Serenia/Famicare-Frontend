import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { CareAlert } from '../domain/model/care-alert.entity';
import { AlertsApiEndpoint } from './alerts-api-endpoint';

@Injectable({ providedIn: 'root' })
export class AlertsApi extends BaseApi {
  private readonly endpoint: AlertsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.endpoint = new AlertsApiEndpoint(http);
  }

  getAlerts():                  Observable<CareAlert[]> { return this.endpoint.getAll(); }
  handleAlert(id: number):      Observable<CareAlert>   { return this.endpoint.handle(id); }
  reopenAlert(id: number):      Observable<CareAlert>   { return this.endpoint.reopen(id); }
}
