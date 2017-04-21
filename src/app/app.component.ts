import { Component } from "@angular/core";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs/Observable";


@Component ( {
  selector   : "app-root",
  templateUrl: "./app.component.html",
  styleUrls  : [ "./app.component.css" ]
} )
export class AppComponent {
  
  members : Observable<any>;
  users : Observable<any>;
  
  constructor ( private af : AngularFire ) {
    
    // this.members = this.af.database.list ( "/empresas/-Ki0yYjTdC3Jnui1ccRk" )
    //   .map ( projects => {
    //     console.log ( projects );
    //     return projects.map ( project => {
    //       console.log ( project.$key );
    //       af.database.list ( "/usuarios/", {
    //         query: {
    //           orderByChild: "idEmpresa",
    //           equalTo     : project.$key
    //         }
    //       } ).subscribe ( ( c ) => {
    //         console.log ( c );
    //       } );
    //       // project.$key.map ( customer => {
    //       //   this.af.database.list ( "usuarios" )
    //       //     .subscribe ( c => {
    //       //       customer = c;
    //       //     } );
    //       // } );
    //       return project;
    //
    //
    //     } );
    //   } );
    //
    // this.members = this.af.database.list ( "usuarios", {
    //   query: {
    //     orderByChild: "email",
    //     equalTo     : "darkklitos@gmail.com"
    //   }
    // } );
    // .map ( projects => {
    //   console.log ( projects );
    //   return projects.map ( project => {
    //     console.log ( project.$key );
    //     af.database.list ( "/usuarios/", {
    //       query: {
    //         orderByChild: "idEmpresa",
    //         equalTo     : project.$key
    //       }
    //     } ).subscribe ( ( c ) => {
    //       console.log ( c );
    //     } );
    //     // project.$key.map ( customer => {
    //     //   this.af.database.list ( "usuarios" )
    //     //     .subscribe ( c => {
    //     //       customer = c;
    //     //     } );
    //     // } );
    //     return project;
    //
    //
    //   } );
    // } );
    
  }
}
