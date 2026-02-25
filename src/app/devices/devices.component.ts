import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatModule } from '../appModules/mat/mat.module';
import { DeviceDialogComponent } from './device-dialog/device-dialog.component';
import { DeviceService } from '../services/device.service';
import { SiteService } from '../services/site.service';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [CommonModule, MatModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit {

  displayedColumns: string[] = ['name','site_name','current_count','target','part_name','status', 'actions'];
  // devices: { device_id: number; device_name: string; }[] = [];

  siteId: number | null = null; // Current site ID
  siteDetails: any = {}; // Site details
  devices: any[] = []; // List of devices
  allDeviceData: any = {}; // Device data
  isAddDeviceFormVisible = false; // Controls the form visibility
  dropdownOpen: { [key: number]: boolean } = {};
  isAnalyticsView = localStorage.getItem('isAnalyticsView') === 'true';
  analyticsData: any[] = [];
  todayDate: string = new Date().toLocaleDateString();
  todayDatetime: Date = new Date();

  constructor(
    private dialog: MatDialog,
    private deviceService: DeviceService,
    private siteService: SiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.loadDevices();
    this.fetchDevices();
  }

 

  addDevice() {
    // const ref = this.dialog.open(DeviceDialogComponent, {
    //   width: '500px'
    // });

    // ref.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadDevices();
    //   }
    // });
    this.router.navigate(['/dashboard/forms']);
  }

  editDevice(id: any) {
    // const ref = this.dialog.open(DeviceDialogComponent, {
    //    width: '90vw',     // full width
    // maxWidth: '95vw',  // override Angular default 80%
    //   height: '90vh',
    //   data: device
    // });

    // ref.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadDevices();
    //   }
    // });
    console.log(id);
    this.router.navigate(['/dashboard/forms'],{
      state: { deviceId: id }
    });
    

  }

  deleteDevice(id: any) {
    if (!confirm(`Delete device `)) return;

    this.deviceService.deleteDevice(id).subscribe(() => {
      this.fetchDevices();
    });
  }

fetchDevices() {
  this.deviceService.getDevices().subscribe({
    next: (response: any[]) => {
      console.log('Devices:', response);
      this.devices = response.map(d => ({
        ...d,
        expiry_date: d?.expiry_date
            ? new Date(d.expiry_date)
            : null,
        // device: {
        //   ...d.device,
        //   expiry_date: d.device?.expiry_date
        //     ? new Date(d.device.expiry_date)
        //     : null
        // },

        // device data defaults
        status: 'loading',
        part_name: '—',
        target: 0,
        current_count: 0
      }));
      // load device data AFTER UI renders
      setTimeout(() => this.loadDeviceData(), 0);
        this.refreshDataTimer();
    },
    error: err => {
      console.error('Error fetching devices', err);
    }
  });
}

loadDeviceData() {
  this.devices.forEach(device => {
    const id = device.id;
    this.deviceService.getDeviceData(id).subscribe({
      next: (data: any) => {
        device.current_count = data.current_count;
        device.target = data.target;
        device.part_name = data.part_name;
        device.status = 'online';
      },
      error: () => {
        device.status = 'offline';
      }
    });
  });
}


  refreshData() {
  this.devices.forEach(device => {
    if (device.status === 'offline') return; // optional optimization

    const id = device.device.device_id;
    this.deviceService.getDeviceData(id).subscribe({
      next: data => {
        device.current_count = data.current_count;
        device.target = data.target;
        device.status = 'online';
      },
      error: () => {
        device.status = 'offline';
      }
    });
  });
}

  // refresh device data every 5 seconds
  refreshDataTimer() {
    setInterval(() => this.refreshData(), 20000);
  }

}
