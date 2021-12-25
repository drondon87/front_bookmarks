import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapituloRoutingModule } from './capitulo-routing.module';
import { ListaCapituloComponent } from './lista-capitulo/lista-capitulo.component';


@NgModule({
  declarations: [ListaCapituloComponent],
  imports: [
    CommonModule,
    CapituloRoutingModule
  ],
  exports:[ListaCapituloComponent]
})
export class CapituloModule { }
