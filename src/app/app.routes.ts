import { RouterModule, Routes } from "@angular/router";
import { CandidatoComponent } from "./componentes/candidato/candidato.component";
import { CandidatosComponent } from "./componentes/candidatos/candidatos.component";
import { EleccionComponent } from "./componentes/eleccion/eleccion.component";
import { EleccionesComponent } from "./componentes/elecciones/elecciones.component";
import { EmpresaComponent } from "./componentes/empresa/empresa.component";
import { EmpresasComponent } from "./componentes/empresas/empresas.component";
import { HomeComponent } from "./componentes/home/home.component";
import { InscripcionComponent } from "./componentes/inscripcion/inscripcion.component";
import { UsuarioComponent } from "./componentes/usuario/usuario.component";
import { UsuariosComponent } from "./componentes/usuarios/usuarios.component";
import { VotacionComponent } from "./componentes/votacion/votacion.component";
import { VotoComponent } from "./componentes/voto/voto.component";
import { VotosComponent } from "./componentes/votos/votos.component";

const ROUTES : Routes = [
  { path: "home", component: HomeComponent },
  { path: "empresas", component: EmpresasComponent },
  { path: "empresa/:id", component: EmpresaComponent },
  { path: "votos", component: VotosComponent },
  { path: "voto/:id", component: VotoComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "usuario/:id", component: UsuarioComponent },
  { path: "elecciones", component: EleccionesComponent },
  { path: "eleccion/:id", component: EleccionComponent },
  { path: "inscripcion/:id", component: InscripcionComponent },
  { path: "votacion/:id", component: VotacionComponent },
  { path: "candidato/:idPrincipal/:idSecundario", component: CandidatoComponent },
  { path: "candidatos/:id", component: CandidatosComponent },
  // { path: "buscar", component: SearchComponent },
  // { path: "artista/:id", component: ArtistaComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];
export class RoutingModule {
}
export const APP_ROUTING = RouterModule.forRoot ( ROUTES, { useHash: true } );
