import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { NgToastService } from 'ng-angular-popup';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  md5 = new Md5();

  constructor(private request: RequestService, private router: Router,  private toast: NgToastService) { }

  ngOnInit(): void {

  }

  login() {
    if (this.form.valid) {
      let params = {
        user: this.form.get('user')?.value,
        password: this.md5.appendStr(this.form.get('password')?.value).end() as string
      }
      this.request.login(params).subscribe((ret: any) => {
        if (ret[0].user === params.user && ret[0].password === params.password) {
          sessionStorage.setItem('token', ret[0].id);
          this.toast.success({summary:`Bem-vindo ${params.user}`, position: 'br', duration: 2000});
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        } else {
          sessionStorage.removeItem('token');
          this.toast.error({summary:`Nome do usuário ou senha incorreto!`, position: 'br', duration: 2000});
        }
      },
        (error: any) => {
          sessionStorage.removeItem('token');
        })
    }
    if(this.form.valid!) {
      this.toast.error({summary:`Usuário não cadastrado!`, position: 'br', duration: 2000});
    }
  }

}
