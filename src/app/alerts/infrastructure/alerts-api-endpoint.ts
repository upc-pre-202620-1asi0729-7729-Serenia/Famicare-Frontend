import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { CareAlert } from '../domain/model/care-alert.entity';
import { AlertsAssembler } from './alerts-assembler';
import { AlertResource, AlertResponse } from './alerts-response';

/** `/alerts` — listado + acciones de atención (handle / reopen). */
export class AlertsApiEndpoint extends BaseApiEndpoint<CareAlert, AlertResource, AlertResponse, AlertsAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBase}/alerts`, new AlertsAssembler());
  }

  handle(id: number): Observable<CareAlert> {
    return this.http.patch<AlertResource>(`${this.endpointUrl}/${id}/handle`, {}).pipe(map(r => this.assembler.toEntityFromResource(r)));
  }

  reopen(id: number): Observable<CareAlert> {
    return this.http.patch<AlertResource>(`${this.endpointUrl}/${id}/reopen`, {}).pipe(map(r => this.assembler.toEntityFromResource(r)));
  }
}
