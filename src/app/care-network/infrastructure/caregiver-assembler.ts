import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { AvatarTone, Caregiver, CaregiverAvailability, CaregiverKind } from '../domain/model/caregiver.entity';
import { CaregiverResource, CaregiverResponse } from './caregiver-response';

export class CaregiverAssembler implements BaseAssembler<Caregiver, CaregiverResource, CaregiverResponse> {
  toEntityFromResource(r: CaregiverResource): Caregiver {
    return new Caregiver({
      id: r.id, fullName: r.fullName, initials: r.initials, kind: r.role as CaregiverKind,
      availability: r.availability as CaregiverAvailability, shiftStart: r.shiftStart ?? null, shiftEnd: r.shiftEnd ?? null,
      phone: r.phone ?? '', email: r.email ?? '', tone: (r.tone as AvatarTone) ?? 'mint',
    });
  }

  toResourceFromEntity(e: Caregiver): CaregiverResource {
    return {
      id: e.id, fullName: e.fullName, initials: e.initials, role: e.kind, availability: e.availability,
      shiftStart: e.shiftStart, shiftEnd: e.shiftEnd, phone: e.phone, email: e.email, tone: e.tone,
    };
  }

  toEntitiesFromResponse(response: CaregiverResponse): Caregiver[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
