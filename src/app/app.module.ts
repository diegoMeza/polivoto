import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MdCheckboxModule, MdTabsModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MomentModule } from "angular2-moment";
// Configuracion Firebase
import { AngularFireModule } from "angularfire2";
import "hammerjs";
import { ButtonModule, CheckboxModule, DataTableModule, GrowlModule, SharedModule } from "primeng/primeng";
import { firebaseConfig } from "../environments/firebase.config";

import { AppComponent } from "./app.component";
// Configuracion Rutas
import { APP_ROUTING } from "./app.routes";
import { EmpresaComponent } from "./componentes/empresa/empresa.component";
import { EmpresasComponent } from "./componentes/empresas/empresas.component";

import { HomeComponent } from "./componentes/home/home.component";
import { LoginComponent } from "./componentes/login/login.component";
import { VotoComponent } from "./componentes/voto/voto.component";
import { VotosComponent } from "./componentes/votos/votos.component";
import { KeysPipe } from "./pipes/keys.pipe";
import { VotacionService } from "./services/votacion.service";
import { VotoService } from "./services/voto.service";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@NgModule ( {
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    EmpresaComponent,
    EmpresasComponent,
    KeysPipe,
    FooterComponent,
    VotoComponent,
    VotosComponent,
  ],
  imports     : [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp ( firebaseConfig ),
    BrowserAnimationsModule,
    MdTabsModule,
    MdCheckboxModule,
    APP_ROUTING,
    DataTableModule,
    SharedModule,
    ButtonModule,
    ReactiveFormsModule,
    MomentModule,
    CheckboxModule,
    GrowlModule
  ],
  providers   : [ { provide: LOCALE_ID, useValue: "es" },
    VotacionService,
    VotoService
  ],
  bootstrap   : [ AppComponent ]
} )
export class AppModule {
}
