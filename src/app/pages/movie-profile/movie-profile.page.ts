import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbapiService } from '../../services/tmdbapi.service';
import { FavoriteService } from '../../services/favorite.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { star, starOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-movie-profile',
  templateUrl: './movie-profile.page.html',
  styleUrls: ['./movie-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MovieProfilePage implements OnInit {
  movie?: Movie;
  cast: any[] = [];
  backgroundImage: string = '';
  members: any[] = [];
  isFavorite: boolean = false;
  accountId: string | null = '';
  sessionId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private tmdbapiService: TmdbapiService,
    private favoriteService: FavoriteService
  ) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.accountId = localStorage.getItem('accountId');
    this.sessionId = localStorage.getItem('sessionId');
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.tmdbapiService.getMovie(Number(movieId)).subscribe((data) => {
        this.movie = data;
        this.cast = data.credits.cast;
        this.backgroundImage = `url(https://image.tmdb.org/t/p/w780/${data.backdrop_path})`;
        this.members = data.credits.cast.slice(0, 5);

        if (this.accountId && this.sessionId) {
          this.favoriteService.getFavoriteMovies(this.accountId, this.sessionId).subscribe(favorites => {
            this.isFavorite = favorites.results.some((fav: any) => fav.id === data.id);
          });
        }
      });
    }
  }

  toggleFavorite() {
    if (this.movie && this.accountId && this.sessionId) {
      if (this.isFavorite) {
        this.favoriteService.removeFavoriteMovie(this.accountId, this.sessionId, this.movie.id).subscribe(() => {
          this.isFavorite = false;
        });
      } else {
        this.favoriteService.addFavoriteMovie(this.accountId, this.sessionId, this.movie.id).subscribe(() => {
          this.isFavorite = true;
        });
      }
    }
  }
}
