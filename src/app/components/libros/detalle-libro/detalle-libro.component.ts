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

  constructor(private fb: FormBuilder,
              private _categoriaService: CategoriaService,
              private _libroService: LibroService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get nombre(){ return this.libroForm.get('nombre'); }

  get descripcion(){ return this.libroForm.get('descripcion'); }

  get fechaLibro(){ return this.libroForm.get('fechaLibro'); }

  get categoriaId(){ return this.libroForm.get('categoriaId'); }

  get autor(){ return this.libroForm.get('autor'); }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id !== 0){
        this.consulta = true;
        this._libroService.obtenerLibro(id).subscribe(libro => this.asignarValores(libro));
      }
    });
    this._categoriaService.getCategorias().subscribe(resp => this.categorias = resp);
    this.initForm();
  }

  public initForm(): void {
    this.libroForm = this.fb.group({
      nombre: [{value:'' , disabled: this.consulta}, Validators.required],
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required],
      fechaLibro: [{value:'' , disabled: this.consulta}, Validators.required],
      categoriaId: [{value:'' , disabled: this.consulta}, Validators.required],
      autor: [{value:'' , disabled: this.consulta}, Validators.required] 
    });
  }

  public asignarValores(libro: Libro) : void {
    this.libroForm.setValue({
      nombre: libro.nombre,
      descripcion: libro.descripcion,
      fechaLibro: formatDate(libro.createAt,'dd/MM/yyyy','en') ,
      categoriaId: libro.categoria.id,
      autor: libro.autor
    });
  }

  public guardarLibro() : void {
    if(this.libroForm.invalid){ return;}
  
    const { nombre, descripcion, fechaLibro, categoriaId, autor } = this.libroForm.value;
    
    this.createLibro.nombre = nombre;
    this.createLibro.descripcion= descripcion;
    this.createLibro.fechaLibro = fechaLibro;
    this.createLibro.categoriaId = categoriaId;
    this.createLibro.autor = autor;

    this._libroService.crearLibro(this.createLibro)
    .subscribe(libro => {
      Swal.fire('Nuevo Libro', `El libro ${libro.nombre} ha sido creado con exito`,'success');
      this.router.navigate(['/libros']);
    },
    err => {
      Swal.fire({
        title: `Error ${err.error.status} !!!`,
        text:  err.error.message,
        icon: 'error'
      })
    }
  );


  }

}
