import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Autor } from 'src/app/models/autor.model';
import { BookmarkResponse } from 'src/app/models/bookmark.response.model';
import { AutorService } from 'src/app/services/autor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-autor',
  templateUrl: './detalle-autor.component.html',
  styleUrls: ['./detalle-autor.component.css']
})
export class DetalleAutorComponent implements OnInit {

  public autor: Autor = new Autor();
  public autorForm: FormGroup;
  public consulta: boolean = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _autorService: AutorService,
    private router: Router,
    private _translateService: TranslateService) { }

  get nombre(){ return this.autorForm.get('nombre'); }

  get apellido(){ return this.autorForm.get('apellido'); }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id !== 0){
        this.consulta = true;
        this._autorService.obtenerAutor(id).subscribe(autor => this.asignarValores(autor));
      }
    });
    this.initForm();
  }

  public initForm(): void {
    this.autorForm = this.fb.group({
      nombre: [{value:'' , disabled: this.consulta}, Validators.required],
      apellido: [{value:'' , disabled: this.consulta}, Validators.required]
    });
  }

  public asignarValores(autor: Autor) : void {
    this.autor = autor;
    this.autorForm.setValue({
      nombre: autor.nombre,
      apellido: autor.apellido
    });
  }

  public guardarAutor() : void {

    if(this.autorForm.invalid){ return;}

    const { nombre, apellido } = this.autorForm.value;

    this.autor.nombre = nombre;
    this.autor.apellido = apellido;

    this._autorService.crearAutor(this.autor)
      .subscribe(autor => {
        Swal.fire(this._translateService.instant('DIALOG.AUTHOR_ADD'), `${this._translateService.instant('DIALOG.AUTHOR_ADD_TEXT')} ${autor.nombre} ${autor.apellido} ${this._translateService.instant('DIALOG.ADDED_SUCCESSFUL')}`,'success');
        this.router.navigate(['/autores']);
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

  public eliminarAutor(): void {
    Swal.fire({
      title: this._translateService.instant('DIALOG.DELETE_TITLE'),
      text: `${this._translateService.instant('DIALOG.AUTHOR_DELETE_ASK')} ${this.autor.nombre} ${this.autor.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this._translateService.instant('DIALOG.DELETE_YES'),
      cancelButtonText: this._translateService.instant('DIALOG.DELETE_NO'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._autorService.borrarAutor(this.autor.id).subscribe((resp: BookmarkResponse) => {
          if(resp.status === 'OK'){
            Swal.fire(
              this._translateService.instant('DIALOG.AUTHOR_DELETED'),
              `${resp}`,
              'success'
            )
            this.router.navigate(['autores']);
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
