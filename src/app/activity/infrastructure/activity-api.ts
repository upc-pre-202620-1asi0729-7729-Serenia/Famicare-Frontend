import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { ActivityReport } from '../domain/model/activity-report.entity';
import { RoutineEvent } from '../domain/model/routine-event.entity';
import { ActivityApiEndpoint } from './activity-api-endpoint';

@Injectable({ providedIn: 'root' })
export class ActivityApi extends BaseApi {
  private readonly endpoint: ActivityApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.endpoint = new ActivityApiEndpoint(http);
  }

  getWeeklyReport():  Observable<ActivityReport> { return this.endpoint.getWeekly(); }
  getTodayRoutine():  Observable<RoutineEvent[]> { return this.endpoint.getToday(); }
}
