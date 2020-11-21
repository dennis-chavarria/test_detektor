import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Prueba } from './prueba/prueba.component';

const routes: Routes = [
  {path: '', component: Prueba},
  {path: 'prueba', component: Prueba}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
