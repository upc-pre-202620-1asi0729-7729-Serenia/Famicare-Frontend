import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { ActivityReport } from '../domain/model/activity-report.entity';
import { RoutineEvent } from '../domain/model/routine-event.entity';
import { ActivityReportAssembler, RoutineEventAssembler } from './activity-assembler';
import {
  ActivityReportResource, ActivityReportResponse, RoutineEventResource, RoutineEventResponse,
} from './activity-response';

/** `/activity` — reporte semanal y rutina de hoy. */
export class ActivityApiEndpoint extends BaseApiEndpoint<ActivityReport, ActivityReportResource, ActivityReportResponse, ActivityReportAssembler> {
  private readonly eventAssembler = new RoutineEventAssembler();

  constructor(http: HttpClient) {
    super(http, `${environment.apiBase}/activity`, new ActivityReportAssembler());
  }

  getWeekly(): Observable<ActivityReport> {
    return this.http.get<ActivityReportResource>(`${this.endpointUrl}/weekly`).pipe(map(r => this.assembler.toEntityFromResource(r)));
  }

  getToday(): Observable<RoutineEvent[]> {
    return this.http.get<RoutineEventResponse>(`${this.endpointUrl}/today`).pipe(
      map(list => this.eventAssembler.toEntitiesFromResponse(list))
    );
  }
}
