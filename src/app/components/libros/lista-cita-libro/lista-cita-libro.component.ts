import { Component, OnInit } from '@angular/core';
import { CitaLibro } from '../../../models/citaLibro.model';
import { TranslateService } from '@ngx-translate/core';
import { CitaLibroService } from '../../../services/cita-libro.service';
import { Router } from '@angular/router';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-lista-cita-libro',
  templateUrl: './lista-cita-libro.component.html',
  styleUrls: ['./lista-cita-libro.component.css']
})
export class ListaCitaLibroComponent implements OnInit {

  public libros: Libro[] = [];
  public libroId: number = 0;
  public citasLibros: CitaLibro[] = [];
  public rowSelection = 'single';
  public gridApi;
  public gridColumnApi;

  constructor(private _translateService: TranslateService,
              private _citaLibroService: CitaLibroService,
              private _libroService: LibroService,
              private router: Router) { }

  public columnDefs = [
    {headerName: this._translateService.instant('CATEGORY.ID'), field: 'id', sortable:true},
    {headerName: this._translateService.instant('BOOK_DATES.AUTHOR'), field: 'autor', sortable:true}
  ];

public rowData = [];

  ngOnInit(): void {
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
  }

  buscarCitasLibro(){
    this._citaLibroService.buscarCitasLibrosByLibro(this.libroId).subscribe(resp => {
      this.citasLibros = resp as CitaLibro[];
      this.rowData = this.citasLibros;
    });
  }

  public crearCitaLibro(){
    this.router.navigate(['/libros/citaLibro/form/libro/',this.libroId]);
  }

  onSelectionChanged(event) {
    let selectedRows = this.gridApi.getSelectedRows();
    let idCitaLibro: number = selectedRows[0].id;
    this.router.navigate(['/libros/citaLibro/form/',idCitaLibro]);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
