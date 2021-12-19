import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleApiService} from "../service/api/article-api.service";
import {Article} from "../model/article";
import {ActivatedRoute, Router} from "@angular/router";
import {TagApiService} from "../service/api/tag-api.service";
import {Tag} from "../model/tag";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {RouterService} from "../router/router.service";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.sass']
})
export class UpdateArticleComponent implements OnInit, OnDestroy {
  public article?: Article;
  private notifier = new Subject();

  constructor(private authService: AuthService,
              private articleApiService: ArticleApiService,
              private tagApiService: TagApiService,
              private route: ActivatedRoute,
              private router: Router,
              private routerService: RouterService) {
    let articleId: number = this.route.snapshot.params.id;
    articleApiService.getOneArticle(articleId).pipe(takeUntil(this.notifier)).subscribe((article: Article) => {
      article.tags = undefined;
      this.article = article;

      if (!this.isAuthor()) {
        this.router.navigate(this.routerService.generate('app_index'));
      }

      // Load Article Tags
      tagApiService.getArticleTags(articleId).pipe(takeUntil(this.notifier)).subscribe((tags: Tag[]) => {
        if (this.article) {
          this.article.tags = tags;
        }
      });
    });
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  private isAuthor() {
    return this.authService?.getLoggedUser()?.id == this.article?.authorId;
  }
}
