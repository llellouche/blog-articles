import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from "../model/article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {CommentApiService} from "../service/api/comment-api.service";
import {Reaction} from "../model/reaction";
import {Comment} from "../model/comment";

@Component({
  selector: 'app-current-article',
  templateUrl: './current-article.component.html',
  styleUrls: ['./current-article.component.sass']
})
export class CurrentArticleComponent implements OnInit {
  @Input() article?: Article;
  @Output() closeArticle = new EventEmitter<void>();

  public formGroupComment: FormGroup;

  public comment: Comment;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private commentApiService: CommentApiService) {
    this.comment = new Comment();
    this.formGroupComment = this.fb.group({
      comment: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  public onComment(): void {
    this.formGroupComment.markAllAsTouched();

    let strComment: string = this.formGroupComment.controls.comment.value.toString();

    let comment: Comment = new Comment();
    comment.content = strComment;

    this.commentApiService.sendComment(comment, this.article, this.authService.getLoggedUser()).subscribe();
    comment.updatedAt = new Date();
    this.article?.comments?.push(comment);
  }
}
