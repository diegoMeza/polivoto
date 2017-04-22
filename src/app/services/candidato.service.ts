import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Injectable ()
export class CandidatoService {
  
  constructor ( private af : AngularFire ) {
  }
  
  
  getCandidatos ( id : string ) : FirebaseListObservable<any> {
    return this.af.database.list ( `elecciones/${id}/listaCandidatos` );
  }
  
  getCandidato ( idPrincipal : string, idSecundario ) : any {
    return this.af.database.list ( `elecciones/${idPrincipal}/listaCandidatos`, {
      query: {
        orderByChild: "id",
        equalTo     : idSecundario
      }
    } );
    
  }
}
