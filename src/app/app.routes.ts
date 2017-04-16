import { RouterModule, Routes } from "@angular/router";
import { EmpresaComponent } from "./componentes/empresa/empresa.component";
import { EmpresasComponent } from "./componentes/empresas/empresas.component";
import { HomeComponent } from "./componentes/home/home.component";
import { VotoComponent } from "./componentes/voto/voto.component";
import { VotosComponent } from "./componentes/votos/votos.component";

const ROUTES : Routes = [
  { path: "home", component: HomeComponent },
  { path: "empresas", component: EmpresasComponent },
  { path: "empresa/:id", component: EmpresaComponent },
  { path: "votos", component: VotosComponent },
  { path: "voto/:id", component: VotoComponent },
  // { path: "buscar", component: SearchComponent },
  // { path: "artista/:id", component: ArtistaComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];
export class RoutingModule {
}
export const APP_ROUTING = RouterModule.forRoot ( ROUTES, { useHash: true } );
