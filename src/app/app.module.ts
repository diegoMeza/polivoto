import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MdTabsModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Configuracion Firebase
import { AngularFireModule } from "angularfire2";
import "hammerjs";
import { ButtonModule, DataTableModule, SharedModule } from "primeng/primeng";
import { firebaseConfig } from "../environments/firebase.config";

import { AppComponent } from "./app.component";
// Configuracion Rutas
import { APP_ROUTING } from "./app.routes";

import { HomeComponent } from "./componentes/home/home.component";
import { LoginComponent } from "./componentes/login/login.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@NgModule ( {
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports     : [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp ( firebaseConfig ),
    BrowserAnimationsModule,
    MdTabsModule,
    APP_ROUTING,
    DataTableModule,
    SharedModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  providers   : [],
  bootstrap   : [ AppComponent ]
} )
export class AppModule {
}
