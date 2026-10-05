import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';
import { DayTimePipe, RelativeTimePipe } from '../../../../shared/presentation/pipes/relative-time.pipe';
import { DeviceStore } from '../../../application/device.store';
import { SeniorStore } from '../../../../senior/application/senior.store';

/** "Dispositivo": estado de la pulsera vinculada. */
@Component({
  selector: 'app-device-status',
  standalone: true,
  imports: [TranslateModule, PageHeadingComponent, IconComponent, RelativeTimePipe, DayTimePipe],
  templateUrl: './device-status.component.html',
  styleUrl: './device-status.component.css',
})
export class DeviceStatusComponent {
  readonly store = inject(DeviceStore);
  readonly senior = inject(SeniorStore).senior;

  readonly showDetails = signal(false);
}
