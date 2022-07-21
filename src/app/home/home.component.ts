import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from './home.model';
import { ListaApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText = '';
  home?: MenuItem[];
  @Output() add = new EventEmitter()
  rowState = 'ready'

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

  clear(){
    this.Api.clear()
  }

  removeItem(item: any){
    this.Api.removeItem(item)
  }

  addItem(item: any){
    this.Api.addItem(item)
  }

  total(): number {
    return this.Api.total()
  }

  addMenuItem(item: MenuItem){
    console.log(item)
  }

  emitAddEvent(item: any){
    this.Api.addItem(item)
  
  }




}
