import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';

/** Mapa ilustrado del prototipo: calles dibujadas, zona segura, ruta y pin de la persona. */
@Component({
  selector: 'app-map-board',
  standalone: true,
  imports: [IconComponent, TranslateModule],
  templateUrl: './map.component.html',
  styles: [':host { display: block; width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  /** Versión reducida (tarjetas del Inicio y Zonas seguras). */
  readonly compact = input(false);
  /** Iniciales dentro del pin. */
  readonly initials = input('');
  /** Etiqueta de la zona segura dibujada (p. ej. "Parque Castilla"). */
  readonly zoneLabel = input('');
  /** Etiqueta del hogar. */
  readonly homeLabel = input('');
  /** Mensaje accesible que describe el mapa. */
  readonly description = input('');
}
