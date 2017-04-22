import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { CandidatoService } from "../../services/candidato.service";

@Component ( {
  selector   : "app-candidato",
  templateUrl: "./candidato.component.html",
  styleUrls  : [ "./candidato.component.css" ]
} )
export class CandidatoComponent implements OnInit {
  candidato : any = {};
  idPrincipal : string;
  idSecundario : string;
  private subscription : Subscription;
  
  
  constructor ( private router : Router,
                private route : ActivatedRoute,
                private _candidatoServices : CandidatoService, ) {
    
    this.route.params
      .subscribe ( parametro => {
        // console.log ( parametro );
        this.idPrincipal = parametro[ "idPrincipal" ];
        this.idSecundario = parametro[ "idSecundario" ];
        
        // console.log ( this.id );
        if ( this.idPrincipal !== "nuevo" ) {
          this.subscription = this._candidatoServices.getCandidato ( this.idPrincipal, this.idSecundario )
            .subscribe ( cand => {
              console.log ( cand );
              this.candidato = cand[0];
              
            } );
        }
      } );
  }
  
  ngOnInit () {
  }
  
}
