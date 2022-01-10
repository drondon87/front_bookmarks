import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.component.html',
  styleUrls: ['./detalle-categoria.component.css']
})
export class DetalleCategoriaComponent implements OnInit {

  public categoria: Categoria = new Categoria();
  public categoriaForm: FormGroup;
  public consulta: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private _categoriaService: CategoriaService,
              private router: Router,
              private _translateService: TranslateService) { }

  get nombre(){ return this.categoriaForm.get('nombre'); }

  get descripcion(){ return this.categoriaForm.get('descripcion'); }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id !== 0){
        this.consulta = true;
        this._categoriaService.obtenerCategoria(id).subscribe(categoria => this.asignarValores(categoria));
      }
    });
    this.initForm();

  }

  public initForm(): void {
    this.categoriaForm = this.fb.group({
      nombre: [{value:'' , disabled: this.consulta}, Validators.required],
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required]
    });
  }

  public asignarValores(categoria: Categoria) : void {
    this.categoriaForm.setValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
  }

  public guardarCategoria() : void {

    if(this.categoriaForm.invalid){ return;}

    const { nombre, descripcion } = this.categoriaForm.value;

    this.categoria.nombre = nombre;
    this.categoria.descripcion = descripcion;

    this._categoriaService.crearCategoria(this.categoria)
      .subscribe(categoria => {
        Swal.fire(this._translateService.instant('DIALOG.CATEGORY_ADD'), `${this._translateService.instant('DIALOG.CATEGORY_ADD_TEXT')} ${categoria.nombre} ${this._translateService.instant('DIALOG.ADDED_SUCCESSFUL')}`,'success');
        this.router.navigate(['/categorias']);
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
