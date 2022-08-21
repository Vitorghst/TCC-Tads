import { Component, OnInit } from '@angular/core';
import { ListaApiService } from '../../services/api.service';
import {CartItem, MenuItem} from '../../home/home.model';
import {Order, OrderItem} from "./order.model"
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RadioOption } from '../radio/radio.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm!: FormGroup

  delivery: number = 8
  


  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private Api: ListaApiService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      cep: this.formBuilder.control( '', [Validators.required, Validators.minLength(8)]),
      logradouro: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      localidade: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    },)

  }


  itemsValue(): number {
    return this.Api.total()
  }

  cartItems(): CartItem[] {
    return this.Api.cartItems()
    
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

  remove(item: CartItem){
    this.Api.removeItem(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.name, item.observacao, item.adicionais))
    this.Api.checkOrder(order).subscribe((): void => {
      this.route.navigate(['/order-sumary'])
      this.Api.clear()
    }, (err) => {
      console.log(err)
    }
    )
  }
}
