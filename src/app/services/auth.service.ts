import { Injectable } from "@angular/core";
import { AngularFire, AuthMethods, AuthProviders } from "angularfire2";
import { Usuario } from "../interfaces/usuario";

@Injectable ()
export class AuthService {
  user : Usuario = {};
  
  constructor ( private af : AngularFire ) {
    // Validamos si en el localStorage tenemos datos del usuario
    if ( localStorage.getItem ( "user" ) ) {
      this.user = JSON.parse ( localStorage.getItem ( "user" ) );
    } else {
      this.user = null;
    }
  }
  
  
  login ( email : string, password : string ) {
    this.af.auth.login ( {
      email   : email,
      password: password
    }, {
      provider: AuthProviders.Password,
      method  : AuthMethods.Password
    } ).then ( ( data ) => {
      if ( data ) {
        this.user = {
          uid  : data.uid,
          email: data.auth.email
        };
        console.log ( this.user );
        localStorage.setItem ( "user", JSON.stringify ( this.user ) );
      } else {
        this.user = null;
      }
    } );
  }
  
  logOut () {
    // Eliminamos la copia de los datos del usuario en el localStorage
    localStorage.removeItem ( "user" );
    this.user = null;
    this.af.auth.logout ();
  }
}