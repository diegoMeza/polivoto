import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../services/auth.service";
import { EleccionService } from "../../services/eleccion.service";
import { ResultadosService } from "../../services/resultados.service";

@Component ( {
  selector   : "app-barras",
  templateUrl: "./barras.component.html",
  styleUrls  : [ "./barras.component.css" ]
} )
export class BarrasComponent implements OnInit {
  
  id : string;
  eleccion : any = {};
  listaCandTemp : any[] = [ "En Blanco", "Cancelado" ];
  listaResultados : any[] = [];
  isDataAvailable : boolean = false;
  
  // Barras
  public barChartLabels : string[] = [];
  public barChartType : string = "bar";
  public barChartLegend : boolean = true;
  public barChartData : any[] = [];
  public barChartOptions : any = {
    scaleShowVerticalLines: false,
    responsive            : true
  };
  // Linea
  public polarAreaChartLabels : string[] = [];
  public polarAreaChartData : any[] = [];
  public polarAreaLegend : boolean = true;
  public polarAreaChartType : string = "polarArea";
  public polarAreaChartOptions : any = {
    responsive: true
  };
  
  
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
                this.barChartLabels = this.listaCandTemp;
                this.polarAreaChartLabels = this.listaCandTemp;
                
                for ( let candidato of this.listaCandTemp ) {
                  // console.log ( candidato );
                  this._resultadosService.getResultados ( this.eleccion.$key, candidato )
                    .subscribe ( ( data ) => {
                      // console.log ( data.length );
                      this.listaResultados.push ( data.length );
                      // console.log ( this.listaResultados );
                      
                      if ( this.listaResultados.length == this.listaCandTemp.length ) {
                        this.isDataAvailable = true;
                        this.barChartData = [
                          { data: this.listaResultados, label: "No. de Votos" }
                        ];
                        this.polarAreaChartData = this.listaResultados;
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
