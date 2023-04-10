import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
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
        name: this._translateService.instant('CATEGORY.ID')
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('CATEGORY.NAME')
      }
    ];
  }

  onSelect({ selected }): void {
    this.router.navigate(['/categorias/form/', selected[0].id]);
  }

}
