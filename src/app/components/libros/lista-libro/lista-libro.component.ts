import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../../services/libro.service';
import { TranslateService } from '@ngx-translate/core';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-libro',
  templateUrl: './lista-libro.component.html',
  styleUrls: ['./lista-libro.component.css']
})
export class ListaLibroComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public data = [];
  public cols = [];
  public selected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;

  public libros: Libro[] = [];

  constructor(private _libroService: LibroService,
              private _translateService: TranslateService,
              private router: Router) { }

  public ngOnInit(): void {
    this.initColumnsTable();
    this._libroService.getLibros().subscribe(resp => this.data = resp);
  }

  public initColumnsTable(): void {
    this.cols = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'ID'
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'NOMBRE'
      }
    ];
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
        },
        err => {
          Swal.fire({
            title: `${this._translateService.instant('DIALOG.ERROR_TITLE')}`,
            text:  err.error.error,
            icon: 'error'
          })
        });
        
      }
    })
  }

  onSelect({ selected }) {
    this.router.navigate(['/libros/form/',selected[0].id]);
  }

}
