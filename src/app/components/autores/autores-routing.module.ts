import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleAutorComponent } from './detalle-autor/detalle-autor.component';
import { ListaAutorComponent } from './lista-autor/lista-autor.component';

const routes: Routes = [ {
  path: '', component: ListaAutorComponent
},
{
  path: 'form', component: DetalleAutorComponent
},
{
  path: 'form/:id', component: DetalleAutorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoresRoutingModule { }
