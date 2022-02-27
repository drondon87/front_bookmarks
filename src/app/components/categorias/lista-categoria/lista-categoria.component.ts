import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public data = [];
  public cols = [];
  public selected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  public categorias: Categoria[] = [];

  constructor(private _categoriaService: CategoriaService,
              private _translateService: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    this.initColumnsTable();
    this._categoriaService.getCategorias().subscribe(resp => {
      this.categorias = resp;
      this.data = resp;
    });
  }

  public initColumnsTable(): void {
    this.cols = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'id'
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'nombre'
      }
    ];
  }

  public eliminarCategoria(categoria: Categoria): void {
    Swal.fire({
      title: this._translateService.instant('DIALOG.DELETE_TITLE'),
      text: `${this._translateService.instant('DIALOG.CATEGORY_DELETE_ASK')} ${categoria.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this._translateService.instant('DIALOG.DELETE_YES'),
      cancelButtonText: this._translateService.instant('DIALOG.DELETE_NO'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoriaService.borrarCategoria(categoria.id).subscribe(resp => {
          this.categorias = this.categorias.filter(cat => cat != categoria);
          Swal.fire(
            this._translateService.instant('DIALOG.CATEGORY_DELETED'),
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
    this.router.navigate(['/categorias/form/',selected[0].id]);
  }

}
