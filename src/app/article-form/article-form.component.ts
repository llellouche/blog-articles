import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RouterService} from "../router/router.service";
import {AuthService} from "../auth/auth.service";
import {ArticleApiService} from "../service/api/article-api.service";
import {Article} from "../model/article";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {TagApiService} from "../service/api/tag-api.service";
import {Tag} from "../model/tag";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.sass']
})
export class ArticleFormComponent implements OnInit {
  public formGroupArticle: FormGroup;
  @Input() article: Article;
  public isEnabled = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagCtrl = new FormControl();
  public filteredTags?: Observable<string[]>;
  public tags: string[] = [];
  public fullTags: Tag[] = [];
  public allTags: string[] = [];
  public isUpdate: boolean = false;

  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder,
              private articleApiService: ArticleApiService,
              private router: Router,
              public routerService: RouterService,
              public tagApiService: TagApiService,
              public authService: AuthService) {
    this.article = new Article();
    this.formGroupArticle = this.fb.group({
      name: ['', [Validators.required]],
      // reference: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  ngOnInit(): void {
    this.isUpdate = ! ! this.article.id;
    // Set default tags
    this.tagApiService.getAllTags().subscribe((tags: Tag[]) => {
      tags.map((tag: Tag) => {
        if (tag.title) {
          this.allTags.push(tag.title);
          this.fullTags.push(tag);
        }
      });

      // Init Tags for article update
      this.setCurrentTags();
    });
  }

  public onArticleSubmit(): void {
    this.formGroupArticle.markAllAsTouched();

    if (this.formGroupArticle.invalid) {
      return;
    }

    // Retrieve Tags objects from str
    let tags: string[] = [];
    let fullTags: Tag[] = [];
    this.tags.map((tag: string) => {
      fullTags.push(...this.fullTags.filter((fullTag: Tag) => {
        return tag == fullTag.title;
      }));
    });

    // Create list of Tags['@id']
    tags = fullTags.map((fullTag: Tag) => {
      return fullTag["@id"];
    });

    if (this.isUpdate) {
      this.articleApiService.updateArticle(this.article, tags).subscribe((res) => {
        this.router.navigate(this.routerService.generate('app_index'));
      });
    } else {
      this.articleApiService.createArticle(this.article, this.authService.getLoggedUser(), tags).subscribe((res) => {
        this.router.navigate(this.routerService.generate('app_index'));
      });
    }
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (! value || this._filter(value).length === 0) {
      return;
    }

    let tagToAdd: string = this._filter(value)[0];

    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue('');
    this.tagCtrl.patchValue('');

    // Add our tag
    this.tags.push(tagToAdd);
    this.removeFromAutoComplete(tagToAdd);

    this.tagCtrl.setValue(null);
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.addToAutoComplete(tag);
      this.tagCtrl.setValue(null);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent, input: HTMLInputElement): void {
    console.log(this._matchAlreadySelected(event.option.viewValue));
    if (this._matchAlreadySelected(event.option.viewValue).length > 0) {
      return;
    }

    this.tags.push(event.option.viewValue);
    input.value = '';
    this.tagCtrl.patchValue('');
    this.removeFromAutoComplete(event.option.viewValue);

    if (this.tagInput) {
      this.tagInput.nativeElement.value = '';
      // Clear the input value
    }
    this.tagCtrl.setValue(null);
  }

  private removeFromAutoComplete(tag: string): void {
    const index = this.allTags.indexOf(tag);

    if (index >= 0) {
      this.allTags.splice(index, 1);
    }
  }

  private addToAutoComplete(tag: string): void {
    this.allTags.push(tag);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  private _matchAlreadySelected(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tags.filter(tag => tag.toLowerCase() == filterValue);
  }

  private setCurrentTags():void {
    if (this.article.id) {
      this.article.tags?.map((tag: Tag) => {
        if (tag.title != undefined) {
          this.tags.push(tag.title);
          this.removeFromAutoComplete(tag.title);
        }
      });
    }
  }
}
