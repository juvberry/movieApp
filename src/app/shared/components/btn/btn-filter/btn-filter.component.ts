import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movieService/movie.service';

@Component({
  selector: 'app-btn-filter',
  templateUrl: './btn-filter.component.html',
  styleUrls: ['./btn-filter.component.scss']
})
export class BtnFilterComponent implements OnInit {

  constructor( private movieService:MovieService ) { }

  @Input() genres:any
  genreList:any

  ngOnInit(): void {
  }

  getGenreList(){
    this.movieService.getGenreList().subscribe((res)=>{
      this.genres = res.genres
    })
  }

}
