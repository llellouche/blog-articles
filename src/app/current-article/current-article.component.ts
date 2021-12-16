import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../model/article";

@Component({
  selector: 'app-current-article',
  templateUrl: './current-article.component.html',
  styleUrls: ['./current-article.component.sass']
})
export class CurrentArticleComponent implements OnInit {
  @Input() article?: Article;

  constructor() { }

  ngOnInit(): void {

  }

}
