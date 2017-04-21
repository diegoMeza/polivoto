import { Inject, Injectable } from "@angular/core";
import { AngularFire, FirebaseApp, FirebaseListObservable } from "angularfire2";
import { Usuario } from "../interfaces/usuario";

@Injectable ()
export class UsuarioService {
  
  usuarios : any[] = [];
  auth : any;
  
  constructor ( private af : AngularFire,
                @Inject ( FirebaseApp ) fa : any ) {
    this.auth = fa.auth ();
  }
  
  getUsuarios () : FirebaseListObservable<any> {
    return this.af.database.list ( "usuarios" );
  }
  
  getUsuario ( id : string ) : any {
    return this.af.database.object ( "/usuarios/" + id );
  }
  
  nuevoUsuario ( usuario : Usuario ) {
    return this.af.database.list ( "usuarios" ).push ( usuario );
  }
  
  actualizarUsuario ( usuario : Usuario, id : string ) {
    return this.af.database.list ( "usuarios" ).update ( id, usuario );
  }
  
  /**
   * Restaurar contraseña del correo
   * @param email
   * @author Carlos Andres
   * @version 17/04/2017
   */
  resetPassword ( email : string ) {
    return this.auth.sendPasswordResetEmail ( email );
    
  }
  
}
