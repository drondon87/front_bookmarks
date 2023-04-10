import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { ConsultaResponse } from '../models/consulta.response.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private urlEndpoint: string = environment.urlEndpoint;
  private controller = 'consultas';

  constructor(private http: HttpClient) { }

  public getUltimosRegistros(): Observable<ConsultaResponse>  {
    return this.http.get(`${this.urlEndpoint}/${this.controller}`)
    .pipe(
      map((resp: any) => resp['data'] as ConsultaResponse ),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
