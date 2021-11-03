import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';


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

  constructor(private request: RequestService, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    if (this.form.valid) {
      let params = {
        user: this.form.get('user')?.value,
        password: this.form.get('password')?.value
      }
      this.request.login(params).subscribe((ret: any) => {
        console.log(ret)
        if (ret[0].user === params.user && ret[0].password === params.password) {
          sessionStorage.setItem('token', ret[0].id);
          this.router.navigate(['']);
        } else {
          sessionStorage.removeItem('token');
          alert('Usuário ou Senha incorreto');
        }
      },
        (error: any) => {
          sessionStorage.removeItem('token');
        })
    }
  }

}
