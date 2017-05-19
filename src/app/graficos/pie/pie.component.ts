import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../services/auth.service";
import { EleccionService } from "../../services/eleccion.service";
import { ResultadosService } from "../../services/resultados.service";

@Component ( {
  selector   : "app-pie",
  templateUrl: "./pie.component.html",
  styleUrls  : [ "./pie.component.css" ]
} )
export class PieComponent implements OnInit {
  
  id : string;
  eleccion : any = {};
  listaCandTemp : any[] = [ "En Blanco", "Cancelado" ];
  listaResultados : any[] = [];
  isDataAvailable : boolean = false;
  // Pie
  public pieChartLabels : string[] = [];
  public pieChartData : number[] = [];
  public barChartLegend : string;
  public pieChartType : string = "pie";
  private subscription : Subscription;
  
  constructor ( private router : Router,
                private route : ActivatedRoute,
                public _authServices : AuthService,
                private _eleccionService : EleccionService,
                private _resultadosService : ResultadosService ) {
    
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        // console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._eleccionService.getEleccion ( this.id )
            .subscribe ( item => {
              // console.log ( item );
              this.eleccion = item;
              this.barChartLegend = this.eleccion.nombre;
              console.log ( "Eleccion", item );
              
              if ( this.eleccion.listaCandidatos == null ) {
                this.listaCandTemp = [];
              } else {
                this.eleccion.listaCandidatos.filter (
                  ( candidato ) => {
                    this.listaCandTemp.push ( candidato.nombre );
                  }
                );
                console.log ( this.listaCandTemp );
                this.pieChartLabels = this.listaCandTemp;
                
                for ( let candidato of this.listaCandTemp ) {
                  // console.log ( candidato );
                  this._resultadosService.getResultados ( this.eleccion.$key, candidato )
                    .subscribe ( ( data ) => {
                      // console.log ( data.length );
                      this.listaResultados.push ( data.length );
                      // console.log ( this.listaResultados );
                      this.pieChartData = this.listaResultados;
                      if ( this.pieChartData.length == this.listaCandTemp.length ) {
                        this.isDataAvailable = true;
                      }
                    } );
                }
                
                
              }
            } );
        }
      } );
    
    
  }
  
  ngOnInit () {
  }
  
  
}
