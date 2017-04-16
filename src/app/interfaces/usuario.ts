/**
 * Created by darkklitos on 15/04/17.
 */
export interface Usuario {
  uid? : string;
  nombre : string;
  cedula : number;
  genero : string;
  password : string;
  idEmpresa : string;
  fechaNacimiento : Date;
}
