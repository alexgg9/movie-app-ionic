import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiKey = 'b3edb8667c4b58c6c568c1046533ee7c';

  constructor(private http: HttpClient) {}

  getFavoriteMovies(accountId: string, sessionId: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${this.apiKey}&session_id=${sessionId}`);
  }

  addFavoriteMovie(accountId: string, sessionId: string, movieId: number): Observable<any> {
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true
    };
    return this.http.post(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${this.apiKey}&session_id=${sessionId}`, body);
  }

  removeFavoriteMovie(accountId: string, sessionId: string, movieId: number): Observable<any> {
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: false
    };
    return this.http.post(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${this.apiKey}&session_id=${sessionId}`, body);
  }
}
