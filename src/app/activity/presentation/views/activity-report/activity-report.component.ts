import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageHeadingComponent } from '../../../../shared/presentation/components/page-heading/page-heading.component';
import { IconComponent } from '../../../../shared/presentation/components/icon/icon.component';
import { intlLocale, numberLocale } from '../../../../shared/application/locale';
import { ActivityStore } from '../../../application/activity.store';
import { SeniorStore } from '../../../../senior/application/senior.store';

/** "Actividad y rutinas": reporte semanal. */
@Component({
  selector: 'app-activity-report',
  standalone: true,
  imports: [TranslateModule, PageHeadingComponent, IconComponent],
  templateUrl: './activity-report.component.html',
  styleUrl: './activity-report.component.css',
})
export class ActivityReportComponent {
  readonly store = inject(ActivityStore);
  readonly senior = inject(SeniorStore).senior;
  private readonly translate = inject(TranslateService);

  readonly showDetails = signal(false);

  readonly bestDay = computed(() => {
    const days = this.store.days();
    return days.length ? days.reduce((a, b) => (b.steps > a.steps ? b : a)) : null;
  });

  /** Letra del día para el eje de las barras ("L", "M", "M"…). */
  dayInitial(iso: string): string {
    const d = new Date(`${iso}T12:00:00`);
    return new Intl.DateTimeFormat(intlLocale(this.translate.currentLang), { weekday: 'narrow' }).format(d).toUpperCase();
  }

  dayLong(iso: string): string {
    const d = new Date(`${iso}T12:00:00`);
    const text = new Intl.DateTimeFormat(intlLocale(this.translate.currentLang), { weekday: 'long', day: 'numeric', month: 'short' }).format(d);
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  number(value: number): string {
    return new Intl.NumberFormat(numberLocale(this.translate.currentLang)).format(value);
  }

  sign(value: number): string { return value > 0 ? `+${value}` : `${value}`; }
}
