import { Component, OnInit } from '@angular/core';
import {GlobalStore} from "../service/stores/global-store";
import {Article} from "../model/article";
import {RouterService} from "../router/router.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  public constructor(
    public globalStore: GlobalStore,
    public routerService: RouterService) {
  }

  public ngOnInit(): void {
    this.globalStore.loadArticles();
    this.globalStore.loadTags();
  }

  public displayArticle(article: Article): void {
    this.globalStore.displayedArticle = article;
    this.globalStore.refreshDisplayedArticle();
  }
}
