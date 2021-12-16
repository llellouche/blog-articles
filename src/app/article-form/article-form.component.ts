import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RouterService} from "../router/router.service";
import {AuthService} from "../auth/auth.service";
import {ArticleApiService} from "../service/api/article-api.service";
import {Article} from "../model/article";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.sass']
})
export class ArticleFormComponent implements OnInit {
  public formGroupArticle: FormGroup;
  public article: Article;
  public isEnabled = true;

  constructor(private fb: FormBuilder,
              private articleApiService: ArticleApiService,
              private router: Router,
              public routerService: RouterService,
              public authService: AuthService) {
    this.article = new Article();
    this.formGroupArticle = this.fb.group({
      name: ['', [Validators.required]],
      // reference: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public onArticleSubmit(): void {
    this.formGroupArticle.markAllAsTouched();
    console.log(this.article);

    if (this.formGroupArticle.invalid) {
      return;
    }

    this.articleApiService.createArticle(this.article, this.authService.getLoggedUser()).subscribe((res) => {

    });
  }
}
