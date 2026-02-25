import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,

    /* Material */
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'role',
    'actions'
  ];
roles = [
  { role_id: 1, role_name: 'SUPER' },
  { role_id: 2, role_name: 'PRODUCTION' },
  { role_id: 3, role_name: 'DESIGN' },
  { role_id: 4, role_name: 'SALES' },
  { role_id: 5, role_name: 'CLIENT_ADMIN' },
  { role_id: 6, role_name: 'CLIENT_OPERATOR' }
];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  addUser() {
    this.dialog.open(SignupComponent, {
      width: '600px'
    }).afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: any) {
    this.dialog.open(SignupComponent, {
      width: '600px',
      data: user
    }).afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(user: any) {
    const ok = confirm(`Delete user "${user.username}"?`);
    if (!ok) return;

    // this.userService.deleteUser(user.id).subscribe(() => {
    //   this.loadUsers();
    // });
  }
  
  getRoleName(roleId: number): string {
  const role = this.roles.find(r => r.role_id === roleId);
  return role ? role.role_name : 'Unknown';
}
}
