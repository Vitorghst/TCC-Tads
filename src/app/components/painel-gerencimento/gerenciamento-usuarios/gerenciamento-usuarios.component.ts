import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gerenciamento-usuarios',
  templateUrl: './gerenciamento-usuarios.component.html',
  styleUrls: ['./gerenciamento-usuarios.component.css']
})
export class GerenciamentoUsuariosComponent implements OnInit {
  usuarios: any;

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

}
