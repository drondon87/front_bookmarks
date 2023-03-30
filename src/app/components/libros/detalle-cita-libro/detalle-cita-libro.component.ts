import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CitaLibroService } from 'src/app/services/cita-libro.service';
import { CitaLibro } from '../../../models/citaLibro.model';

@Component({
  selector: 'app-detalle-cita-libro',
  templateUrl: './detalle-cita-libro.component.html',
  styleUrls: ['./detalle-cita-libro.component.css']
})
export class DetalleCitaLibroComponent implements OnInit {

  public citaLibro: CitaLibro = new CitaLibro();
  public consulta: boolean = false;
  public citaLibroForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private _citaLibroService: CitaLibroService,
    private fb: FormBuilder,
    private _translateService: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id !== 0){
        this.consulta = true;
        this._citaLibroService.obtenerCitaLibro(id).subscribe(citaLibro => this.asignarValores(citaLibro));
      }
    });
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
  }

  public initForm(): void {
    this.citaLibroForm = this.fb.group({
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required],
      fechaCitaLibro: [{value:'' , disabled: this.consulta}, Validators.required],
      pagina: [{value:'' , disabled: this.consulta}, Validators.required],
      libroId: [{value:'' , disabled: this.consulta}, Validators.required]
    });
  }

}
