import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchMovieResultsComponent} from "./search-movie-results/search-movie-results.component";
import {IndexComponent} from "./index/index.component";
import {errorRoutes} from "./error/error.routes";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
      path: 'search/:query',
      component: SearchMovieResultsComponent,
    },
  {
    path: 'index',
    component: IndexComponent
  },
  ...errorRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
