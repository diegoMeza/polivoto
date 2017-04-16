import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Empresa } from "../interfaces/Empresa";


@Injectable ()
export class VotacionService {
  
  empresas : any[] = [];
    
  constructor ( private af : AngularFire ) {
  }
  
  crearUsuarios ( email : string, pass : string ) {
    this.af.auth.createUser ( { email: email, password: pass } )
      .then ( ( data ) => {
        console.log ( data );
      } )
      .catch ( ( error ) => {
        console.log ( error );
      } );
  }
  
  getEmpresas () : FirebaseListObservable<any> {
    return this.af.database.list ( "empresas" );
  }
  
  getEmpresa ( id : string ) : any {
    return this.af.database.object ( "/empresas/" + id );
  }
  
  nuevaEmpresa ( empresa : string ) {
    return this.af.database.list ( "empresas" ).push ( empresa );
  }
  
  actualizarEmpresa ( empresa : Empresa, id : string ) {
    return this.af.database.list ( "empresas" ).update ( id, empresa );
  }
  
}
