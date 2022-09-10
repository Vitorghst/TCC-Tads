import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CartItem, MenuItem } from './home.model';
import { ListaApiService } from '../services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgBusinessHoursComponent } from 'ng-business-hours';
import { timeout, timestamp } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import 'moment/min/locales';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild('searchBar') searchBar?: { setFocus: () => void; };


  menuItemState = 'ready';
  searchText = '';
  toastmsg: any;
  home!: MenuItem[];
  @Output() add = new EventEmitter()
  rowState = 'ready'
  hours: any;
  saveCheckbox!: boolean;
  now = new Date()
  adicionais: any;
  public showSearchBar: boolean = false;
  categorias!: MenuItem[];
  dataAtual = new Date()
  funcionamento: any;
  status!: string;
  horario: any;
  

  constructor(private Api: ListaApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTelas()
    this.getAdicionais()
    this.getHorarios()


  }

  getTelas() {
    this.Api.getMenu().subscribe((home: MenuItem[]) => {
      this.home = home;
      this.categorias = home
      console.log(this.home);


    });
  }

  getHorarios() {
    this.Api.getHorarios().subscribe((hours: any) => {
      this.hours = hours;
      this.hours.forEach((x: any) => {
        if (x.dia == moment(this.dataAtual).locale('pt-br').format('dddd')) {
          if(x.dia === 'segunda-feira') {
            this.status = 'Fechado às Segundas-Feiras'     
          } else {
          this.funcionamento = x
        }
        }
      })
      if(moment(this.dataAtual).format('HH:mm') >= this.funcionamento.startTime && moment(this.dataAtual).format('HH:mm') <= this.funcionamento.endTime){
        console.log('Aberto');
        this.status = 'Aberto -'
        this.horario = 'Fecha as ' + this.funcionamento.endTime
      }else{
        console.log('Fechado');
        this.status = 'Fechado -'
        this.horario = 'Abre as ' + this.funcionamento.startTime 
      }
    })
  }

  getAdicionais() {
    this.Api.getAdicionais().subscribe((adicional: any) => {
      this.adicionais = adicional;
      console.log(this.adicionais);

    });
  }

  


  filtrarCategoria(event: any) {

    const menuCategory = (item: { category: any; }) => item.category === event;
    this.categorias = this.home.filter(menuCategory)

  }

  items(): any[] {
    return this.Api.items;

  }

  itemAdicionais(): any[] {
    return this.Api.itemAdicionais
  }

  openModal(event: any){
    console.log(event);
    
  }


  clear() {
    this.Api.clear()
  }

  removeItem(item: CartItem): void {
    this.Api.removeItem(item)

    
  }


  addItem(item: any) {
    this.Api.addItem(item)

  }

  salvarObs(item: CartItem) {
    this.Api.addObservacao(item);

  }

  total(): number {
    return this.Api.total()
  }

  addMenuItem(item: MenuItem) {
    console.log(item)
  }

  emitAddEvent(item: any) {
    this.Api.addItem(item)

  }

  adicionaisChecked(event: any) {
    this.Api.addAdicionais(event)
    console.log(event)
  }

  decreaseQty(item: any) {
    this.Api.decreaseQty(item)
   
  }

  emitRemoveEvent(item: any) {
    this.Api.decreaseQty(item)
    
  }


}
function rowsState(rowsState: any) {
  throw new Error('Function not implemented.');
}

