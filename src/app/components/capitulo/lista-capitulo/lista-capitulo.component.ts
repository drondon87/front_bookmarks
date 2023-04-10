import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../../services/libro.service';
import { CapituloService } from '../../../services/capitulo.service';
import { Capitulo } from '../../../models/capitulo.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-lista-capitulo',
  templateUrl: './lista-capitulo.component.html',
  styleUrls: ['./lista-capitulo.component.css']
})
export class ListaCapituloComponent implements OnInit {
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public libros: Libro[] = [];
  public libroId = 0;
  public capitulos: Capitulo[] = [];

  public cols = [];
  public selected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;

  constructor(private _libroService: LibroService,
              private _capituloService: CapituloService,
              private router: Router,
              private _translateService: TranslateService) { }

  ngOnInit(): void {
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
  }

  buscarCapitulos(): void{
    this.initColumnsTable();
    this._capituloService.getCapitulosByLIbro(this.libroId).subscribe(resp => {
      this.capitulos = resp as Capitulo[];
    });
  }

  public initColumnsTable(): void {
    this.cols = [
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

  onSelect({ selected }): void {
    this.router.navigate(['/capitulos/form/', selected[0].id]);
  }

  crearCapitulo(): void {
    this.router.navigate(['/capitulos/form/libro/', this.libroId]);
  }

}
