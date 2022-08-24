import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    user: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })
  constructor(private Api: ListaApiService, private router: Router) { }

  ngOnInit(): void {
  }

  singUp() {
    if (this.form.valid) {
      if (this.form.get('password')?.value === this.form.get('confirmPassword')?.value) {
        let params = {
          id: this.form.get('id')?.value,
          user: this.form.get('user')?.value,
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value,
          confirmPassword: this.form.get('confirmPassword')?.value
        }
        this.Api.addUser(params)
        .subscribe(res => {
          const id = res['id'];
          this.ngOnInit();
          this.router.navigate(['/login']);
        }, (err) => {
          console.log(err);
        });
        
      } else {
        alert('Senhas não conferem')
      }
    }
    
  }
}
