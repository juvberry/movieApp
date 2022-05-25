import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';
import * as moment from 'moment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private movieService:MovieService ) {
  }

  isMobile:any = false
  selectedGenre:any = false
  loader:any = true
  moviesList:any
  genreArray:any
  genreId:any
  pageEvent!: PageEvent;
  selectedGenresList:any = []

  url:string = 'https://image.tmdb.org/t/p/w500'

  ngOnInit(): void {
    this.getPopularMovieList()
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

  getNextPage(pageObj:any){
    const page = pageObj.pageIndex + 1
    this.loader = true
    this.getPopularMovieList(page)
    window.scroll(0,0);
  }

  filterGenreId(genreId:any){
    let localStorageList:any = localStorage.getItem('moviesList')
    let localList:any = JSON.parse(localStorageList)
    this.selectedGenresList.push(genreId)
    
    // preciso que ele itere a lista de botoes clicados, pra saber se algo já foi selecionado, caso sim, manter selecionado
    // se o arr já esta preenchido com genre1 e o user seleciona genre2, preciso que os resultados sejam genre1+genre2

    // leia array genre_ids para cada item da array selectedGnresList e traga as que contem os mesmos elementos
    let clonedMovieArr = [...localList]
    
    let newMovieArr = clonedMovieArr.filter((arr:any)=>{
      // encontra genero do filme com genero clicado
      return arr.genre_ids.find((id:any) => {
        let selectedIndex = this.selectedGenresList.findIndex((i:any) => i === id)
        if(selectedIndex > -1){
          let selectedId = this.selectedGenresList[selectedIndex]
          if(id === selectedId){
            // encontra genero clicado dentro do array de genero
            this.genreArray.find((genre:any)=>{
              if(genre.id === selectedId){
                genre.selectedGenre = true
                return true
              }else{
                genre.selectedGenre = false
                return false
              }
            })
            return true
          }else{
            // caso nao tenha resultado de genero clicado com filmes, o botao continua como clicado
            let index = this.genreArray.findIndex((genre:any)=>{
              return genre.id === selectedId
            })
            if(index > -1){
              this.genreArray[index].selectedGenre = true
            }
            return false
          }
        }else{
          return false
        }
      })
    })

    this.moviesList = newMovieArr
  }
}
