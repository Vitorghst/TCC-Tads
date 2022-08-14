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
  now = new Date()
  adicionais: any;

  public showSearchBar: boolean = false;





  constructor(private Api: ListaApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTelas()
    this.getAdicionais()

    this.observationForm = this.formBuilder.group({
      observacao: this.formBuilder.control('', [Validators.required]),

    })
  }

  getTelas() {
    this.Api.getMenu().subscribe((home: MenuItem[]) => {
      this.home = home;
      console.log(this.home);

    });
  }

  getAdicionais() {
    this.Api.getAdicionais().subscribe((adicional: any) => {
      this.adicionais = adicional;
      console.log(this.adicionais);

    });
  }


  filtrarCategoria(event: any) {
    this.items()
    this.home = this.home.filter(item => item.category === event ) //filtra por categoria
    
  }


  items(): any[] {
    return this.Api.items;

  }

  clear() {
    this.Api.clear()
  }


  removeItem(item: any) {
    this.Api.removeItem(item)
  }

  addItem(item: any) {
    this.Api.addItem(item)


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

