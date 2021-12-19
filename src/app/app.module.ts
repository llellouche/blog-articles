import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ErrorModule} from "./error/error.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./service/api/apiInterceptor";
import {ArticleListComponent} from './aticle-list/article-list.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {IndexComponent} from './index/index.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatButtonModule} from "@angular/material/button";
import {LogoutComponent} from './logout/logout.component';
import {CurrentArticleComponent} from './current-article/current-article.component';
import {MatBadgeModule} from "@angular/material/badge";
import {ArticleReactionsComponent} from './article-reactions/article-reactions.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {ArticleFormComponent} from './article-form/article-form.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {UpdateArticleComponent} from './update-article/update-article.component';
import {MatChipsModule} from "@angular/material/chips";
import {SearchArticleComponent} from './search-article/search-article.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    IndexComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    CurrentArticleComponent,
    ArticleReactionsComponent,
    CreateArticleComponent,
    ArticleFormComponent,
    UpdateArticleComponent,
    SearchArticleComponent
  ],
    imports: [
        ErrorModule,
        BrowserModule,
        FormsModule,
        NgbModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatIconModule,
        HttpClientModule,
        AppRoutingModule,
        MatButtonModule,
        MatChipsModule,
        MatBadgeModule,
        MatButtonToggleModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  exports: [
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
