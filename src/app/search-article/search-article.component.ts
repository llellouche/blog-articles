import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {TagsAutocompleteStore} from "../service/stores/tags-autocomplete-store";
import {MatChipInputEvent} from "@angular/material/chips";
import {Article} from "../model/article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticleApiService} from "../service/api/article-api.service";
import {GlobalStore} from "../service/stores/global-store";
import {debounceTime, map, takeUntil} from "rxjs/operators";
import {pipe, Subject} from "rxjs";
import {ArticleService} from "../services/article-service";

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.sass']
})
export class SearchArticleComponent implements OnInit, OnChanges, OnDestroy {
  @Output() searchInProgress = new EventEmitter<boolean>();
  @Input() resetSearch?: boolean;

  public formGroupSearchArticle: FormGroup;
  public tagsAutocompleteReady: boolean = false;
  private tags: string[] = [];
  private search: string = '';
  private notifier = new Subject();

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
    this.globalStore.resetPagination();
    this.tagsAutocompleteStore.init();

    this.tagsAutocompleteStore.currentTags?.pipe(takeUntil(this.notifier)).subscribe((tags: string[]) => {
      this.tags = tags;
      this.searchApi();
    });

    this.tagsAutocompleteStore.ready?.pipe(takeUntil(this.notifier)).subscribe((ready: boolean) => {
      this.tagsAutocompleteReady = ready;
    });

    this.formGroupSearchArticle.controls.search.valueChanges
        .pipe(debounceTime(550))
        .pipe(takeUntil(this.notifier))
        .subscribe((search) => {
          this.search = search;
          this.searchApi();
        });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Empty fields
    if (this.resetSearch) {
      this.formGroupSearchArticle.controls.search.setValue(null);
      this.tagsAutocompleteStore.reset();
    }
  }

  public ngOnDestroy(): void {
    this.tagsAutocompleteStore.reset();
    this.notifier.next();
    this.notifier.complete();
    this.globalStore.isSearchContext = false;
  }

  public remove(tag: string) {
    this.tagsAutocompleteStore.remove(tag);
  }

  public add($event: MatChipInputEvent) {
    this.tagsAutocompleteStore.add($event)
  }

  private searchApi() {
    if ((this.search == '' || this.formGroupSearchArticle.controls.search.value == null) && this.tags.length == 0) {
      return;
    }

    console.log('SEARCH');
    this.globalStore.isSearchContext = true;

    this.searchInProgress.emit(true);
    this.articleApiService.search(this.search, this.tags).pipe(takeUntil(this.notifier)).subscribe((articles: Article[]) => {
      articles.map((article: Article) => {
        this.articleService.loadArticleData(article, false);
      })
      this.globalStore.displayedArticles = articles;
      this.searchInProgress.emit(false);
    })
  }
}
