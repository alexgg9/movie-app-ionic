import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse, Movie } from '../models/movie';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class TmdbapiService {
  private apiKey = 'b3edb8667c4b58c6c568c1046533ee7c';
  private url = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.url}/movie/popular?api_key=${this.apiKey}`);
  }

  getTopRatedMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.url}/movie/top_rated?api_key=${this.apiKey}`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/movie/${id}?api_key=${this.apiKey}&append_to_response=credits`);
  }

  getPerson(id: number): Observable<Person> { 
    return this.http.get<any>(`${this.url}/person/${id}?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: number): Observable<MovieResponse> { 
    return this.http.get<any>(`${this.url}/movie/${id}/credits?api_key=${this.apiKey}`);
  }

  getUpcomingMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.url}/movie/upcoming?api_key=${this.apiKey}`);
  }

  searchMovies(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.url}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }
}
