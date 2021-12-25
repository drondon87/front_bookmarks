import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../../services/libro.service';

@Component({
  selector: 'app-lista-libro',
  templateUrl: './lista-libro.component.html',
  styleUrls: ['./lista-libro.component.css']
})
export class ListaLibroComponent implements OnInit {

  public libros: Libro[] = [];

  constructor(private _libroService: LibroService) { }

  ngOnInit(): void {
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
  }

  public eliminarLibro(libro: Libro): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al libro ${libro.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText:'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._libroService.borrarLibro(libro.id).subscribe(resp => {
          this.libros = this.libros.filter(lib => lib != libro);
          Swal.fire(
            'Libro Eliminado!',
            `${resp}`,
            'success'
          )
        });
        
      }
    })
  }

}
