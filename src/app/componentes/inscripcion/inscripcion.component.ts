import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../services/auth.service";
import { EleccionService } from "../../services/eleccion.service";

@Component ( {
  selector   : "app-inscripcion",
  templateUrl: "./inscripcion.component.html",
  styleUrls  : [ "./inscripcion.component.css" ]
} )
export class InscripcionComponent implements OnInit {
  inscripcion : any = {};
  tipoInscripcion : any[] = [ { nombre: "Candidato", valor: 0 }, { nombre: "Sufragante", valor: 1 } ];
  id : string;
  private subscription : Subscription;
  eleccion : any = {};
  loading : boolean = false;
  msgs : Message[] = [];
  
  listaCandTemp : any[] = [];
  listaSufraTemp : any[] = [];
  flag : boolean = false;
  
  constructor ( private _eleccionService : EleccionService,
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
              if ( !(this.eleccion.candidatosInscritos <= this.eleccion.noCandidatos) ) {
                this.loading = true;
                this.inscripcion.tipo = 1;
              }
              if ( this.eleccion.listaCandidatos == null ) {
                this.listaCandTemp = [];
              } else {
                this.listaCandTemp = this.eleccion.listaCandidatos;
              }
              
              if ( this.eleccion.listaSufragantes == null ) {
                this.listaSufraTemp = [];
              } else {
                this.listaSufraTemp = this.eleccion.listaSufragantes;
              }
              
            } );
          // this.eleccion.feInicio = new Date ();
          // this.eleccion.feCierre = new Date ();
        }
      } );
  }
  
  ngOnInit () {
  }
  
  guardar ( forma : NgForm ) {
    // console.log ( "envio: ", forma );
    console.log ( forma.value );
    // console.log ( this.id );
    if ( this.inscripcion.tipo > 0 ) {
      this.estaInscrito ( this._authServices.user.uid, this.listaSufraTemp );
      if ( this.flag ) {
        this.eleccion.sufragantesInscritos = this.eleccion.sufragantesInscritos + 1 | 1;
        let tempSufr = {
          nombre: this._authServices.user.nombre,
          id    : this._authServices.user.uid,
          isVoto: false
        };
        this.listaSufraTemp.push ( tempSufr );
        this.eleccion.listaSufragantes = this.listaSufraTemp;
        tempSufr = null;
      }
    } else {
      this.estaInscrito ( this._authServices.user.uid, this.listaCandTemp );
      if ( this.flag ) {
        this.eleccion.candidatosInscritos = this.eleccion.candidatosInscritos + 1 | 1;
        let tempCand = {
          nombre         : this._authServices.user.nombre,
          id             : this._authServices.user.uid,
          img            : "https://firebasestorage.googleapis.com/v0/b/poli-voto.appspot.com/o/noimage.png?alt=media&token=3d756b53-845f-4dcb-bdd1-a6cb3ffd3be1",
          genero         : this._authServices.user.genero,
          idListaVotacion: this.eleccion.candidatosInscritos,
          feNacimiento   : this._authServices.user.fechaNacimiento,
          isVoto         : false
        };
        this.listaCandTemp.push ( tempCand );
        this.eleccion.listaCandidatos = this.listaCandTemp;
        tempCand = null;
      }
    }
    if ( this.flag ) {
      this._eleccionService.actualizarEleccion ( this.eleccion, this.id )
        .then ( data => {
            this.mensajeGuardado ();
            this.router.navigate ( [ "/elecciones" ] );
          },
          error => {
            console.log ( error );
            this.mensajeError ();
          } );
    } else {
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
  
  estaInscrito ( uid : string, lista : any[] ) : boolean {
    if ( lista.length == 0 ) {
      this.flag = true;
      return this.flag;
    } else {
      for ( let person of lista ) {
        if ( person.id == uid ) {
          this.flag = false;
          return this.flag;
        }
      }
      this.flag = true;
      return this.flag;
    }
  }
  
}
