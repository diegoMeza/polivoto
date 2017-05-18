import { Pipe, PipeTransform } from "@angular/core";

@Pipe ( {
  name: "sinpropuesta"
} )
export class PropuestaPipe implements PipeTransform {
  
  transform ( value : any ) : any {
    // console.log ( value );
    let msg = "Sin Propuesta";
    if ( !value ) {
      return msg;
    }
    return (value.length > 0) ? value : msg;
    
  }
  
}
