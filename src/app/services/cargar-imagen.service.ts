import { Injectable } from "@angular/core";
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
// import * as firebase from "firebase";
import * as firebase from "firebase";
import { FileItem } from "../interfaces/FileItem";

@Injectable ()
export class CargarImagenService {
  rutaImagen : FirebaseObjectObservable<any>;
  private CARPETAIMAGENES : string = "img";
  
  constructor ( private af : AngularFire ) {
  }
  
  cargarImagenerFirebase ( archivos : FileItem[] ) {
    console.log ( archivos );
    let storageRef = firebase.storage ().ref ();
    for ( let item of archivos ) {
      let uploadTask : firebase.storage.UploadTask =
            storageRef.child ( `/${this.CARPETAIMAGENES}/${item.nombreArchivo}` )
              .put ( item.archivo );
      uploadTask.on ( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot ) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        ( error ) => console.log ( "Error al subir", error ),
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          this.rutaImagen.set ( uploadTask.snapshot.downloadURL );
          // this.guardarImagenes ( { nombre: item.nombreArchivo, url: item.url } );
        }
      );
    }
  }
  
  private guardarImagenes ( imagen : any ) {
    this.af.database.list ( `/${this.CARPETAIMAGENES}` )
      .push ( imagen );
  }
}
