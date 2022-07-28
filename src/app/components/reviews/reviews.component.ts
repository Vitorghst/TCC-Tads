import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ListaApiService } from '../../services/api.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
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
export class ReviewsComponent implements OnInit {

  menuItemState = 'ready';
  review?: any
  

  constructor(private Api: ListaApiService) { }

  ngOnInit(): void {
    this.getReview()
  }

  getReview() {
    this.Api.getReview().subscribe((review: any) => {
      this.review = review;
      console.log(this.review);

    });
  }

}
