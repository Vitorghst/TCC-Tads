import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PrimeIcons } from 'primeng/api';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gerenciamento-pedidos',
  templateUrl: './gerenciamento-pedidos.component.html',
  styleUrls: ['./gerenciamento-pedidos.component.css']
})
export class GerenciamentoPedidosComponent implements OnInit {
  pedidos: any;
  testes!: []
  pedidoModal: any;
  delivery: number = 8
  date = moment().locale('pt-br').format('L, h:mm:ss a');
  menuItemState = 'ready';
  searchText = '';

  form = this.fb.group({
    id: new FormControl(''),
    name: new FormControl (''),
    email: new FormControl(''),
    emailConfirmation: new FormControl(''),
    telefone: new FormControl('',),
    cep: new FormControl( '',),
    logradouro: new FormControl(''),
    bairro: new FormControl(''),
    localidade: new FormControl(''),
    number: new FormControl(''),
    data: new FormControl(this.date),
    optionalAddress: new FormControl(''),
    status : new FormControl('Aguardando Confirmação'),
    total: new FormControl('R$' + this.total(),),
    pagamentoEntrega: new FormControl(''),
    pagamentoAplicativo: new FormControl(''),
    orderItems: new FormControl(''),
    usuario: new FormControl(sessionStorage.getItem('token')),
    events: new FormControl(''),
    
  })
  
  statusTeste: any;
  constructor(private Api: ListaApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getOrders()

  }


  getOrders() {
    this.Api.getOrders().subscribe((data: any) => {
      this.pedidos = data
      this.getStatus(this.pedidos)
    })  
    
  } 

  total(): number {
    return this.Api.total() + this.delivery
  }


  getStatus(item: any) {
    this.Api.getOrders().subscribe((data: any) => {
      this.pedidos = data
      this.pedidos.forEach((x: any) => {
        if (x.status === 'Confirmado pelo restaurante') {
          x.events[0].color = 'green'
          x.events[1].color = 'gray'
          x.events[2].color = 'gray'
          x.events[3].color = 'gray'
        } else if (x.status === 'Em preparo') {
          x.events[0].color = 'green'
          x.events[1].color = 'green'
          x.events[2].color = 'gray'
          x.events[3].color = 'gray'
        } else if (x.status === 'Saiu para entrega') {
          x.events[0].color = 'green'
          x.events[1].color = 'green'
          x.events[2].color = 'green'
          x.events[3].color = 'gray'
        } else if (x.status === 'Entregue') {
          x.events[0].color = 'green'
          x.events[1].color = 'green'
          x.events[2].color = 'green'
          x.events[3].color = 'green'
        }
        else if (x.status === 'Cancelado') {
          x.events[0].color = 'red'
          x.events[1].color = 'red';
          x.events[2].color = 'red';
          x.events[3].color = 'red';
        }
        console.log(this.pedidos);
        
      })
    })
  }
  

  editStatus(item: any) {
    this.form.get('id')?.setValue(item.id)
    this.form.get('name')?.setValue(item.name)
    this.form.get('email')?.setValue(item.email)
    this.form.get('telefone')?.setValue(item.telefone)
    this.form.get('cep')?.setValue(item.cep)
    this.form.get('logradouro')?.setValue(item.logradouro)
    this.form.get('bairro')?.setValue(item.bairro)
    this.form.get('localidade')?.setValue(item.localidade)
    this.form.get('number')?.setValue(item.number)
    this.form.get('data')?.setValue(item.data)
    this.form.get('optionalAddress')?.setValue(item.optionalAddress)
    this.form.get('status')?.setValue(item.status)
    this.form.get('total')?.setValue(item.total)
    this.form.get('pagamentoEntrega')?.setValue(item.pagamentoEntrega)
    this.form.get('pagamentoAplicativo')?.setValue(item.pagamentoAplicativo)
    this.form.get('usuario')?.setValue(item.usuario)
    this.form.get('events')?.setValue(item.events)
    this.form.get('orderItems')?.setValue(item.orderItems)
    this.Api.editStatus = item
  }

  updateOrder(item: any) {
    let params = {
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      telefone: this.form.get('telefone')?.value,
      cep: this.form.get('cep')?.value,
      logradouro: this.form.get('logradouro')?.value,
      bairro: this.form.get('bairro')?.value,
      localidade: this.form.get('localidade')?.value,
      number: this.form.get('number')?.value,
      data: this.form.get('data')?.value,
      optionalAddress: this.form.get('optionalAddress')?.value,
      status: this.form.get('status')?.value,
      total: this.form.get('total')?.value,
      pagamentoEntrega: this.form.get('pagamentoEntrega')?.value,
      pagamentoAplicativo: this.form.get('pagamentoAplicativo')?.value,
      usuario: this.form.get('usuario')?.value,
      events: this.form.get('events')?.value,
      orderItems: this.form.get('orderItems')?.value,
      
    }
    console.log(params);
    
    this.Api.updateOrder(params).subscribe((data: any) => {
      this.getOrders()
      this.form.reset()
    }
    )
  }
  

  // cada pedido tem o valor do modal
  editOrder(item: any) {
    this.Api.editOrder = item
    this.pedidoModal = item
    console.log(item);
    
  }

}