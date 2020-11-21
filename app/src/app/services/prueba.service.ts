import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class MotivosService{
    url:String='http://localhost/test_detektor/api/request';
    constructor(private http : HttpClient){
      }

    obtenerMotivos () {
     return this.http.post(`${this.url}/prueba.php`, {}).pipe(
      map((res) => {
      return res;
      })
      )

    }


    editarMotivo (_motivo:any) {
      return this.http.post(`${this.url}/editar.php`, {motivo:_motivo.motivo, des_motivo:_motivo.des_motivo, estado:_motivo.estado, tipo:_motivo.tipo}).pipe(
       map((res) => {
       return res;
       })
       )

     }

     guardarMotivo (_motivo:any) {
      return this.http.post(`${this.url}/guardar.php`, {motivo:_motivo.motivo, des_motivo:_motivo.des_motivo, estado:_motivo.estado, tipo:_motivo.tipo}).pipe(
       map((res) => {
       return res;
       })
       )

     }

     eliminarMotivo (_motivo:any) {
      return this.http.post(`${this.url}/eliminar.php`, {motivo:_motivo}).pipe(
       map((res) => {
       return res;
       })
       )

     }

}
