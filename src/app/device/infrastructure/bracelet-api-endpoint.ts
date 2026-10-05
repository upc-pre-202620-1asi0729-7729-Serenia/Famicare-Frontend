import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { Bracelet } from '../domain/model/bracelet.entity';
import { BraceletAssembler } from './bracelet-assembler';
import { BraceletResource, BraceletResponse } from './bracelet-response';

/** `/devices` — la pulsera vinculada es siempre `/devices/current`. */
export class BraceletApiEndpoint extends BaseApiEndpoint<Bracelet, BraceletResource, BraceletResponse, BraceletAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBase}/devices`, new BraceletAssembler());
  }

  getCurrent(): Observable<Bracelet> {
    return this.http.get<BraceletResource>(`${this.endpointUrl}/current`).pipe(map(r => this.assembler.toEntityFromResource(r)));
  }

  sync(): Observable<Bracelet> {
    return this.http.post<BraceletResource>(`${this.endpointUrl}/current/sync`, {}).pipe(map(r => this.assembler.toEntityFromResource(r)));
  }

  testHelpButton(): Observable<Bracelet> {
    return this.http.post<BraceletResource>(`${this.endpointUrl}/current/help-test`, {}).pipe(map(r => this.assembler.toEntityFromResource(r)));
  }
}
