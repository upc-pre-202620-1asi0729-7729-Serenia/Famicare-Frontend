import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { LocationRecord } from '../domain/model/location-record.entity';
import { LocationAssembler } from './location-assembler';
import { LocationResource, LocationResponse } from './location-response';

/** `/locations` — getAll() devuelve el historial de registros. */
export class LocationApiEndpoint extends BaseApiEndpoint<LocationRecord, LocationResource, LocationResponse, LocationAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBase}/locations`, new LocationAssembler());
  }

  getHistory(): Observable<LocationRecord[]> {
    return this.http.get<LocationResponse>(`${this.endpointUrl}/history`).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response))
    );
  }

  getCurrent(): Observable<LocationRecord> {
    return this.http.get<LocationResource>(`${this.endpointUrl}/current`).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    );
  }

  refresh(): Observable<LocationRecord> {
    return this.http.post<LocationResource>(`${this.endpointUrl}/refresh`, {}).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    );
  }
}
