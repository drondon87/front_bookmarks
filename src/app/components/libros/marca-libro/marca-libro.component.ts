import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaLibroService } from '../../../services/marca-libro.service';
import { MarcaLibro } from '../../../models/marcaLibro.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateMarcaLibro } from '../../../models/create.marcaLibro.model';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { CapituloService } from 'src/app/services/capitulo.service';
import { Capitulo } from 'src/app/models/capitulo.model';

@Component({
  selector: 'app-marca-libro',
  templateUrl: './marca-libro.component.html',
  styleUrls: ['./marca-libro.component.css']
})
export class MarcaLibroComponent implements OnInit {

  public marcaLibro: MarcaLibro = new MarcaLibro();
  public consulta: boolean = false;
  public marcaLibroForm: FormGroup;
  public createMarcaLibro: CreateMarcaLibro = new CreateMarcaLibro();
  public capituloId: number = 0;
  public capitulo: Capitulo = new Capitulo();

  constructor(private activatedRoute: ActivatedRoute,
              private _marcaLibroService: MarcaLibroService,
              private fb: FormBuilder,
              private router: Router,
              private _translateService: TranslateService,
              private _capituloService: CapituloService) { }

  get descripcion(){ return this.marcaLibroForm.get('descripcion'); }

  get paginas(){ return this.marcaLibroForm.get('paginas'); }

  get capituloF(){ return this.marcaLibroForm.get('capituloF'); }

  get resumen(){ return this.marcaLibroForm.get('resumen'); }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let capituloId:number = +params.get('capituloId');
      this.capituloId = capituloId;
      let id:number = +params.get('id');
      if(id !== 0){
        this.consulta = true;
        this._marcaLibroService.obtenerMarcaLibro(id).subscribe(marcaLibro => {
          this.marcaLibro = marcaLibro;
          this.asignarValores(marcaLibro);
        });
      }
    });
    this._capituloService.obtenerCapitulo(this.capituloId).subscribe(capitulo => this.capitulo = capitulo);
    this.initForm();
  }

  public initForm(): void {
    this.marcaLibroForm = this.fb.group({
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required],
      paginas: [{value:'' , disabled: this.consulta}, Validators.required],
      capituloF: [{value: '' , disabled: this.consulta}, Validators.required],
      resumen: [{value:'' , disabled: this.consulta}]
    });
  }

  public asignarValores(marcaLibro: MarcaLibro) : void {
    this.marcaLibroForm.setValue({
      descripcion: marcaLibro.descripcion,
      paginas: marcaLibro.paginas ,
      capituloF: marcaLibro.capitulo.nombre,
      resumen: marcaLibro.resumen
    });
  }

  public guardarMarcaLibro() : void {
    if(this.marcaLibroForm.invalid){ return;}

    const { descripcion, paginas, resumen } = this.marcaLibroForm.value;

    this.createMarcaLibro.descripcion = descripcion;
    this.createMarcaLibro.paginas = paginas;
    this.createMarcaLibro.resumen = resumen;
    this.createMarcaLibro.capitulo = this.capitulo;

    this._marcaLibroService.crearMarcaLibro(this.createMarcaLibro)
      .subscribe(marcaLibro => {
        Swal.fire(this._translateService.instant('DIALOG.BOOK_MARK_ADD'), `${this._translateService.instant('DIALOG.BOOK_MARK_ADD_TEXT')} ${marcaLibro.descripcion} ${this._translateService.instant('DIALOG.ADDED_SUCCESSFUL')}`,'success');
        this.router.navigate(['capitulos/form',marcaLibro.capitulo.id]);
      },
      err => {
        Swal.fire({
          title: `${this._translateService.instant('DIALOG.ERROR_TITLE')}`,
          text:  err.error.error,
          icon: 'error'
        })
      });
  }

  public volver(): void {
    this.router.navigate(['capitulos/form', this.capituloId]);
  }

  public eliminarMarcaLibro(){
    console.log(this.marcaLibro);
    Swal.fire({
      title: this._translateService.instant('DIALOG.DELETE_TITLE'),
      text: `${this._translateService.instant('DIALOG.BOOK_MARK_DELETE_ASK')} ${this.marcaLibro.descripcion} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this._translateService.instant('DIALOG.DELETE_YES'),
      cancelButtonText: this._translateService.instant('DIALOG.DELETE_NO'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._marcaLibroService.borrarMarcaLibro(this.marcaLibro.id).subscribe(resp => {
          Swal.fire(
            this._translateService.instant('DIALOG.BOOK_MARK_DELETED'),
            `${resp}`,
            'success'
          )
          this.router.navigate(['capitulos/form', this.capituloId]);
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
