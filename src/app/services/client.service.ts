import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private authUrl = environment.authUrl
  constructor(private http: HttpClient) { }

  getClient() {
  return this.http.get(`${this.authUrl}/client`, {
    withCredentials: true
  });


}
  addClient(formData: any){
    return this.http.post(`${this.authUrl}/client`, formData, {withCredentials: true});
  }

  deleteClient(clientId: number) {
    return this.http.delete(`${this.authUrl}/client`, {
      body: { client_id: clientId },
      withCredentials: true
    });
  }

}