import { Component, OnInit } from '@angular/core';
import { ListaApiService } from '../../services/api.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

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
