import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = environment.authUrl

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.authUrl}/user`, {withCredentials: true});
  }
}
