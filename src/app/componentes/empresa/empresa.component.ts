import { Component, OnInit } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VotacionService } from "../../services/votacion.service";

@Component ( {
  selector   : "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls  : [ "./empresa.component.css" ]
} )
export class EmpresaComponent implements OnInit {
  empresa : any = {
    nombre       : "",
    nit          : null,
    estado       : false,
    fechaCreacion: new Date ()
  };
  nuevo : boolean = false;
  id : string;
  forma : FormGroup;
  
  constructor ( private _votacionService : VotacionService,
                private router : Router,
                private route : ActivatedRoute ) {
    
    
    this.route.params
      .subscribe ( parametro => {
        // console.log ( "Este es el parametro enviado", parametro );
        this.id = parametro[ "id" ];
        console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.empresa = this._votacionService.getEmpresa ( this.id );
          console.log ( this.empresa );
        }
      } );
  }
  
  ngOnInit () {
  
  }
  
  guardar ( forma : NgForm ) {
    console.log ( "envio: ", forma );
    //
    console.log ( this.empresa );
    
    if ( this.id === "nuevo" ) {
      // Insertando
      this._votacionService.nuevaEmpresa ( this.empresa );
      // .subscribe ( data => {
      //     this.router.navigate ( [ "/heroe", data.name ] );
      //     console.log ( data.name );
      //   },
      //   error => console.log ( error ) );
    } else {
      // Actualizando
      this._votacionService.actualizarEmpresa ( this.empresa, this.id );
      // .subscribe ( data => {
      //     console.log ( data );
      //   },
      //   error => console.log ( error ) );
    }
  }
  
  agregarNuevo ( forma : NgForm ) {
    this.router.navigate ( [ "/empresa", "nuevo" ] );
    forma.reset ();
  }
  
}
