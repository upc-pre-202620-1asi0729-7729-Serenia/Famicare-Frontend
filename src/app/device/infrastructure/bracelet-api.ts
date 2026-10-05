import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Bracelet } from '../domain/model/bracelet.entity';
import { BraceletApiEndpoint } from './bracelet-api-endpoint';

@Injectable({ providedIn: 'root' })
export class BraceletApi extends BaseApi {
  private readonly endpoint: BraceletApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.endpoint = new BraceletApiEndpoint(http);
  }

  getBracelet():        Observable<Bracelet> { return this.endpoint.getCurrent(); }
  syncBracelet():       Observable<Bracelet> { return this.endpoint.sync(); }
  testHelpButton():     Observable<Bracelet> { return this.endpoint.testHelpButton(); }
}
