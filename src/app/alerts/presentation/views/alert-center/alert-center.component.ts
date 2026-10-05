import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';
import { DayTimePipe } from '../../../../shared/presentation/pipes/relative-time.pipe';
import { AlertFilter, AlertsStore } from '../../../application/alerts.store';
import { CareAlert } from '../../../domain/model/care-alert.entity';
import { alertOrigin, alertTitleKey } from '../../alert-text';

/** "Centro de alertas": eventos recientes y su estado de atención. */
@Component({
  selector: 'app-alert-center',
  standalone: true,
  imports: [RouterLink, TranslateModule, PageHeadingComponent, IconComponent, DayTimePipe],
  templateUrl: './alert-center.component.html',
  styleUrl: './alert-center.component.css',
})
export class AlertCenterComponent {
  readonly store = inject(AlertsStore);

  readonly filters: AlertFilter[] = ['ALL', 'PENDING', 'HANDLED'];
  readonly titleKeyFn = alertTitleKey;
  readonly originFn = alertOrigin;

  /** "Todo está bajo control" cuando no hay pendientes. */
  readonly headingKey = computed(() => {
    const n = this.store.pendingCount();
    return n === 0 ? 'alerts.heading.clear' : n === 1 ? 'alerts.heading.one' : 'alerts.heading.many';
  });

  toggle(alert: CareAlert): void {
    if (alert.isPending) this.store.handle(alert);
    else this.store.reopen(alert);
  }
}
