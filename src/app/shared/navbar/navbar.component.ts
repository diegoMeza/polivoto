import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component ( {
  selector   : "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls  : [ "./navbar.component.css" ]
} )
export class NavbarComponent implements OnInit {
  
  constructor ( public _authServices : AuthService,
                private router : Router, ) {
    
  }
  
  ngOnInit () {
  }
  
  salir () {
    this.router.navigate ( [ "/home" ] );
    this._authServices.logOut ();
    
  }
  
}
