import { Component, OnInit } from "@angular/core";
import { VotacionService } from "../../services/votacion.service";

@Component ( {
  selector   : "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls  : [ "./empresas.component.css" ]
} )
export class EmpresasComponent implements OnInit {
  
  empresas : any[] = [];
  loading : boolean = true;
  
  constructor ( private _votacionServices : VotacionService ) {
  
  }
  
  ngOnInit () {
    this.getEmpresas ();
  }
  
  getEmpresas () {
    this._votacionServices.getEmpresas ()
      .subscribe ( ( empresas ) => {
        this.empresas = empresas;
        this.loading = false;
      } );
    
    
  }
}
