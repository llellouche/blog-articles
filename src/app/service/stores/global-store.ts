import {Gender} from "../../model/gender";
import {GenderApiService} from "../api/gender-api.service";
import {Injectable} from "@angular/core";
import {MovieApiService} from "../api/movie-api.service";
import {Movie} from "../../model/movie";
import {Video} from "../../model/video";
import {Tag} from "../../model/tag";
import {Article} from "../../model/article";
import {ArticleApiService} from "../api/article-api.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  public allTags?: Tag[];
  public allArticles?: Article[];
  public displayedArticles?: Article[];
  public displayedArticle?: Article;
  public displayedDetailsMovie?: Movie;
  public currentSearch?: string;
  public searchResults: Article[] = [];

  constructor(
    private genderApiService: GenderApiService,
    private movieApiService: MovieApiService,
    private articleApiService: ArticleApiService,
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
      // console.log(articles);
      this.allArticles = articles;
      this.displayedArticles = articles;
    });
  }

  public loadSearchMovies(filterValue: string): void {
    // this.currentSearch = filterValue;
    // this.movieApiService.searchMovies(filterValue).subscribe((movies: Movie[]) => {
    //   this.searchResults = movies;
    // });
  }
}
