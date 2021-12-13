import {Component, OnInit} from '@angular/core';
import {GlobalStore} from "../service/stores/global-store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-movie-results',
  templateUrl: './search-movie-results.component.html',
  styleUrls: ['./search-movie-results.component.sass']
})
export class SearchMovieResultsComponent implements OnInit {

  public constructor(
    private activatedRoute: ActivatedRoute,
    public globalStore: GlobalStore
  ) {
  }

  public ngOnInit(): void {
    const queryRouteParam = this.activatedRoute.snapshot.paramMap.get('query');
    console.log(queryRouteParam);

    if (!this.globalStore.currentSearch && queryRouteParam) {
      this.initSearchFromParam(queryRouteParam);
    }
  }

  private initSearchFromParam(searchQuery: string): void {
    this.globalStore.loadSearchMovies(searchQuery);
  }
}
