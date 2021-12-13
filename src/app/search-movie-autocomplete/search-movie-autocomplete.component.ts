import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {GlobalStore} from "../service/stores/global-store";
import {Movie} from "../model/movie";
import {RouterService} from "../router/router.service";
import {Router} from "@angular/router";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-search-movie-autocomplete',
  templateUrl: './search-movie-autocomplete.component.html',
  styleUrls: ['./search-movie-autocomplete.component.sass']
})
export class SearchMovieAutocompleteComponent {
  searchCtrl = new FormControl();
  filteredMovies: Observable<Movie[]>;
  @ViewChild(MatAutocompleteTrigger) autocomplete?: MatAutocompleteTrigger;

  public constructor(
    private routerService: RouterService,
    private router: Router,
    public globalStore: GlobalStore,
  ) {
    this.filteredMovies = this.searchCtrl.valueChanges
      .pipe(
        startWith(''),
        map(movie => movie ? this.filterStates(movie) : this.globalStore.searchResults.slice())
      );
  }

  public displaySearchPage(): void {
    if (this.globalStore.currentSearch) {
      this.router.navigateByUrl(
        this.routerService.generateString('app_search_movie', {
          query: this.globalStore.currentSearch
        })
      ).then(() => {
        this.autocomplete?.closePanel();
      });
    }
  }

  private filterStates(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    this.globalStore.loadSearchMovies(filterValue);

    return this.globalStore.searchResults;
  }

}
