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
  msgs : Message[] = [];
  eleccion : any = {};
  voto : string = "";
  fechaActual : any;
  sufragantes : any[];
  votantes : any[];
  isVotante : boolean;
  // candidatos : Candidato[] = [];
  candidatos : any[] = [];
  idCandidato : string = "";
  private subscription : Subscription;
  
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
              if ( this.eleccion.listaSufragantes == null ) {
                this.sufragantes = [];
              } else {
                this.sufragantes = this.eleccion.listaSufragantes;
              }
              if ( this.eleccion.listaCandidatos == null ) {
                this.candidatos = [];
              } else {
                this.candidatos = this.eleccion.listaCandidatos;
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
    // console.log ( this.eleccion.$key );
    let candSeleccionado = {};
    let listaVotos = this.eleccion.listaVotos;
    let sufragante = {
      id    : "",
      isVoto: false,
      nombre: ""
    };
    
    // console.log ( this.voto );
    // console.log ( this.idCandidato );
    // console.log ( this.candidatos );
    if ( !(this.idCandidato == "" && this.voto == "") ) {
      
      if ( this.voto ) {
        if ( this.voto == "Anulado" ) {
          candSeleccionado = {
            nombre         : this.voto,
            nombreCandidato: this.voto,
            valor          : 1
          };
        } else {
          candSeleccionado = {
            nombre         : this.voto,
            nombreCandidato: this.voto,
            valor          : 1
          };
        }
      }
      
      if ( this.idCandidato ) {
        for ( let candidato of this.candidatos ) {
          if ( candidato.id == this.idCandidato ) {
            candSeleccionado = {
              nombre         : "Positivo",
              nombreCandidato: candidato.nombre,
              valor          : 1
            };
            
          }
        }
      }
      
      if ( listaVotos[ 0 ] == 0 ) {
        listaVotos = [];
        listaVotos.push ( candSeleccionado );
      } else {
        listaVotos.push ( candSeleccionado );
      }
      
      // console.log ( listaVotos );
      // console.log ( this.sufragantes );
      let i = 0;
      for ( let votante of this.sufragantes ) {
        if ( votante.id == this._authServices.user.uid ) {
          sufragante = votante;
          sufragante.isVoto = true;
          // console.log ( sufragante );
          // this._eleccionService.actualizarVotante ( sufragante, this.eleccion.$key, i );
          this.isVotante = true;
        }
        i++;
      }
      
      if ( this.id !== "nuevo" ) {
        this.eleccion.listaVotos = listaVotos;
        // Actualizando
        // console.log ( this.eleccion, this.id );
        this._eleccionService.actualizarEleccion ( this.eleccion, this.id )
          .then ( () => {
              this.mensajeGuardado ();
            },
            error => {
              console.log ( error );
              this.mensajeError ();
            } );
      }
    } else {
      this.mensajeErrorParametro ( "Seleccione un Candidato o un tipo de voto" );
    }
    
    //
    // if ( !this.isVotante ) {
    //   if ( this.voto == "Anulado" ) {
    //     this.eleccion.listaVotos.anunulo = this.eleccion.listaVotos.anunulo + 1 | 1;
    //   } else if ( this.voto == "A Favor" ) {
    //     this.eleccion.listaVotos.valido = this.eleccion.listaVotos.valido + 1 | 1;
    //   } else {
    //     this.eleccion.listaVotos.blanco = this.eleccion.listaVotos.blanco + 1 | 1;
    //   }
    //   this.sufragantes.push ( this._authServices.user.uid );
    //   this.eleccion.listaVotos.sufragantes = this.sufragantes;
    //   this.sufragantes = [];
    //
    //   if ( this.id !== "nuevo" ) {
    //     // Actualizando
    //     console.log ( this.eleccion, this.id );
    //     this._eleccionService.actualizarEleccion ( this.eleccion, this.id )
    //       .then ( data => {
    //           this.mensajeGuardado ();
    //           this.router.navigate ( [ "/elecciones" ] );
    //         },
    //         error => {
    //           console.log ( error );
    //           this.mensajeError ();
    //         } );
    //   }
    // } else {
    //   this.sufragantes = [];
    //   this.router.navigate ( [ "/elecciones" ] );
    // }
  }
  
  mensajeGuardado () {
    this.msgs = [];
    this.msgs.push ( { severity: "success", summary: "Mensaje", detail: "Se ha guardado correctamente" } );
  }
  
  mensajeError () {
    this.msgs = [];
    this.msgs.push ( { severity: "error", summary: "Mensaje", detail: "se ha producido un error...!" } );
  }
  
  mensajeErrorParametro ( mensaje : string ) {
    this.msgs = [];
    this.msgs.push ( { severity: "error", summary: "Mensaje", detail: mensaje } );
  }
  
  seleccionarVoto ( voto : any ) {
    // console.log ( voto.value );
    if ( voto.value.length > 0 ) {
      this.idCandidato = "";
    }
  }
  
  seleccionarCandidato ( candidato : any ) {
    // console.log ( candidato.value );
    if ( candidato.value.length > 0 ) {
      this.voto = "";
    }
  }
}


