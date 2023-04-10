import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConsultaService } from '../../services/consulta.service';
import { Autor } from '../../models/autor.model';
import { Capitulo } from '../../models/capitulo.model';
import { Libro } from '../../models/libro.model';
import { MarcaLibro } from '../../models/marcaLibro.model';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public dataAutores: Autor[] = [];
  public dataCapitulos: Capitulo[] = [];
  public dataLibros: Libro[] = [];
  public dataMarcaLibros: MarcaLibro[] = [];

  public colsAutores = [];
  public colsCapitulos = [];
  public colsLibros = [];
  public colsMarcaLibros = [];

  public selectedAutor = [];
  public selectedCapitulo = [];
  public selectedLibro = [];
  public selectedMarcaLibro = [];

  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;

  constructor(private _consultaService: ConsultaService,
              private _translateService: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    this.initColumnsTableAutor();
    this.initColumnsTableCapitulo();
    this.initColumnsTableLibro();
    this.initColumnsTableMarcaLibro();
    this._consultaService.getUltimosRegistros().subscribe(resp => {
      this.dataAutores = resp.autores;
      this.dataCapitulos = resp.capitulos;
      this.dataLibros = resp.libros;
      this.dataMarcaLibros = resp.marcaLibros;
    });
  }

  public initColumnsTableAutor(): void {
    this.colsAutores = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('AUTHOR.ID'),
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('AUTHOR.NAME')
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('AUTHOR.LAST_NAME')
      }
    ];
  }

  public initColumnsTableCapitulo(): void {
    this.colsCapitulos = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'Numero'
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('CHAPTERS.NAME')
      }
    ];
  }

  public initColumnsTableLibro(): void {
    this.colsLibros = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('BOOK.ID')
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('BOOK.NAME')
      }
    ];
  }

  public initColumnsTableMarcaLibro(): void {
    this.colsMarcaLibros = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('BOOK_MARKS.ID')
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('BOOK_MARKS.DESCRIPTION'),
        prop: 'descripcion'
      }
    ];
  }

  onSelectAutor({ selected }): void {
    this.router.navigate(['/autores/form/', selected[0].id]);
  }

  onSelectCapitulo({ selected }): void {
    this.router.navigate(['/capitulos/form/', selected[0].id]);
  }

  onSelectLibro({ selected }): void {
    this.router.navigate(['/libros/form/', selected[0].id]);
  }

  onSelectMarcaLibro({ selected }): void {
    this.router.navigate(['/libros/marcalibro/form/', selected[0].capitulo.id, selected[0].id]);
  }

}
