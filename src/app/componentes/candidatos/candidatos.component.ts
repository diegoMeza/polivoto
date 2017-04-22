import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFire } from "angularfire2";
import { Subscription } from "rxjs/Subscription";
import { Candidato } from "../../interfaces/candidato";
import { CandidatoService } from "../../services/candidato.service";

@Component ( {
  selector   : "app-candidatos",
  templateUrl: "./candidatos.component.html",
  styleUrls  : [ "./candidatos.component.css" ]
} )
export class CandidatosComponent implements OnInit {
  
  
  candidatos : Candidato[] = [];
  loading : boolean = true;
  id : string;
  private subscription : Subscription;
  
  constructor ( private af : AngularFire,
                private _candidatoServices : CandidatoService,
                private router : Router,
                private route : ActivatedRoute ) {
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        // console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._candidatoServices.getCandidatos ( this.id )
            .subscribe ( candidato => {
              console.log ( candidato );
              this.candidatos = candidato;
              
              this.loading = false;
            } );
        }
      } );
  }
  
  ngOnInit () {
  }
  
}
