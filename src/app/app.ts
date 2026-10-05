import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const SUPPORTED_LANGS = ['es', 'en'] as const;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    const translate = inject(TranslateService);
    const saved = localStorage.getItem('famicare_lang');
    const lang = SUPPORTED_LANGS.find(l => l === saved) ?? 'es';
    translate.setDefaultLang('es');
    translate.use(lang);
    document.documentElement.lang = lang;
  }
}
