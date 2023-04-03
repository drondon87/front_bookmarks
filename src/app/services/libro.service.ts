import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Libro } from '../models/libro.model';
import { map, catchError } from 'rxjs/operators';
import { CreateLibro } from '../models/create.libro.model';
import { BookmarkResponse } from '../models/bookmark.response.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private urlEndpoint: string = environment.urlEndpoint;
  private controller: string = 'libros';

  constructor(private http: HttpClient) { }

  public getLibros() : Observable<Libro[]>  {
    return this.http.get(`${this.urlEndpoint}/${this.controller}`)
    .pipe(
      map((resp: any) => resp['data'] as Libro[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public borrarLibro(id: number): Observable<BookmarkResponse> {
    return this.http.delete(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp as BookmarkResponse ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearLibro(createLibro: CreateLibro): Observable<Libro> {
    return this.http.post(`${this.urlEndpoint}/${this.controller}`, createLibro).pipe(
      map((resp: any) => resp['data'] as Libro),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public obtenerLibro(id: number) : Observable<Libro> {
    return this.http.get(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Libro ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getLibrosByCategoria(id: number) : Observable<Libro[]>  {
    return this.http.get(`${this.urlEndpoint}/${this.controller}/categoria/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Libro[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
