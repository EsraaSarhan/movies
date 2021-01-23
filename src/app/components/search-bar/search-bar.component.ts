import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from "../../dataModels/movies";
//import { type } from 'os';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
public value: string ;
public searchResult: any;
@Output() moviesListEvent = new EventEmitter<string>();



  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
  }
  search(value){
    this.moviesService.
    getSearchResult(value).subscribe(response => {
      console.log(typeof(response));
      this.searchResult = response;
      this.moviesListEvent.emit(this.searchResult)
    },
      err => {
        console.log(err);
      });
  }

  
}
