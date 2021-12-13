import {Gender} from "../../model/gender";
import {GenderApiService} from "../api/gender-api.service";
import {Injectable} from "@angular/core";
import {MovieApiService} from "../api/movie-api.service";
import {Movie} from "../../model/movie";
import {Video} from "../../model/video";

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  public allGenders?: Gender[];
  public displayedMovies?: Movie[];
  public displayedDetailsMovie?: Movie;
  public mainMovie?: Movie;
  public currentSearch?: string;
  public searchResults: Movie[] = [];

  constructor(
    private genderApiService: GenderApiService,
    private movieApiService: MovieApiService
  ) {
  }

  public loadGenders(): void {
    this.genderApiService.getGenders().subscribe((genders: Gender[]) => {
      this.allGenders = genders;
    });
  }

  public loadMainVideoMovie(): void {
    this.movieApiService.getNowPlaying().subscribe((movies: Movie[]) => {
      // Get random movie between new playing
      this.mainMovie = movies[Math.floor(Math.random() * movies.length)];
      this.movieApiService.getMovieVideo(this.mainMovie.id).subscribe((videos: Video[]) => {
        if (this.mainMovie) {
          this.mainMovie.videos = videos;
        }
      });
    });
  }

  public getRandomVideo(): Video | null {
    if (!this.mainMovie || !this.mainMovie.videos) {
      return null;
    }

    return this.mainMovie.videos[Math.floor(Math.random() * this.mainMovie.videos.length)];
  }

  public loadDiscoverMovies(): void {
    let selectedGenderIds: number[] = [];

    this.allGenders?.map((gender: Gender) => {
      if (gender.selected && !!gender.id) {
        selectedGenderIds.push(gender.id);
      }
    });

    this.movieApiService.getDiscoverMovies(selectedGenderIds).subscribe((movies: Movie[]) => {
      this.displayedMovies = movies;
    });
  }

  public loadSearchMovies(filterValue: string): void {
    this.currentSearch = filterValue;
    this.movieApiService.searchMovies(filterValue).subscribe((movies: Movie[]) => {
      this.searchResults = movies;
    });
  }
}
