import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-tela',
  templateUrl: './adicionar-tela.component.html',
  styleUrls: ['./adicionar-tela.component.css']
})
export class AdicionarTelaComponent implements OnInit {

  form = new FormGroup({})

  constructor() { }

  ngOnInit(): void {
  }

}
