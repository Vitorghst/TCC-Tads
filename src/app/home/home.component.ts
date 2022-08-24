import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CartItem, MenuItem } from './home.model';
import { ListaApiService } from '../services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgBusinessHoursComponent } from 'ng-business-hours';
import { timeout, timestamp } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  observationForm!: FormGroup
  home!: MenuItem[];
  @Output() add = new EventEmitter()
  rowState = 'ready'
  hours: any;
  saveCheckbox!: boolean;
  now = new Date()
  adicionais: any;
  public showSearchBar: boolean = false;
  categorias!: MenuItem[];





  constructor(private Api: ListaApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTelas()
    this.getAdicionais()
    this.getHorarios()

    this.observationForm = this.formBuilder.group({
      observacao: this.formBuilder.control(''),

    })
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
      console.log(this.hours);
   
  }
  )}

  getAdicionais() {
    this.Api.getAdicionais().subscribe((adicional: any) => {
      this.adicionais = adicional;
      console.log(this.adicionais);

    });
  }


  filtrarCategoria(event: any) {
  const teste = (item: { category: any; }) => item.category === event;
  this.categorias = this.home.filter(teste)
  console.log(this.categorias);
  
  
  

  }

  items(): any[] {
    return this.Api.items; 
    

  }

  clear() {
    this.Api.clear()
  }




  removeItem(item: any): void {
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

  emitAddObsEvent(event: any) {
    this.Api.addAdicionais(this.observationForm.value.adicional)
    console.log(event);
    
    
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

