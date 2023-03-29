import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'categorias',
    loadChildren: () => import('./components/categorias/categorias.module').then(m => m.CategoriasModule)
  },
  {
    path: 'libros',
    loadChildren: () => import('./components/libros/libros.module').then(m => m.LibrosModule)
  },
  {
    path: 'cronologias',
    loadChildren: () => import('./components/cronologia/cronologia.module').then(m => m.CronologiaModule)
  },
  {
    path: 'capitulos',
    loadChildren: () => import('./components/capitulo/capitulo.module').then(m => m.CapituloModule)
  },
  {
    path: 'autores',
    loadChildren: () => import('./components/autores/autores.module').then(m => m.AutoresModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./components/principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
