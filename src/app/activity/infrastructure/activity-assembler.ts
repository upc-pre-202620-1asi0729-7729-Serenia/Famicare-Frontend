import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ActivityReport } from '../domain/model/activity-report.entity';
import { RoutineEvent, RoutineEventState, RoutineEventType } from '../domain/model/routine-event.entity';
import {
  ActivityReportResource, ActivityReportResponse, RoutineEventResource, RoutineEventResponse,
} from './activity-response';

export class ActivityReportAssembler implements BaseAssembler<ActivityReport, ActivityReportResource, ActivityReportResponse> {
  toEntityFromResource(r: ActivityReportResource): ActivityReport {
    return new ActivityReport({
      id: r.id, weekStart: r.weekStart, dailySteps: r.dailySteps, averageSteps: r.averageSteps,
      weeklyChangePercent: r.weeklyChangePercent, outings: r.outings,
      outingsInsideSafeZones: r.outingsInsideSafeZones, routineStable: r.routineStable,
    });
  }

  toResourceFromEntity(e: ActivityReport): ActivityReportResource {
    return {
      id: e.id, weekStart: e.weekStart, dailySteps: e.dailySteps, averageSteps: e.averageSteps,
      weeklyChangePercent: e.weeklyChangePercent, outings: e.outings,
      outingsInsideSafeZones: e.outingsInsideSafeZones, routineStable: e.routineStable,
    };
  }

  toEntitiesFromResponse(response: ActivityReportResponse): ActivityReport[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}

export class RoutineEventAssembler implements BaseAssembler<RoutineEvent, RoutineEventResource, RoutineEventResponse> {
  toEntityFromResource(r: RoutineEventResource): RoutineEvent {
    return new RoutineEvent({ id: r.id, time: r.time, type: r.type as RoutineEventType, state: r.state as RoutineEventState });
  }

  toResourceFromEntity(e: RoutineEvent): RoutineEventResource {
    return { id: e.id, time: e.time, type: e.type, state: e.state };
  }

  toEntitiesFromResponse(response: RoutineEventResponse): RoutineEvent[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
