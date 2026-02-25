import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatModule } from '../../appModules/mat/mat.module';
import { SiteService } from '../../services/site.service';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-clien-dialog',
  imports: [MatModule, CommonModule],
  templateUrl: './clien-dialog.component.html',
  styleUrl: './clien-dialog.component.css'
})
export class ClienDialogComponent implements OnInit {

  siteForm!: FormGroup;
  org: { id: number, name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private OrganizationService:OrganizationService,
    private dialogRef: MatDialogRef<ClienDialogComponent>,
    private ClientService: ClientService
  ) {}

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      client_name : ['', Validators.required],
      // location: ['', Validators.required],
      org_id : ['', Validators.required]
    });
    this.getallorg();

  }

  onSubmit(): void {
    if (this.siteForm.valid) {
      const formData = {
        ...this.siteForm.value,
        
      };
      console.log('Form Data:', formData);

      this.ClientService.addClient(formData).subscribe({
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

  getallorg(){
    this.OrganizationService.getOrganizations().subscribe((res : any ) => {
      console.log(res)
      this.org = res.map((c:any) => ({id: c.id, name: c.name}));
    })
  }
}
