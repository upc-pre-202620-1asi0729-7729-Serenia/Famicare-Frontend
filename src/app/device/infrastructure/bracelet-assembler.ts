import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Bracelet, GpsSignal } from '../domain/model/bracelet.entity';
import { BraceletResource, BraceletResponse } from './bracelet-response';

export class BraceletAssembler implements BaseAssembler<Bracelet, BraceletResource, BraceletResponse> {
  toEntityFromResource(r: BraceletResource): Bracelet {
    return new Bracelet({
      id: r.id, serialNumber: r.serialNumber, model: r.model, connected: r.connected,
      batteryPercent: r.batteryPercent, estimatedDaysLeft: r.estimatedDaysLeft, lastSignalAt: r.lastSignalAt,
      gpsSignal: r.gpsSignal as GpsSignal, gpsAccuracyMeters: r.gpsAccuracyMeters,
      firmwareVersion: r.firmwareVersion, lastHelpTestAt: r.lastHelpTestAt ?? null,
    });
  }

  toResourceFromEntity(e: Bracelet): BraceletResource {
    return {
      id: e.id, serialNumber: e.serialNumber, model: e.model, connected: e.connected,
      batteryPercent: e.batteryPercent, estimatedDaysLeft: e.estimatedDaysLeft, lastSignalAt: e.lastSignalAt,
      gpsSignal: e.gpsSignal, gpsAccuracyMeters: e.gpsAccuracyMeters, firmwareVersion: e.firmwareVersion,
      lastHelpTestAt: e.lastHelpTestAt,
    };
  }

  toEntitiesFromResponse(response: BraceletResponse): Bracelet[] {
    return response.map(r => this.toEntityFromResource(r));
  }
}
