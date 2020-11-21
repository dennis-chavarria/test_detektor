import {Component} from '@angular/core';
import { MotivosService } from '../services/prueba.service';
import { ModalMotivo } from './modalMotivo';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'prueba.component.html',
    providers:[],
})

export class Prueba{

    displayedColumns: string[] = ['motivo', 'des_motivo', 'estado', 'tipo', 'accion'];
    motivos:any=[];
    motivosTodos:any=[];
    filtro='';

    constructor(private _motivosService:MotivosService, public dialog: MatDialog,
                private _toastrService:ToastrService){

    }

    ngOnInit(){
        this.obtenerMotivos();
    }

    obtenerMotivos(){
        let d=this._motivosService.obtenerMotivos().subscribe(
            (res:any) => {
                this.motivos=res;
                this.motivosTodos=res;
            },
            (err:any) => {
                console.log(err)
            }
        );
    }

    abrirModal(titulo:string, element:any){
        const dialogRef = this.dialog.open(ModalMotivo, {
            width: '500px',
            height:'auto',
            data: {motivo:element, titulo, motivosTodos:this.motivosTodos}
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.obtenerMotivos();
            }
          });
    }

    asc(){
        this.motivos.sort(function (a:any, b:any) {
            return a.value - b.value;
          });
        this.motivos.sort(function(a:any, b:any) {
            var nameA = a.des_motivo.toUpperCase(); // ignore upper and lowercase
            var nameB = b.des_motivo.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });

          this.motivos=JSON.parse(JSON.stringify(this.motivos));
          
    }

    dsc(){
        this.motivos.sort(function (a:any, b:any) {
            return a.value - b.value;
          });
        this.motivos.sort(function(a:any, b:any) {
            var nameA = a.des_motivo.toUpperCase(); // ignore upper and lowercase
            var nameB = b.des_motivo.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });

          this.motivos=JSON.parse(JSON.stringify(this.motivos));
    }

    eliminarMotivo(element:any, i:Number){
        if(confirm('¿Desea eliminar este elemento?')){
            this._motivosService.eliminarMotivo(element.motivo).subscribe(
                (res:any) => {
                    console.log(res);
                    if(res.exito){
                        this._toastrService.success('Eliminado con éxito.');
                        this.motivos.splice(i, 1);
                        this.motivos=JSON.parse(JSON.stringify(this.motivos));
                    }else{

                    }
                },
                (err:any) => {
                    console.log(err)
                }
            )
        }
    }

    

    onKeydown(event:any) {
        console.log(event.key);
        
        if (event.key === "Enter") {
            this.filtrar();
        }
      }
    
    filtrar(){
        this.motivos=[];
        for(let motivo of this.motivosTodos){
            if(motivo['des_motivo'].toLowerCase().indexOf(this.filtro.toLowerCase())!=-1){
                this.motivos.push(motivo);
            }
        }
    }
}