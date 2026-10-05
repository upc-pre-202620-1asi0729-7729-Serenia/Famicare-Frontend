import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { Caregiver } from '../domain/model/caregiver.entity';
import { CaregiverAssembler } from './caregiver-assembler';
import { CaregiverResource, CaregiverResponse } from './caregiver-response';

/** `/caregivers` — CRUD base (la invitación es un POST). */
export class CaregiverApiEndpoint extends BaseApiEndpoint<Caregiver, CaregiverResource, CaregiverResponse, CaregiverAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBase}/caregivers`, new CaregiverAssembler());
  }
}
