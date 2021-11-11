import { Component, OnInit } from '@angular/core';
import { Api } from '../listar-api/listar-api.model';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';
import { Tela } from '../listar-tela/listar-tela.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-adicionar-api',
  templateUrl: './adicionar-api.component.html',
  styleUrls: ['./adicionar-api.component.css']
})
export class AdicionarApiComponent implements OnInit {

  apiForm = new FormGroup({
    codigo: new FormControl(Math.floor(Math.random() * 1000000) + 1, Validators.required),
    nome: new FormControl('', Validators.required),
    metodo: new FormControl('', Validators.required),
    tela: new FormControl('', Validators.required)

  });

  isLoadingResults = false;
  
  
  api = {} as Api;
  apis?: Api[];
  tela = {} as Tela;
  telas?: Tela[];


  searchText = '';
  myList: Tela[] = [];
  confirmList: Tela[] = [];

  

  constructor(
    private Api: ListaApiService,
    private route: Router,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.getTelas();
  }
  getTelas() {
    this.Api.getTelas().subscribe((telas: Tela[]) => {
      this.myList = telas;
      console.log(telas)
    });
  }
  

  addApi() {
    let params = {
    id: this.apiForm.get('id')?.value,
    codigo: this.apiForm.get('codigo')?.value,
    nome: this.apiForm.get('nome')?.value,
    metodo: this.apiForm.get('metodo')?.value,
    telas: this.confirmList.map((element: any) => {
      return element.id
    })
    }
    console.log(params);
    this.Api.addApi(params)
      .subscribe(res => {
        const id = res['id'];
        this.isLoadingResults = true;
        console.log(params)
        this.route.navigate(['/listar-api'])
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }
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
