import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { SafeZone } from '../domain/model/safe-zone.entity';
import { SafeZoneApiEndpoint } from './safe-zone-api-endpoint';

@Injectable({ providedIn: 'root' })
export class SafeZoneApi extends BaseApi {
  private readonly endpoint: SafeZoneApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.endpoint = new SafeZoneApiEndpoint(http);
  }

  getSafeZones():                              Observable<SafeZone[]> { return this.endpoint.getAll(); }
  createSafeZone(zone: SafeZone):              Observable<SafeZone>   { return this.endpoint.create(zone); }
  setActive(id: number, active: boolean):      Observable<SafeZone>   { return this.endpoint.setActive(id, active); }
  deleteSafeZone(id: number):                  Observable<void>       { return this.endpoint.delete(id); }
}
