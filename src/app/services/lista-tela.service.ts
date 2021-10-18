import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Tela } from '../components/listar-tela/listar-tela.model';


@Injectable({
  providedIn: 'root'
})
export class ListaTelaService {

  url = 'http://localhost:3000/telas';
  options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) { }
  // Obtem todos as Telas
  getTelas(): Observable<Tela[]> {
    return this.httpClient.get<Tela[]>(this.url)
    .pipe(
      retry(2),
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
