import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { LocationRecord, MovementState } from '../domain/model/location-record.entity';
import { LocationResource, LocationResponse } from './location-response';

export class LocationAssembler implements BaseAssembler<LocationRecord, LocationResource, LocationResponse> {
  toEntityFromResource(r: LocationResource): LocationRecord {
    return new LocationRecord({
      id: r.id, seniorId: r.seniorId, placeName: r.placeName, address: r.address, district: r.district,
      latitude: r.latitude, longitude: r.longitude, recordedAt: r.recordedAt, accuracyMeters: r.accuracyMeters,
      movementState: r.movementState as MovementState, insideSafeZone: r.insideSafeZone, safeZoneId: r.safeZoneId ?? null,
    });
  }

  toResourceFromEntity(e: LocationRecord): LocationResource {
    return {
      id: e.id, seniorId: e.seniorId, placeName: e.placeName, address: e.address, district: e.district,
      latitude: e.latitude, longitude: e.longitude, recordedAt: e.recordedAt, accuracyMeters: e.accuracyMeters,
      movementState: e.movementState, insideSafeZone: e.insideSafeZone, safeZoneId: e.safeZoneId,
    };
  }

  toEntitiesFromResponse(response: LocationResponse): LocationRecord[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
