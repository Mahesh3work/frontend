import { Component } from '@angular/core';
import { MatModule } from '../../appModules/mat/mat.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SiteService } from '../../services/site.service';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../services/device.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceUrlValidator } from '../../shared/validators/device-url.validator';



@Component({
  selector: 'app-device-dialog',
  imports: [MatModule,CommonModule],
  templateUrl: './device-dialog.component.html',
  styleUrl: './device-dialog.component.css'
})
export class DeviceDialogComponent {
 deviceForm!: FormGroup;
  siteList : { site_id: number, name: string }[] = [] 

  constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private siteService: SiteService,
    private DeviceService: DeviceService,
    private deviceUrlValidator: DeviceUrlValidator,
    public dialogRef: MatDialogRef<DeviceDialogComponent>) {
    this.getsite();
  }

 ngOnInit(): void {
    
  this.deviceForm = this.fb.group({
      designInfo: this.fb.group({
        version: ['NA'],
        hardware: ['NA'],
        database: ['NA'],
        os: ['NA'],
        url: ['NA']
      }),

      salesInfo: this.fb.group({
        salesDate: ['NA'],
        customerName: ['NA'],
        orderNumber: ['NA'],
        quantityOrdered: ['1'],
        invoiceNumber: ['NA'],
        deliveryDate: ['NA'],
        salesperson: ['NA'],
        price: ['1'],
        remarks: ['NA']
      }),

      productionInfo: this.fb.group({
        serialNumber: ['NA'],
        productName: ['NA'],
        status: ['Completed']
      }),

      site_id: ['NA'],
      expiry_date: ['NA']
    });
  
    // this.deviceForm = this.fb.group({
    //   device_name: ['', Validators.required],
    //   device_url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)],[this.deviceUrlValidator.validateUrl()]],
    //   site_id: ['', Validators.required]
    // });
  }

onSubmit(): void {
    if (this.deviceForm.valid) {
      

        const formValue = this.deviceForm.value;

  // 👉 convert expiry_date to MySQL format
  const dt = formValue.expiry_date;

  if (dt && !isNaN(new Date(dt).getTime())) {
    const d = new Date(dt);

    formValue.expiry_date =
      d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0') + ' ' +
      String(d.getHours()).padStart(2, '0') + ':' +
      String(d.getMinutes()).padStart(2, '0') + ':00';
  } else {
    formValue.expiry_date = null; // or keep empty
  }

        const payload = this.deviceForm.value;
      console.log('Payload:', payload);
      
      this.DeviceService.addDevice(payload).subscribe({
        next: (res: any) => {
          console.log('Device Added:', res);
          this.deviceForm.reset();
          // close dialog and return created device (or true)
          this.dialogRef.close(res || true);
        },
        error: (err) => {
          console.error('Add device failed', err);
          // keep dialog open so user can retry; optionally show error
        }
      });
      
    }
  }
  
  getsite() {
    this.siteService.getSites().subscribe((res: any) => {
      this.siteList = res.data.map((site: any) => ({ site_id: site.id, name: site.name }));
    });
  }

}