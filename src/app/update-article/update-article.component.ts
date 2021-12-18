import { Component, OnInit } from '@angular/core';
import {ArticleApiService} from "../service/api/article-api.service";
import {Article} from "../model/article";
import {ActivatedRoute} from "@angular/router";
import {TagApiService} from "../service/api/tag-api.service";
import {Tag} from "../model/tag";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.sass']
})
export class UpdateArticleComponent implements OnInit {
  public article?: Article;

  constructor(private articleApiService: ArticleApiService,
              private tagApiService: TagApiService,
              private route: ActivatedRoute) {
    let articleId: number = this.route.snapshot.params.id;
    articleApiService.getOneArticle(articleId).subscribe((article: Article) => {
      article.tags = undefined;
      this.article = article;

      // Load Article Tags
      tagApiService.getArticleTags(articleId).subscribe((tags: Tag[]) => {
        if (this.article) {
          this.article.tags = tags;
        }
      });
    });
  }

  ngOnInit(): void {
  }

}
