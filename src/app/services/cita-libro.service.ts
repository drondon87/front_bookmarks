import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CitaLibro } from '../models/citaLibro.model';
import { map, catchError } from 'rxjs/operators';
import { CreateCitaLibro } from '../models/create.citaLibro.model';

@Injectable({
  providedIn: 'root'
})
export class CitaLibroService {

  private urlEndpoint: string = environment.urlEndpoint;

  constructor(private http: HttpClient) { }

  public obtenerCitaLibro(id: number) : Observable<CitaLibro> {
    return this.http.get(`${this.urlEndpoint}/citalibro/${id}`)
    .pipe(
      map((resp: any) => resp['data'] as CitaLibro ),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public crearCitaLibro(createCitaLibro: CreateCitaLibro): Observable<CitaLibro> {
    return this.http.post(`${this.urlEndpoint}/citalibro`, createCitaLibro).pipe(
      map((resp: any) => resp['data'] as CitaLibro),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
