import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListaCategoriaComponent, DetalleCategoriaComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListaCategoriaComponent, DetalleCategoriaComponent
  ]
})
export class CategoriasModule { }
