import { Component, OnInit } from '@angular/core';
import {GlobalStore} from "../service/stores/global-store";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  public constructor(
    public globalStore: GlobalStore,
    private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.globalStore.loadDiscoverMovies();
    this.globalStore.loadGenders();
    this.globalStore.loadMainVideoMovie();
  }

  public getVideo(): SafeUrl {
    if (!!this.globalStore.getRandomVideo()) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(environment.youtubeBaseVideoUrl + this.globalStore.getRandomVideo()?.key);
    }

    return '';
  }
}
