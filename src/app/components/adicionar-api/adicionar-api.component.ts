import { Component, OnInit } from '@angular/core';
import { AdicionarApiService } from 'src/app/services/adicionar-api.service';
import { Api } from '../listar-api/listar-api.model';
import { NgForm } from '@angular/forms';
import { ListarApiComponent } from '../listar-api/listar-api.component';
import { ListaApiService } from 'src/app/services/lista-api.service';

@Component({
  selector: 'app-adicionar-api',
  templateUrl: './adicionar-api.component.html',
  styleUrls: ['./adicionar-api.component.css']
})
export class AdicionarApiComponent implements OnInit {
  
  api = {} as Api;
  apis?: Api[];

  constructor(private adicionarApi: AdicionarApiService, private listarApi: ListaApiService) { }


  ngOnInit(): void {
  }
  saveApi(form: NgForm) {
    if (this.api.id !== undefined) {
      this.adicionarApi.updateCar(this.api).subscribe(() => {
      });
    } else {
      this.adicionarApi.saveApi(this.api).subscribe(() => {
      });
    }
  }



}
