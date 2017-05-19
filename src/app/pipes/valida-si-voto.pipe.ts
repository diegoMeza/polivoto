import { Pipe, PipeTransform } from "@angular/core";

@Pipe ( {
  name: "validaSiVoto"
} )
export class ValidaSiVotoPipe implements PipeTransform {
  
  transform ( value : any, usuario? : any, listaSufragantes? : any ) : any {
    // console.log ( "Usuario", usuario );
    // console.log ( "Lista", listaSufragantes );
    
    for ( let sufragante of listaSufragantes ) {
      if ( sufragante.id == usuario.uid ) {
        if ( sufragante.isVoto ) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  }
  
}
