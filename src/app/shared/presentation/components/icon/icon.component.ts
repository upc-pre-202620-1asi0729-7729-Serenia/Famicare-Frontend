import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Iconos de trazo del prototipo (viewBox 24, stroke 1.8). Los 13 primeros son los del diseño original. */
export type IconName = 'home' | 'location' | 'shield' | 'bell' | 'people' | 'chart' | 'device' | 'battery' | 'clock' | 'arrow' | 'menu' | 'close' | 'check' | 'plus' | 'trash' | 'phone' | 'mail' | 'user' | 'logout' | 'refresh' | 'warning' | 'activity' | 'eye' | 'globe' | 'help' | 'card' | 'lock' | 'target' | 'signal' | 'route';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(20);
}
