import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { LocationRecord } from '../domain/model/location-record.entity';
import { LocationApiEndpoint } from './location-api-endpoint';

@Injectable({ providedIn: 'root' })
export class LocationApi extends BaseApi {
  private readonly endpoint: LocationApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.endpoint = new LocationApiEndpoint(http);
  }

  getCurrent():  Observable<LocationRecord>   { return this.endpoint.getCurrent(); }
  getHistory():  Observable<LocationRecord[]> { return this.endpoint.getHistory(); }
  refresh():     Observable<LocationRecord>   { return this.endpoint.refresh(); }
}
