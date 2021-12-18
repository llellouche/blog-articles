import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchMovieResultsComponent} from "./search-movie-results/search-movie-results.component";
import {IndexComponent} from "./index/index.component";
import {errorRoutes} from "./error/error.routes";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth/guard/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {LogoutComponent} from "./logout/logout.component";
import {CreateArticleComponent} from "./create-article/create-article.component";
import {UpdateArticleComponent} from "./update-article/update-article.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
      path: 'search/:query',
      component: SearchMovieResultsComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article/create',
    component: CreateArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article/:id/edit',
    component: UpdateArticleComponent,
    canActivate: [AuthGuard]
  },
  ...errorRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
