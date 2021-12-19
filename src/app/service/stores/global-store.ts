import {Injectable} from "@angular/core";
import {Tag} from "../../model/tag";
import {Article} from "../../model/article";
import {ArticleApiService} from "../api/article-api.service";
import {ArticleService} from "../../services/article-service";

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  public allTags?: Tag[];
  public allArticles?: Article[];
  public displayedArticles?: Article[];
  public displayedArticle?: Article;
  public currentSearch?: string;
  public searchResults: Article[] = [];

  constructor(
    private articleApiService: ArticleApiService,
    private articleService: ArticleService,
  ) {
  }

  public loadTags(): void {
    // TODO
    // this.genderApiService.getGenders().subscribe((articles: Article[]) => {
    //   this.allArticles = articles;
    // });
  }

  public loadArticles(): void {
    this.articleApiService.getAllArticles().subscribe((articles: Article[]) => {
      // Load Tags and Reactions
      articles.map((article: Article) => {
        this.articleService.loadArticleData(article, false);
      });
      this.allArticles = articles;
      this.displayedArticles = articles;
    });
  }

  public refreshDisplayedArticle(): void {
    if(this.displayedArticle) {
      this.articleService.loadArticleData(this.displayedArticle, true);
    }
  }
}
