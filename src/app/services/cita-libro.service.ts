import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CitaLibro } from '../models/citaLibro.model';
import { map, catchError } from 'rxjs/operators';
import { CreateCitaLibro } from '../models/create.citaLibro.model';
import { BookmarkResponse } from '../models/bookmark.response.model';

@Injectable({
  providedIn: 'root'
})
export class CitaLibroService {

  private urlEndpoint: string = environment.urlEndpoint;

  constructor(private http: HttpClient) { }

  public obtenerCitaLibro(id: number): Observable<CitaLibro> {
    return this.http.get(`${this.urlEndpoint}/citalibro/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as CitaLibro ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearCitaLibro(createCitaLibro: CreateCitaLibro): Observable<BookmarkResponse> {
    return this.http.post(`${this.urlEndpoint}/citalibro`, createCitaLibro).pipe(
      map((resp: any) => resp as BookmarkResponse),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public borrarCitaLibro(id: number): Observable<string> {
    return this.http.delete(`${this.urlEndpoint}/citalibro/${id}`)
    .pipe(
      map((resp: any) => resp['message'] as string ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public buscarCitasLibrosByLibro(id: number): Observable<CitaLibro[]>  {
    return this.http.get(`${this.urlEndpoint}/citalibro/libro/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as CitaLibro[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public buscarCitasLibros(): Observable<CitaLibro[]>  {
    return this.http.get(`${this.urlEndpoint}/citalibro`)
    .pipe(
      map((resp: any) => resp['data'] as CitaLibro[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
