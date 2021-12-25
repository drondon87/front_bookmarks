import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';

const routes: Routes = [
  {
    path: '', component: ListaCategoriaComponent
  },
  {
    path: 'form', component: DetalleCategoriaComponent
  },
  {
    path: 'form/:id', component: DetalleCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
