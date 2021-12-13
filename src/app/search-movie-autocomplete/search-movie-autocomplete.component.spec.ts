import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieAutocompleteComponent } from './search-movie-autocomplete.component';

describe('SearchMovieAutocompleteComponent', () => {
  let component: SearchMovieAutocompleteComponent;
  let fixture: ComponentFixture<SearchMovieAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMovieAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMovieAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
