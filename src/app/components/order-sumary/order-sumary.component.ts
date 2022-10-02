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


  constructor(private fb: FormBuilder, private Api: ListaApiService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getUser()
    this.events = [
      { status: 'Confirmado pelo restaurante', icon: PrimeIcons.CHECK, color: 'gray' },
      { status: 'Em preparo', icon: PrimeIcons.SHOPPING_CART, color: 'gray' },
      { status: 'Saiu para entrega', icon: PrimeIcons.ENVELOPE, color: 'gray' },
      { status: 'Entregue', icon: PrimeIcons.CHECK, color: 'gray' },

      
      
    ];
    
    this.form.get('statusTeste')!.valueChanges.subscribe((x: any) => {
      console.log(x)
      this.status = x
      if (this.status === 'Confirmado pelo restaurante') {
        this.events[0].color = 'green'
        
      } else if (this.status === 'Em preparo') {
        this.events[0].color = 'green'
        this.events[1].color = 'green'
      } else if (this.status === 'Saiu para entrega') {
        this.events[0].color = 'green'
        this.events[1].color = 'green'
        this.events[2].color = 'green'
      } else if (this.status === 'Entregue') {
        this.events[0].color = 'green'
        this.events[1].color = 'green'
        this.events[2].color = 'green'
        this.events[3].color = 'green'
      }
      else if (this.status === 'Cancelado') {
        this.events[0].color = 'red';
        this.events[1].color = 'red';
        this.events[2].color = 'red';
        this.events[3].color = 'red';
      }
   
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

}
