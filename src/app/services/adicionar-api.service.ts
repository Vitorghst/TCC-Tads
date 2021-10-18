import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ListaApiService } from './lista-api.service';
import { Api } from '../components/listar-api/listar-api.model';



@Injectable({
  providedIn: 'root'
})
export class AdicionarApiService {

  url = 'http://localhost:3000/apis'
  options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  saveApi(api: Api): Observable<Api> {
    return this.httpClient.post<Api>(this.url, JSON.stringify(api), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  updateCar(api: Api): Observable<Api> {
    return this.httpClient.put<Api>(this.url + '/' + api.id, JSON.stringify(api), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}

  

