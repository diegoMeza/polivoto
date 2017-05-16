import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "../../../../functions/node_modules/moment/moment";
import { Eleccion } from "../../interfaces/eleccion";
import { AuthService } from "../../services/auth.service";
import { EleccionService } from "../../services/eleccion.service";
import { UsuarioService } from "../../services/usuario.service";


@Component ( {
  selector   : "app-elecciones",
  templateUrl: "./elecciones.component.html",
  styleUrls  : [ "./elecciones.component.css" ]
} )
export class EleccionesComponent implements OnInit {
  
  elecciones : Eleccion[] = [];
  loading : boolean = true;
  @Input () usuario : any;
  
  constructor ( private _eleccionServices : EleccionService,
                private router : Router,
                public _authServices : AuthService,
                private _usuarioService : UsuarioService ) {
  }
  
  ngOnInit () {
    
    this.getElecciones ();
  }
  
  getElecciones () {
    // this._eleccionServices.getElecciones ( this._authServices.user )
    //   .subscribe ( ( eleccion ) => {
    //     this.elecciones = eleccion.map ( ( data ) => {
    //       // data.feInicio = moment ( data.feInicio ).format ( "DD/MM/YYYY" );
    //       data.feCierre = moment ( data.feCierre ).format ( "DD/MM/YYYY" );
    //       return data;
    //     } );
    //     // console.log ( this.elecciones );
    //     this.loading = false;
    //   } );
    this._usuarioService.obtenerUsuarioporEmail ( this._authServices.user )
      .subscribe ( ( eleccion ) => {
        this.elecciones = eleccion.map ( ( usuario ) => {
          
          this._eleccionServices.getElecciones ( usuario )
            .subscribe ( ( eleccion ) => {
              this.elecciones = eleccion.map ( ( data ) => {
                // data.feInicio = moment ( data.feInicio ).format ( "DD/MM/YYYY" );
                data.feCierre = moment ( data.feCierre ).format ( "DD/MM/YYYY" );
                return data;
              } );
              // console.log ( this.elecciones );
              this.loading = false;
            } );
          
        } );
      } );
  }
  
  realizarIncripcion ( datos : any ) {
    // console.log ( datos.$key );
    this.router.navigate ( [ "/inscripcion", datos.$key ] );
  }
  
  
  editarInscripcion ( datos : any ) {
    this.router.navigate ( [ "/eleccion", datos.$key ] );
  }
  
  realizarVotacion ( datos : any ) {
    // console.log ( datos.$key );
    this.router.navigate ( [ "/votacion", datos.$key ] );
  }
  
  verCandidatos ( datos : any ) {
    // console.log ( datos.$key );
    this.router.navigate ( [ "/candidatos", datos.$key ] );
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
