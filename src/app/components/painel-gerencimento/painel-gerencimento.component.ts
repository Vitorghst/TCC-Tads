import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-painel-gerencimento',
  templateUrl: './painel-gerencimento.component.html',
  styleUrls: ['./painel-gerencimento.component.css'],
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class PainelGerencimentoComponent implements OnInit {


  menuItemState = 'ready';
  user?: any
  componentes: any

  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getUser()
  }


  getUser(){
    this.Api.getUser().subscribe((user: any )=> {
      this.user = user
    }
      )}


  valorMenuLateral(tela: any) {
    this.componentes = tela
  }
}
