import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
   
  private authUrl = environment.authUrl

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get(`${this.authUrl}/role`, {withCredentials: true});
  }
}
