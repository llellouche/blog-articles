import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalStore} from "../service/stores/global-store";
import {Article} from "../model/article";
import {RouterService} from "../router/router.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit, OnDestroy {
  public constructor(
    public globalStore: GlobalStore,
    public routerService: RouterService) {
  }

  public ngOnInit(): void {
    this.displayArticles();
  }

  ngOnDestroy(): void {
    this.globalStore.resetPagination();
  }

  public displayArticle(article: Article): void {
    this.globalStore.displayedArticle = article;
    this.globalStore.refreshDisplayedArticle();
  }

  public displayArticles(): void {
    this.globalStore.resetPagination();
    this.globalStore.loadArticles();
    this.globalStore.loadTags();

  }
}
