import { Component, computed, EventEmitter, HostBinding, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent, IconName } from '../icon/icon.component';
import { DashboardStore } from '../../../../dashboard/application/dashboard.store';

export interface NavItem {
  path: string;
  icon: IconName;
  labelKey: string;
  /** El ítem muestra el contador de alertas pendientes. */
  badge?: boolean;
}

/** Secciones principales: una por bounded context. */
export const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard',    icon: 'home',     labelKey: 'nav.dashboard' },
  { path: '/location',     icon: 'location', labelKey: 'nav.location' },
  { path: '/safe-zones',   icon: 'shield',   labelKey: 'nav.safeZones' },
  { path: '/alerts',       icon: 'bell',     labelKey: 'nav.alerts', badge: true },
  { path: '/care-network', icon: 'people',   labelKey: 'nav.careNetwork' },
  { path: '/activity',     icon: 'chart',    labelKey: 'nav.activity' },
  { path: '/device',       icon: 'device',   labelKey: 'nav.device' },
];

/**
 * Sidebar del prototipo: sticker de marca, navegación con barra coral en el ítem activo,
 * nota de estado y enlace de ayuda. En ≤ 780px funciona como drawer (clase `.is-open`).
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, IconComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly dashboard = inject(DashboardStore);

  readonly navItems = NAV_ITEMS;

  @Input() @HostBinding('class.open') open = false;
  @Output() closed = new EventEmitter<void>();

  readonly senior       = this.dashboard.senior;
  readonly status       = this.dashboard.status;
  readonly pendingCount = this.dashboard.alerts.pendingCount;
  readonly allClear     = computed(() => this.status() !== 'ATTENTION');
}
