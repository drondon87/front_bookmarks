import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAutorComponent } from './lista-autor/lista-autor.component';
import { AutoresRoutingModule } from './autores-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { DetalleAutorComponent } from './detalle-autor/detalle-autor.component';

@NgModule({
  declarations: [ListaAutorComponent, DetalleAutorComponent],
  imports: [
    CommonModule,
    AutoresRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgxDatatableModule,
    NgxMaskModule.forChild()
  ],
  exports:[
    ListaAutorComponent,
    DetalleAutorComponent
  ]
})
export class AutoresModule { }
