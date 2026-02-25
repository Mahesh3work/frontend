import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false; 
  private authUrl = environment.authUrl
  public accessToken: undefined | string; 
  public refreshToken: undefined | string;
  public username: undefined | string;
  public userId: undefined | string;
  public role: undefined | string;

  constructor(private http: HttpClient) { }

  // Method to log in the user
  login(name: string, password: string) {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, { name, password }, {
      withCredentials: true, // Ensure cookies are included in the request
    });
  }

  tokenRefresh() {
    return this.http.post<LoginResponse>(`${this.authUrl}/refresh`, {}, {
      withCredentials: true, // Ensure cookies are included in the request  
    });
  }

  getTokenExpirationDate(): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/token-expiration`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 && error.error?.error === 'token_expired') {
      console.log('Token has expired. Redirecting to login...');
      // Handle token expiration (e.g., redirect to login, refresh token, etc.)
    }
    return throwError(() => error);
  }

  // Method to log out the user
  logout() { 
    return this.http.post(`${this.authUrl}/logout`, {}, {withCredentials: true})
  }

  // Method to check login status
  getLoginStatus() {
    return this.isLoggedIn;
  }

  getUserRole(): string | undefined {
    return this.role || localStorage.getItem('user_role') || undefined;
  }

  signup(data: any) {
    return this.http.post(`${this.authUrl}/register`, {
      "orgid": data.orgid,
      "name": data.name,
      "password": data.password,
      "clientid": data.clientid,
      "role_id": data.role_id
    },{withCredentials: true});
  }
}



export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  username: string;
  role_name: string;
}
