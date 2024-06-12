import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'b3edb8667c4b58c6c568c1046533ee7c';

  constructor(private http: HttpClient) {}

  getRequestToken(): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`);
  }

  getAccessToken(requestToken: string): Observable<any> {
    const body = { request_token: requestToken };
    return this.http.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apiKey}`, body);
  }

  getAccountId(sessionId: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/account?api_key=${this.apiKey}&session_id=${sessionId}`);
  }

  storeSession(sessionId: string, accountId: string): void {
    localStorage.setItem('sessionId', sessionId);
    localStorage.setItem('accountId', accountId);
  }

  getSessionId(): string | null {
    return localStorage.getItem('sessionId');
  }

  getAccountIdFromStorage(): string | null {
    return localStorage.getItem('accountId');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error);
    return throwError('Something went wrong. Please try again later.');
  }
}
