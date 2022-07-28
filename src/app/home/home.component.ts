import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from './home.model';
import { ListaApiService } from '../services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgBusinessHoursComponent } from 'ng-business-hours';

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

  menuItemState = 'ready';
  searchText = '';
  home?: MenuItem[];
  @Output() add = new EventEmitter()
  rowState = 'ready'
  hours: any;
  now = new Date()




  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getTelas()
  }

  getTelas() {
    this.Api.getMenu().subscribe((home: MenuItem[]) => {
      this.home = home;
    });
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




}
function rowsState(rowsState: any) {
  throw new Error('Function not implemented.');
}

