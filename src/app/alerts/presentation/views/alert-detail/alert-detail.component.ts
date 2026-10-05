import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';
import { DayTimePipe } from '../../../../shared/presentation/pipes/relative-time.pipe';
import { AlertsStore } from '../../../application/alerts.store';
import { alertDescriptionKey, alertOrigin, alertTitleKey } from '../../alert-text';

@Component({
  selector: 'app-alert-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule, PageHeadingComponent, IconComponent, DayTimePipe],
  templateUrl: './alert-detail.component.html',
  styleUrl: './alert-detail.component.css',
})
export class AlertDetailComponent {
  readonly store = inject(AlertsStore);
  private readonly route = inject(ActivatedRoute);

  private readonly id = toSignal(this.route.paramMap.pipe(map(p => Number(p.get('id')))), { initialValue: NaN });

  readonly alert = computed(() => this.store.alerts().find(a => a.id === this.id()) ?? null);

  readonly titleKey = alertTitleKey;
  readonly descriptionKey = alertDescriptionKey;
  readonly origin = alertOrigin;
}
