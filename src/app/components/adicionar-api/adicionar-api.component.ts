import { Component, OnInit } from '@angular/core';
import { Api } from '../listar-api/listar-api.model';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaApiService } from 'src/app/services/api.service';
import { Tela } from '../listar-tela/listar-tela.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-adicionar-api',
  templateUrl: './adicionar-api.component.html',
  styleUrls: ['./adicionar-api.component.css']
})

export class AdicionarApiComponent implements OnInit {

  apiForm = new FormGroup({
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



  api = {} as Api;
  apis?: Api[];
  tela = {} as Tela;
  telas?: Tela[];
  searchText = '';
  myList: Tela[] = [];
  confirmList: Tela[] = [];
  selectedTela?: Tela;




  constructor(
    private Api: ListaApiService,
    private route: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getTelas()
  }

  // Obtem todas as Telas
  getTelas() {
    this.Api.getTelas().subscribe((telas: Tela[]) => {
      this.myList = telas;
      console.log(telas)
    });
  }

  // Obtem todas as APIS
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
        console.log(params)
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
        console.log(telas)
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
