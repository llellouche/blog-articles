import {Injectable} from "@angular/core";
import {Tag} from "../../model/tag";
import {Article} from "../../model/article";
import {ArticleApiService} from "../api/article-api.service";
import {TagApiService} from "../api/tag-api.service";
import {ReactionApiService} from "../api/reaction-api.service";
import {Reaction} from "../../model/reaction";
import {CommentApiService} from "../api/comment-api.service";
import {Comment} from "../../model/comment";

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
    private tagApiService: TagApiService,
    private reactionApiService: ReactionApiService,
    private commentApiService: CommentApiService,
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
        this.loadArticleData(article, false);
      });
      this.allArticles = articles;
      this.displayedArticles = articles;
    });
  }

  public refreshDisplayedArticle(): void {
    if(this.displayedArticle) {
      this.loadArticleData(this.displayedArticle, true);
    }
  }

  private loadArticleData(article: Article, full: boolean): void {
    this.tagApiService.getArticleTags(article.id).subscribe((tags: Tag[]) => {
      article.tags = tags;
    });

    this.reactionApiService.getArticleReactions(article.id).subscribe((reactions: Reaction[]) => {
      article.reactions = reactions;
    });

    if (full) {
      this.commentApiService.getArticleComments(article.id).subscribe((comments: Comment[]) => {
        article.comments = comments;
      });

    }
  }

  public loadSearchMovies(filterValue: string): void {
    // this.currentSearch = filterValue;
    // this.movieApiService.searchMovies(filterValue).subscribe((movies: Movie[]) => {
    //   this.searchResults = movies;
    // });
  }
}
