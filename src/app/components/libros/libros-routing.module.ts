import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaLibroComponent } from './lista-libro/lista-libro.component';
import { DetalleLibroComponent } from './detalle-libro/detalle-libro.component';
import { ListaLibroCategoriaComponent } from './lista-libro-categoria/lista-libro-categoria.component';
import { MarcaLibroComponent } from './marca-libro/marca-libro.component';

const routes: Routes = [ {
  path: '', component: ListaLibroComponent
},
{
  path: 'form', component: DetalleLibroComponent
},
{
  path: 'form/:id', component: DetalleLibroComponent
},
{
  path: 'categoria', component: ListaLibroCategoriaComponent
},
{
  path: 'marcalibro/form/capitulo/:capituloId', component: MarcaLibroComponent
},
{
  path: 'marcalibro/form/:capituloId/:id', component: MarcaLibroComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
