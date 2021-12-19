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
  public displayedArticles?: Article[];
  public displayedArticle?: Article;
  public currentSearch?: string;
  public searchResults: Article[] = [];
  public page: number;
  public isSearchContext: boolean;

  constructor(
    private articleApiService: ArticleApiService,
    private articleService: ArticleService,
  ) {
    this.page = 1;
    this.isSearchContext = false;
  }

  public loadTags(): void {
    // TODO
    // this.genderApiService.getGenders().subscribe((articles: Article[]) => {
    //   this.allArticles = articles;
    // });
  }

  public loadArticles(): void {
    this.isSearchContext = false;
    this.articleApiService.getAllArticles(this.page).subscribe((articles: Article[]) => {
      // Load Tags and Reactions
      articles.map((article: Article) => {
        this.articleService.loadArticleData(article, false);
      });
      if (this.displayedArticles == undefined) {
        this.displayedArticles = [];
      }
      this.displayedArticles?.push(...articles);
      this.page++;
    });
  }

  public refreshDisplayedArticle(): void {
    if(this.displayedArticle) {
      this.articleService.loadArticleData(this.displayedArticle, true);
    }
  }

  public resetPagination(): void {
    this.page = 1;
    this.displayedArticles = undefined;
  }
}
