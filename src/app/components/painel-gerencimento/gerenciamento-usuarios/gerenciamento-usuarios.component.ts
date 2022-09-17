import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gerenciamento-usuarios',
  templateUrl: './gerenciamento-usuarios.component.html',
  styleUrls: ['./gerenciamento-usuarios.component.css']
})
export class GerenciamentoUsuariosComponent implements OnInit {
  usuarios: any;

  form = new FormGroup({
    id: new FormControl(''),
    user: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    permissao: new FormControl('B'),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })
  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.Api.getUser().subscribe((data: any) => {
      this.usuarios = data
    })

} 
  deleteUser(id: any) {
    this.Api.deleteUserById(id).subscribe((data: any) => {
      this.Api.notify('Usuário deletado com sucesso!')
      this.getUsers()
    })
  }

  editUser(item: any) {
    this.form.get('id')?.setValue(item.id)
    this.form.get('user')?.setValue(item.user)
    this.form.get('email')?.setValue(item.email)
    this.form.get('permissao')?.setValue(item.permissao)
    this.form.get('password')?.setValue( item.password)
    this.form.get('confirmPassword')?.setValue(item.confirmPassword)
    this.Api.editUser = item
  }

  updateUser() {
     let params = {
      id: this.form.get('id')?.value,
      user: this.form.get('user')?.value,
      email: this.form.get('email')?.value,
      permissao: this.form.get('permissao')?.value,
      password: this.form.get('password')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value,
     }
      this.Api.updateUser(params).subscribe((data: any) => {
        this.Api.notify('Usuário atualizado com sucesso!')
        this.getUsers()
      }
    )

  }

}
