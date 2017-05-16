import { Injectable } from "@angular/core";
import { Http, Jsonp } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable ()
export class ObtenerIpService {
  
  url : string = "//api.ipify.org/?format=json";
  urlCaptcha : string = "https://www.google.com/recaptcha/api/siteverify";
  secret : string = "6LfvgyEUAAAAABpSgKmOLh04E2r5TUf6X6o-ufPS";
  
  
  constructor ( private http : Http,
                private jsonp : Jsonp ) {
  }
  
  optenerIp () {
    return this.http.get ( this.url )
      .map ( res => res.json () );
  }
  
  enviarCaptcha ( response : any, ip : string ) {
    let urlEnvio = `${this.urlCaptcha}?secret=${this.secret}&${response}&${ip}&callback=JSONP_CALLBACK`;
    return this.jsonp.get ( urlEnvio )
      .map ( res => res.json ()
      );
  }
  
}

