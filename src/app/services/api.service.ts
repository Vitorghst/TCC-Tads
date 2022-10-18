import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Api } from '../components/listar-api/listar-api.model';
import { Tela } from '../components/listar-tela/listar-tela.model';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { CartItem, MenuItem } from '../home/home.model';
import { Order } from '../components/order/order.model';
import { NgToastService } from 'ng-angular-popup';
import { ThrowStmt } from '@angular/compiler';
import { Reviews } from '../components/order-sumary/order-sumary.model';






@Injectable({
  providedIn: 'root'
})

export class ListaApiService {

  @Output() notifier = new EventEmitter<string>();


  url = 'http://localhost:3000';
  editDados: any = '';
  editTelas: any = '';
  editItem: any = '';
  editUser: any = '';
  editRestaurant: any = ''
  editOrder: any = '';
  editHorario: any = '';
  editStatus: any = '';
  items: CartItem[] = []
  ev: any = '';
  options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }

  itemAdicionais: CartItem[] = []
  rating3?: number;

  constructor(private httpClient: HttpClient, private toast: NgToastService ) { }

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

  notify( message: string): void{
    this.notifier.emit(message)
  }

  // Obtem todas as TELAS
  getTelas(): Observable<Tela[]> {
    return this.httpClient.get<Tela[]>(`${this.url}/telas`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getRestaurante(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/restaurant`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateRestaurante(restaurante: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/restaurant/${restaurante.id}`, restaurante, this.options)
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

  getUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/users` )
  }


  getOrderById(id: any): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.url}/orders?usuario=${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.url}/orders`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateOrder(order: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/orders/${order.id}`, order, this.options)

  }


  addReview(review: any){
    return this.httpClient.post<Reviews>(`${this.url}/reviews`, review, this.options)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateUser(user: { id: number, user: string, email: string, password: any,  confirmPassword: any}): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/users/${user.id}`, user, this.options)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }



  getUserById(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/users/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  deleteUserById(id: any){
    return this.httpClient.delete<any>(`${this.url}/users/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  

  deleteItembyId(id: any){
    return this.httpClient.delete(`${this.url}/menu/${id}`)
  }

  // editar dados do menu

  addMenuItem(item: any){
    return this.httpClient.post<MenuItem>(`${this.url}/menu`, item, this.options)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getReview(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/reviews`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAdicionais(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/adicionais`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getHorarios(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/horarios`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  buscar(cep: string): Observable<any> {
    return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  clear(){
    this.items = []
    this.itemAdicionais = []
  }


  addItem(item:MenuItem){
    let foundItem = this.items.find((mItem)=> mItem.menuItem.id === item.id)
    if(foundItem){
      this.increaseQty(foundItem)
      this.itemAdicionais.push(new CartItem(item))
      
    }else{
      this.items.push(new CartItem(item))
      this.itemAdicionais.push(new CartItem(item))
    }
    this.toast.success({summary:`Você adicionou o item ${item.name}`, position: 'br', duration: 3000});
  }



  increaseQty(item: CartItem){
    item.quantity = item.quantity + 1
    
  }

  addObservacao(item: CartItem) {
    item.observacao = item.observacao
    console.log(item);
    
  }

  addAdicionais(item: CartItem) {
    item.adicionais = item.adicionais
    console.log(item);
    
  }


  decreaseQty(item: CartItem){
    item.quantity = item.quantity - 1
    this.itemAdicionais.splice(this.itemAdicionais.indexOf(item), 1)
    if (item.quantity === 0){
      this.removeItem(item)
    }
  }

  cartItems(): CartItem[]{
    return this.items
  }

  cartAdicionais(): CartItem[]{
    return this.itemAdicionais
  }
  
  updateHorarios(horarios: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/horarios/${horarios.id}`, horarios, this.options)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

    


  removeItem(item:CartItem){
    this.items.splice(this.items.indexOf(item), 1)
    if(item.quantity == 0){
      this.itemAdicionais = []
    } else {
      this.itemAdicionais = this.itemAdicionais.filter((mItem)=> mItem.menuItem.id !== item.menuItem.id)
    }
    this.toast.error({summary:`Você removeu o item ${item.menuItem.name}`, position: 'br', duration: 3000});
  }


  total(): number{
    return this.items
      .map(item => item.value())
      .reduce((prev, value)=> prev+value, 0)
  }


  checkOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.url}/orders`, order, this.options)
  }

  // Adiciona uma API
  public addApi(params: { id: number, codigo: number, nome: string, metodo: string }): Observable<Api> {
    return this.httpClient.post<Api>(`${this.url}/apis`, params, this.options)

  }



  addUser(user: { id: number, user: string, email: string, password: any}): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/users`, user, this.options)
  }
  // Adicionar uma TELA
  public addTela(telas: { id: number, JHashT: string, nome: string, permissao: string }): Observable<Tela> {
    return this.httpClient.post<Tela>(`${this.url}/telas`, telas, this.options)

  }

  updateItem(params: { id: string, imagePath: string, name: string, description: string, price: number, category: string }): Observable<MenuItem> {
    return this.httpClient.put<MenuItem>(`${this.url}/menu/${params.id}`, params, this.options)
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
function adicionais(arg0: CartItem, adicionais: any) {
  throw new Error('Function not implemented.');
}

