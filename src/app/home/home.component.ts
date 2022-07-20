import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getTelas()
  }

  getTelas() {
    this.Api.getMenu().subscribe((home: MenuItem[]) => {
      this.home = home;
    });
  }

}
