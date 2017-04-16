import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import { VotacionService } from "../../services/votacion.service";

@Component ( {
  selector   : "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls  : [ "./empresa.component.css" ]
} )
export class EmpresaComponent implements OnInit, OnDestroy {
  empresa : any = {
    nombre       : "",
    nit          : null,
    estado       : false,
    fechaCreacion: new Date ()
  };
  nuevo : boolean = false;
  id : string;
  private subscription : Subscription;
  msgs : Message[] = [];
  
  constructor ( private _votacionService : VotacionService,
                private router : Router,
                private route : ActivatedRoute ) {
    
    
  }
  
  ngOnInit () {
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._votacionService.getEmpresa ( this.id )
            .subscribe ( item => this.empresa = item );
        }
      } );
  }
  
  ngOnDestroy () {
    this.subscription.unsubscribe ();
  }
  
  guardar ( forma : NgForm ) {
    console.log ( "envio: ", forma );
    //
    console.log ( this.empresa );
    
    if ( this.id === "nuevo" ) {
      // Insertando
      this.empresa.fechaCreacion = new Date ().getTime ();
      console.log ( "Asignando fecha: ", this.empresa );
      this._votacionService.nuevaEmpresa ( this.empresa )
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
      this._votacionService.actualizarEmpresa ( this.empresa, this.id )
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
    this.router.navigate ( [ "/empresa", "nuevo" ] );
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
