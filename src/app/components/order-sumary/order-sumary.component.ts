import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ListaApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';


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

  })
  user: any;
  status: any

 
  
  
  constructor(private fb: FormBuilder, private Api: ListaApiService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getUser()
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
      comments:  this.form.get('comments')?.value,
    }
    console.log(review);
    
    this.Api.addReview(review).subscribe((review: any) => {
      this.toast.success({summary:`Obrigado pela sua avaliação!`, position: 'br', duration: 2000})
      this.form.reset()
      console.log(review);
      
    })
  }

  // mudar o css de acordo com a status do pedido
  getStatus() {
    switch (this.status) {
      case 'Em preparo':
        return 'completed'
      case 'Em entrega':
        return 'completed'
      case 'Entregue':
        return 'completed'
      case 'Cancelado':
        return 'canceled'
      default:
        return ''
    }
  }



}
