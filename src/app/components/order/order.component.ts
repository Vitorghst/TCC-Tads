import { Component, Input, OnInit } from '@angular/core';
import { ListaApiService } from '../../services/api.service';
import {CartItem, MenuItem} from '../../home/home.model';
import {Order, OrderItem} from "./order.model"
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments';
import { RadioOption } from '../radio/radio.model';
import { NgToastService } from 'ng-angular-popup';
import * as moment from 'moment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  cepPattern = /^[0-9]{5}-[0-9]{3}$/


  orderForm!: FormGroup

  delivery: number = 8

  details: any 


  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'Dinheiro'},
    {label: 'Cartão de Débito', value: 'Cartão de Débito'},
    {label: 'Cartão Refeição', value: 'Cartão Refeição'},
  ]
  paypal: any
  pagamentoAplicativo!: any;
  date = moment().locale('pt-br').format('L, h:mm:ss a');
  usuario!: any;
  permissao: any
  nomeUser!: any
  

  constructor(private Api: ListaApiService, private route: Router, private formBuilder: FormBuilder, private toast: NgToastService ) {
   
   }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      telefone: this.formBuilder.control('', [Validators.required]),
      cep: this.formBuilder.control( '', [Validators.required, Validators.pattern(this.cepPattern)]), //cep mask
      logradouro: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      localidade: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      data: this.formBuilder.control(this.date),
      optionalAddress: this.formBuilder.control(''),
      total: this.formBuilder.control('R$' + this.total(), [Validators.required]),
      pagamentoEntrega: this.formBuilder.control(''),
      pagamentoAplicativo: this.formBuilder.control(''),
      usuario: this.formBuilder.control(sessionStorage.getItem('token')),
    }, {validator: OrderComponent.equalsTo})
    
    this.orderForm.value.data = this.date
    
    render ({
      id: '#myPaypalButtons',
      currency: 'USD',
      value:  this.total().toString(),
      onApprove: (details: any) => {
        if(details.status === 'COMPLETED'){
          this.details = details.status
          this.pagamentoAplicativo = 'Pagamento realizado pelo Paypal'
          this.orderForm.value.pagamentoAplicativo = this.pagamentoAplicativo	
          this.paypal = this.toast.success({summary:`Transação Aprovada pelo Paypal`, position: 'br', duration: 2000})
         
          return this.pagamentoApp()
        } else {
          this.toast.error({summary:`Transação Recusada`, position: 'br', duration: 3000});
        }
        
    

    },
    })

  }
  
  pagamentoApp(){
    this.pagamentoAplicativo = 'Pagamento realizado pelo aplicativo'
  }
  

  // libear o botao de finalizar caso for paymeetOptions ou paypal
  isOrderCompleted(): boolean {
    if(this.orderForm.get('pagamentoEntrega')!.value === 'Dinheiro' || this.orderForm.get('pagamentoEntrega')!.value === 'Cartão Refeição' || this.orderForm.get('pagamentoEntrega')!.value === 'Cartão de Débito'){
      return true
    } else if(this.details === 'COMPLETED'){
      return true
    } else {
      return false
    }
  }



  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){ 
      return undefined!
    }
    if(email.value !== emailConfirmation.value){
      return {emailsNotMatch: true}
    }
    return undefined!

  }

  getUser() {
    const token = sessionStorage.getItem('token')
    this.Api.getUserById(token).subscribe((user: any) => {
      user.id = this.orderForm.value.usuario
      console.log(this.orderForm.value.usuario);
      
  })
  }


  itemsValue(): number {
    return this.Api.total()
  }

  total(): number {
    return this.Api.total() + this.delivery
  }

  cartItems(): CartItem[] {
    return this.Api.cartItems() 
    
  }

  itemAdicionais(): CartItem[] {
    return this.Api.cartAdicionais()
  }	



  buscar(){ 
    this.Api.buscar(this.orderForm.get('cep')!.value).subscribe((response) => {
      this.orderForm.patchValue({
        logradouro: response['logradouro'],
        bairro: response['bairro'],
        localidade: response['localidade']
      })
    }
    )
  }


  increaseQty(item: CartItem){
    this.Api.increaseQty(item)
  }
  
  observacao(item: CartItem){
    this.Api.addObservacao(item)
  }

  adicionais(item: CartItem){
    this.Api.addAdicionais(item)
    console.log(item);
    
  }
  
  

  decreaseQty(item: CartItem){
    this.Api.decreaseQty(item)
  }

  removeItem(item: any): void {
    this.Api.removeItem(item)
    
  }


  checkOrder(order: Order){
    order.orderItems = this.itemAdicionais().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.name, item.observacao, item.menuItem.imagePath, item.adicionais, this.total))
    this.Api.checkOrder(order).subscribe((): void => {
      this.route.navigate(['/order-sumary'])
      this.Api.clear()
    }, (err) => {
      console.log(err)
    }
    )
  }
}
