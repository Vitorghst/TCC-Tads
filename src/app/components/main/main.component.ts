import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaApiService } from '../../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  usuario: any;
  permissao: any
  nomeUser: any

  constructor(private Api: ListaApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUser()
  }


  getUser() {
    const token = sessionStorage.getItem('token')
    this.Api.getUserById(token).subscribe((user: any) => {
      this.usuario = user
      this.permissao = user.permissao
      this.nomeUser = user.user
      console.log(this.nomeUser);
      
      console.log(this.permissao);
      
    console.log(this.usuario);
    
  })
  }

  exit(){
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
