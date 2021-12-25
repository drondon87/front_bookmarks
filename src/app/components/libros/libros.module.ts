import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';
import { ListaLibroComponent } from './lista-libro/lista-libro.component';
import { DetalleLibroComponent } from './detalle-libro/detalle-libro.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaLibroCategoriaComponent } from './lista-libro-categoria/lista-libro-categoria.component';

@NgModule({
  declarations: [ListaLibroComponent, DetalleLibroComponent, ListaLibroCategoriaComponent],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ListaLibroComponent, DetalleLibroComponent, ListaLibroCategoriaComponent
  ]
})
export class LibrosModule { }
