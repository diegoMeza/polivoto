import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../interfaces/usuario";
import { UsuarioService } from "../../services/usuario.service";

@Component ( {
  selector   : "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls  : [ "./usuarios.component.css" ]
} )
export class UsuariosComponent implements OnInit {
  
  usuarios : Usuario[] = [];
  loading : boolean = true;
  
  constructor ( private _usuarioServices : UsuarioService ) {
  
  }
  
  ngOnInit () {
    this.getUsuarios ();
  }
  
  getUsuarios () {
    this._usuarioServices.getUsuarios ()
      .subscribe ( ( usuario ) => {
        this.usuarios = usuario;
        this.loading = false;
      } );
    
    
  }
  
}
