import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';
import { ListVideosComponent } from './list-videos/list-videos.component';

const routes: Routes = [
  {
    path: '', component: ListaCategoriaComponent
  },
  {
    path: 'form', component: DetalleCategoriaComponent
  },
  {
    path: 'form/:id', component: DetalleCategoriaComponent
  },
  {
    path: 'list-videos', component: ListVideosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
