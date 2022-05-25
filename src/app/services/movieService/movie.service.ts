import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl:string = '';
  popularityUrl:any
  movie:string = environment.api_url + 'movie/'

  constructor( private http:HttpClient ) { }

  getPopularMovies(page?:any):Observable<any>{
    this.popularityUrl = environment.api_url + 'movie/popular?api_key=fabb0e3340d2025e4ce26632d735c575&language=pt-BR&page=' + (page?page:1)
    return this.http.get<any>(this.popularityUrl)
  }

  getMovieId(id:any):Observable<any>{
    return this.http.get(this.movie + id + environment.authKey + environment.localLang)
  }

  getMovieCredits(id:any):Observable<any>{
    return this.http.get(this.movie + id + '/credits' + environment.authKey + environment.localLang)
  }

  getMovieReco(id:any):Observable<any>{
    return this.http.get(this.movie + id + '/recommendations' + environment.authKey + environment.localLang)
  }

  getMovieVideos(id:any):Observable<any>{
    return this.http.get(this.movie + id + '/videos' + environment.authKey)
  }

  getReleaseDate(id:any):Observable<any>{
    return this.http.get(this.movie + id + '/release_dates' + environment.authKey)
  }

  getGenreList():Observable<any>{
    return this.http.get(environment.api_url + '/genre/movie/list' + environment.authKey + environment.localLang)
  }
}
