import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../../services/libro.service';
import { CapituloService } from '../../../services/capitulo.service';
import { Capitulo } from '../../../models/capitulo.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-capitulo',
  templateUrl: './lista-capitulo.component.html',
  styleUrls: ['./lista-capitulo.component.css']
})
export class ListaCapituloComponent implements OnInit {
  
  public libros: Libro[] = [];
  public libroId: number = 0;
  public capitulos: Capitulo[] = [];
  public paginador: any;
  public rowSelection = 'single';
  public gridApi;
  public gridColumnApi;

  constructor(private _libroService: LibroService,
              private _capituloService: CapituloService,
              private router: Router,
              private _translateService: TranslateService) { }

  public columnDefs = [
      {headerName: this._translateService.instant('CATEGORY.ID'), field: 'id', sortable:true},
      {headerName: this._translateService.instant('CHAPTERS.NUMBER'), field: 'numero', sortable:true},
      {headerName: this._translateService.instant('CHAPTERS.NAME'), field: 'nombre', sortable:true}
    ];
  
  public rowData = [];

  ngOnInit(): void {
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
  }

  buscarCapitulos(){
    this._capituloService.getCapitulosByLIbro(this.libroId).subscribe(resp => {
      this.capitulos = resp as Capitulo[];
      this.rowData = this.capitulos;
    });
  }

  onSelectionChanged(event) {
    let selectedRows = this.gridApi.getSelectedRows();
    let idCapitulo: number = selectedRows[0].id;
    this.router.navigate(['/capitulos/form/',idCapitulo]);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  crearCapitulo(): void {
    this.router.navigate(['/capitulos/form/libro/',this.libroId]);
  }

}
