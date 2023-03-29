import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CitaLibro } from '../../../models/citaLibro.model';
import { TranslateService } from '@ngx-translate/core';
import { CitaLibroService } from '../../../services/cita-libro.service';
import { Router } from '@angular/router';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/libro.model';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-lista-cita-libro',
  templateUrl: './lista-cita-libro.component.html',
  styleUrls: ['./lista-cita-libro.component.css']
})
export class ListaCitaLibroComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public libros: Libro[] = [];
  public libroId: number = 0;
  public citasLibros: CitaLibro[] = [];

  public data = [];
  public cols = [];
  public selected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;

  constructor(private _translateService: TranslateService,
              private _citaLibroService: CitaLibroService,
              private _libroService: LibroService,
              private router: Router) { }

  ngOnInit(): void {
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
  }

  buscarCitasLibro(){
    this.initColumnsTable();
    this._citaLibroService.buscarCitasLibrosByLibro(this.libroId).subscribe(resp => {
      this.citasLibros = resp as CitaLibro[];
      this.data = this.citasLibros;
    });

  }

  public crearCitaLibro(){
    this.router.navigate(['/libros/citaLibro/form/libro/',this.libroId]);
  }

  public initColumnsTable(): void {
    this.cols = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('CATEGORY.ID')
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('BOOK_DATES.AUTHOR'),
        prop: 'libro.autor.nombre'
      }
    ];
  }

  onSelect({ selected }) {
    this.router.navigate(['/libros/citaLibro/form/',selected[0].id]);
  }

}
