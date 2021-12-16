import {Component, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {GlobalStore} from "../service/stores/global-store";
import {RouterService} from "../router/router.service";
import {Router} from "@angular/router";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Article} from "../model/article";

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
  filteredMovies: Observable<Article[]>;
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

  private filterStates(value: string): Article[] {
    const filterValue = value.toLowerCase();
    this.globalStore.loadSearchMovies(filterValue);

    return this.globalStore.searchResults;
  }

}
