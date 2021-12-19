import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TagsAutocompleteStore} from "../service/stores/tags-autocomplete-store";
import {MatChipInputEvent} from "@angular/material/chips";
import {Article} from "../model/article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticleApiService} from "../service/api/article-api.service";
import {GlobalStore} from "../service/stores/global-store";
import {debounceTime, map} from "rxjs/operators";
import {pipe} from "rxjs";
import {ArticleService} from "../services/article-service";

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.sass']
})
export class SearchArticleComponent implements OnInit {
  @Output() searchInProgress = new EventEmitter<boolean>();

  public formGroupSearchArticle: FormGroup;
  public tagsAutocompleteReady: boolean = false;
  private tags: string[] = [];
  private search: string = '';

  constructor(private fb: FormBuilder,
              public tagsAutocompleteStore: TagsAutocompleteStore,
              public articleApiService: ArticleApiService,
              public articleService: ArticleService,
              public globalStore: GlobalStore) {
    this.formGroupSearchArticle = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.tagsAutocompleteStore.init();

    this.tagsAutocompleteStore.currentTags?.subscribe((tags: string[]) => {
      this.tags = tags;
      this.searchApi();
    });

    this.tagsAutocompleteStore.ready?.subscribe((ready: boolean) => {
      this.tagsAutocompleteReady = ready;
    });

    this.formGroupSearchArticle.controls.search.valueChanges
        .pipe(debounceTime(550))
        .subscribe((search) => {
          this.search = search;
          this.searchApi();
        });
  }

  public remove(tag: string) {
    this.tagsAutocompleteStore.remove(tag);
  }

  public add($event: MatChipInputEvent) {
    this.tagsAutocompleteStore.add($event)
  }

  private searchApi() {
    if (this.search == '' && this.tags.length == 0) {
      return;
    }

    this.searchInProgress.emit(true);
    this.articleApiService.search(this.search, this.tags).subscribe((articles: Article[]) => {
      articles.map((article: Article) => {
        this.articleService.loadArticleData(article, false);
      })
      this.globalStore.displayedArticles = articles;
      this.searchInProgress.emit(false);
    })
  }
}