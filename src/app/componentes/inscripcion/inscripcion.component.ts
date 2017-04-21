import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
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
  
  
  constructor ( private _eleccionService : EleccionService,
                private router : Router,
                private route : ActivatedRoute ) {
    
    
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
              console.log ( item );
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
    console.log ( this.id );
    if ( this.inscripcion.tipo > 0 ) {
      this.eleccion.sufragantesInscritos = this.eleccion.sufragantesInscritos + 1;
    } else {
      this.eleccion.candidatosInscritos = this.eleccion.candidatosInscritos + 1;
    }
    this._eleccionService.actualizarEleccion ( this.eleccion, this.id )
      .then ( data => {
          this.mensajeGuardado ();
        },
        error => {
          console.log ( error );
          this.mensajeError ();
        } );
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
