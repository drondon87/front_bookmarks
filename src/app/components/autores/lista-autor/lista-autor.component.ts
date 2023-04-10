import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { Autor } from 'src/app/models/autor.model';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-lista-autor',
  templateUrl: './lista-autor.component.html',
  styleUrls: ['./lista-autor.component.css']
})
export class ListaAutorComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public data = [];
  public cols = [];
  public selected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;

  public autores: Autor[] = [];

  constructor(private _autorService: AutorService,
              private _translateService: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    this.initColumnsTable();
    this._autorService.getAutores().subscribe(resp => this.data = resp);
  }

  public initColumnsTable(): void {
    this.cols = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('AUTHOR.ID')
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

  onSelect({ selected }): void {
    this.router.navigate( [ '/autores/form/' , selected[0].id ] );
  }

}
