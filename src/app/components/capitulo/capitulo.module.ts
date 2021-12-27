import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapituloRoutingModule } from './capitulo-routing.module';
import { ListaCapituloComponent } from './lista-capitulo/lista-capitulo.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleCapituloComponent } from './detalle-capitulo/detalle-capitulo.component';


@NgModule({
  declarations: [ListaCapituloComponent, DetalleCapituloComponent],
  imports: [
    CommonModule,
    CapituloRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ListaCapituloComponent, DetalleCapituloComponent]
})
export class CapituloModule { }
