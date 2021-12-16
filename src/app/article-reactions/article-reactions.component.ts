import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../model/article";
import {Reaction} from "../model/reaction";
import {AuthService} from "../auth/auth.service";
import {ReactionApiService} from "../service/api/reaction-api.service";
import {GlobalStore} from "../service/stores/global-store";

@Component({
  selector: 'app-article-reactions',
  templateUrl: './article-reactions.component.html',
  styleUrls: ['./article-reactions.component.sass']
})
export class ArticleReactionsComponent implements OnInit {
  @Input() article?: Article;
  constructor(private authService: AuthService,
              private reactionApiService: ReactionApiService,
              private globalStore: GlobalStore) {
  }

  ngOnInit(): void {
  }

  public react(type: string) {
    let reaction: Reaction = new Reaction();
    reaction.type = type;

    this.reactionApiService.sendReaction(reaction, this.article, this.authService.getLoggedUser()).subscribe();
    this.article?.reactions?.push(reaction);

    // TODO Optimize this
    this.globalStore.loadArticles();
  }
}
