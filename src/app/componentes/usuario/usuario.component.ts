import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFire, FirebaseApp } from "angularfire2";
import { Message } from "primeng/primeng";
import "rxjs/add/observable/fromPromise";
import { Subscription } from "rxjs/Subscription";
// import * as moment from "../../../../functions/node_modules/moment/moment";
import { Empresa } from "../../interfaces/Empresa";
import { UsuarioService } from "../../services/usuario.service";
import { VotacionService } from "../../services/votacion.service";


@Component ( {
  selector   : "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls  : [ "./usuario.component.css" ]
} )
export class UsuarioComponent implements OnInit {
  
  usuario : any = {
    rolUsuario: "User"
  };
  nuevo : boolean = false;
  id : string;
  tituloFormulario : string;
  private subscription : Subscription;
  msgs : Message[] = [];
  generos : any[] = [ "Masculino", "Femenino" ];
  roles : any[] = [ "Admin", "User" ];
  empresas = [];
  private auth : any;
  
  constructor ( private _usuarioService : UsuarioService,
                private router : Router,
                private route : ActivatedRoute,
                private _votacionServices : VotacionService,
                private af : AngularFire,
                @Inject ( FirebaseApp ) fa : any ) {
    this.auth = fa.auth ();
  }
  
  ngOnInit () {
    this.getEmpresas ();
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        console.log ( this.id );
        this.tituloFormulario = "Crear Usuario";
        if ( this.id !== "nuevo" ) {
          this.subscription = this._usuarioService.getUsuario ( this.id )
            .subscribe ( ( item ) => {
                this.usuario = item;
                this.usuario.fechaNacimiento = new Date ( this.usuario.fechaNacimiento );
              }
            );
          this.tituloFormulario = "Editar Usuario";
        }
      } );
  }
  
  /**
   * Metodo encargado de guardar o actualizar en la base de datos
   * @param forma
   * @author Carlos Andres
   * @version 16/04/2017
   */
  guardar ( forma : NgForm ) {
    console.log ( "envio: ", forma );
    //
    // this.usuario.fechaNacimiento = (moment ( this.usuario.fechaCreacion ).valueOf ());
    if ( this.id === "nuevo" ) {
      // Insertando
      if ( this.usuario ) {
        this._usuarioService.nuevoUsuario ( this.usuario )
          .then ( () => {
            console.log ( "Hecho...!" );
            this.mensajeGuardado ();
            this.usuario.password = "123456";
            this._votacionServices.crearUsuarios (
              this.usuario.email,
              this.usuario.password )
              .then ( ( data ) => {
                console.log ( data );
                this.resetPassword ( this.usuario.email );
              } )
              .catch ( ( error ) => {
                console.log ( error );
              } );
          } )
          .catch ( ( error ) => {
            console.error ( error );
            this.mensajeError ();
          } );
      }
    } else {
      // Actualizando
      this._usuarioService.actualizarUsuario ( this.usuario, this.id )
        .then ( () => {
            this.mensajeGuardado ();
          },
          error => {
            console.log ( error );
            this.mensajeError ();
          } );
    }
  }
  
  /**
   * Metodo que carga todos los Usuarios
   * @param forma
   * @author Carlos Andres
   * @version 17/04/2017
   */
  agregarNuevo ( forma : NgForm ) {
    this.router.navigate ( [ "/usuario", "nuevo" ] );
    forma.reset ();
  }
  
  mensajeGuardado () {
    this.msgs = [];
    this.msgs.push ( { severity: "success", summary: "Mensaje", detail: "Se ha guardado correctamente" } );
  }
  
  mensajeError () {
    this.msgs = [];
    this.msgs.push ( { severity: "error", summary: "Mensaje", detail: "se ha producido un error...!" } );
  }
  
  /**
   * Metodo que recupera todas la empresas de la db
   * @author Carlos Andres
   * @version 16/04/2017
   */
  getEmpresas () {
    this._votacionServices.getEmpresas ()
      .subscribe ( ( empresas ) => {
        this.empresas = empresas;
        console.log ( this.empresas );
      } );
  }
  
  /**
   * Metodo que guarda el nombre de la empresa en el usuario
   * @param empresa
   * @author Carlos Andres
   * @version 16/04/2017
   */
  guardarEmpresa ( empresa : Empresa ) {
    console.log ( empresa );
    this.usuario.nombreEmpresa = empresa.nombre;
  }
  
  /**
   * Restaurar contraseña del correo
   * @param email
   * @author Carlos Andres
   * @version 17/04/2017
   */
  resetPassword ( email : string ) {
    this.auth.sendPasswordResetEmail ( email )
      .then ( resp => console.log ( "Cambio de Password" ) )
      .catch ( error => console.log ( "ha fallado el cambio", error ) );
  }
  
  onSelectMethod ( event ) {
    let d = new Date ( Date.parse ( event ) );
    this.usuario.fechaNacimiento = `${d.getDate ()}/${d.getMonth () + 1}/${d.getFullYear ()}`;
  }
  
  
}
