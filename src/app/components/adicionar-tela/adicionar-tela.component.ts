import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tela } from '../listar-tela/listar-tela.model';
import { Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';
import { Api } from '../listar-api/listar-api.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-adicionar-tela',
  templateUrl: './adicionar-tela.component.html',
  styleUrls: ['./adicionar-tela.component.css']
})

export class AdicionarTelaComponent implements OnInit {

  telaForm = new FormGroup({
    id: new FormControl('', Validators.required),
    JHashT: new FormControl(Math.floor(Math.random() * 10000000000) + 1, Validators.required),
    nome: new FormControl('', Validators.required),
    permissao: new FormControl('', Validators.required),
  });

  apiForm = new FormGroup({
    id: new FormControl('', Validators.required),
    codigo: new FormControl(Math.floor(Math.random() * 1000000) + 1, Validators.required),
    nome: new FormControl('', Validators.required),
    metodo: new FormControl('', Validators.required),
  });


  api = {} as Api;
  apis?: Api[]
  tela = {} as Tela;
  telas?: Tela[];
  searchText = '';
  confirmList: Api[] = [];
  myList: Api[] = [];
  selectedApi?: Api;


  constructor(private Api: ListaApiService,
    private route: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getApis()
  }

  // Obtem todas as APIS
  getApis() {
    this.Api.getApis().subscribe((apis: Api[]) => {
      this.myList = apis;
    });
  }

  // Obtem todas as Telas
  addTela() {
    let telas = {
      id: this.telaForm.get('id')?.value,
      JHashT: this.telaForm.get('JHashT')?.value,
      nome: this.telaForm.get('nome')?.value,
      permissao: this.telaForm.get('permissao')?.value,
    }
    this.Api.addTela(telas)
      .subscribe(res => {
        const id = res['id'];
        this.route.navigate(['/listar-tela'])
      }, (err) => {
        console.log(err);
      });

  }

  // Adicionar API
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
  }
  ListB(api: Api): void {
    this.selectedApi = api;
    this.myList.push(api)
    this.confirmList.splice(this.confirmList.indexOf(api), 1)
  }




}
