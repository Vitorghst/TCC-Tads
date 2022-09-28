import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pedidos-usuarios',
  templateUrl: './pedidos-usuarios.component.html',
  styleUrls: ['./pedidos-usuarios.component.css']
})
export class PedidosUsuariosComponent implements OnInit {
  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
   
  }

  

}
