import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  public categorias: Categoria[] = [];

  constructor(private _categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this._categoriaService.getCategorias().subscribe(resp => this.categorias = resp);
  }

  public eliminarCategoria(categoria: Categoria): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la categoria ${categoria.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText:'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoriaService.borrarCategoria(categoria.id).subscribe(resp => {
          this.categorias = this.categorias.filter(cat => cat != categoria);
          Swal.fire(
            'Categoria Eliminada!',
            `${resp}`,
            'success'
          )
        });
        
      }
    })

  }

}
