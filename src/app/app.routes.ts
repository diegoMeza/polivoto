import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./componentes/home/home.component";

const ROUTES : Routes = [
  { path: "home", component: HomeComponent },
  // { path: "buscar", component: SearchComponent },
  // { path: "artista/:id", component: ArtistaComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];
export class RoutingModule {
}
export const APP_ROUTING = RouterModule.forRoot ( ROUTES, { useHash: true } );
