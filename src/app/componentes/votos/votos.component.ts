import { Component, OnInit } from "@angular/core";
import { VotoService } from "../../services/voto.service";

@Component ( {
  selector   : "app-votos",
  templateUrl: "./votos.component.html",
  styleUrls  : [ "./votos.component.css" ]
} )
export class VotosComponent implements OnInit {
  
  votos : any[] = [];
  loading : boolean = true;
  
  constructor ( private _votoServices : VotoService ) {
  
  }
  
  ngOnInit () {
    this.getVotos ();
  }
  
  getVotos () {
    this._votoServices.getVotos ()
      .subscribe ( ( voto ) => {
        this.votos = voto;
        this.loading = false;
      } );
    
    
  }
  
}
