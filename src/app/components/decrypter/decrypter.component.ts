import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-decrypter',
  templateUrl: './decrypter.component.html',
  styleUrls: ['./decrypter.component.css']
})
export class DecrypterComponent implements OnInit {

  form = new FormGroup({
    
  })

  constructor() { }

  ngOnInit(): void {
  }

}
