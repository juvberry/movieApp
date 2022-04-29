import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class movieService {

  baseUrl: string = 'https://api.themoviedb.org/3/movie/550?api_key=fabb0e3340d2025e4ce26632d735c575'
  
  constructor() { }
}
