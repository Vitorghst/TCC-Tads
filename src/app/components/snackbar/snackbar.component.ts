import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ListaApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  message!: string

  snackVisibility: string = 'hidden'
    

  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.Api.notifier.subscribe(message => {
      this.message = message
      this.snackVisibility = 'visible'
      setTimeout(() => {
        this.snackVisibility = 'hidden'
      }
      , 3000)
    })
  }


}
