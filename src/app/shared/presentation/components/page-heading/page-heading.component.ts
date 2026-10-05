import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SafeBadgeComponent } from '../safe-badge/safe-badge.component';

/** Encabezado estándar de página: eyebrow + título + descripción + insignia de estado. */
@Component({
  selector: 'app-page-heading',
  standalone: true,
  imports: [SafeBadgeComponent],
  templateUrl: './page-heading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeadingComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly description = input('');
}
