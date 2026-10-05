import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sidebar } from '../sidebar/sidebar';
import { UserProfile } from '../user-profile/user-profile';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { IconComponent } from '../icon/icon.component';
import { AlertsStore } from '../../../../alerts/application/alerts.store';

/**
 * Shell de la aplicación (diseño "Pizarra"):
 * sidebar fija + topbar sticky + contenido. En ≤ 780px el sidebar es un drawer con scrim.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslateModule, Sidebar, UserProfile, LanguageSwitcher, IconComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private readonly router = inject(Router);
  readonly alerts = inject(AlertsStore);

  menuOpen = false;

  constructor() {
    // El drawer móvil se cierra solo al navegar.
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => (this.menuOpen = false));
  }

  openMenu(): void  { this.menuOpen = true; }
  closeMenu(): void { this.menuOpen = false; }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.closeMenu(); }
}
