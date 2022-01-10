import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Capitulo } from '../../../models/capitulo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCapitulo } from '../../../models/create.capitulo.model';
import { CapituloService } from '../../../services/capitulo.service';
import Swal from 'sweetalert2';
import { MarcaLibro } from '../../../models/marcaLibro.model';
import { MarcaLibroService } from '../../../services/marca-libro.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalle-capitulo',
  templateUrl: './detalle-capitulo.component.html',
  styleUrls: ['./detalle-capitulo.component.css']
})
export class DetalleCapituloComponent implements OnInit {

  public consulta: boolean = false;
  public capitulo: Capitulo = new Capitulo();
  public capituloForm: FormGroup;
  public createCapitulo: CreateCapitulo = new CreateCapitulo();
  public libroId: number = 0;
  public marcasLibros: MarcaLibro[] = [];
  public capituloId: number = 0;

  get numero(){ return this.capituloForm.get('numero'); }

  get nombre(){ return this.capituloForm.get('nombre'); }

  get descripcion(){ return this.capituloForm.get('descripcion'); }

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private _capituloService: CapituloService,
              private _marcaLibroService: MarcaLibroService,
              private _translateService: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let libroId:number = +params.get('libroId');
      let id:number = +params.get('id');
      if(libroId !== 0 && id === 0){
        this.consulta=false;
        this.libroId = libroId;
      }else if(libroId === 0 && id !== 0){
        this.consulta=true;

        this._capituloService.obtenerCapitulo(id).subscribe(capitulo => this.asignarValores(capitulo));
        this._marcaLibroService.getMarcasLibrosByCapitulo(id).subscribe(marcas => this.marcasLibros = marcas);
      }
    });
    this.initForm();
  }

  public initForm(): void {
    this.capituloForm = this.fb.group({
      numero: [{value:'' , disabled: this.consulta}, Validators.required],
      nombre: [{value:'' , disabled: this.consulta}, Validators.required],
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required]
    });
  }
  
  guardarCapitulo(){
    if(this.capituloForm.invalid){ return;}

    const { numero, nombre, descripcion } = this.capituloForm.value;
  
    this.createCapitulo.numero = numero;
    this.createCapitulo.nombre = nombre;
    this.createCapitulo.descripcion = descripcion;
    this.createCapitulo.libroId = this.libroId;

    this._capituloService.crearCapitulo(this.createCapitulo)
      .subscribe(capitulo => {
        Swal.fire('Nuevo Capitulo', `El capitulo ${capitulo.nombre} ha sido creado con exito`,'success');
        this.router.navigate(['/capitulos']);
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
      numero: capitulo.numero
    });
    this.capituloId = capitulo.id;
    this.capitulo = capitulo;
  }

  public eliminarMarcaLibro(marcaLibro: MarcaLibro){
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la marca ${marcaLibro.descripcion} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText:'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._marcaLibroService.borrarMarcaLibro(marcaLibro.id).subscribe(resp => {
          this.marcasLibros = this.marcasLibros.filter(mar => mar != marcaLibro);
          Swal.fire(
            'Marca Libro Eliminada!',
            `${resp}`,
            'success'
          )
        });
        
      }
    })
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
        });
        
      }
    })
  }

  public crearMarcaLibro(): void {
    this.router.navigate(['/libros/marcalibro/form/capitulo/',this.capituloId]);
  }
}
