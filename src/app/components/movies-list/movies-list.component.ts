import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MoviesService } from '../../services/movies.service';
import { Movie } from "../../dataModels/movies";
import * as _ from 'underscore';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
private moviesList: Array<Movie> = [];
public groupedMoviesList: any = [];
public isBusy: boolean=false;
public isEmpty: boolean=false;
  constructor(private moviesService: MoviesService, private router: Router) { }
 
  ngOnInit(): void {
    
    this.getMoviesList();
  }

  getMoviesList() {
    this.isBusy = true;
    this.moviesService.getMoviesList().subscribe(response => {
      console.log(response);
      this.moviesList = response.movies;
      this.groupMoviesByCat();
    },
      err => {
        console.log(err);
      });
  }
  receiveMoviesListResult($event) {
    this.moviesList = $event.movies;
   
    if(this.moviesList.length>0){
      this.groupedMoviesList = [];
      this.groupMoviesByCat();
      this.isEmpty = false;
    }
    else{
      this.groupedMoviesList = [];
      this.isEmpty = true;
    }
   
  }

groupMoviesByCat(){
  for(let j = 0; j< this.moviesList.length; j ++){
    for(let i=0; i<this.moviesList[j].genres.length; i++){
      let genresListItem = _.findWhere(this.groupedMoviesList, {genres: this.moviesList[j].genres[i]});
      if(!genresListItem){
        let obj = {"genres": this.moviesList[j].genres[i], "movies": []};
        obj.movies.push(this.moviesList[j]);
        this.groupedMoviesList.push(obj);
      }else{
        genresListItem.movies.push(this.moviesList[j]);
      } 
    }
  }
  console.log( this.groupedMoviesList, "dd")
  this.isBusy = false;
}

goToMovieDetails(movie) {
  console.log(movie);
  this.router.navigate(['/movieDetails'], {
    state: {
      movie: movie
    }
  });
}
}
