import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Api } from '../components/listar-api/listar-api.model';
import { Tela } from '../components/listar-tela/listar-tela.model';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { CartItem, MenuItem } from '../home/home.model';



@Injectable({
  providedIn: 'root'
})

export class ListaApiService {

  url = 'http://localhost:3000';
  editDados: any = '';
  editTelas: any = '';
  items: CartItem[] = []
  ev: any = '';
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

  // Obtem todas as APIS
  getApis(): Observable<Api[]> {
    return this.httpClient.get<Api[]>(`${this.url}/apis`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  // Obtem todas as TELAS
  getTelas(): Observable<Tela[]> {
    return this.httpClient.get<Tela[]>(`${this.url}/telas`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getMenu(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(`${this.url}/menu`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  clear(){
    this.items = []
  }

  addItem(item:MenuItem){
    let foundItem = this.items.find((mItem)=> mItem.menuItem.id === item.id)
    if(foundItem){
      this.increaseQty(foundItem)
    }else{
      this.items.push(new CartItem(item))
    }
  }

  increaseQty(item: CartItem){
    item.quantity = item.quantity + 1
  }

  decreaseQty(item: CartItem){
    item.quantity = item.quantity - 1
    if (item.quantity === 0){
      this.removeItem(item)
    }
  }

  removeItem(item:CartItem){
    this.items.splice(this.items.indexOf(item), 1)
  }

  total(): number{
    return this.items
      .map(item => item.value())
      .reduce((prev, value)=> prev+value, 0)
  }
   

  // Adiciona uma API
  public addApi(params: { id: number, codigo: number, nome: string, metodo: string }): Observable<Api> {
    return this.httpClient.post<Api>(`${this.url}/apis`, params, this.options)

  }
  // Adicionar uma TELA
  public addTela(telas: { id: number, JHashT: string, nome: string, permissao: string }): Observable<Tela> {
    return this.httpClient.post<Tela>(`${this.url}/telas`, telas, this.options)

  }

  // Editar API
  updateApi(params: { id: number, codigo: number, nome: string, metodo: string }): Observable<any> {
    console.log(this.url + '/apis' + params.id, params, this.options)
    return this.httpClient.put(this.url + '/apis/' + params.id, params, this.options)


  }

  // Editar TELA
  updateTela(telas: { id: number, JHashT: string, nome: string, permissao: string }): Observable<any> {
    console.log(this.url + '/telas' + telas.id, telas, this.options)
    return this.httpClient.put(this.url + '/telas/' + telas.id, telas, this.options)


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
