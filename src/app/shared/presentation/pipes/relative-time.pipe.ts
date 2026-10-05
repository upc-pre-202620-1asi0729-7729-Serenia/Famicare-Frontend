import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { intlLocale } from '../../application/locale';

/** Idioma activo para Intl (es / en). */
function activeLang(t: TranslateService): string {
  return intlLocale(t.currentLang || t.getDefaultLang());
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * "hace 2 min" · "hace 3 h" · "Ayer, 18:42" ...
 * Es impuro a propósito: se recalcula con cada ciclo de detección (cambio de idioma, paso del tiempo).
 */
@Pipe({ name: 'relativeTime', standalone: true, pure: false })
export class RelativeTimePipe implements PipeTransform {
  private readonly translate = inject(TranslateService);

  transform(iso: string | null | undefined): string {
    if (!iso) return '';
    const diffMin = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (diffMin < 1)  return this.translate.instant('time.justNow');
    if (diffMin < 60) return this.translate.instant('time.minutesAgo', { count: diffMin });
    const hours = Math.floor(diffMin / 60);
    if (hours < 24)   return this.translate.instant('time.hoursAgo', { count: hours });
    return formatDayTime(iso, this.translate);
  }
}

/** "Hoy, 08:10" · "Ayer, 18:42" · "Domingo, 16:20" · "3 may, 09:00". */
export function formatDayTime(iso: string, translate: TranslateService): string {
  const date = new Date(iso);
  const lang = activeLang(translate);
  const time = new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);

  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOf(new Date()) - startOf(date)) / 86400000);

  let day: string;
  if (days === 0)      day = translate.instant('time.today');
  else if (days === 1) day = translate.instant('time.yesterday');
  else if (days > 1 && days < 7) day = capitalize(new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(date));
  else day = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short' }).format(date);

  return `${day}, ${time}`;
}

@Pipe({ name: 'dayTime', standalone: true, pure: false })
export class DayTimePipe implements PipeTransform {
  private readonly translate = inject(TranslateService);

  transform(iso: string | null | undefined): string {
    return iso ? formatDayTime(iso, this.translate) : '';
  }
}
