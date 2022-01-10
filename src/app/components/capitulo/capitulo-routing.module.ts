import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleCapituloComponent } from './detalle-capitulo/detalle-capitulo.component';
import { ListaCapituloComponent } from './lista-capitulo/lista-capitulo.component';

const routes: Routes = [
  {
    path: '', component: ListaCapituloComponent
  },
  {
    path: 'page/:page', component: ListaCapituloComponent
  },
  {
    path: 'form/libro/:libroId', component: DetalleCapituloComponent
  },
  {
    path: 'form/:id', component: DetalleCapituloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapituloRoutingModule { }
