import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
// Configuracion Firebase
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "../environments/firebase.config";

import { AppComponent } from "./app.component";
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule ( {
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports     : [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp ( firebaseConfig )
  ],
  providers   : [],
  bootstrap   : [ AppComponent ]
} )
export class AppModule {
}
