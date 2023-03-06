import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MarcaLibro } from '../models/marcaLibro.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CreateMarcaLibro } from '../models/create.marcaLibro.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaLibroService {

  private urlEndpoint: string = environment.urlEndpoint;

  constructor(private http: HttpClient) { }

  public getMarcasLibrosByCapitulo(id: number) : Observable<MarcaLibro[]>  {
    return this.http.get(`${this.urlEndpoint}/marcalibro/capitulo/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as MarcaLibro[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public borrarMarcaLibro(id: number): Observable<string> {
    return this.http.delete(`${this.urlEndpoint}/marcalibro/${id}`)
    .pipe(
      map((resp: any) => resp['message'] as string ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public obtenerMarcaLibro(id: number) : Observable<MarcaLibro> {
    return this.http.get(`${this.urlEndpoint}/marcalibro/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as MarcaLibro ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearMarcaLibro(createMarcaLibro: CreateMarcaLibro): Observable<MarcaLibro> {
    return this.http.post(`${this.urlEndpoint}/marcalibro`, createMarcaLibro).pipe(
      map((resp: any) => resp['data'] as MarcaLibro),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
