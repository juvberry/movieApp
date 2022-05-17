import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MovieService } from 'src/app/services/movieService/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
})
export class HomeDetailsComponent implements OnInit {
  
  constructor(
      private breakpointObserver:BreakpointObserver,
      private movieService:MovieService,
      private route:ActivatedRoute
    ) { 
  }

  isMobile:any = false;
  movie:any
  url:string = 'https://image.tmdb.org/t/p/w500'

  ngOnInit( ): void {
    this.isMobileScreen()
    this.getMovieId()
  }

  isMobileScreen(){
    this.breakpointObserver
    .observe(['(max-width: 767px)'])
    .subscribe((state: BreakpointState) => {
      if(state.matches){
        this.isMobile = true
      }
    })
  }
  
  getMovieId(){
    this.movieService.getMovieId(this.route.snapshot.params['id']).subscribe((res) => {
      this.movie = res
    })
  }
}
