import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CartItem, MenuItem } from './home.model';
import { ListaApiService } from '../services/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgBusinessHoursComponent } from 'ng-business-hours';
import { timeout, timestamp } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import 'moment/min/locales';
import { ThrowStmt } from '@angular/compiler';
import { RequestService } from '../services/request.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';

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
  usuario: any;
  permissao: any
  review: any;
  rating: any;
  restaurant: any;
  ratingTotal: any;

  adicionarItemForm = this.formBuilder.group({
    id: new FormControl(''),
    imagePath: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
})

 editForm = this.formBuilder.group({
    id: new FormControl(''),
    imagePath: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
})

fileName = '';
  status2: any;
  

  constructor(private Api: ListaApiService, private formBuilder: FormBuilder,  private request: RequestService, private toast: NgToastService, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.Api.editItem !== '') {
        this.editForm.get('id')?.setValue(this.Api.editItem.id),
        this.editForm.get('imagePath')?.setValue(this.Api.editItem.imagePath),
        this.editForm.get('name')?.setValue(this.Api.editItem.name),
        this.editForm.get('description')?.setValue(this.Api.editItem.description);
        this.editForm.get('price')?.setValue(this.Api.editItem.price);
        this.editForm.get('category')?.setValue(this.Api.editItem.category);
      console.log(this.Api.editItem);
    }
    this.getTelas()
    this.getAdicionais()
    this.getHorarios()
    this.getUser()
    this.totalRating()
    this.getRestaurant()


  }

  getTelas() {
    this.Api.getMenu().subscribe((home: MenuItem[]) => {
      this.home = home;
      this.categorias = home
      console.log(this.home);


    });
  }

  editApi(item: MenuItem) {
    this.editForm.get('id')?.setValue(item.id),
    this.editForm.get('name')?.setValue(item.name)
    this.editForm.get('description')?.setValue(item.description)
    this.editForm.get('price')?.setValue(item.price)
    this.editForm.get('category')?.setValue(item.category)
    this.editForm.get('imagePath')?.setValue(item.imagePath)
    this.Api.editItem = item
  }

  // updateItem pegando da service
  updateItem() {
    let params = {
       id: this.editForm.get('id')?.value,
        imagePath: this.editForm.get('imagePath')?.value,
        name: this.editForm.get('name')?.value,
        description: this.editForm.get('description')?.value,
        price : this.editForm.get('price')?.value,
        category: this.editForm.get('category')?.value,

    }
    this.Api.updateItem(params)
      .subscribe(res => {
        const id = res['id'];
        this.toast.success({summary:`${params.name} foi editado com sucesso!`, position: 'br', duration: 3000});
        this.getTelas()
      }, (err) => {
      });
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.editForm.get('imagePath')?.setValue(reader.result);
      console.log(reader.result);; 
      
    };
  }

  addItemMenu(){
    let item = {
      id: this.adicionarItemForm.get('id')?.value,
      imagePath: this.adicionarItemForm.get('imagePath')?.value,
      name: this.adicionarItemForm.get('name')?.value,
      description: this.adicionarItemForm.get('description')?.value,
      price : this.adicionarItemForm.get('price')?.value,
      category: this.adicionarItemForm.get('category')?.value,
    }
    this.Api.addMenuItem(item).subscribe((item: any) => {
      const id = item['id'];
      this.toast.success({summary:`${item.name} foi adicionado com sucesso!`, position: 'br', duration: 3000});
      this.getTelas()
    }, (err) => {
      console.log(err);
    });
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.adicionarItemForm.get('imagePath')?.setValue(reader.result);
      // diminuir o tamanho do token para o banco de dados
      console.log(reader.result);; 
      
    };
  }

  totalRating() {
    this.Api.getReview().subscribe((review: any) => {
      this.review = review;
      let total = 0
      review.forEach((element: any) => {
        this.rating = element.rating
        total = total + this.rating
      });
      this.ratingTotal = total / review.length
      this.ratingTotal = this.ratingTotal.toFixed(1)
      console.log(this.ratingTotal);
      
    });
  }

  getRestaurant() {
    this.Api.getRestaurante().subscribe((restaurant: any) => {
      this.restaurant = restaurant;
      console.log(this.restaurant);
    });
  }


  
  // pegar o user logado com o session storage
  getUser() {
    const token = sessionStorage.getItem('token')
    this.Api.getUserById(token).subscribe((user: any) => {
      this.usuario = user
      this.permissao = user.permissao
      console.log(this.permissao);
      
    console.log(this.usuario);
    
  })
  }

  getHorarios() {
    this.Api.getHorarios().subscribe((hours: any) => {
      this.hours = hours;
      this.hours.forEach((x: any) => {
        if (x.dia == moment(this.dataAtual).locale('pt-br').format('dddd')) {
          if(x.status === 'Fechado') {
            this.status = 'Fechado'  
            this.status = x.status
            console.log(this.status2);
            
          } else {
          this.funcionamento = x
        }
        }
      })
      if(moment(this.dataAtual).format('HH:mm') >= this.funcionamento.startTime && moment(this.dataAtual).format('HH:mm') <= this.funcionamento.endTime){
        console.log('Aberto');
         this.status = 'Aberto' ? 'Aberto' : 'Fechado'
        console.log(this.status);
        
        this.horario = '- Fecha as ' + this.funcionamento.endTime
      }else{
        console.log('Fechado');
       this.status = 'Fechado' ? 'Fechado' : 'Aberto'
        this.horario = '- Abre as ' + this.funcionamento.startTime 
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

  deleteItem(item: MenuItem) {
    this.Api.deleteItembyId(item).subscribe((item: any) => {
      this.toast.success({summary:`O Item foi deletado com sucesso!`, position: 'br', duration: 3000});
      this.getTelas()
    }, (err) => {
      console.log(err);
    });
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

