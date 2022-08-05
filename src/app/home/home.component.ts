import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CartItem, MenuItem } from './home.model';
import { ListaApiService } from '../services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgBusinessHoursComponent } from 'ng-business-hours';
import { timeout, timestamp } from 'rxjs/operators';

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

  @ViewChild('searchBar') searchBar?: { setFocus: () => void; } ;

  menuItemState = 'ready';
  searchText = '';
  toastmsg: any;
  home?: MenuItem[];
  @Output() add = new EventEmitter()
  rowState = 'ready'
  hours: any;
  now = new Date()

  public showSearchBar : boolean = false;





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

  decreaseQty(item: any){
    this.Api.decreaseQty(item)
  }
  
  emitRemoveEvent(item: any) {
    this.Api.decreaseQty(item)
  }

  toggleSearchBar(){
    this.showSearchBar = ! this.showSearchBar;
    if (this.showSearchBar)
      // use setTimeout to allow *ngIf to display searchBar before calling setFocus
      setTimeout( () => {
        if (this.searchBar) this.searchBar.setFocus();
      } )

}




}
function rowsState(rowsState: any) {
  throw new Error('Function not implemented.');
}

