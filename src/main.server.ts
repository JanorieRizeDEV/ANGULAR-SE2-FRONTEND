/*  `src/main.server.ts` - Punto de entrada para renderizado en servidor (SSR). Exporta la función de bootstrap usada por el runtime del servidor. */
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
