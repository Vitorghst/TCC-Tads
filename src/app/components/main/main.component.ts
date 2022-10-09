import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  usuario: any;
  permissao: any
  nomeUser: any
  nomeUserIni: any;
  restaurantes: any
  constructor(private Api: ListaApiService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getUser()
    this.getRestaurante()
  }


  getUser() {
    const token = sessionStorage.getItem('token')
    this.Api.getUserById(token).subscribe((user: any) => {
      this.usuario = user
      this.permissao = user.permissao
      this.nomeUser = user.user
      console.log(this.nomeUser);
      this.nomeUserIni = this.nomeUser.charAt(0).toUpperCase();
      console.log(this.permissao);
      
    console.log(this.usuario);
    
  })
  }

  
  teste(arg0: { title: string; message: string; type: string; duration: number; position: string; onClose: () => void; }) {
    throw new Error('Method not implemented.');
  }

  getRestaurante(){
    this.Api.getRestaurante().subscribe((restaurante: any) => {
      this.restaurantes = restaurante
    })
  }

  exit(){
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
