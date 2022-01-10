import { Libro } from './libro.model';
export class CitaLibro {
    id: number;
    autor: string;
    descripcion: string;
    createAt: Date;
    libro: Libro;
}