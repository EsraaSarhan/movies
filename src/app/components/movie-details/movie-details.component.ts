import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from "../../dataModels/movies";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public movie: Movie;
  public isBusy: boolean = false;
  public isError: boolean = false;
  public 
  routeState: any;

  constructor(private route: ActivatedRoute,private router: Router,
    private location: Location) { this.getMovieDetails(); }
    
  ngOnInit(): void {
   
  }
  
  getMovieDetails(): void {
    this.isBusy = true;
  if (this.router.getCurrentNavigation().extras.state) {
    this.routeState = this.router.getCurrentNavigation().extras.state;
    if (this.routeState) {
      this.movie = this.routeState.movie;
      this.isBusy = false;
    }
    else{
      this.isBusy = false;
      this.isError = true;
    }
  }
  }
}
