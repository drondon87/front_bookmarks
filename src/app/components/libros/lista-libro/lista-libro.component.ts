import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../../services/libro.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-libro',
  templateUrl: './lista-libro.component.html',
  styleUrls: ['./lista-libro.component.css']
})
export class ListaLibroComponent implements OnInit {

  public libros: Libro[] = [];

  constructor(private _libroService: LibroService,
              private _translateService: TranslateService) { }

  ngOnInit(): void {
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
  }

  public eliminarLibro(libro: Libro): void {
    Swal.fire({
      title: this._translateService.instant('DIALOG.DELETE_TITLE'),
      text: `${this._translateService.instant('DIALOG.BOOK_DELETE_ASK')} ${libro.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this._translateService.instant('DIALOG.DELETE_YES'),
      cancelButtonText: this._translateService.instant('DIALOG.DELETE_NO'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._libroService.borrarLibro(libro.id).subscribe(resp => {
          this.libros = this.libros.filter(lib => lib != libro);
          Swal.fire(
            this._translateService.instant('DIALOG.BOOK_DELETED'),
            `${resp}`,
            'success'
          )
        });
        
      }
    })
  }

}
