import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MovieService } from 'src/app/services/movieService/movie.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

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
  creditsObj:any
  crewArray:any
  castArray:any
  trailerArray:any
  trailerKey:any
  recoArray:any
  reco:any = true
  movieId = this.route.snapshot.params['id']
  url:string = 'https://image.tmdb.org/t/p/w500'

  ngOnInit( ): void {
    this.isMobileScreen()
    this.getMovieId()
    this.getCredits()
    this.getMovieTrailer()
    this.getRecommendations()
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
    this.movieService.getMovieId(this.movieId).subscribe((res) => {
      moment.locale('pt-br')
      res.release_date = moment(res.release_date).format('DD MMM YYYY').toLocaleUpperCase()
      this.movie = res
    })
  }

  getCredits(){
    this.movieService.getMovieCredits(this.movieId).subscribe((res)=>{
      this.creditsObj = res
      this.filterCredits(this.creditsObj)
      this.filterCast(this.creditsObj)
    })
    
  }

  getMovieTrailer(){
    this.movieService.getMovieVideos(this.movieId).subscribe((res)=>{
      this.trailerArray = res.results
      this.filterTrailer()
      this.getTrailerKey()
    })
  }

  getTrailerKey(){
    this.trailerKey = this.trailerArray[0].key
  }

  getRecommendations(){
    this.movieService.getMovieReco(this.movieId).subscribe((res)=>{
      this.momentForArr(res)
      this.recoArray = res.results
      if(this.recoArray.length === 0){
        this.reco = false
      }
      this.filterReco()
    })
  }

  momentForArr(res:any){
    moment.locale('pt-br');
      res.results.forEach((movRes:any) => {
        movRes.release_date = moment(movRes.release_date).format('DD MMM YYYY').toLocaleUpperCase()
      });
  }

  filterCredits(credits:any){
    let clonedCreditsObj = {...credits}
    let creditsArr = clonedCreditsObj.crew
    let newCreditsArr = creditsArr.filter((arr:any)=>{
      return (arr.job === 'Director' || arr.job === 'Screenplay' || arr.job === 'Casting')
    })
    
    this.crewArray = newCreditsArr
  }

  filterCast(cast:any){
    let clonedCastObj = {...cast}
    let castArr = clonedCastObj.cast
    let newCastArr = castArr.filter((arr:any)=>{
      return (arr.order <= 5)
    })

    this.castArray = newCastArr
  }

  filterTrailer(){
    let clonedTrailerArr = [...this.trailerArray]
    let newTrailerArr = clonedTrailerArr.filter((arr:any)=>{
      return (arr.official === true && arr.type === 'Trailer')
    })
    this.trailerArray = newTrailerArr
  }

  filterReco(){
    let clonedRecoArr = [...this.recoArray]
    let newRecoArr = clonedRecoArr.splice(0,6)
    this.recoArray = newRecoArr
    
  }
}
