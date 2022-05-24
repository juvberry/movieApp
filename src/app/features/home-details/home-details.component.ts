import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MovieService } from 'src/app/services/movieService/movie.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
})
export class HomeDetailsComponent implements OnInit {
  
  constructor(
      private breakpointObserver:BreakpointObserver,
      private movieService:MovieService,
      private route:ActivatedRoute,
      private router:Router,
    ) { 
      this.router.events.subscribe((ev)=>{
        if(ev instanceof NavigationEnd){
          this.movieId = this.route.snapshot.params['id']
          this.getMovieId()
        }
      })
  }

  isMobile:any = false;
  movie:any
  creditsObj:any
  crewArray:any
  castArray:any
  trailerArray:any
  trailerKey:any
  recoArray:any
  releaseDate:any
  certificationAge:any
  movieId:any = null
  reco:any = true
  url:string = 'https://image.tmdb.org/t/p/w500'

  ngOnInit(): void {
    this.isMobileScreen()
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
    this.movieService.getMovieId(this.movieId).pipe(finalize(()=>{
      this.getCredits()
      this.getMovieTrailer()
      this.getRecommendations()
      this.getReleaseDate()
    })).subscribe((res) => {
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

  getReleaseDate(){
    this.movieService.getReleaseDate(this.movieId).subscribe((res)=>{
      this.releaseDate = res.results
      this.filterDates()
      moment.locale('pt-br')
      this.releaseDate = moment(this.releaseDate).format('DD/MM/YYYY')
      console.log(this.certificationAge)
      console.log(this.releaseDate)
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

  filterDates(){
    let clonedDatesArr = [...this.releaseDate]
    let dateObj = clonedDatesArr.find((arr:any)=>{
      return (arr.iso_3166_1 === 'BR')
    })

    let newDateArr = dateObj.release_dates
    let date = newDateArr[0]
    
    this.releaseDate = date.release_date
    this.certificationAge = date.certification
  }

  calcAverage(type:any, value:any){
    switch (type) {
      case 'divide':
        return value/10
        break;
    
      default:
        return value*10
        break;
    }
  }
}
