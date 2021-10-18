import { Component, OnInit } from '@angular/core';
import { ListaTelaService } from 'src/app/services/lista-tela.service';
import { Tela } from './listar-tela.model';

@Component({
  selector: 'app-listar-tela',
  templateUrl: './listar-tela.component.html',
  styleUrls: ['./listar-tela.component.css']
})
export class ListarTelaComponent implements OnInit {

  tela = {} as Tela;
  telas?: Tela[];

  constructor(private telaService: ListaTelaService) { }

  ngOnInit(): void {
    this.getTelas();
  }

  getTelas() {
    this.telaService.getTelas().subscribe((telas: Tela[]) => {
      this.telas = telas;
    });
  }
  

}
