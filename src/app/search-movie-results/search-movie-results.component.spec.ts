import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieResultsComponent } from './search-movie-results.component';

describe('SearchMovieResultsComponent', () => {
  let component: SearchMovieResultsComponent;
  let fixture: ComponentFixture<SearchMovieResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMovieResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMovieResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
