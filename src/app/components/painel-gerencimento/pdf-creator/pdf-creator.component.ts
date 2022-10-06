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
      const totalPedidos = orders.length;// pegar o valor do length
      console.log(totalPedidos);
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
pdf.addImage(contentDataURL, 'PNG', 15, 0, 180, 70)
pdf.save('output.pdf'); // Generated PDF
});
}

}



