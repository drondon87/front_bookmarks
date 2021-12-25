import { Libro } from './libro.model';

export class Capitulo {
    id: number;
    numero: string;
    nombre: string;
    descripcion: string;
    libro: Libro;
}