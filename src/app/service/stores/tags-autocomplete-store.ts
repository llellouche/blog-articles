import {ElementRef, EventEmitter, Injectable, Input, ViewChild} from "@angular/core";
import {Tag} from "../../model/tag";
import {Article} from "../../model/article";
import {TagApiService} from "../api/tag-api.service";
import {FormControl} from "@angular/forms";
import {RouterService} from "../../router/router.service";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsAutocompleteStore {
  @Input() article: Article;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagCtrl = new FormControl();
  public filteredTags?: Observable<string[]>;
  public currentTags: EventEmitter<string[]> = new EventEmitter<string[]>();
  public ready: EventEmitter<boolean> = new EventEmitter<boolean>();
  public tags: string[] = [];
  public fullTags: Tag[] = [];
  public allTags: string[] = [];

  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;

  constructor(private routerService: RouterService,
              private tagApiService: TagApiService) {
    this.article = new Article();
  }

  init(article?: Article): void {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );

    if (article) {
      this.article = article;
    }

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

      this.ready.emit(true);
    });
  }

  reset(): void {
    this.tags = [];
    this.currentTags.emit(this.tags);
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
    this.removeDoubleEntries();
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.addToAutoComplete(tag);
      this.tagCtrl.setValue(null);
    }

    this.removeDoubleEntries();
  }

  public selected(event: MatAutocompleteSelectedEvent, input: HTMLInputElement): void {
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
    this.currentTags.emit(this.tags);

    if (index >= 0) {
      this.allTags.splice(index, 1);
    }
  }

  private addToAutoComplete(tag: string): void {
    this.allTags.push(tag);
    this.currentTags.emit(this.tags);
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

    this.currentTags.emit(this.tags);
  }

  private removeDoubleEntries(): void {
    // Remove duplicates (can happens cause of store data)
    this.allTags = this.allTags.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    this.tags = this.tags.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
  }
}
