import {Injectable} from "@angular/core";
import {ArticleApiService} from "../service/api/article-api.service";
import {TagApiService} from "../service/api/tag-api.service";
import {ReactionApiService} from "../service/api/reaction-api.service";
import {CommentApiService} from "../service/api/comment-api.service";
import {Article} from "../model/article";
import {Tag} from "../model/tag";
import {Reaction} from "../model/reaction";
import {Comment} from "../model/comment";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
      private articleApiService: ArticleApiService,
      private tagApiService: TagApiService,
      private reactionApiService: ReactionApiService,
      private commentApiService: CommentApiService
  ) {
  }

  public loadArticleData(article: Article, full: boolean): void {
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

}
