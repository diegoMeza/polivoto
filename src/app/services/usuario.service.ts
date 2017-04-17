import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Usuario } from "../interfaces/usuario";

@Injectable ()
export class UsuarioService {
  
  usuarios : any[] = [];
  
  constructor ( private af : AngularFire ) {
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
  
  
}
