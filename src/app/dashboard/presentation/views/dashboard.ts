import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../shared/presentation/components/page-heading/page-heading.component';
import { MapComponent } from '../../../shared/presentation/components/map/map.component';
import { IconComponent } from '../../../shared/presentation/components/icon/icon.component';
import { RelativeTimePipe } from '../../../shared/presentation/pipes/relative-time.pipe';
import { intlLocale } from '../../../shared/application/locale';
import { AuthStore } from '../../../auth/application/auth.store';
import { DashboardStore } from '../../application/dashboard.store';
import { alertDescriptionKey, alertTitleKey } from '../../../alerts/presentation/alert-text';
import { CareAlert } from '../../../alerts/domain/model/care-alert.entity';

/** "Inicio": resumen de cómo está la persona mayor hoy. */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, TranslateModule, PageHeadingComponent, MapComponent, IconComponent, RelativeTimePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  readonly store = inject(DashboardStore);
  private readonly translate = inject(TranslateService);
  private readonly auth = inject(AuthStore);

  readonly userName = computed(() => this.auth.currentUser()?.firstName ?? '');
  readonly alertTitleKey = alertTitleKey;
  readonly alertDescriptionKey = alertDescriptionKey;

  /** Máx. 3 avatares como en el diseño. */
  readonly avatars = computed(() => this.store.careNetwork.caregivers().slice(0, 3));

  /** "Martes, 14 de mayo" */
  eyebrow(): string {
    const text = new Intl.DateTimeFormat(intlLocale(this.translate.currentLang), {
      weekday: 'long', day: 'numeric', month: 'long',
    }).format(new Date());
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /** Hora de fin de turno formateada ("2:00 p. m."). */
  shiftEnd(time: string | null): string {
    if (!time) return '';
    const [h, m] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return new Intl.DateTimeFormat(intlLocale(this.translate.currentLang), { hour: 'numeric', minute: '2-digit' }).format(d);
  }

  firstName(fullName: string): string { return fullName.split(/\s+/)[0] ?? fullName; }

  shortAddress(address: string, district: string): string {
    return `${address}, ${district.split(',')[0]}`;
  }

  toggleSpotlight(alert: CareAlert): void {
    if (alert.isPending) this.store.alerts.handle(alert);
    else this.store.alerts.reopen(alert);
  }
}
