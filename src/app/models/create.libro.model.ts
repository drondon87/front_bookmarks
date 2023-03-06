import { Autor } from './autor.model';
import { Categoria } from './categoria.model';
export class CreateLibro {
    nombre: string;
    descripcion: string;
    portada: string;
    createAt: Date;
    categoriaId: number;
    fechaLibro: string;
    autorId: string;
    autor: Autor;
    categoria: Categoria;
}
