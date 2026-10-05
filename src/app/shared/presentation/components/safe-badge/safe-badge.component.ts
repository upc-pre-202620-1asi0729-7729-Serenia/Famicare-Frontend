import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';
import { DashboardStore } from '../../../../dashboard/application/dashboard.store';

/** Insignia "Elena está segura" del encabezado de cada pantalla. */
@Component({
  selector: 'app-safe-badge',
  standalone: true,
  imports: [IconComponent, TranslateModule],
  templateUrl: './safe-badge.component.html',
  styleUrl: './safe-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeBadgeComponent {
  readonly store = inject(DashboardStore);
}
