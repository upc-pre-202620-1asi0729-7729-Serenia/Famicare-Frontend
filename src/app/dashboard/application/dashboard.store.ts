import { computed, inject, Injectable } from '@angular/core';
import { SeniorStore } from '../../senior/application/senior.store';
import { LocationStore } from '../../location/application/location.store';
import { DeviceStore } from '../../device/application/device.store';
import { AlertsStore } from '../../alerts/application/alerts.store';
import { ActivityStore } from '../../activity/application/activity.store';
import { CareNetworkStore } from '../../care-network/application/care-network.store';

export type SeniorStatus = 'LOADING' | 'SAFE' | 'ATTENTION';
export type AttentionReason = 'OUTSIDE_ZONE' | 'LOW_BATTERY' | 'DISCONNECTED' | null;
export type DayPart = 'morning' | 'afternoon' | 'evening';

/**
 * Vista de conjunto de "Inicio": combina los demás bounded contexts
 * (ubicación, dispositivo, alertas, actividad y red de cuidado).
 */
@Injectable({ providedIn: 'root' })
export class DashboardStore {
  readonly senior      = inject(SeniorStore).senior;
  readonly location    = inject(LocationStore);
  readonly device      = inject(DeviceStore);
  readonly alerts      = inject(AlertsStore);
  readonly activity    = inject(ActivityStore);
  readonly careNetwork = inject(CareNetworkStore);

  readonly attentionReason = computed<AttentionReason>(() => {
    const loc = this.location.current();
    const dev = this.device.bracelet();
    if (loc && !loc.insideSafeZone) return 'OUTSIDE_ZONE';
    if (dev && !dev.connected)      return 'DISCONNECTED';
    if (dev && dev.lowBattery)      return 'LOW_BATTERY';
    return null;
  });

  readonly status = computed<SeniorStatus>(() => {
    if (!this.location.current() || !this.device.bracelet()) return 'LOADING';
    return this.attentionReason() ? 'ATTENTION' : 'SAFE';
  });

  /** Momento del día para el saludo. */
  dayPart(date = new Date()): DayPart {
    const h = date.getHours();
    return h < 12 ? 'morning' : h < 19 ? 'afternoon' : 'evening';
  }
}
