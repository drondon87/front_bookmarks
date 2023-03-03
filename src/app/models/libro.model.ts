import { Categoria } from './categoria.model';
import { Autor } from './autor.model';

export class Libro {
    id: number;
    nombre: string;
    descripcion: string;
    portada: string;
    createAt: Date;
    categoria: Categoria;
    autor: Autor;
}
