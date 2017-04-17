import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import * as moment from "../../../../functions/node_modules/moment/moment";
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
  
  constructor ( private _usuarioService : UsuarioService,
                private router : Router,
                private route : ActivatedRoute,
                private _votacionServices : VotacionService ) {
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
    this.usuario.fechaNacimiento = (moment ( this.usuario.fechaCreacion ).format ( "YYYY/MM/DD" ));
    if ( this.id === "nuevo" ) {
      // Insertando
      this._usuarioService.nuevoUsuario ( this.usuario )
        .then ( () => {
          console.log ( "Hecho...!" );
          this.mensajeGuardado ();
        } )
        .catch ( ( error ) => {
          console.error ( error );
          this.mensajeError ();
        } );
    } else {
      // Actualizando
      this._usuarioService.actualizarUsuario ( this.usuario, this.id )
        .then ( data => {
            this.mensajeGuardado ();
          },
          error => {
            console.log ( error );
            this.mensajeError ();
          } );
    }
  }
  
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
  
}
