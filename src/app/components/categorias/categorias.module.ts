import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [ListaCategoriaComponent, DetalleCategoriaComponent, ListVideosComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  exports: [
    ListaCategoriaComponent, DetalleCategoriaComponent, ListVideosComponent
  ]
})
export class CategoriasModule { }
