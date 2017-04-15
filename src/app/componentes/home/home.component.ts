import { Component, OnInit } from "@angular/core";

@Component ( {
  selector   : "app-home",
  templateUrl: "./home.component.html",
  styleUrls  : [ "./home.component.css" ]
} )
export class HomeComponent implements OnInit {
  cars : any[] = [
    { "noEleccion": "COOPAST", "noCand": 4, "feInicio": "02-02-2017", "feFin": "10-02-2017" },
    { "noEleccion": "Comite Convivencia", "noCand": 2, "feInicio": "03-04-2017", "feFin": "15-04-2017" },
    { "noEleccion": "Fondo Empleados", "noCand": 5, "feInicio": "20-03-2017", "feFin": "31-03-2017" },
    { "noEleccion": "Comite Emergencia", "noCand": 6, "feInicio": "15-04-2017", "feFin": "20-04-2017" }
  ];
  
  constructor () {
  }
  
  ngOnInit () {
  }
  
  selectCar ( car : any ) {
    console.log ( car );
  }
}
