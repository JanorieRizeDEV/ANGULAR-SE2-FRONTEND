/*  `src/main.ts` - Punto de entrada del cliente: inicializa la aplicación Angular en el navegador usando `bootstrapApplication`. */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
