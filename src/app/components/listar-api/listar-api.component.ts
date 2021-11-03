import { Component, OnInit } from '@angular/core';
import { ListaApiService } from '../../services/api.service';
import { Api } from './listar-api.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-api',
  templateUrl: './listar-api.component.html',
  styleUrls: ['./listar-api.component.css']
})
export class ListarApiComponent implements OnInit {

  api = {} as Api;
  apis?: Api[];
  searchText = '';


  constructor(private apiService: ListaApiService,  private route: Router) { }

  ngOnInit(): void {
    this.getApis();
  }


  getApis() {
    this.apiService.getApis().subscribe((apis: Api[]) => {
      this.apis = apis;
    });
  }

  editApi(api: Api) {
    console.log(api)
    this.apiService.editDados = api
    this.route.navigate(['/edit-api'])
  }

  cleanForm(form: NgForm) {
    this.getApis();
    form.resetForm();
    this.api = {} as Api;
  }

}
