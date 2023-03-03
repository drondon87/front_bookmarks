import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Autor } from '../models/autor.model';
import { catchError, map } from 'rxjs/operators';
import { CreateAutor } from '../models/create.autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private urlEndpoint: string = environment.urlEndpoint;
  private controller: string = 'autores';

  constructor(private http: HttpClient) { }

  public getAutores() : Observable<Autor[]>  {
    return this.http.get(`${this.urlEndpoint}/${this.controller}`)
    .pipe(
      map((resp: any) => resp['data'] as Autor[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public borrarAutor(id: number): Observable<string> {
    return this.http.delete(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp['message'] as string ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearAutor(createAutor: CreateAutor): Observable<Autor> {
    return this.http.post(`${this.urlEndpoint}/${this.controller}`, createAutor).pipe(
      map((resp: any) => resp['data'] as Autor),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public obtenerAutor(id: number) : Observable<Autor> {
    return this.http.get(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Autor ),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
