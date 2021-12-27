import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaLibroService } from '../../../services/marca-libro.service';
import { MarcaLibro } from '../../../models/marcaLibro.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateMarcaLibro } from '../../../models/create.marcaLibro.model';

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

  constructor(private activatedRoute: ActivatedRoute,
              private _marcaLibroService: MarcaLibroService,
              private fb: FormBuilder,
              private router: Router) { }
  
  get descripcion(){ return this.marcaLibroForm.get('descripcion'); }

  get paginas(){ return this.marcaLibroForm.get('paginas'); }

  get capitulo(){ return this.marcaLibroForm.get('capitulo'); }

  get resumen(){ return this.marcaLibroForm.get('resumen'); }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let capituloId:number = +params.get('capituloId');
      this.capituloId = capituloId;
      let id:number = +params.get('id');
      if(id !== 0){
        this.consulta = true;
        this._marcaLibroService.obtenerMarcaLibro(id).subscribe(marcaLibro => this.asignarValores(marcaLibro));
      }
    });
    this.initForm();
  }

  public initForm(): void {
    this.marcaLibroForm = this.fb.group({
      descripcion: [{value:'' , disabled: this.consulta}, Validators.required],
      paginas: [{value:'' , disabled: this.consulta}, Validators.required],
      capitulo: [{value:'' , disabled: this.consulta}, Validators.required],
      resumen: [{value:'' , disabled: this.consulta}] 
    });
  }

  public asignarValores(marcaLibro: MarcaLibro) : void {
    this.marcaLibroForm.setValue({
      descripcion: marcaLibro.descripcion,
      paginas: marcaLibro.paginas ,
      capitulo: marcaLibro.capitulo.nombre,
      resumen: marcaLibro.resumen
    });
  }

  public guardarMarcaLibro() : void {
    if(this.marcaLibroForm.invalid){ return;}

    const { descripcion, paginas, resumen } = this.marcaLibroForm.value;

    this.createMarcaLibro.descripcion = descripcion;
    this.createMarcaLibro.paginas = paginas;
    this.createMarcaLibro.resumen = resumen;
    this.createMarcaLibro.capituloId = this.capituloId;
  }

  public volver(): void {
    this.router.navigate(['capitulos/form', this.capituloId]);
  }

}
