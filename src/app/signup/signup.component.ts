import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';
import { RolesService } from '../services/roles.service';
import { ClientService } from '../services/client.service';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule,CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
})
export class SignupComponent implements OnInit {

   registerForm!: FormGroup;

  organizations: any[] = [];
  clients: any[] = [];
  roles: any[] = [];

 
 
  orgList : { org_id: number, name: string }[] = [];
  roleList : { role_id: number, role_name: string }[] = [];

  constructor(private router: Router,
     private authService: AuthService, 
     private organizationService: OrganizationService,
     private rolesService: RolesService,
     private ClientService: ClientService,
    private fb: FormBuilder) {
    // this.getalloraganization()
    // this.getallroles()
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      orgid: ['', Validators.required],
      clientid: ['',Validators.required],
      role_id: ['', Validators.required]
    });

    this.loadOrganizations();
    this.loadClients();
    this.loadRoles();
  }

  loadOrganizations() {
    this.organizationService.getOrganizations().subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.organizations = res;
      }
    });
  }

  loadClients() {
    this.ClientService.getClient().subscribe((res: any) => {
      if (res.success) {
        this.clients = res.data;
      }
    });
  }

  loadRoles() {
    this.rolesService.getRoles().subscribe((res: any) => {
      if (res) {
        this.roles = res;
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
        const formValue = {
      ...this.registerForm.value,
      clientid: this.registerForm.value.clientid || null
    };
       this.authService.signup(formValue).subscribe({
      next: (res) => {
        console.log('User Registered', res);
        this.registerForm.reset();
      },
      error: (err) => {
        console.error('Registration Failed', err);
      }
    });
  }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  getalloraganization(){
    this.organizationService.getOrganizations().subscribe((res : any ) => {
      this.orgList = res.orgs.map((org:any) => ({org_id: org.org_id, name: org.name}));
    })
  }
  getallroles(){
    this.rolesService.getRoles().subscribe((res : any ) => {
      this.roleList = res.map((roles:any) => ({role_id: roles.role_id, role_name: roles.role_name}));
    })
  }
}
