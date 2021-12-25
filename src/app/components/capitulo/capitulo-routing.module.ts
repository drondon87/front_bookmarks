import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCapituloComponent } from './lista-capitulo/lista-capitulo.component';

const routes: Routes = [
  {
    path: '', component: ListaCapituloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapituloRoutingModule { }
