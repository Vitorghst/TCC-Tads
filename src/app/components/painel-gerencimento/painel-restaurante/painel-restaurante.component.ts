import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ListaApiService } from '../../../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-painel-restaurante',
  templateUrl: './painel-restaurante.component.html',
  styleUrls: ['./painel-restaurante.component.css']
})
export class PainelRestauranteComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(1),
    name: new FormControl (''),
    endereco : new FormControl(''),
    cidade: new FormControl (''),
    estado: new FormControl (''),
    email: new FormControl (''),
    cep: new FormControl (''),
    telefone: new FormControl (''),
    celular: new FormControl (''),
    cnpj: new FormControl (''),
    entregaTempo: new FormControl (''),
    retirada: new FormControl (''),
    pedidoMin : new FormControl (''),
    frete: new FormControl (''),
  
  });
  restaurantes: any
  constructor(private Api: ListaApiService, private toast: NgToastService) { }
  

  ngOnInit(): void {
    this.getRestaurante();
    this.editRestaurante(this.form.value);
  }


  getRestaurante(){
    this.Api.getRestaurante().subscribe((data) => {
      for (let restaurantes of data){
        restaurantes = restaurantes
        this.form.get('id')?.setValue(restaurantes.id);
    this.form.get('name')?.setValue(restaurantes.name);
    this.form.get('endereco')?.setValue(restaurantes.endereco);
    this.form.get('cidade')?.setValue(restaurantes.cidade);
    this.form.get('estado')?.setValue(restaurantes.estado);
    this.form.get('email')?.setValue(restaurantes.email);
    this.form.get('cep')?.setValue(restaurantes.cep);
    this.form.get('telefone')?.setValue(restaurantes.telefone);
    this.form.get('celular')?.setValue(restaurantes.celular);
    this.form.get('cnpj')?.setValue(restaurantes.cnpj);
    this.form.get('entregaTempo')?.setValue(restaurantes.entregaTempo);
    this.form.get('retirada')?.setValue(restaurantes.retirada);
    this.form.get('pedidoMin')?.setValue(restaurantes.pedidoMin);
    this.form.get('frete')?.setValue(restaurantes.frete);
    this.Api.editRestaurant = restaurantes

    console.log(this.form.value);
      }

    })
  }

  editRestaurante(item: any){
    
}

 updateRestaurante(){
    let params = {
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value,
      endereco: this.form.get('endereco')?.value,
      cidade: this.form.get('cidade')?.value,
      estado: this.form.get('estado')?.value,
      email: this.form.get('email')?.value,
      cep: this.form.get('cep')?.value,
      telefone: this.form.get('telefone')?.value,
      celular: this.form.get('celular')?.value,
      cnpj: this.form.get('cnpj')?.value,
      entregaTempo: this.form.get('entregaTempo')?.value,
      retirada: this.form.get('retirada')?.value,
      pedidoMin: this.form.get('pedidoMin')?.value,
      frete: this.form.get('frete')?.value,


    }
    console.log(params);
    
    this.Api.updateRestaurante(params).subscribe((data) => {
      this.toast.success({summary:`Atualizado com sucesso!`, position: 'br', duration: 2000});
      this.getRestaurante()
      console.log(data);
    })
  }


}
