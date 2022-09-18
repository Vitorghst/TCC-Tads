import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pedidos-usuarios',
  templateUrl: './pedidos-usuarios.component.html',
  styleUrls: ['./pedidos-usuarios.component.css']
})
export class PedidosUsuariosComponent implements OnInit {
  pedidos: any
  pedidoModal: any
  usuario: any
  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getOrderById()
    this.getUser()
  }

  getOrderById() {
    const token = sessionStorage.getItem('token')
    this.Api.getOrderById(token).subscribe((data: any) => {
      this.pedidos = data
      console.log(data);
      
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
