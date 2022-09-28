import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  
  @Output() telaPedidos = new EventEmitter();
  items!: any[];
  constructor() { }

  ngOnInit(): void {
  }

  abrirTelas(tela: any){
    this.telaPedidos.emit(tela)
  }

}
