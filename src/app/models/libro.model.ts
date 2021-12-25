import { Categoria } from './categoria.model';

export class Libro {
    id: number;
    nombre: string;
    descripcion: string;
    portada: string;
    createAt: Date;
    categoria: Categoria;
    autor: string;
}