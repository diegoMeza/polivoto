import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Eleccion } from "../interfaces/eleccion";

@Injectable ()
export class EleccionService {
  
  constructor ( private af : AngularFire ) {
  }
  
  getElecciones () : FirebaseListObservable<any> {
    return this.af.database.list ( "elecciones" );
  }
  
  getEleccion ( id : string ) : any {
    return this.af.database.object ( "/elecciones/" + id );
  }
  
  nuevaEleccion ( eleccion : Eleccion ) {
    return this.af.database.list ( "elecciones" ).push ( eleccion );
  }
  
  actualizarEleccion ( eleccion : Eleccion, id : string ) {
    return this.af.database.list ( "elecciones" ).update ( id, eleccion );
  }
}
