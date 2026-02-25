import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

   private authUrl = environment.authUrl

  constructor(private http: HttpClient) { }

  addOrganization(org_name: any) {
    return this.http.post(`${this.authUrl}/organization`,  
    {org_name: org_name},
      {withCredentials: true});
  }

  getOrganizations() {
    return this.http.get(`${this.authUrl}/organization`, {withCredentials: true});
  }

  deleteOrganization(org_id: number) {
    return this.http.delete(
      `${this.authUrl}/organization`,
      {
        body: { org_id },
        withCredentials: true
      }
    );
  }

  updateOrganization(org_id: number, org_name: any) {
    return this.http.put(`${this.authUrl}/organization`,  
    {org_id: org_id, org_name: org_name},
      {withCredentials: true});
  }

}
