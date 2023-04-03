import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../models/libro.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria.model';
import { CreateLibro } from '../../../models/create.libro.model';
import { LibroService } from '../../../services/libro.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Autor } from 'src/app/models/autor.model';
import { AutorService } from 'src/app/services/autor.service';
import { BookmarkResponse } from 'src/app/models/bookmark.response.model';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {

  public libro: Libro = new Libro();
  public libroForm: FormGroup;
  public consulta: boolean = false;
  public categorias: Categoria[] = [];
  public createLibro: CreateLibro = new CreateLibro();
  public autores: Autor[] = [];

  constructor(private fb: FormBuilder,
              private _categoriaService: CategoriaService,
              private _libroService: LibroService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _translateService: TranslateService,
              private _autorService: AutorService) { }

  get nombre(){ return this.libroForm.get('nombre'); }

  get descripcion(){ return this.libroForm.get('descripcion'); }

  get fechaLibro(){ return this.libroForm.get('fechaLibro'); }

  get categoriaId(){ return this.libroForm.get('categoriaId'); }

  get autorId(){ return this.libroForm.get('autorId'); }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id !== 0){
        this.consulta = true;
        this._libroService.obtenerLibro(id).subscribe(libro => this.asignarValores(libro));
      }
    });
    this._categoriaService.getCategorias().subscribe(resp => this.categorias = resp);
    this._autorService.getAutores().subscribe(resp  => this.autores = resp);
    this.initForm();
  }

  public initForm(): void {
    this.libroForm = this.fb.group({
      nombre: [{value:'' , disabled: this.consulta}, Validators.required],
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required],
      fechaLibro: [{value:'' , disabled: this.consulta}],
      categoriaId: [{value:'' , disabled: this.consulta}, Validators.required],
      autorId: [{value:'' , disabled: this.consulta}, Validators.required]
    });
  }

  public asignarValores(libro: Libro) : void {
    this.libro = libro;
    this.libroForm.setValue({
      nombre: libro.nombre,
      descripcion: libro.descripcion,
      fechaLibro: formatDate(libro.createAt,'dd/MM/yyyy','en') ,
      categoriaId: libro.categoria.id,
      autorId: libro.autor.id
    });
  }

  public guardarLibro() : void {
    if(this.libroForm.invalid){ return;}

    const { nombre, descripcion, fechaLibro, categoriaId, autorId } = this.libroForm.value;

    this.createLibro.nombre = nombre;
    this.createLibro.descripcion= descripcion;
    this.createLibro.categoriaId = categoriaId;
    this.createLibro.autorId = autorId;

    const autorSelected: Autor = this.autores.find(autor => Number(this.createLibro.autorId) === Number(autor.id));
    this.createLibro.autor = autorSelected;

    const categoriaSelected: Categoria = this.categorias.find(categoria => Number(this.createLibro.categoriaId) === Number(categoria.id));
    this.createLibro.categoria = categoriaSelected;

    this._libroService.crearLibro(this.createLibro)
    .subscribe(libro => {
      Swal.fire(this._translateService.instant('DIALOG.BOOK_ADD'), `${this._translateService.instant('DIALOG.BOOK_ADD_TEXT')} ${libro.nombre} ${this._translateService.instant('DIALOG.ADDED_SUCCESSFUL')}`,'success');
      this.router.navigate(['/libros']);
    },
    err => {
      Swal.fire({
        title: `${this._translateService.instant('DIALOG.ERROR_TITLE')}`,
        text:  err.error.error,
        icon: 'error'
      })
    }
  );

  }

  public eliminarLibro(): void {
    Swal.fire({
      title: this._translateService.instant('DIALOG.DELETE_TITLE'),
      text: `${this._translateService.instant('DIALOG.BOOK_DELETE_ASK')} ${this.libro.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this._translateService.instant('DIALOG.DELETE_YES'),
      cancelButtonText: this._translateService.instant('DIALOG.DELETE_NO'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._libroService.borrarLibro(this.libro.id).subscribe((resp: BookmarkResponse) => {
          if(resp.status === 'OK'){
            Swal.fire(
              this._translateService.instant('DIALOG.BOOK_DELETED'),
              `${resp}`,
              'success'
            )
            this.router.navigate(['libros']);
          }else{
            Swal.fire({
              title: `${this._translateService.instant('DIALOG.ERROR_TITLE')}`,
              text:  resp.message,
              icon: 'error'
            })
          }

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

}
