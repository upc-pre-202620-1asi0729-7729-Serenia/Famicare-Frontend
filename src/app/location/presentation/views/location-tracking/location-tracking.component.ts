import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { MapComponent } from '../../../../shared/presentation/components/map/map.component';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';
import { DayTimePipe, RelativeTimePipe } from '../../../../shared/presentation/pipes/relative-time.pipe';
import { LocationStore } from '../../../application/location.store';
import { SeniorStore } from '../../../../senior/application/senior.store';

/** "Ubicación": monitoreo en vivo de la persona mayor. */
@Component({
  selector: 'app-location-tracking',
  standalone: true,
  imports: [TranslateModule, PageHeadingComponent, MapComponent, IconComponent, RelativeTimePipe, DayTimePipe],
  templateUrl: './location-tracking.component.html',
  styleUrl: './location-tracking.component.css',
})
export class LocationTrackingComponent {
  readonly store = inject(LocationStore);
  readonly senior = inject(SeniorStore).senior;

  readonly showHistory = signal(false);
  readonly descriptionKey = computed(() =>
    this.store.insideSafeZone() ? 'location.description.inside' : 'location.description.outside'
  );

  toggleHistory(): void {
    const next = !this.showHistory();
    this.showHistory.set(next);
    if (next) this.store.loadHistory();
  }
}
