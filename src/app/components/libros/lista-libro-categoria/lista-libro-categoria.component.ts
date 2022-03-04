import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { LibroService } from '../../../services/libro.service';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { Libro } from '../../../models/libro.model';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-libro-categoria',
  templateUrl: './lista-libro-categoria.component.html',
  styleUrls: ['./lista-libro-categoria.component.css']
})
export class ListaLibroCategoriaComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public data = [];
  public cols = [];
  public selected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;

  public libros: Libro[] = [];
  public categorias: Categoria[] = [];
  public categoriaId: number;

  constructor(private _libroService: LibroService,
              private _categoriaService: CategoriaService,
              private _translateService: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    this._categoriaService.getCategorias().subscribe(resp => this.categorias = resp);
  }

  public buscarLibros(): void{
    this.initColumnsTable();
    this._libroService.getLibrosByCategoria(this.categoriaId).subscribe(resp =>{
       this.data = resp;
       this.libros = resp;
    });
  }

  public initColumnsTable(): void {
    this.cols = [
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

  onSelect({ selected }) {
    this.router.navigate(['/libros/form/',selected[0].id]);
  }

}
