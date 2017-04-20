import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
// import * as moment from "../../../../functions/node_modules/moment/moment";
import { EleccionService } from "../../services/eleccion.service";

@Component ( {
  selector   : "app-eleccion",
  templateUrl: "./eleccion.component.html",
  styleUrls  : [ "./eleccion.component.css" ]
} )
export class EleccionComponent implements OnInit {
  
  
  // startdate = moment ().subtract ( 20, "years" ).format ( "YYYY/MM/DD" );
  eleccion : any = {};
  nuevo : boolean = false;
  id : string;
  private subscription : Subscription;
  msgs : Message[] = [];
  
  constructor ( private _eleccionService : EleccionService,
                private router : Router,
                private route : ActivatedRoute ) {
  }
  
  ngOnInit () {
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        // console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._eleccionService.getEleccion ( this.id )
            .subscribe ( item => {
              // console.log ( item );
              this.eleccion = item;
              this.eleccion.feInicio = this.convetirFecha ( item.feInicio );
              this.eleccion.feCierre = this.convetirFecha ( item.feCierre );
            } );
          this.eleccion.feInicio = new Date ();
          this.eleccion.feCierre = new Date ();
        }
      } );
    
  }
  
  guardar ( forma : NgForm ) {
    console.log ( "envio: ", forma );
    this.eleccion.feInicio = this.eleccion.feInicio.getTime ();
    this.eleccion.feCierre = this.eleccion.feCierre.getTime ();
    
    
    if ( this.id === "nuevo" ) {
      // Insertando
      this.eleccion.fechaCreacion = new Date ().getTime ();
      this.eleccion.listaVotos = {
        blanco : 0,
        valido : 0,
        anunulo: 0
      };
      console.log ( "Asignando fecha: ", this.eleccion );
      this._eleccionService.nuevaEleccion ( this.eleccion )
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
      this._eleccionService.actualizarEleccion ( this.eleccion, this.id )
        .then ( data => {
            this.mensajeGuardado ();
          },
          error => {
            console.log ( error );
            this.mensajeError ();
          } );
    }
    this.eleccion.feInicio = this.convetirFecha ( this.eleccion.feInicio );
    this.eleccion.feCierre = this.convetirFecha ( this.eleccion.feCierre );
  }
  
  agregarNuevo ( forma : NgForm ) {
    this.router.navigate ( [ "/eleccion", "nuevo" ] );
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
  
  /**
   * Convierte un fecha en timestamp
   * @param fecha
   * @returns {number}
   */
  convetirFecha ( fecha : any ) : Date {
    // console.log ( fecha );
    return new Date ( fecha );
    
  }
  
}
