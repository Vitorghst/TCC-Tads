import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pdf-creator',
  templateUrl: './pdf-creator.component.html',
  styleUrls: ['./pdf-creator.component.css']
})
export class PdfCreatorComponent implements OnInit {
  restaurantes: any;
  entregues = 0
  cancelados = 0;
  andamento = 0;
  pendentes = 0;
  entrega = 0;
  quantidadePedidos = 0
  quantidadePedidosSemana = 0;
  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getRestaurant();
    this.getOrders()
  }
  

  getRestaurant() {
    this.Api.getRestaurante().subscribe((restaurant: any) => {
      this.restaurantes = restaurant;
      console.log(this.restaurantes);
    });
  }

  getOrders() {
    this.Api.getOrders().subscribe((orders: any) => {
      // quantidade de pedidos entregues
      this.entregues = 0;
      // quantidade de pedidos em andamento
      this.andamento = 0;
      // quantidade de pedidos cancelados
      this.cancelados = 0;
      // quantidade de pedidos pendentes
      this.pendentes = 0;
      // quantidade de pedidos
      this.quantidadePedidos = 0;
      
      for (let order of orders) {
        if (order.status === "Entregue") {
          this.entregues++;
        } else if (order.status === "Em preparo") {
          this.andamento++;
        } else if (order.status === "Cancelado") {
          this.cancelados++;
        } else if (order.status === "Saiu para entrega") {
          this.entrega++;
        } else if (order.status === "Aguardando Confirmação") {
          this.pendentes++;
        }
        this.quantidadePedidos++;
        // quantidade de pedidos da semana
      }
      console.log("Entregues: " + this.entregues);
      console.log("Em andamento: " + this.andamento);
      console.log("Cancelados: " + this.cancelados);
      console.log("Pendentes: " + this.pendentes);
      console.log("Quantidade de pedidos: " + this.quantidadePedidos);
      console.log("Quantidade de pedidos na semana: " + this.quantidadePedidosSemana);
    });
  }
  


  public convertToPDF()
{
html2canvas(document.getElementById("teste")! ).then(canvas => {
// Few necessary setting options

// pegar apenas o elemento que eu quero
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
// centralizar o pdf
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 25, 0, 160, 120)
pdf.save('output.pdf'); // Generated PDF
});
}

}



