import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from '../../../../auth/application/auth.store';

/** Chip de perfil de la topbar con su menú (Mi cuenta · Suscripción · Cerrar sesión). */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  private readonly auth   = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly host   = inject(ElementRef<HTMLElement>);

  readonly user = this.auth.currentUser;
  readonly open = signal(false);

  toggle(): void { this.open.update(v => !v); }
  close(): void  { this.open.set(false); }

  logout(): void {
    this.close();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target as Node)) this.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.close(); }
}
