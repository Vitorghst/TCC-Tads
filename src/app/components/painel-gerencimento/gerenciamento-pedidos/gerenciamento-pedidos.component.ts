import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gerenciamento-pedidos',
  templateUrl: './gerenciamento-pedidos.component.html',
  styleUrls: ['./gerenciamento-pedidos.component.css']
})
export class GerenciamentoPedidosComponent implements OnInit {
  pedidos: any;
  teste: any;
  pedidoModal: any;
  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.Api.getOrders().subscribe((data: any) => {
      this.pedidos = data
  
    })  
  } 

  // cada pedido tem o valor do modal
  editOrder(item: any) {
    this.Api.editOrder = item
    this.pedidoModal = item
    console.log(item);
    
  }

}