import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Libro } from '../models/libro.model';
import { map, catchError } from 'rxjs/operators';
import { CreateLibro } from '../models/create.libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private urlEndpoint: string = environment.urlEndpoint;

  constructor(private http: HttpClient) { }

  public getLibros() : Observable<Libro[]>  {
    return this.http.get(`${this.urlEndpoint}/libro`)
    .pipe(
      map((resp: any) => resp['data'] as Libro[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public borrarLibro(id: number): Observable<string> {
    return this.http.delete(`${this.urlEndpoint}/libro/${id}`)
    .pipe(
      map((resp: any) => resp['message'] as string ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearLibro(createLibro: CreateLibro): Observable<Libro> {
    return this.http.post(`${this.urlEndpoint}/libro`, createLibro).pipe(
      map((resp: any) => resp['data'] as Libro),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public obtenerLibro(id: number) : Observable<Libro> {
    return this.http.get(`${this.urlEndpoint}/libro/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Libro ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getLibrosByCategoria(id: number) : Observable<Libro[]>  {
    return this.http.get(`${this.urlEndpoint}/libro/categoria/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Libro[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
