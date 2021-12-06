import { Component, OnInit } from '@angular/core';
import { AdicionarApiComponent } from '../adicionar-api/adicionar-api.component';
import { Api } from '../listar-api/listar-api.model';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ListaApiService } from 'src/app/services/api.service';
import { Tela } from '../listar-tela/listar-tela.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  telaForm = new FormGroup({
    id: new FormControl('', Validators.required),
    JHashT: new FormControl(Math.floor(Math.random() * 10000000000) + 1, Validators.required),
    nome: new FormControl('', Validators.required),
    permissao: new FormControl('', Validators.required)

  });



  url = 'http://localhost:3000';

  api = {} as Api;
  apis?: Api[];
  searchText = '';
  confirmList: Tela[] = [];
  myList: Tela[] = [];
  tela = {} as Tela;
  telas?: Tela[];
  selectedTela?: Tela;





  constructor(private httpclient: HttpClient, private Api: ListaApiService, private route: Router) { }

  ngOnInit(): void {
    if (this.Api.editDados !== '') {
      this.editForm.get('id')?.setValue(this.Api.editDados.id),
        this.editForm.get('codigo')?.setValue(this.Api.editDados.codigo),
        this.editForm.get('nome')?.setValue(this.Api.editDados.nome),
        this.editForm.get('metodo')?.setValue(this.Api.editDados.metodo);
      console.log(this.Api.editDados);
    }
    this.getApis();
    this.getTelas();

  }

  // Obtem todas as APIS
  getApis() {
    this.Api.getApis().subscribe((apis: Api[]) => {
      this.apis = apis;
    });
  }

  // Obtem todas as Telas
  getTelas() {
    this.Api.getTelas().subscribe((telas: Tela[]) => {
      this.myList = telas;

    });
  }

  // Atualizar API
  updateApi() {
    let params = {
      id: this.editForm.get('id')?.value,
      codigo: this.editForm.get('codigo')?.value,
      nome: this.editForm.get('nome')?.value,
      metodo: this.editForm.get('metodo')?.value,
      tela: this.editForm.get('tela')?.value
    }
    this.Api.updateApi(params)
      .subscribe(res => {
        this.route.navigate(['/listar-api'])
      }, (err) => {
        console.log(err);
      });
  }

  // Adicionar Tela
  addTela() {
    let telas = {
      id: this.telaForm.get('id')?.value,
      JHashT: this.telaForm.get('JHashT')?.value,
      nome: this.telaForm.get('nome')?.value,
      permissao: this.telaForm.get('permissao')?.value
    }
    this.Api.addTela(telas)
      .subscribe(res => {
        const id = res['id'];
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });

  }

  // Drag and Drop
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

  // Evento Click
  ListA(tela: Tela): void {
    this.selectedTela = tela;
    this.confirmList.push(tela)
    this.myList.splice(this.myList.indexOf(tela), 1)

  }
  ListB(tela: Tela): void {
    this.selectedTela = tela;
    this.myList.push(tela)
    this.confirmList.splice(this.confirmList.indexOf(tela), 1)

  }



}
