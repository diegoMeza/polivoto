import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import { Empresa } from "../../interfaces/Empresa";
// import * as moment from "../../../../functions/node_modules/moment/moment";
import { EleccionService } from "../../services/eleccion.service";
import { VotacionService } from "../../services/votacion.service";

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
  msgs : Message[] = [];
  empresas = [];
  
  private subscription : Subscription;
  
  constructor ( private _eleccionService : EleccionService,
                private router : Router,
                private route : ActivatedRoute,
                private _votacionServices : VotacionService ) {
  }
  
  ngOnInit () {
    
    this.getEmpresas ();
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        // console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._eleccionService.getEleccion ( this.id )
            .subscribe ( item => {
              // console.log ( item );
              this.eleccion = item;
              console.log ( item );
              this.eleccion.feInicio = this.convetirFecha ( this.eleccion.feInicio );
              this.eleccion.feCierre = this.convetirFecha ( this.eleccion.feCierre );
              this.eleccion.feCierreInscripcion = this.convetirFecha ( this.eleccion.feCierreInscripcion );
            } );
          // this.eleccion.feInicio = new Date ();
          // this.eleccion.feCierre = new Date ();
        }
      } );
    
  }
  
  guardar ( forma : NgForm ) {
    console.log ( "envio: ", forma );
    this.eleccion.feInicio = this.eleccion.feInicio.getTime ();
    this.eleccion.feCierre = this.eleccion.feCierre.getTime ();
    this.eleccion.feCierreInscripcion = this.eleccion.feCierreInscripcion.getTime ();
    
    
    if ( this.id === "nuevo" ) {
      // Insertando
      this.eleccion.fechaCreacion = new Date ().getTime ();
      this.eleccion.listaVotos = [ 0 ];
      this.eleccion.candidatosInscritos = [ 0 ];
      this.eleccion.sufragantesInscritos = [ 0 ];
      console.log ( "Asignando fecha: ", this.eleccion );
      this._eleccionService.nuevaEleccion ( this.eleccion )
        .then ( () => {
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
    this.eleccion.feCierreInscripcion = this.convetirFecha ( this.eleccion.feCierreInscripcion );
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
  
  /**
   * Metodo que recupera todas la empresas de la db
   * @author Carlos Andres
   * @version 16/04/2017
   */
  getEmpresas () {
    this._votacionServices.getEmpresas ()
      .subscribe ( ( empresas ) => {
        this.empresas = empresas;
        console.log ( this.empresas );
      } );
  }
  
  /**
   * Metodo que guarda el nombre de la empresa en el usuario
   * @param empresa
   * @author Carlos Andres
   * @version 16/04/2017
   */
  guardarEmpresa ( empresa : Empresa ) {
    console.log ( empresa );
    this.eleccion.nombreEmpresa = empresa.nombre;
  }
  
}
