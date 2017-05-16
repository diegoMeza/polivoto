import { Injectable } from "@angular/core";
import { AngularFire, AuthMethods, AuthProviders } from "angularfire2";
import { Subject } from "rxjs/Subject";
import { Usuario } from "../interfaces/usuario";

@Injectable ()
export class AuthService {
  user : Usuario;
  ingresoUser : boolean = false;
  usuario = new Subject<any> ();
  
  // usuario = this.observador.asObservable ();
  
  
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
        
        this.af.database.list ( "usuarios", {
          query: {
            orderByChild: "email",
            equalTo     : this.user.email
          }
        } ).subscribe ( ( usuario ) => {
          // console.log ( usuario[ 0 ] );
          this.user.uid = usuario[ 0 ].$key;
          this.user.nombre = usuario[ 0 ].nombre;
          this.user.cedula = usuario[ 0 ].cedula;
          this.user.fechaNacimiento = usuario[ 0 ].fechaNacimiento;
          this.user.genero = usuario[ 0 ].genero;
          this.user.idEmpresa = usuario[ 0 ].idEmpresa;
          this.user.nombreEmpresa = usuario[ 0 ].nombreEmpresa;
          this.user.rolUsuario = usuario[ 0 ].rolUsuario;
          this.usuario.next ( this.user );
          console.log ( this.user );
          localStorage.setItem ( "user", JSON.stringify ( this.user ) );
          if ( this.user.rolUsuario == "Admin" ) {
            this.ingresoUser = true;
          }
          
        } );
        
        
      } else {
        this.user = null;
      }
    } );
  }
  
  logOut () {
    // Eliminamos la copia de los datos del usuario en el localStorage
    localStorage.removeItem ( "user" );
    this.user = null;
    this.ingresoUser = false;
    this.af.auth.logout ();
  }
}
