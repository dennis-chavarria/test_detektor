import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MotivosService } from '../services/prueba.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'modalMotivo',
    templateUrl: './modalMotivo.html',
  })

  export class ModalMotivo{
    titulo:string='';
    motivo={motivo:0, des_motivo:null, estado:null, tipo:null};
    constructor(public dialogRef2: MatDialogRef<ModalMotivo>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _motivosService:MotivosService,
                private toastrService:ToastrService){
                    
        this.titulo=this.data.titulo;
        if(this.data.motivo){
            this.motivo=this.data.motivo;
            console.log(this.motivo);
        }
    }

    onNoClick(): void {
        this.dialogRef2.close();
    }

    guardar(){
        let r=0, numero=0;
        for(let motivo of this.data.motivosTodos){
            if(motivo.motivo==this.motivo.motivo){
                r=1;
            }
        }

            if(this.titulo=='Editar Motivo'){
                console.log('editando');
                this._motivosService.editarMotivo(this.motivo).subscribe(
                    (res:any) => {
                        this.toastrService.success('Editado con éxito');
                        this.dialogRef2.close(1);
                    },
                    (err:any) => {
                        console.log(err)
                    }
                );
            }else{
                if(r==0){
                        this._motivosService.guardarMotivo(this.motivo).subscribe(
                            (res:any) => {
                                if(res.exito){
                                    this.toastrService.success('Guardado con éxito');
                                    this.dialogRef2.close(1);
                                }else{
                                    this.toastrService.error('Error, motivo debe ser número.');
                                } 
                            },
                            (err:any) => {
                                console.log(err)
                            }
                        );
                    
                }else{
                        this.toastrService.error('Error, motivo existente.');
                }
                
            }
        
    }

    cerrar(){
        this.dialogRef2.close();
    }

    validar(){
        if(this.motivo.des_motivo && this.motivo.estado && this.motivo.tipo){
            return true;
        }else{
            return false;
        }
    }
  }