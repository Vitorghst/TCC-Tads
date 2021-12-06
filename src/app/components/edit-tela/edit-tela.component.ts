import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';
import { Api } from '../listar-api/listar-api.model';
import { Tela } from '../listar-tela/listar-tela.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-tela',
  templateUrl: './edit-tela.component.html',
  styleUrls: ['./edit-tela.component.css']
})

export class EditTelaComponent implements OnInit {

  telaForm = new FormGroup({
    id: new FormControl('', Validators.required),
    JHashT: new FormControl(Math.floor(Math.random() * 10000000000) + 1, Validators.required),
    nome: new FormControl('', Validators.required),
    permissao: new FormControl('', Validators.required)

  });

  apiForm = new FormGroup({
    id: new FormControl('', Validators.required),
    codigo: new FormControl(Math.floor(Math.random() * 1000000) + 1, Validators.required),
    nome: new FormControl('', Validators.required),
    metodo: new FormControl('', Validators.required),
  });


  url = 'http://localhost:3000';

  api = {} as Api;
  apis?: Api[];
  searchText = '';
  confirmList: Api[] = [];
  myList: Api[] = [];
  tela = {} as Tela;
  telas?: Tela[];
  selectedApi?: Api;



  constructor(private Api: ListaApiService, private route: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    if (this.Api.editTelas !== '') {
      this.telaForm.get('id')?.setValue(this.Api.editTelas.id),
        this.telaForm.get('JHashT')?.setValue(this.Api.editTelas.JHashT),
        this.telaForm.get('nome')?.setValue(this.Api.editTelas.nome),
        this.telaForm.get('permissao')?.setValue(this.Api.editTelas.permissao),
        console.log(this.Api.editTelas);
    }
    this.getApis();
    this.getTelas();

  }
  
  // Obtem todas as APIS
  getApis() {
    this.Api.getApis().subscribe((apis: Api[]) => {
      this.myList = apis;
    });
  }

  // Obtem todas as Telas
  getTelas() {
    this.Api.getTelas().subscribe((telas: Tela[]) => {
      this.telas = telas;

    });
  }

  // Atualizar API
  updateTela() {
    let telas = {
      id: this.telaForm.get('id')?.value,
      JHashT: this.telaForm.get('JHashT')?.value,
      nome: this.telaForm.get('nome')?.value,
      permissao: this.telaForm.get('permissao')?.value
    }
    this.Api.updateTela(telas)
      .subscribe(res => {
        this.route.navigate(['/listar-tela'])
      }, (err) => {
        console.log(err);
      });


  }

  addApi() {
    let params = {
      id: this.apiForm.get('id')?.value,
      codigo: this.apiForm.get('codigo')?.value,
      nome: this.apiForm.get('nome')?.value,
      metodo: this.apiForm.get('metodo')?.value,
    }
    console.log(params);
    this.Api.addApi(params)
      .subscribe(res => {
        const id = res['id'];
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });

  }

  // Drag and Drop
  drop(event: CdkDragDrop<Api[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
   
  // Evento Click
  ListA(api: Api): void {
    this.selectedApi = api;
    this.confirmList.push(api)
    this.myList.splice(this.myList.indexOf(api), 1)
    console.log(`selectedaApi = ${JSON.stringify(this.selectedApi)}`)
  }
  ListB(api: Api): void {
    this.selectedApi = api;
    this.myList.push(api)
    this.confirmList.splice(this.confirmList.indexOf(api), 1)
    console.log(`selectedaApi = ${JSON.stringify(this.selectedApi)}`)
  }







}
