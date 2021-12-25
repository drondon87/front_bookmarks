import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../../services/libro.service';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-lista-libro-categoria',
  templateUrl: './lista-libro-categoria.component.html',
  styleUrls: ['./lista-libro-categoria.component.css']
})
export class ListaLibroCategoriaComponent implements OnInit {

  public libros: Libro[] = [];
  public categorias: Categoria[] = [];
  public categoriaId: number;

  constructor(private _libroService: LibroService,
              private _categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this._categoriaService.getCategorias().subscribe(resp => this.categorias = resp);
  }

  public buscarLibros(): void{
    this._libroService.getLibrosByCategoria(this.categoriaId).subscribe(resp => this.libros = resp)
  }

}
