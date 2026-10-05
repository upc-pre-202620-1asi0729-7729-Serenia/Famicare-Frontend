import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { SafeZone } from '../domain/model/safe-zone.entity';
import { SafeZoneAssembler } from './safe-zone-assembler';
import { SafeZoneResource, SafeZoneResponse } from './safe-zone-response';

/** `/safe-zones` — CRUD base + activación (PATCH). */
export class SafeZoneApiEndpoint extends BaseApiEndpoint<SafeZone, SafeZoneResource, SafeZoneResponse, SafeZoneAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBase}/safe-zones`, new SafeZoneAssembler());
  }

  setActive(id: number, active: boolean): Observable<SafeZone> {
    return this.http.patch<SafeZoneResource>(`${this.endpointUrl}/${id}`, { active }).pipe(
      map(r => this.assembler.toEntityFromResource(r))
    );
  }
}
