import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private movieService:MovieService ) { }

  isMobile:any = false
  popMovies:any
  url:string = 'https://image.tmdb.org/t/p/w500'

  ngOnInit(): void {
    this.getPopularMovieList()
  }

  getPopularMovieList(){
    this.movieService.getPopularMovies().subscribe((res) => {
      moment.locale('pt-br');
      res.results.forEach((movRes:any) => {
        movRes.release_date = moment(movRes.release_date).format('DD MMM YYYY').toLocaleUpperCase()
      });
      this.popMovies = res.results
    })
  }


}
