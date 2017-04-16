import { Injectable } from "@angular/core";
import { AngularFire } from "angularfire2";
import { Empresa } from "../interfaces/Empresa";


@Injectable ()
export class VotacionService {
  
  empresas : any[] = [ {
    key$         : "abc",
    nombre       : "Aviatur S.A",
    nit          : 890100577,
    estado       : true,
    fechaCreacion: new Date ()
  }, {
    key$         : "def",
    nombre       : "Avianca S.A.",
    nit          : 860003524,
    estado       : false,
    fechaCreacion: new Date ( "2017/01/19" )
  } ];
  
  temp : any[] = [];
  emp : any;
  
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
  
  getEmpresas () {
    return this.empresas;
  }
  
  getEmpresa ( id : string ) : any {
    this.temp = this.empresas.filter ( ( empresa ) => {
      return empresa.key$ === id;
    } );
    return this.temp[ 0 ];
  }
  
  nuevaEmpresa ( empresa : string ) {
    this.empresas.push ( empresa );
  }
  
  actualizarEmpresa ( empresa : Empresa, id : string ) {
    
    for ( this.emp in this.empresas ) {
      if ( this.emp.id === id ) {
        this.emp.nombre = empresa.nombre;
      }
    }
    return this.empresas;
  }
  
}
