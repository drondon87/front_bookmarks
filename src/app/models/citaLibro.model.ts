import { Libro } from './libro.model';
export class CitaLibro {
    id: number;
    pagina: string;
    descripcion: string;
    createAt: Date;
    libro: Libro;
}
