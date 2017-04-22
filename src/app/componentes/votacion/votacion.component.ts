import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../services/auth.service";
import { EleccionService } from "../../services/eleccion.service";
import { VotoService } from "../../services/voto.service";

@Component ( {
  selector   : "app-votacion",
  templateUrl: "./votacion.component.html",
  styleUrls  : [ "./votacion.component.css" ]
} )
export class VotacionComponent implements OnInit {
  
  votacion : any = {};
  tipoVotacion : any[] = [];
  id : string;
  private subscription : Subscription;
  msgs : Message[] = [];
  eleccion : any = {};
  voto : string;
  fechaActual : any;
  sufragantes : any[];
  votantes : any[];
  isVotante : boolean;
  
  constructor ( private _eleccionService : EleccionService,
                private _votoService : VotoService,
                private router : Router,
                private route : ActivatedRoute,
                public _authServices : AuthService ) {
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        // console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._eleccionService.getEleccion ( this.id )
            .subscribe ( item => {
              // console.log ( item );
              this.eleccion = item;
              if ( this.eleccion.listaVotos.sufragantes == null ) {
                this.sufragantes = [];
              } else {
                this.sufragantes = this.eleccion.listaVotos.sufragantes;
              }
            } );
        }
      } );
  }
  
  ngOnInit () {
    this.getTiposVotos ();
    this.fechaActual = new Date ().getTime ();
    
  }
  
  /**
   * Metodo que recupera todas la voto de la db
   * @author Carlos Andres
   * @version 16/04/2017
   */
  getTiposVotos () {
    this._votoService.getVotos ()
      .subscribe ( ( votos ) => {
        this.tipoVotacion = votos;
        // console.log ( this.tipoVotacion );
      } );
  }
  
  guardar ( forma : NgForm ) {
    // console.log ( "envio: ", forma );
    console.log ( this.eleccion.listaCandidatos );
    // console.log ( this.voto );
    
    for ( let votante of this.sufragantes ) {
      if ( votante == this._authServices.user.uid ) {
        this.isVotante = true;
      } else {
        this.isVotante = false;
      }
    }
    
    if ( !this.isVotante ) {
      if ( this.voto == "Anulado" ) {
        this.eleccion.listaVotos.anunulo = this.eleccion.listaVotos.anunulo + 1 | 1;
      } else if ( this.voto == "A Favor" ) {
        this.eleccion.listaVotos.valido = this.eleccion.listaVotos.valido + 1 | 1;
      } else {
        this.eleccion.listaVotos.blanco = this.eleccion.listaVotos.blanco + 1 | 1;
      }
      this.sufragantes.push ( this._authServices.user.uid );
      this.eleccion.listaVotos.sufragantes = this.sufragantes;
      this.sufragantes = [];
      
      if ( this.id !== "nuevo" ) {
        // Actualizando
        console.log ( this.eleccion, this.id );
        this._eleccionService.actualizarEleccion ( this.eleccion, this.id )
          .then ( data => {
              this.mensajeGuardado ();
              this.router.navigate ( [ "/elecciones" ] );
            },
            error => {
              console.log ( error );
              this.mensajeError ();
            } );
      }
    } else {
      this.sufragantes = [];
      this.router.navigate ( [ "/elecciones" ] );
    }
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


