import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { AlertOrigin, AlertStatus, AlertType, CareAlert } from '../domain/model/care-alert.entity';
import { AlertResource, AlertResponse } from './alerts-response';

export class AlertsAssembler implements BaseAssembler<CareAlert, AlertResource, AlertResponse> {
  toEntityFromResource(r: AlertResource): CareAlert {
    return new CareAlert({
      id: r.id, type: r.type as AlertType, occurredAt: r.occurredAt, status: r.status as AlertStatus,
      handledBy: r.handledBy ?? null, origin: r.origin as AlertOrigin, params: r.params ?? {},
    });
  }

  toResourceFromEntity(e: CareAlert): AlertResource {
    return { id: e.id, type: e.type, occurredAt: e.occurredAt, status: e.status, handledBy: e.handledBy, origin: e.origin, params: e.params };
  }

  toEntitiesFromResponse(response: AlertResponse): CareAlert[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
