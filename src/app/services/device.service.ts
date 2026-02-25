import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private authUrl = environment.authUrl

  constructor(private http: HttpClient) { }

addDevice(formData: any) {
  return this.http.post(`${this.authUrl}/adddevice`, formData, {
    withCredentials: true
  });
}

getDevices():Observable<any[]> {
  return this.http.get<any[]>(`${this.authUrl}/devices`, {
    withCredentials: true
  });
}
getDevicebyId(deviceId: number) {
  return this.http.get(`${this.authUrl}/devices/${deviceId}`, {
    withCredentials: true
  });
}
  updateDevice(deviceId: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.authUrl}/devices/${deviceId}`,
      payload,
      {
        withCredentials: true // if using JWT cookies
      }
    );
  }
getdeviceStatus(url:string) {
  return this.http.get(`${url}/status`, {
    withCredentials: false
  });
}

deleteDevice(deviceId: number) {
  return this.http.delete(`${this.authUrl}/devices/${deviceId}`, {
    withCredentials: true
  });   
}

 getDeviceData( device_id: number): Observable<any> {
    return this.http.get<any[]>(`${this.authUrl}/${device_id}/stream-device-data`);
  }

}
