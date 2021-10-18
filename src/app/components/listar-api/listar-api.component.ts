import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/lista-api.service';
import { Api } from './listar-api.model';
import { AdicionarApiService } from 'src/app/services/adicionar-api.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-listar-api',
  templateUrl: './listar-api.component.html',
  styleUrls: ['./listar-api.component.css']
})
export class ListarApiComponent implements OnInit {

  api = {} as Api;
  apis?: Api[];


  constructor(private apiService: ListaApiService, private adicionarApi: AdicionarApiService) { }

  ngOnInit(): void {
    this.getApis();
  }


  getApis() {
    this.apiService.getApis().subscribe((apis: Api[]) => {
      this.apis = apis;
    });
  }

  cleanForm(form: NgForm) {
    this.getApis();
    form.resetForm();
    this.api = {} as Api;
  }

}
