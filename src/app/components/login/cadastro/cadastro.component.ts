import { ThrowStmt } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  users: any
  user: any
  form = new FormGroup({
    id: new FormControl(''),
    user: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    permissao: new FormControl('B'),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })
  constructor(private Api: ListaApiService, private router: Router,  private toast: NgToastService ) { }

  notifier = new EventEmitter<any>()

  ngOnInit(): void {
    this.getUser()
  }

  comparePassword() {
    let password = this.form.get('password')?.value
    let confirmPassword = this.form.get('confirmPassword')?.value
    if (password === confirmPassword) {
      return true
    } else {
      return false
    }
  }


  getUser() {
    this.Api.getUser().subscribe((data: any) => {
      this.users = data
      this.users.forEach((x: any) => {
        x.user = x.user
        console.log(x.user);


      })
    }
 )}

 notify( msg: string): void {
  this.Api.notify(msg)	
}

  singUp() {
    if (this.form.valid) {
      if (this.form.get('password')?.value === this.form.get('confirmPassword')?.value) {
          let userExists = false
        this.users.forEach((x: any) => {
          if (x.user === this.form.get('user')?.value) {
            userExists = true
          }
        })
        // verificar se o email já existe
        let emailExists = false
        this.users.forEach((x: any) => {
          if (x.email === this.form.get('email')?.value) {
            emailExists = true
          }
        })
        if(!emailExists) {
        if (!userExists) {
        let params = {
          id: this.form.get('id')?.value,
          user: this.form.get('user')?.value,
          email: this.form.get('email')?.value,
          permissao: this.form.get('permissao')?.value,
          password: this.form.get('password')?.value,
          confirmPassword: this.form.get('confirmPassword')?.value
        }
        this.Api.addUser(params)
          .subscribe(async res => {
            const id = res['id'];
            this.ngOnInit();
            this.toast.success({detail:"Sucesso",summary:'Cadastrado com sucesso', sticky:true}); 
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }, (err) => {
            console.log(err);
          });
       } else {
        this.toast.error({detail:"Erro",summary:'Usuario já existente', sticky:true});
       }
        } else {
          this.toast.error({detail:"Erro",summary:'Email já existente', sticky:true});
        }
      } else {
        this.toast.error({detail:"Erro",summary:'Senhas não conferem', sticky:true});
      }
    }
  }
}


