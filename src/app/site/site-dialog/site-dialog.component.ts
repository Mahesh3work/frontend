import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatModule } from '../../appModules/mat/mat.module';
import { SiteService } from '../../services/site.service';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-site-dialog',
  imports: [MatModule, CommonModule],
  templateUrl: './site-dialog.component.html',
  styleUrls: ['./site-dialog.component.css']
})
export class SiteDialogComponent implements OnInit {

  siteForm!: FormGroup;
  client: { id: number, name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private ClientService: ClientService,
    private dialogRef: MatDialogRef<SiteDialogComponent>
  ) {}

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      site_name : ['', Validators.required],
      // location: ['', Validators.required],
      client_id : ['', Validators.required]
    });
    this.getallclient();

  }

  onSubmit(): void {
    if (this.siteForm.valid) {
      const formData = {
        ...this.siteForm.value,
        
      };
      console.log('Form Data:', formData);

      this.siteService.addSite(formData).subscribe({
        next: (res: any) => {
          console.log('Site Added:', res);
          this.siteForm.reset();
          // close dialog and return created site (or true)
          this.dialogRef.close(res || true);
        },
        error: (err) => {
          console.error('Add site failed', err);
          // keep dialog open so user can retry; optionally show error
        }
      });

    }

  }

  getallclient(){
    this.ClientService.getClient().subscribe((res : any ) => {
      this.client = res.data.map((c:any) => ({id: c.id, name: c.name}));
    })
  }
}
