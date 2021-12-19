import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RouterService} from "../router/router.service";
import {AuthService} from "../auth/auth.service";
import {ArticleApiService} from "../service/api/article-api.service";
import {Article} from "../model/article";
import {Tag} from "../model/tag";
import {TagsAutocompleteStore} from "../service/stores/tags-autocomplete-store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.sass']
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  public isUpdate: boolean = false;
  public formGroupArticle: FormGroup;
  public tagsAutocompleteReady: boolean = false;

  @Input() article: Article;

  constructor(
      private fb: FormBuilder,
      public tagsAutocompleteStore: TagsAutocompleteStore,
      private articleApiService: ArticleApiService,
      private authService: AuthService,
      public routerService: RouterService,
      private router: Router) {
    this.article = new Article();
    this.formGroupArticle = this.fb.group({
      name: ['', [Validators.required]],
      // reference: ['', Validators.required],
      content: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.tagsAutocompleteStore.init(this.article);

    this.tagsAutocompleteStore.ready?.subscribe((ready: boolean) => {
      this.tagsAutocompleteReady = ready;
    });

  }
  ngOnDestroy(): void {
    this.tagsAutocompleteStore.reset();
  }

  public onArticleSubmit(): void {
    this.formGroupArticle.markAllAsTouched();

    if (this.formGroupArticle.invalid) {
      return;
    }

    // Retrieve Tags objects from str
    let tags: string[] = [];
    let fullTags: Tag[] = [];
    this.tagsAutocompleteStore.tags.map((tag: string) => {
      fullTags.push(...this.tagsAutocompleteStore.fullTags.filter((fullTag: Tag) => {
        return tag == fullTag.title;
      }));
    });

    // Create list of Tags['@id']
    tags = fullTags.map((fullTag: Tag) => {
      return fullTag["@id"];
    });

    if (this.isUpdate) {
      this.articleApiService.updateArticle(this.article, tags).subscribe((res) => {
        this.tagsAutocompleteStore.reset();

        this.router.navigate(this.routerService.generate('app_index'));
      });
    } else {
      this.articleApiService.createArticle(this.article, this.authService.getLoggedUser(), tags).subscribe((res) => {
        this.tagsAutocompleteStore.reset();

        this.router.navigate(this.routerService.generate('app_index'));
      });
    }
  }
}
