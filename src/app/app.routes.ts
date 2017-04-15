/**
 * Created by darkklitos on 14/04/17.
 */

import { RouterModule, Routes } from "@angular/router";

const ROUTES : Routes = [
  // { path: 'nombre_ruta', component: nombreComponent },
  // { path: 'nombre_ruta/:id', component: nombreComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'nombre_ruta' },
];

export const APP_ROUTING = RouterModule.forRoot ( ROUTES );
