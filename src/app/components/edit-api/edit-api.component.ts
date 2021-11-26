import { Component, OnInit } from '@angular/core';
import { AdicionarApiComponent } from '../adicionar-api/adicionar-api.component';
import { Api } from '../listar-api/listar-api.model';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ListaApiService } from 'src/app/services/api.service';
import { Tela } from '../listar-tela/listar-tela.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-api',
  templateUrl: './edit-api.component.html',
  styleUrls: ['./edit-api.component.css']
})
export class EditApiComponent implements OnInit {


  editForm = new FormGroup({
    id: new FormControl('', Validators.required),
    codigo: new FormControl(Math.floor(Math.random() * 1000000) + 1, Validators.required),
    nome: new FormControl('', Validators.required),
    metodo: new FormControl('', Validators.required),

  });


  url = 'http://localhost:3000';

  api = {} as Api;
  apis?: Api[];

  searchText = '';
  confirmList: Tela[] = [];
  myList: Tela[] = [];

  tela = {} as Tela;
  telas?: Tela[];





  constructor( private httpclient: HttpClient, private listaApi: ListaApiService, private route: Router) { }

  ngOnInit(): void {
    if (this.listaApi.editDados !== '') {
      this.editForm.get('id')?.setValue(this.listaApi.editDados.id),
        this.editForm.get('codigo')?.setValue(this.listaApi.editDados.codigo),
        this.editForm.get('nome')?.setValue(this.listaApi.editDados.nome),
        this.editForm.get('metodo')?.setValue(this.listaApi.editDados.metodo);
        this.editForm.get('tela')?.setValue(this.listaApi.editDados.tela)
      console.log(this.listaApi.editDados);
    }
    this.getApis();
    this.getTelas();

  }
  //Pegar as APIS
  getApis() {
    this.listaApi.getApis().subscribe((apis: Api[]) => {
      this.apis = apis;
    });
  }

  //Pegar as Telas
  getTelas() {
    this.listaApi.getTelas().subscribe((telas: Tela[]) => {
      this.myList = telas;

    });
  }
  
  //Atualizar API
  updateApi() {
    let params = {
      id: this.editForm.get('id')?.value,
      codigo: this.editForm.get('codigo')?.value,
      nome: this.editForm.get('nome')?.value,
      metodo: this.editForm.get('metodo')?.value,
      tela: this.editForm.get('tela')?.value
    }
    this.listaApi.updateApi(params)
      .subscribe(res => {
        console.log(params)
        this.route.navigate(['/listar-api'])
      }, (err) => {
        console.log(err);
      });


  }
  //Drag and Drop
  drop(event: CdkDragDrop<Tela[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }



}
