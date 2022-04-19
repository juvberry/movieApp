import { TestBed } from '@angular/core/testing';

import { movieService } from './movieService';

describe('movieService', () => {
  let service: movieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(movieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
