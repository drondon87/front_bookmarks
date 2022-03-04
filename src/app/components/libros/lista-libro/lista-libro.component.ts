import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
