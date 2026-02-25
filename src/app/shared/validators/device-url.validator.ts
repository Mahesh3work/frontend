// device-url.validator.ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { DeviceService } from '../../services/device.service';

@Injectable({ providedIn: 'root' })
export class DeviceUrlValidator {
  constructor(private http: HttpClient, private deviceService: DeviceService) {}

  validateUrl(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null); // required validator will handle empty
      }

      let url = control.value.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return of({ invalidUrl: true });
      }

      return this.http.get<any>(`${url}/status`).pipe(
        map(res => (res?.status === 'online' ? null : { deviceOffline: true })),
        catchError(() => of({ unreachable: true }))
      );
      
    };
  }
}
