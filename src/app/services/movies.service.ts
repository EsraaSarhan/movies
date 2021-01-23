import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Announcement, Class, SubjectArea, Grade } from '../dataModels/movies';


@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private authorization: string = "Bearer Wookie2019";

  constructor(private http: HttpClient) { }
  
  getMoviesList() {
    return this.http.get<any>('https://wookie.codesubmit.io/movies',  
    { headers: new HttpHeaders({'Authorization': this.authorization})});
  }
getSearchResult(searchTerm){
  //https://wookie.codesubmit.io/movies?q=<search_term>
  return this.http.get('https://wookie.codesubmit.io/movies?q=' + searchTerm, 
  { headers: new HttpHeaders({'Authorization': this.authorization})
});}
}


