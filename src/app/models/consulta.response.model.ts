import { Autor } from './autor.model';
import { Capitulo } from './capitulo.model';
import { Libro } from './libro.model';
import { MarcaLibro } from './marcaLibro.model';
export class ConsultaResponse {
  autores: Autor[];
  capitulos: Capitulo[];
  libros: Libro[];
  marcaLibros: MarcaLibro[];
}
