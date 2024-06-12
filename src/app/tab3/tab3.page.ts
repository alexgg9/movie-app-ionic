import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';
import { RouterLink } from '@angular/router';
import { MovieListComponent } from '../components/movie-list/movie-list.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, MovieListComponent],
})
export class Tab3Page {
  favoriteMovies: any[] = [];
  sessionId: string = '';
  accountId: string = '';
  constructor(private favoriteService: FavoriteService) {}
  ngOnInit() {
    this.sessionId = localStorage.getItem('sessionId') || '';
    this.accountId = localStorage.getItem('accountId') || ''; 
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies() {
    this.favoriteService.getFavoriteMovies(this.accountId, this.sessionId).subscribe((response: any) => {
      this.favoriteMovies = response.results;
    });
  }

  doRefresh(event: any) {
    this.favoriteService.getFavoriteMovies(this.accountId, this.sessionId).subscribe((response: any) => {
      this.favoriteMovies = response.results;
      event.target.complete();
    });
    setTimeout(() => {
      event.target.complete();
    }, 5000);
  }
}
