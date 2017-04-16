import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import { VotoService } from "../../services/voto.service";

@Component ( {
  selector   : "app-voto",
  templateUrl: "./voto.component.html",
  styleUrls  : [ "./voto.component.css" ]
} )
export class VotoComponent implements OnInit {
  
  voto : any = {
    nombre       : "",
    valor        : null,
    fechaCreacion: new Date ()
  };
  nuevo : boolean = false;
  id : string;
  private subscription : Subscription;
  msgs : Message[] = [];
  
  constructor ( private _votoService : VotoService,
                private router : Router,
                private route : ActivatedRoute ) {
    
    
  }
  
  ngOnInit () {
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._votoService.getVoto ( this.id )
            .subscribe ( item => this.voto = item );
        }
      } );
  }
  
  guardar ( forma : NgForm ) {
    console.log ( "envio: ", forma );
    //
    console.log ( this.voto );
    
    if ( this.id === "nuevo" ) {
      // Insertando
      this.voto.fechaCreacion = new Date ().getTime ();
      console.log ( "Asignando fecha: ", this.voto );
      this._votoService.nuevoVoto ( this.voto )
        .then ( () => {
          console.log ( "Hecho...!" );
          this.mensajeGuardado ();
        } )
        .catch ( ( error ) => {
          console.error ( error );
          this.mensajeError ();
        } );
    } else {
      // Actualizando
      this._votoService.actualizarVoto ( this.voto, this.id )
        .then ( data => {
            this.mensajeGuardado ();
          },
          error => {
            console.log ( error );
            this.mensajeError ();
          } );
    }
  }
  
  agregarNuevo ( forma : NgForm ) {
    this.router.navigate ( [ "/voto", "nuevo" ] );
    forma.reset ();
  }
  
  mensajeGuardado () {
    this.msgs = [];
    this.msgs.push ( { severity: "success", summary: "Mensaje", detail: "Se ha guardado correctamente" } );
  }
  
  mensajeError () {
    this.msgs = [];
    this.msgs.push ( { severity: "error", summary: "Mensaje", detail: "se ha producido un error...!" } );
  }
  
}
