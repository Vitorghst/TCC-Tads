import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Tela } from './listar-tela.model';

@Component({
  selector: 'app-listar-tela',
  templateUrl: './listar-tela.component.html',
  styleUrls: ['./listar-tela.component.css']
})
export class ListarTelaComponent implements OnInit {

  tela = {} as Tela;
  telas?: Tela[];
  searchText = '';


  constructor(private Api: ListaApiService, private route: Router) { }

  ngOnInit(): void {
    this.getTelas();
  }

  getTelas() {
    this.Api.getTelas().subscribe((telas: Tela[]) => {
      this.telas = telas;
    });
  }

  editTela(tela: Tela) {
    console.log(tela)
    this.Api.editTelas = tela
    this.route.navigate(['/edit-tela'])
  }



}
