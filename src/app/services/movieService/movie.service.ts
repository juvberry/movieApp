import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl:string = '';
  popularityUrl:string = environment.api_url + 'movie/popular?api_key=fabb0e3340d2025e4ce26632d735c575&language=en-US&page=1'
  movie:string = environment.api_url + '/movie/'

  constructor( private http:HttpClient ) { }

  getPopularMovies():Observable<any>{
    return this.http.get<any>(this.popularityUrl)
  }

  getMovieId(id:any):Observable<any>{
    return this.http.get(this.movie + id + environment.authKey)
  }

  getMovieCredits(id:any):Observable<any>{
    return this.http.get(this.movie + id + '/credits' + environment.authKey)
  }

  getMovieReco(id:any):Observable<any>{
    return this.http.get(this.movie + id + '/recommendations' + environment.authKey)
  }
  getMovieVideos(id:any):Observable<any>{
    return this.http.get(this.movie + id + '/videos' + environment.authKey)
  }
}
