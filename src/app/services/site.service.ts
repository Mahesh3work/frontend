import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private authUrl = environment.authUrl

  constructor(private http: HttpClient) { }

addSite(formData: any) {
  return this.http.post(`${this.authUrl}/sites`, formData, {
    withCredentials: true
  });
}

getSites() {
  return this.http.get(`${this.authUrl}/sites`, {
    withCredentials: true
  });

}

getDevicesBySiteId(siteId: number): Observable<any> {
    return this.http.get(`${this.authUrl}/device/${siteId}`, {withCredentials: true});
  }

deleteSite(siteId: number) {
  return this.http.delete(`${this.authUrl}/sites`, {
    body: { site_id: siteId },
    withCredentials: true
  });
}

}