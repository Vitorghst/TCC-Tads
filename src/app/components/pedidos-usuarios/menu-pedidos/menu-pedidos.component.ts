import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu-pedidos',
  templateUrl: './menu-pedidos.component.html',
  styleUrls: ['./menu-pedidos.component.css']
})
export class MenuPedidosComponent implements OnInit {

  pedidos: any
  pedidoModal: any
  usuario: any
  menuItemState = 'ready';
  searchText = '';

  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getOrderById()
    this.getUser()
    this.getStatus(this.pedidos)
    setInterval(() => {
      this.getStatus(this.pedidos)
    }, 60000)
  }

  getOrderById() {
    const token = sessionStorage.getItem('token')
    this.Api.getOrderById(token).subscribe((data: any) => {
      this.pedidos = data
      this.getStatus(this.pedidos)
      console.log(data);
      
    })
  }


  getStatus(item: any) {
    const token = sessionStorage.getItem('token')
    this.Api.getOrderById(token).subscribe((data: any) => {
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
  


  getUser() {
    const token = sessionStorage.getItem('token')
    this.Api.getUserById(token).subscribe((user: any) => {
      this.usuario = user.id
      console.log(this.usuario);
      
      
  })
  }


  editOrder(item: any) {
    this.Api.editOrder = item
    this.pedidoModal = item
    console.log(item);
    
  }

}
