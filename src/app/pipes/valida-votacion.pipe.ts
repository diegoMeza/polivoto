import { Pipe, PipeTransform } from "@angular/core";
import { EleccionService } from "../services/eleccion.service";

// import * as moment from "../../../../functions/node_modules/moment/moment";

@Pipe ( {
  name: "validaVotacion"
} )
export class ValidaVotacionPipe implements PipeTransform {
  
  listaCandidatos : any[] = [];
  listaSufragantes : any[] = [];
  esCandidato : boolean = false;
  esSufragante : boolean = false;
  
  
  constructor ( private  _eleccionServices : EleccionService ) {
  }
  
  transform ( value : any, usuario? : any, listaElecciones? : any ) : boolean {
    
    if ( usuario ) {
      // console.log ( "Parametro Usuario: ", usuario );
      // console.log ( "Parametro Parametro: ", listaElecciones );
      
      // console.log ( !(new Date ().getTime () > listaElecciones.feCierreInscripcion) );
      
      if ( (new Date ().getTime () > listaElecciones.feCierreInscripcion) ) {
        return true;
        
      } else {
        
        this.listaCandidatos = listaElecciones.listaCandidatos;
        // console.log ( "Candidatos", this.listaCandidatos );
        this.listaSufragantes = listaElecciones.listaSufragantes;
        // console.log ( "Sufragantes", this.listaSufragantes );
        for ( let candidato of this.listaCandidatos ) {
          if ( candidato.id == usuario.uid ) {
            this.esCandidato = true;
            // console.log ( "Entro" );
          }
        }
        
        for ( let sufragante of this.listaSufragantes ) {
          if ( sufragante.id == usuario.uid ) {
            this.esSufragante = true;
            // console.log ( "Entro" );
          }
        }
        
        if ( this.esCandidato && this.esSufragante ) {
          this.esCandidato = false;
          this.esSufragante = false;
          return true;
        } else {
          this.esCandidato = false;
          this.esSufragante = false;
          return false;
        }
        
      }
      
      
    }
    
    // if ( listaElecciones[ 0 ] !== undefined ) {
    //   console.log ( "Parametro lista: ", listaElecciones );
    // }
    
    
    // console.log ( "Parametro Lista: ", listaCandidatos.subscribe ( ( data ) => console.log ( data ) ) );
    // console.log ( "Parametro Lista: ", listaSufragantes );
    // this._eleccionServices.getElecciones ( usuario )
    //   .subscribe ( ( data ) => console.log ( data ) );
    //
    // return true;
  }
  
}
