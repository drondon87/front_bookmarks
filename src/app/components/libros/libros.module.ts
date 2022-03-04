import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';
import { ListaLibroComponent } from './lista-libro/lista-libro.component';
import { DetalleLibroComponent } from './detalle-libro/detalle-libro.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaLibroCategoriaComponent } from './lista-libro-categoria/lista-libro-categoria.component';
import { MarcaLibroComponent } from './marca-libro/marca-libro.component';
import { ListaCitaLibroComponent } from './lista-cita-libro/lista-cita-libro.component';
import { DetalleCitaLibroComponent } from './detalle-cita-libro/detalle-cita-libro.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ListaLibroComponent, DetalleLibroComponent, ListaLibroCategoriaComponent, MarcaLibroComponent, ListaCitaLibroComponent, DetalleCitaLibroComponent],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgxDatatableModule,
    NgxMaskModule.forChild()
  ],
  exports:[
    ListaLibroComponent, DetalleLibroComponent, ListaLibroCategoriaComponent, MarcaLibroComponent, ListaCitaLibroComponent, DetalleCitaLibroComponent
  ]
})
export class LibrosModule { }
