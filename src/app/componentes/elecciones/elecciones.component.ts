import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "../../../../functions/node_modules/moment/moment";
import { Eleccion } from "../../interfaces/eleccion";
import { EleccionService } from "../../services/eleccion.service";

@Component ( {
  selector   : "app-elecciones",
  templateUrl: "./elecciones.component.html",
  styleUrls  : [ "./elecciones.component.css" ]
} )
export class EleccionesComponent implements OnInit {
  
  elecciones : Eleccion[] = [];
  loading : boolean = true;
  
  constructor ( private _eleccionServices : EleccionService,
                private router : Router ) {
  }
  
  ngOnInit () {
    
    this.getElecciones ();
  }
  
  getElecciones () {
    this._eleccionServices.getElecciones ()
      .subscribe ( ( eleccion ) => {
        this.elecciones = eleccion.map ( ( data ) => {
          data.feInicio = moment ( data.feInicio ).format ( "DD/MM/YYYY" );
          data.feCierre = moment ( data.feCierre ).format ( "DD/MM/YYYY" );
          return data;
        } );
        // console.log ( this.elecciones );
        this.loading = false;
      } );
  }
  
  selectEleccion ( datos : any ) {
    // console.log ( datos.$key );
    this.router.navigate ( [ "/eleccion", datos.$key ] );
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
