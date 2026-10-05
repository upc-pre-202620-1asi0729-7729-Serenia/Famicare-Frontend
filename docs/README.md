# FamiCare · Frontend (Angular)

Aplicación web para acompañar el cuidado de una persona mayor: ubicación en vivo, zonas seguras,
alertas, red de cuidado, actividad y estado de la pulsera. El diseño sale del prototipo de Figma
(estilo "pizarra") y la estructura de carpetas sigue la del proyecto base.

## Estructura (un bounded context por pantalla principal)

```
src/app/
├── auth/            Acceso, registro, recuperar contraseña y "Mi cuenta / Suscripción"
├── senior/          Persona mayor cuidada (datos básicos)
├── dashboard/       Inicio — vista de conjunto que combina los demás contextos
├── location/        Ubicación — posición actual e historial
├── safe-zones/      Zonas seguras — geocercas (crear, activar, eliminar)
├── alerts/          Alertas — centro de alertas y detalle
├── care-network/    Red de cuidado — cuidadores (invitar, quitar)
├── activity/        Actividad — reporte semanal y rutina de hoy
├── device/          Dispositivo — estado de la pulsera (sincronizar, probar botón de ayuda)
└── shared/          Layout, sidebar, mapa ilustrado, iconos, pipes y clases base
```

Cada contexto mantiene las mismas capas del proyecto base:

```
<contexto>/
├── <contexto>.routes.ts
├── domain/model/*.entity.ts
├── infrastructure/   *-response.ts · *-assembler.ts · *-api-endpoint.ts · *-api.ts
├── application/      *.store.ts  (signals)
└── presentation/views/…
```

## Backend simulado

Todavía no existe la API de FamiCare, así que `shared/infrastructure/fake-backend.interceptor.ts`
responde a las rutas REST (`/alerts`, `/safe-zones`, `/caregivers`, `/devices/current`, …) con los datos
del prototipo, en memoria. Las clases `*-api.ts` ya usan `HttpClient` + `environment.apiBase`, por lo que
**conectar el backend real solo requiere poner `useFakeBackend: false`** en `src/environments/environment.ts`
(y ajustar `apiBase`). Cuenta de demostración: `valeria@famicare.com` / `famicare123`.

## Diseño y responsive

- `src/styles.css` contiene los tokens del prototipo y sus clases (`chalk-card`, `module-board`, `map-board`, …).
- Cortes responsive idénticos al prototipo: **1050 px**, **780 px** (el sidebar pasa a drawer) y **560 px**.
- Textos en `src/assets/i18n/es.json` y `en.json` (español por defecto; selector de idioma en la barra superior).
- Iconos propios en `shared/presentation/components/icon` (sin dependencia de Material Icons).

## Notas

- `material-theme.scss` se conserva vacío para no romper la referencia en `angular.json`; ya no se usa Angular Material.
- Diagramas de clases en `src/docs/class-diagrams-frontend/*.puml`.
