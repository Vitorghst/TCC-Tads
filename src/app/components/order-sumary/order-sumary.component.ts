import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ListaApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { PrimeIcons } from 'primeng/api';


@Component({
  selector: 'app-order-sumary',
  templateUrl: './order-sumary.component.html',
  styleUrls: ['./order-sumary.component.css']
})
export class OrderSumaryComponent implements OnInit {
  rating3 = 0
  rated!: boolean
  usuario: any
  date = moment().locale('pt-br').format('L');

  form = this.fb.group({
    rating: new FormControl('', Validators.required),
    name: new FormControl(''),
    date: new FormControl(this.date),
    comments: new FormControl('', Validators.required),
    statusTeste: new FormControl(''),
  })
  user: any;
  status: any
  

  events!: any[];
  pedidos: any;
  pedido: any
  pedidoModal: any;


  constructor(private fb: FormBuilder, private Api: ListaApiService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getUser()
    this.getOrderById()
    this.getStatus(this.pedidos)
    setInterval(() => {
      this.getStatus(this.pedidos)
    }, 60000)
    this.events = [
      { status: 'Confirmado pelo restaurante', icon: PrimeIcons.CHECK, color: 'gray' },
      { status: 'Em preparo', icon: PrimeIcons.SHOPPING_CART, color: 'gray' },
      { status: 'Saiu para entrega', icon: PrimeIcons.ENVELOPE, color: 'gray' },
      { status: 'Entregue', icon: PrimeIcons.CHECK, color: 'gray' },

      
      
    ];
    
  }

  getOrderById() {
    const token = sessionStorage.getItem('token')
    this.Api.getOrderById(token).subscribe((data: any) => {
      this.pedidos = data
      // pegar apenas o ultimo pedido
      this.pedido = this.pedidos[this.pedidos.length - 1]
      this.getStatus(this.pedidos)
      console.log(data);
      
    })
  }


  getStatus(item: any) {
    const token = sessionStorage.getItem('token')
    this.Api.getOrderById(token).subscribe((data: any) => {
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
  

  rate() {
    this.rated = true
  }

  getUser() {
    const token = sessionStorage.getItem('token')
    this.Api.getUserById(token).subscribe((user: any) => {
      this.usuario = user.user
      console.log(this.usuario);


    })
  }


  addReview() {
    this.user = this.usuario
    console.log(this.user);

    let review = {
      rating: this.form.get('rating')?.value,
      name: this.user,
      date: this.form.get('date')?.value,
      comments: this.form.get('comments')?.value,
    }
    console.log(review);

    this.Api.addReview(review).subscribe((review: any) => {
      this.toast.success({ summary: `Obrigado pela sua avaliação!`, position: 'br', duration: 2000 })
      this.form.reset()
      console.log(review);

    })
  }

  editOrder(item: any) {
    this.Api.editOrder = item
    this.pedidoModal = item
    console.log(item);
    
  }

}
