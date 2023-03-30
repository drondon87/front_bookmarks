import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BookmarkResponse } from 'src/app/models/bookmark.response.model';
import { CreateCitaLibro } from 'src/app/models/create.citaLibro.model';
import { CitaLibroService } from 'src/app/services/cita-libro.service';
import { LibroService } from 'src/app/services/libro.service';
import Swal from 'sweetalert2';
import { CitaLibro } from '../../../models/citaLibro.model';
import { Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-detalle-cita-libro',
  templateUrl: './detalle-cita-libro.component.html',
  styleUrls: ['./detalle-cita-libro.component.css']
})
export class DetalleCitaLibroComponent implements OnInit {

  public citaLibro: CitaLibro = new CitaLibro();
  public consulta: boolean = false;
  public citaLibroForm: FormGroup;
  public libros: Libro[] = [];
  public libroId: number = 0;
  public libro: Libro = new Libro();
  public createCitaLibro: CreateCitaLibro = new CreateCitaLibro();

  constructor(private activatedRoute: ActivatedRoute,
    private _citaLibroService: CitaLibroService,
    private _libroService: LibroService,
    private fb: FormBuilder,
    private _translateService: TranslateService,
    private router: Router) { }

    get descripcion(){ return this.citaLibroForm.get('descripcion'); }

    get pagina(){ return this.citaLibroForm.get('pagina'); }

    get fechaCitaLibro(){ return this.citaLibroForm.get('fechaCitaLibro'); }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let libroId:number = +params.get('libroId');
      let id:number = +params.get('id');
      if(libroId !== 0 && id === 0){
        this.libroId = libroId;
        this.consulta=false;
        this._libroService.obtenerLibro(this.libroId).subscribe(resp => this.libro = resp);
      }else if(libroId === 0 && id !== 0){
        this.consulta = true;
        this._citaLibroService.obtenerCitaLibro(id).subscribe(citaLibro => this.asignarValores(citaLibro));
      }
    });
    this._libroService.getLibros().subscribe(resp => this.libros = resp);
    this.initForm();
  }

  public asignarValores(citaLibro: CitaLibro) : void {
    this.citaLibro = citaLibro;
    this.citaLibroForm.setValue({
      descripcion: citaLibro.descripcion,
      fechaCitaLibro: formatDate(citaLibro.createAt,'dd/MM/yyyy','en') ,
      pagina: citaLibro.pagina,
      libroId: citaLibro.libro.id,
    });
    console.log(this.citaLibro);
  }

  public initForm(): void {
    this.citaLibroForm = this.fb.group({
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required],
      fechaCitaLibro: [{value:'' , disabled: this.consulta}, Validators.required],
      pagina: [{value:'' , disabled: this.consulta}, Validators.required],
      libroId: [{value:this.libroId , disabled: true}]
    });
  }

  public guardarCitaLibro() : void {
    if(this.citaLibroForm.invalid){ return;}

    const { descripcion, fechaCitaLibro, pagina } = this.citaLibroForm.value;

    this.createCitaLibro.descripcion = descripcion;
    this.createCitaLibro.createAt = '2023-10-22';
    this.createCitaLibro.pagina = pagina;
    this.createCitaLibro.libro = this.libro;

    this._citaLibroService.crearCitaLibro(this.createCitaLibro)
      .subscribe((resp: BookmarkResponse) => {
        if(resp.data === null){
          console.log(resp);
          Swal.fire({
            title: `${resp.message} !!!`,
            text: resp.errors.libro,
            icon: 'error'
          })
        }else{
          Swal.fire(this._translateService.instant('DIALOG.BOOK_DATE_ADD'), `${this._translateService.instant('DIALOG.BOOK_DATE_ADD_TEXT')} ${resp.data.nombre} ${this._translateService.instant('DIALOG.ADDED_SUCCESSFUL')}`,'success');
          this.router.navigate(['/libros/citaslibro']);
        }
      },
      err => {
        Swal.fire({
          title: `${this._translateService.instant('DIALOG.ERROR_TITLE')} !!!`,
          text:  err.error.message,
          icon: 'error'
        })
      });

  }

  public eliminarCitaLibro() : void {

  }



}
