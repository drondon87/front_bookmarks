import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Capitulo } from '../models/capitulo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { CreateCapitulo } from '../models/create.capitulo.model';

@Injectable({
  providedIn: 'root'
})
export class CapituloService {

  private urlEndpoint: string = environment.urlEndpoint;
  private controller: string = 'capitulos';

  constructor(private http: HttpClient) { }

  public getCapitulosByLIbro(id: number) : Observable<Capitulo[]>  {
    return this.http.get(`${this.urlEndpoint}/${this.controller}/libro/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Capitulo[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getCapitulosByLibroAndPage(id: number, page: number) : Observable<any[]>  {
    return this.http.get(`${this.urlEndpoint}/${this.controller}/libro/${id}/page/${page}`)
    .pipe(
      map((resp: any) => resp['data']),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public borrarCapitulo(id: number): Observable<string> {
    return this.http.delete(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp['message'] as string ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearCapitulo(createCapitulo: CreateCapitulo): Observable<Capitulo> {
    return this.http.post(`${this.urlEndpoint}/${this.controller}`, createCapitulo).pipe(
      map((resp: any) => resp['data'] as Capitulo),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public obtenerCapitulo(id: number) : Observable<Capitulo> {
    return this.http.get(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Capitulo ),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
