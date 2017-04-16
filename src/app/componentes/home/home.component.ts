import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFire } from "angularfire2";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../services/auth.service";

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
  forma : FormGroup;
  private subscription : Subscription;
  msgs : Message[] = [];
  
  
  constructor ( private fb : FormBuilder,
                private _authServices : AuthService,
                private af : AngularFire ) {
    
    this.af.auth.subscribe ( ( data ) => {
      if ( data ) {
        console.log ( "datos Login", data );
      } else {
        this.forma.reset ();
      }
    } );
    
    this.forma = fb.group ( {
      "email"   : [ "", [
        Validators.required,
        Validators.pattern ( /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/ ) ] ],
      "password": [ "", Validators.required ],
    } )
    ;
  }
  
  ngOnInit () {
  }
  
  selectCar ( car : any ) {
    console.log ( car );
  }
  
  login () {
    console.log ( this.forma.value.email );
    console.log ( this.forma );
    let email = this.forma.value.email;
    let password = this.forma.value.password;
    console.log ( email, password );
    this._authServices.login ( email, password );
  }
  
  
  mensajeIngreso () {
    this.msgs = [];
    this.msgs.push ( { severity: "success", summary: "Bienvenido", detail: "Ha ingresado correctamente" } );
  }
  
  mensajeError () {
    this.msgs = [];
    this.msgs.push ( { severity: "error", summary: "Error", detail: "Verifica los datos o contacta al Administrador...!" } );
  }
  
}
