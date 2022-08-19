import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';
import * as moment from 'moment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private movieService:MovieService,
    private route:ActivatedRoute,
    private router:Router
    ) {}

  isMobile:any = false
  selectedGenre:any = false
  loader:any = true
  moviesList:any
  pagination = {
    "page": 0,
    "total_results": 0,
    "total_pages": 0
  }
  genreArray:any
  genreId:any
  page:any
  pageEvent!: PageEvent;
  selectedGenresList:any = []

  url:string = 'https://image.tmdb.org/t/p/w500'


  ngOnInit(): void {
    this.getPopularMovieList('1')
    this.getGenreList()
  }

  getPopularMovieList(page?:any){
    this.movieService.getPopularMovies(page).subscribe((res) => {
      window.scroll(0,0);
      setTimeout(()=>{
        moment.locale('pt-br');
        res.results.forEach((movRes:any) => {
          movRes.release_date = moment(movRes.release_date).format('DD MMM YYYY').toLocaleUpperCase()
        });
        this.moviesList = res.results
        localStorage.setItem('moviesList', JSON.stringify(this.moviesList))
        this.pagination.page = res.page
        this.pagination.total_pages = res.total_pages
        this.pagination.total_results = res.total_results
        this.loader = false
      }, 3000)
    })
  }

  getGenreList(){
    this.movieService.getGenreList().subscribe((res)=>{
      res.genres.forEach((genre:any)=>{
        genre.selectedGenre = false
      })
      this.genreArray = res.genres
    })
  }

  getMovieByGenre(){
    this.movieService.getMovieByGenre(this.selectedGenresList).subscribe(res => {
      this.moviesList = res.results
      this.pagination.total_pages = res.total_pages
      this.pagination.total_results = res.total_results
      this.pagination.page = res.page
    })
  }

  getNextPage(pageObj:any){
    let page = pageObj.pageIndex + 1
    this.loader = true
    this.navigatePage(page)
    this.getPopularMovieList(page)
    this.loader = false
  }

  filterGenreId(genreId:any){
    // trazer os filmes que tenham 1 ou mais generos clicados.
    // botao clicado tem que ser laranja e com x
    this.loader = true
    if(!this.selectedGenresList.includes(genreId)){
      this.selectedGenresList.push(genreId)
      this.getMovieByGenre()
      this.toBeTrueSelection(genreId)
    }else{
      this.removeGenreFilter(genreId)
      if(Array.isArray(this.selectedGenresList) && this.selectedGenresList.length === 0){
        this.toBeFalseSelection(genreId)
        this.getPopularMovieList('1')
      }
    }
    this.navigatePage(this.pagination.page)
    this.loader = false
  }

  removeGenreFilter(genreId:number){
    this.selectedGenresList.filter((id:number) => {
      if(id === genreId){
        let index = this.selectedGenresList.indexOf(genreId)
        this.toBeFalseSelection(genreId)
        this.selectedGenresList.splice(index, 1)
        this.getMovieByGenre()
      }
    })
  }

  removeAllFilter(){
    this.selectedGenresList.forEach((id:number) => {
      this.toBeFalseSelection(id)
    })
    this.selectedGenresList.length = 0
    this.getPopularMovieList()
  }

  navigatePage(page:any){
    this.router.navigate([`/`], {
      relativeTo: this.route,
      queryParams: { page: page},
      queryParamsHandling: 'merge'
    });
  }

  toBeTrueSelection(genreId:number){
    // pego a lista de generos selecionados e filtro, recebendo um id. se este id for o mesmo id selecionado,
    // pego a lista de generos e encontro o genero selecionado. 
    this.selectedGenresList.filter((id:number) => {
      if(id === genreId){
        this.genreArray.filter((genre:any) => {
          if(genreId === genre.id){
            genre.selectedGenre = true
          }
        })
      }else{
        this.genreArray.filter((genre:any) => {
          if(genre.id === genreId){
            genre.selectedGenre = false
          }
        })
      }
    })
  }

  toBeFalseSelection(genreId:number){
    this.selectedGenresList.filter((id:number) => {
        if(id === genreId){
          this.genreArray.filter((genre:any) => {
            if(genreId === genre.id){
              genre.selectedGenre = false
            }
          })
        }      
      })
  }
}
