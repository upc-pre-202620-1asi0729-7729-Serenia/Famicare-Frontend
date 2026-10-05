import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SafeZone, SafeZoneType } from '../domain/model/safe-zone.entity';
import { SafeZoneResource, SafeZoneResponse } from './safe-zone-response';

export class SafeZoneAssembler implements BaseAssembler<SafeZone, SafeZoneResource, SafeZoneResponse> {
  toEntityFromResource(r: SafeZoneResource): SafeZone {
    return new SafeZone({
      id: r.id, name: r.name, type: (r.type as SafeZoneType) ?? 'OTHER',
      radiusMeters: r.radiusMeters, active: r.active, address: r.address ?? '',
    });
  }

  toResourceFromEntity(e: SafeZone): SafeZoneResource {
    return { id: e.id, name: e.name, type: e.type, radiusMeters: e.radiusMeters, active: e.active, address: e.address };
  }

  toEntitiesFromResponse(response: SafeZoneResponse): SafeZone[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
