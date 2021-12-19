import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from "../model/article";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.sass']
})
export class ArticleListComponent implements OnInit {
  @Input() articles?: Article[];
  @Input() isSearchContext?: boolean;
  @Output() article = new EventEmitter<Article>();
  @Output() loadMore = new EventEmitter<void>();

  public searchInProgress = false;

  public constructor() {
    this.articles = [];
  }

  public ngOnInit(): void {
  }

  public triggerReadArticle(article: Article): void {
    this.article.emit(article);
  }
}
