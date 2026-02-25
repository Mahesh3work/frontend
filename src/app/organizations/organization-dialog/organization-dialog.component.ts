import { Component } from '@angular/core';
import { MatModule } from '../../appModules/mat/mat.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { OrganizationService } from '../../services/organization.service';
@Component({
  selector: 'app-organization-dialog',
  imports: [MatModule, CommonModule],
  templateUrl: './organization-dialog.component.html',
  styleUrl: './organization-dialog.component.css',
})
export class OrganizationDialogComponent {
  orgForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrganizationDialogComponent>,
    private OrganizationService: OrganizationService,
    @Inject(MAT_DIALOG_DATA) public data: any, // pass data form parent to dialog
  ) {

    this.isEditMode = !!data;
    // Initialize form
    this.orgForm = this.fb.group({
      org_id: [data?.id || null],
      name: [data?.name || '', Validators.required],
      // address: [data?.address || '', Validators.required],
      // website_url: [data?.website_url || '', Validators.required],
      // logo_url: [data?.logo_url || ''],
    });
    console.log("dialog data org",data)
  }

  // save() {
  //   if (this.orgForm.valid) {
  //     this.dialogRef.close(this.orgForm.value); // Return form data to parent
  //     debugger;
  //     console.log('Organization data:', this.orgForm.value);
  //     this.OrganizationService.addOrganization(this.orgForm.value.name).subscribe({
  //       next: (res) => {
  //         console.log('Organization added successfully', res);
  //       },
  //       error: (err) => {
  //         console.error('Error adding organization', err);
  //       },
  //     });
  //   }
  // }

   save() {
    if (!this.orgForm.valid) return;
    
    const formValue = this.orgForm.value;
    console.log("submitting:",formValue)
    if (this.isEditMode) {
      // ✅ UPDATE
      this.OrganizationService
        .updateOrganization(formValue.org_id, formValue.name)
        .subscribe({
          next: () => {
            this.dialogRef.close(true); // notify parent
          },
          error: (err) => console.error(err)
        });

    } else {
      // ✅ CREATE
      this.OrganizationService
        .addOrganization(formValue.name)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err) => console.error(err)
        });
    }
  }
  cancel() {
    this.dialogRef.close(); // Close without saving
  }
}
