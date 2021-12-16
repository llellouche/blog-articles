import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentArticleComponent } from './current-article.component';

describe('CurrentArticleComponent', () => {
  let component: CurrentArticleComponent;
  let fixture: ComponentFixture<CurrentArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
