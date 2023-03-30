import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Capitulo } from '../../../models/capitulo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCapitulo } from '../../../models/create.capitulo.model';
import { CapituloService } from '../../../services/capitulo.service';
import Swal from 'sweetalert2';
import { MarcaLibro } from '../../../models/marcaLibro.model';
import { MarcaLibroService } from '../../../services/marca-libro.service';
import { TranslateService } from '@ngx-translate/core';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { BookmarkResponse } from 'src/app/models/bookmark.response.model';
import { LibroService } from '../../../services/libro.service';
import { Libro } from 'src/app/models/libro.model';

@Component({
  selector: 'app-detalle-capitulo',
  templateUrl: './detalle-capitulo.component.html',
  styleUrls: ['./detalle-capitulo.component.css']
})
export class DetalleCapituloComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  public consulta: boolean = false;
  public capitulo: Capitulo = new Capitulo();
  public capituloForm: FormGroup;
  public createCapitulo: CreateCapitulo = new CreateCapitulo();
  public libroId: number = 0;
  public marcasLibros: MarcaLibro[] = [];
  public capituloId: number = 0;
  public libro: Libro = new Libro();
  public libros: Libro[] = [];

  public cols = [];
  public selected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;


  get numero(){ return this.capituloForm.get('numero'); }

  get nombre(){ return this.capituloForm.get('nombre'); }

  get descripcion(){ return this.capituloForm.get('descripcion'); }

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private _capituloService: CapituloService,
              private _marcaLibroService: MarcaLibroService,
              private _translateService: TranslateService,
              private _libroService: LibroService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let libroId:number = +params.get('libroId');
      let id:number = +params.get('id');
      if(libroId !== 0 && id === 0){
        this.consulta=false;
        this.libroId = libroId;
        this._libroService.obtenerLibro(this.libroId).subscribe(resp => this.libro = resp);
      }else if(libroId === 0 && id !== 0){
        this.consulta=true;
        this._capituloService.obtenerCapitulo(id).subscribe(capitulo => this.asignarValores(capitulo));
        this.initColumnsTable();
        this._marcaLibroService.getMarcasLibrosByCapitulo(id).subscribe(marcas => {
          this.marcasLibros = marcas;
        });
      }
      this._libroService.getLibros().subscribe(resp => this.libros = resp);
    });
    this.initForm();
  }

  public initForm(): void {
    this.capituloForm = this.fb.group({
      numero: [{value:'' , disabled: this.consulta}, Validators.required],
      nombre: [{value:'' , disabled: this.consulta}, Validators.required],
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required],
      libroId: [{value:this.libroId , disabled: true}]
    });
  }

  guardarCapitulo(){
    if(this.capituloForm.invalid){ return;}

    const { numero, nombre, descripcion } = this.capituloForm.value;

    this.createCapitulo.numero = numero;
    this.createCapitulo.nombre = nombre;
    this.createCapitulo.descripcion = descripcion;
    this.createCapitulo.libro = this.libro;

    this._capituloService.crearCapitulo(this.createCapitulo)
      .subscribe((resp: BookmarkResponse) => {
        if(resp.data === null){
          console.log(resp);
          Swal.fire({
            title: `${resp.message} !!!`,
            text: resp.errors.libro,
            icon: 'error'
          })
        }else{
          Swal.fire('Nuevo Capitulo', `El capitulo ${resp.data.nombre} ha sido creado con exito`,'success');
          this.router.navigate(['/capitulos']);
        }
      },
      err => {
        Swal.fire({
          title: `Error ${err.error.status} !!!`,
          text:  err.error.message,
          icon: 'error'
        })
      });
  }

  public asignarValores(capitulo: Capitulo) : void {
    this.capituloForm.setValue({
      nombre: capitulo.nombre,
      descripcion: capitulo.descripcion,
      numero: capitulo.numero,
      libroId: capitulo.libro.id
    });
    this.capituloId = capitulo.id;
    this.capitulo = capitulo;
    this.libroId = capitulo.libro.id;
  }

  eliminarCapitulo(){
    Swal.fire({
      title: this._translateService.instant('DIALOG.DELETE_TITLE'),
      text: `${this._translateService.instant('DIALOG.CHAPTER_DELETE_ASK')} ${this.capitulo.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this._translateService.instant('DIALOG.DELETE_YES'),
      cancelButtonText: this._translateService.instant('DIALOG.DELETE_NO'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._capituloService.borrarCapitulo(this.capitulo.id).subscribe(resp => {
          Swal.fire(
            this._translateService.instant('DIALOG.CHAPTER_DELETED'),
            `${resp}`,
            'success'
          )
          this.router.navigate(['/capitulos']);
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

  public crearMarcaLibro(): void {
    this.router.navigate(['/libros/marcalibro/form/capitulo/',this.capituloId]);
  }

  public initColumnsTable(): void {
    this.cols = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: this._translateService.instant('BOOK_MARKS.ID')
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'Descripcion'
      }
    ];
  }

  onSelect({ selected }) {
    let idMarcaLibro: number = selected[0].id;
    let capituloId: number = selected[0].capitulo.id;
    this.router.navigate(['/libros/marcalibro/form/',capituloId,idMarcaLibro]);
  }
}
