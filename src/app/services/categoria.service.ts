import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndpoint: string = environment.urlEndpoint;
  private controller: string = 'categorias';

  constructor(private http: HttpClient) { }

  public getCategorias() : Observable<Categoria[]>  {
    return this.http.get(`${this.urlEndpoint}/${this.controller}`)
    .pipe(
      map((resp: any) => resp['data'] as Categoria[] ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public borrarCategoria(id: number): Observable<string> {
    return this.http.delete(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp['message'] as string ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public obtenerCategoria(id: number) : Observable<Categoria> {
    return this.http.get(`${this.urlEndpoint}/${this.controller}/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as Categoria ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post(`${this.urlEndpoint}/${this.controller}`, categoria).pipe(
      map((resp: any) => resp['data'] as Categoria),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
