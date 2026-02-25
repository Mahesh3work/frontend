import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteService } from '../../services/site.service';
import { DeviceService } from '../../services/device.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hadct',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './hadct.component.html',
  styleUrl: './hadct.component.css'
})
export class HadctComponent implements OnInit {

    deviceForm!: FormGroup;
    siteList : { site_id: number, name: string }[] = [] 
    deviceId: number | null = null;
    errorMessage: string = '';
    isSubmitting: boolean = false;

     constructor(private fb: FormBuilder, private siteService: SiteService, private DeviceService: DeviceService,private router: Router) {
    
       
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

      site_id: [null],
      expiry_date: ['NA']
    });
   
      const data = history.state;
      // console.log(data.deviceId); 
      // this.getsite();
      // if(data.deviceId){
      //   this.deviceId=data.deviceId
      //    this.loadDevice(data.deviceId)
      // }
       this.siteService.getSites().subscribe((res: any) => {

    this.siteList = res.sites.map((site: any) => ({
      site_id: Number(site.id),
      name: site.name
    }));

    // ✅ Load device ONLY after sites are ready
    if (data.deviceId) {
      this.deviceId = data.deviceId;
      this.loadDevice(data.deviceId);
    }
  });

  }
  onSubmit(): void {

    if (!this.deviceForm.valid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.deviceForm.value;

    // Convert expiry date to MySQL format
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
      formValue.expiry_date = null;
    }

    const payload = formValue;
    if(!this.deviceId){
      this.DeviceService.addDevice(payload).subscribe({

      next: (res: any) => {
            this.isSubmitting = false;

        alert('Device added successfully!');
        
     
        this.router.navigate(['/dashboard/devices']);
      },

      error: (err:any) => {
        this.isSubmitting = false;

        console.error('Add device failed:', err);

        
        const message =
          err?.error?.error ||
          err?.error?.message ||
          'Failed to add device. Please try again.';

        alert(message);
      }
    });
    }else{
      this.DeviceService.updateDevice(this.deviceId, formValue).subscribe({
  next: (res: any) => {
    alert("Device updated successfully!");
    this.router.navigate(['/dashboard/devices']);
  },
  error: (err: any) => {
    const message =
      err?.error?.error ||
      err?.error?.message ||
      'Failed to add device. Please try again.';
    
    alert(message);
  }
});
    }
    
  }
  

    getsite() {
    this.siteService.getSites().subscribe((res: any) => {
      
      this.siteList = res.sites.map((site: any) => ({ site_id: site.id, name: site.name }));
      console.log(this.siteList)
    });
  }
  
  loadDevice(deviceId: number): void {

  this.DeviceService.getDevicebyId(deviceId).subscribe({

    next: (res: any) => {
      console.log('Device data:', res);
      console.log(typeof res.device?.site_id);
      console.log(this.siteList);
      this.deviceForm.patchValue({

         designInfo: {
            version: res.designInfo?.version,
            hardware: res.designInfo?.hardware,
            database: res.designInfo?.database,
            os: res.designInfo?.os,
            url: res.designInfo?.url
          },

          salesInfo: {
          salesDate: res.salesInfo?.salesDate,
          customerName: res.salesInfo?.customerName,
          orderNumber: res.salesInfo?.orderNumber,
          quantityOrdered: res.salesInfo?.quantityOrdered,
          price: res.salesInfo?.price,
          remarks: res.salesInfo?.remarks,
          invoiceNumber: res.salesInfo?.invoiceNumber,
          deliveryDate: res.salesInfo?.deliveryDate,
          salesperson: res.salesInfo?.salesperson
        },
        productionInfo: {
          serialNumber: res.productionInfo?.serialNumber,
          productName: res.productionInfo?.productName,
          status: res.productionInfo?.status
        },
          
        
        site_id: Number(res.device?.site_id),

        expiry_date: this.formatForDatetimeLocal(
          res.device?.expiry_date
        )

      });
    },

    error: (err: any) => {
      console.error('Fetch failed:', err);

      alert('Failed to load device');

      this.router.navigate(['/dashboard/devices']);
    }
  });
}
formatForDatetimeLocal(dateStr: string): string {

  if (!dateStr) return '';

  const d = new Date(dateStr);

  return d.toISOString().slice(0, 16);
}


}
