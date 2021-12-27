import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../../services/libro.service';
import { CapituloService } from '../../../services/capitulo.service';
import { Capitulo } from '../../../models/capitulo.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-capitulo',
  templateUrl: './lista-capitulo.component.html',
  styleUrls: ['./lista-capitulo.component.css']
})
export class ListaCapituloComponent implements OnInit {
  
  public libros: Libro[] = [];
  public libroId: number = 0;
  public capitulos: Capitulo[] = [];
  
  constructor(private _libroService: LibroService,
              private _capituloService: CapituloService,
              private router: Router) { }

  ngOnInit(): void {
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
  }

  buscarCapitulos(){
    this._capituloService.getCapitulosByLIbro(this.libroId).subscribe(resp => this.capitulos = resp)
  }

  crearCapitulo(): void {
    this.router.navigate(['/capitulos/form/libro/',this.libroId]);
  }

  eliminarCapitulo(capitulo: Capitulo){
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el capitulo ${capitulo.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText:'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._capituloService.borrarCapitulo(capitulo.id).subscribe(resp => {
          this.capitulos = this.capitulos.filter(cap => cap != capitulo);
          Swal.fire(
            'Capítulo Eliminado!',
            `${resp}`,
            'success'
          )
        });
        
      }
    })    
  }

}
