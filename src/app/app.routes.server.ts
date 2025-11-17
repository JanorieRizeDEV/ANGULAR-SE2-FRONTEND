/*  `src/app/app.routes.server.ts` - Rutas específicas para el renderizado en servidor (SSR). */
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
