import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Eleccion } from "../interfaces/eleccion";
import { Usuario } from "../interfaces/usuario";

@Injectable ()
export class EleccionService {
  
  constructor ( private af : AngularFire ) {
  }
  
  getElecciones ( user : Usuario ) : FirebaseListObservable<any> {
    return this.af.database.list ( "elecciones", {
      query: {
        orderByChild: "idEmpresa",
        equalTo     : user.idEmpresa
      }
    } );
  }
  
  // getUsuario ( user : Usuario ) : FirebaseListObservable<any> {
  //   return this.af.database.list ( "usuarios", {
  //     query: {
  //       orderByChild: "email",
  //       equalTo     : user.email
  //     }
  //   } );
  // }
  
  
  getEleccion ( id : string ) : any {
    return this.af.database.object ( "/elecciones/" + id );
  }
  
  nuevaEleccion ( eleccion : Eleccion ) {
    return this.af.database.list ( "elecciones" ).push ( eleccion );
  }
  
  actualizarEleccion ( eleccion : Eleccion, id : string ) {
    return this.af.database.list ( "elecciones" ).update ( id, eleccion );
  }
  
  actualizarVotante ( votante : any, idEleccion : string, id : any ) {
    return this.af.database.list ( `elecciones/${idEleccion}/listaSufragantes/` ).update ( id, votante );
  }
  
}
