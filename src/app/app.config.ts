import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { jwtInterceptor } from './auth/infrastructure/jwt.interceptor';
import { fakeBackendInterceptor } from './shared/infrastructure/fake-backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })),
    // El fake backend va último: ve la petición ya con el token y responde sin salir a la red.
    provideHttpClient(withInterceptors([jwtInterceptor, fakeBackendInterceptor])),
    provideTranslateService({
      defaultLanguage: 'es',
      useDefaultLang: true,
      fallbackLang: 'es',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
  ]
};
