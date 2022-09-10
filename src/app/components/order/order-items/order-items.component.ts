import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CartItem } from 'src/app/home/home.model';
import { ListaApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  @Input()
  items!: CartItem[];
  
  @Input() itemAdicionais!: CartItem[];

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() observacao = new EventEmitter<CartItem>()
  @Output() adicionais = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor(private formBuilder: FormBuilder, private Api: ListaApiService) { }

  ngOnInit(): void {

  }

  

  emitIncreaseQty(item: CartItem){
    this.increaseQty.emit(item)
  }

  removeItem(item: any): void {
    this.Api.removeItem(item)
    
  }

  emitAddEvent(item: any) {
    this.Api.addItem(item)

  }

  emitObservacao(item: CartItem){
    this.observacao.emit(item)
  }

  emitAdicionais(item: CartItem){
    this.adicionais.emit(item)
  }
  
  emitDecreaseQty(item: CartItem){
    this.Api.decreaseQty(item)
  }


}
