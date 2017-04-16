import { Component, OnInit } from "@angular/core";
import { Empresa } from "../../interfaces/Empresa";
import { VotacionService } from "../../services/votacion.service";

@Component ( {
  selector   : "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls  : [ "./empresas.component.css" ]
} )
export class EmpresasComponent implements OnInit {
  
  myDate : Date;
  checked : boolean = false;
  empresas : Empresa[] = [];
  
  constructor ( private _votacionServices : VotacionService ) {
    this.myDate = new Date ();
    this.getEmpresas ();
  }
  
  ngOnInit () {
  }
  
  getEmpresas () {
    this.empresas = this._votacionServices.getEmpresas ();
    console.log ( this.empresas );
    
  }
}
