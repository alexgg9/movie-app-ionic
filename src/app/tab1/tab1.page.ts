import { Component } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { Movie, MovieResponse } from '../models/movie';
import { TmdbapiService } from '../services/tmdbapi.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from '../components/movie-list/movie-list.component';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, MovieListComponent,FormsModule],
})
export class Tab1Page {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  movieSelection: string = 'popular';

  constructor(private http: HttpClient,private tmdbapiService: TmdbapiService) {}

  ionViewWillEnter() {
    this.loadMovies();
  }

  loadMovies() {
    switch (this.movieSelection) {
      case 'popular':
        this.loadPopularMovies();
        break;
      case 'upcoming':
        this.loadUpcomingMovies();
        break;
      case 'top_rated':
        this.loadTopRatedMovies();
        break;
      default:
        break;
    }
  }

  getSelection(selection: string) {
    this.movieSelection = selection;
    this.loadMovies();
  }

  loadPopularMovies() {
    this.tmdbapiService.getPopularMovies().subscribe((data: MovieResponse) => {
      this.popularMovies = data.results;
    });
  }

  loadUpcomingMovies() {
    this.tmdbapiService.getUpcomingMovies().subscribe((data: MovieResponse) => {
      this.upcomingMovies = data.results;
    });
  }

  loadTopRatedMovies() {
    this.tmdbapiService.getTopRatedMovies().subscribe((data: MovieResponse) => {
      this.topRatedMovies = data.results;
    });
  }



}
