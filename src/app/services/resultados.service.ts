import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Injectable ()
export class ResultadosService {
  
  constructor ( private af : AngularFire ) {
  }
  
  getResultados ( idEleccion : string, tipo : string ) : FirebaseListObservable<any> {
    return this.af.database.list ( `elecciones/${idEleccion}/listaVotos`, {
      query: {
        orderByChild: "nombreCandidato",
        equalTo     : tipo
      }
    } );
  }
  
}
