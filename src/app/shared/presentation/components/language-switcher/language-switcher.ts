import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';

interface Language { code: 'es' | 'en'; label: string }

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);
  private readonly host      = inject(ElementRef<HTMLElement>);

  readonly languages: Language[] = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
  ];

  readonly open = signal(false);

  get current(): Language {
    return this.languages.find(l => l.code === this.translate.currentLang) ?? this.languages[0];
  }

  toggle(): void { this.open.update(v => !v); }

  select(lang: Language): void {
    this.translate.use(lang.code);
    localStorage.setItem('famicare_lang', lang.code);
    document.documentElement.lang = lang.code;
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this.host.nativeElement.contains(e.target as Node)) this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.open.set(false); }
}
