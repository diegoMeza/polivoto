import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Voto } from "../interfaces/voto";

@Injectable ()
export class VotoService {
  
  votos : any[] = [];
  
  constructor ( private af : AngularFire ) {
  }
  
  getVotos () : FirebaseListObservable<any> {
    return this.af.database.list ( "votos" );
  }
  
  getVoto ( id : string ) : any {
    return this.af.database.object ( "/votos/" + id );
  }
  
  nuevoVoto ( voto : string ) {
    return this.af.database.list ( "votos" ).push ( voto );
  }
  
  actualizarVoto ( voto : Voto, id : string ) {
    return this.af.database.list ( "votos" ).update ( id, voto );
  }
  
  
}
