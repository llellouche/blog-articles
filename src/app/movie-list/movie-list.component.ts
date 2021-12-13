import {Component, Input, OnInit} from '@angular/core';
import {GlobalStore} from "../service/stores/global-store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Movie} from "../model/movie";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {environment} from "../../environments/environment";
import {Video} from "../model/video";
import {MovieApiService} from "../service/api/movie-api.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[];

  public modalMovie: Movie | null;
  public displayedVideo: Video | null;

  public constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    public movieApiService: MovieApiService,
    ) {
    this.modalMovie = null;
    this.displayedVideo = null;
    this.movies = [];
  }

  public ngOnInit(): void {
  }

  // TODO Improve : Put Modal in componant to be reusable
  public triggerModal(content: any, movie: Movie) {
    this.modalMovie = movie;
    this.modalService.open(content, {size: 'lg', backdrop: 'static'}).result.then(() => {
      this.modalMovie = null;
    });

    this.loadVideo();
  }

  public getVideo(): SafeUrl {
    if (!!this.modalMovie && !!this.modalMovie.videos) {
      this.displayedVideo = this.modalMovie.videos[Math.floor(Math.random() * this.modalMovie.videos.length)];
      return this.sanitizer.bypassSecurityTrustResourceUrl(environment.youtubeBaseVideoUrl + this.displayedVideo.key);
    }

    return '';
  }

  private loadVideo() {
    this.movieApiService.getMovieVideo(this.modalMovie?.id).subscribe((videos: Video[]) => {
      if (this.modalMovie) {
        this.modalMovie.videos = videos.filter((video: Video) => {
          return video.site === 'YouTube';
        });
      }
    });
  }
}
