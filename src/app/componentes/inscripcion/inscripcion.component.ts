import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
// import * as firebase from "firebase";
import * as firebase from "firebase";
import { Message } from "primeng/primeng";
import { Subscription } from "rxjs/Subscription";
import { FileItem } from "../../interfaces/FileItem";
import { AuthService } from "../../services/auth.service";
import { CargarImagenService } from "../../services/cargar-imagen.service";
import { EleccionService } from "../../services/eleccion.service";

@Component ( {
  selector   : "app-inscripcion",
  templateUrl: "./inscripcion.component.html",
  styleUrls  : [ "./inscripcion.component.css" ]
} )
export class InscripcionComponent implements OnInit {
  inscripcion : any = {};
  tipoInscripcion : any[] = [ { nombre: "Candidato", valor: 0 }, { nombre: "Sufragante", valor: 1 } ];
  id : string;
  eleccion : any = {};
  loading : boolean = false;
  msgs : Message[] = [];
  listaCandTemp : any[] = [];
  listaSufraTemp : any[] = [];
  flag : boolean = false;
  //Check
  color = "accent";
  checked = false;
  disabled = false;
  //Valiadacion Usuarios
  esCandidato : boolean = false;
  esSufragante : boolean = false;
  seleccionCandidato : boolean = false;
  seleccionSufragante : boolean = false;
  // Archivos Cargados
  archivos : FileItem[] = [];
  // rutaImagen : string = "https://firebasestorage.googleapis.com/v0/b/poli-voto.appspot.com/o/img%2Fnoimage.png?alt=media&token=9eeb03bc-f2ff-44d1-a56a-ea56fc29899c";
  rutaImagen : string = "";
  // Candidato
  tempCand : any = {
    nombre         : this._authServices.user.nombre,
    id             : this._authServices.user.uid,
    img            : this.rutaImagen,
    genero         : this._authServices.user.genero,
    idListaVotacion: this.eleccion.candidatosInscritos,
    feNacimiento   : this._authServices.user.fechaNacimiento,
    isVoto         : false,
    propuesta      : ""
  };
  private CARPETAIMAGENES : string = "img";
  private subscription : Subscription;
  
  constructor ( private _eleccionService : EleccionService,
                private router : Router,
                private route : ActivatedRoute,
                public _authServices : AuthService,
                private _cargarImagenService : CargarImagenService ) {
    
    // console.log ( this._authServices.user.uid );
    
    this.route.params
      .subscribe ( parametro => {
        this.id = parametro[ "id" ];
        // console.log ( this.id );
        if ( this.id !== "nuevo" ) {
          this.subscription = this._eleccionService.getEleccion ( this.id )
            .subscribe ( item => {
              // console.log ( item );
              this.eleccion = item;
              
              
              console.log ( "Eleccion", item );
              if ( !(this.eleccion.candidatosInscritos <= this.eleccion.noCandidatos) ) {
                this.loading = true;
                this.inscripcion.tipo = 1;
              }
              if ( this.eleccion.listaCandidatos == null ) {
                this.listaCandTemp = [];
              } else {
                this.listaCandTemp = this.eleccion.listaCandidatos;
                // console.log ( this.listaCandTemp );
                for ( let candidato of this.listaCandTemp ) {
                  
                  if ( candidato.id == this._authServices.user.uid ) {
                    this.rutaImagen = candidato.img;
                    // console.log ( candidato.propuesta );
                    this.esCandidato = true;
                    this.seleccionCandidato = true;
                    this.tempCand.propuesta = candidato.propuesta;
                    
                  }
                }
              }
              
              if ( this.eleccion.listaSufragantes == null ) {
                this.listaSufraTemp = [];
              } else {
                this.listaSufraTemp = this.eleccion.listaSufragantes;
                // console.log ( this.listaSufraTemp );
                for ( let sufragante of this.listaSufraTemp ) {
                  if ( sufragante.id == this._authServices.user.uid ) {
                    this.esSufragante = true;
                    this.seleccionSufragante = true;
                  }
                }
                
              }
              
            } );
          // this.eleccion.feInicio = new Date ();
          // this.eleccion.feCierre = new Date ();
        }
      } );
  }
  
  ngOnInit () {
  }
  
  guardar ( forma : NgForm ) {
    // console.log ( "envio: ", forma );
    console.log ( forma.value );
    // console.log ( this.id );
    if ( this.seleccionSufragante ) {
      // if ( this.inscripcion.tipo > 0 ) {
      this.estaInscrito ( this._authServices.user.uid, this.listaSufraTemp );
      if ( this.flag ) {
        this.eleccion.sufragantesInscritos = this.eleccion.sufragantesInscritos + 1 | 1;
        let tempSufr = {
          nombre  : this._authServices.user.nombre,
          id      : this._authServices.user.uid,
          isVoto  : false,
          inscrito: true
        };
        if ( this.listaSufraTemp[ 0 ] == 0 ) {
          this.listaSufraTemp = [];
          this.listaSufraTemp.push ( tempSufr );
        } else {
          this.listaSufraTemp.push ( tempSufr );
        }
        
        this.eleccion.listaSufragantes = this.listaSufraTemp;
        // tempSufr = null;
      }
    }
    if ( this.seleccionCandidato ) {
      this.estaInscrito ( this._authServices.user.uid, this.listaCandTemp );
      if ( this.flag ) {
        this.eleccion.candidatosInscritos = this.eleccion.candidatosInscritos + 1 | 1;
        this.tempCand = {
          nombre         : this._authServices.user.nombre,
          id             : this._authServices.user.uid,
          img            : this.rutaImagen,
          genero         : this._authServices.user.genero,
          idListaVotacion: this.eleccion.candidatosInscritos,
          feNacimiento   : this._authServices.user.fechaNacimiento,
          isVoto         : false,
          propuesta      : "Sin Comentarios"
        };
        
        if ( this.listaCandTemp[ 0 ] == 0 ) {
          this.listaCandTemp = [];
          this.listaCandTemp.push ( this.tempCand );
        } else {
          this.listaCandTemp.push ( this.tempCand );
        }
        this.eleccion.listaCandidatos = this.listaCandTemp;
        // this.tempCand = null;
      }
    }
    if ( this.flag ) {
      this._eleccionService.actualizarEleccion ( this.eleccion, this.id )
        .then ( () => {
            this.mensajeGuardado ();
            this.router.navigate ( [ "/elecciones" ] );
          },
          error => {
            console.log ( error );
            this.mensajeError ();
          } );
    } else {
      this.router.navigate ( [ "/elecciones" ] );
    }
  }
  
  mensajeGuardado () {
    this.msgs = [];
    this.msgs.push ( { severity: "success", summary: "Mensaje", detail: "Se ha guardado correctamente" } );
  }
  
  mensajeError () {
    this.msgs = [];
    this.msgs.push ( { severity: "error", summary: "Mensaje", detail: "se ha producido un error...!" } );
  }
  
  estaInscrito ( uid : string, lista : any[] ) : boolean {
    if ( lista.length == 0 ) {
      this.flag = true;
      return this.flag;
    } else {
      for ( let person of lista ) {
        if ( person.id == uid ) {
          this.flag = false;
          return this.flag;
        }
      }
      this.flag = true;
      return this.flag;
    }
  }
  
  onUpload ( archivosLista ) {
    console.log ( archivosLista.target.files[ 0 ] );
    for ( let propiedad of archivosLista.target.files ) {
      let nuevoArchivo = new FileItem ( propiedad );
      this.archivos.push ( nuevoArchivo );
      
    }
    console.log ( this.archivos );
    let storageRef = firebase.storage ().ref ();
    for ( let item of this.archivos ) {
      let uploadTask : firebase.storage.UploadTask =
            storageRef.child ( `/${this.CARPETAIMAGENES}/${item.nombreArchivo}` )
              .put ( item.archivo );
      uploadTask.on ( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot ) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        ( error ) => console.log ( "Error al subir", error ),
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          this.rutaImagen = uploadTask.snapshot.downloadURL;
          console.log ( this.rutaImagen );
          // this.guardarImagenes ( { nombre: item.nombreArchivo, url: item.url } );
        }
      );
    }
    
    this.msgs = [];
    this.msgs.push ( { severity: "info", summary: "File Uploaded", detail: "" } );
  }
  
}
