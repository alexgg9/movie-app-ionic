import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TmdbapiService } from '../services/tmdbapi.service';
import { Movie, MovieResponse } from '../models/movie';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class Tab2Page {

  searchTerm: string = '';
  searchResults: Movie[] = [];
  moviesSearched: Movie[] = [];
  statusSearch = false;
  searchInputClicked = false;

  constructor(private tmdbapiService: TmdbapiService) {}

  onSearchInput(event: any) {
    this.searchInputClicked = true;
    const query: string = event.target.value.trim();
    if (query === '') {
      this.searchResults = [];
      return;
    }

    this.statusSearch = true;
    this.tmdbapiService.searchMovies(query).subscribe(
      (data: MovieResponse) => {
        this.searchResults = data.results;
        this.statusSearch = false;
      },
      (error: any) => {
        console.error('Error al obtener películas:', error);
        this.searchResults = [];
        this.statusSearch = false;
      }
    );
  }


}
