import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tela } from '../listar-tela/listar-tela.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';
import { Api } from '../listar-api/listar-api.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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
    permissao: new FormControl('', Validators.required)

  });

  isLoadingResults = false;

  api = {} as Api;
  apis?: Api[]
  tela = {} as Tela;
  telas?: Tela[];
  searchText = '';
  confirmList: Api[] = [];
  myList: Api[] = [];


  constructor(private listaAPi: ListaApiService, 
    private route: Router, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getApis()
  }

  getApis() {
    this.listaAPi.getApis().subscribe((apis: Api[]) => {
      this.myList = apis;
    });
  }

  
  addTela() {
    let telas = {
    id: this.telaForm.get('id')?.value,
    JHashT: this.telaForm.get('JHashT')?.value,
    nome: this.telaForm.get('nome')?.value,
    permissao: this.telaForm.get('permissao')?.value
    }
    this.listaAPi.addTela(telas)
      .subscribe(res => {
        const id = res['id'];
        this.isLoadingResults = true;
        console.log(telas)
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }

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

}
