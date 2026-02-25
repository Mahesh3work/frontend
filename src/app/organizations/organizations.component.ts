import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationDialogComponent } from './organization-dialog/organization-dialog.component';
import { OrganizationService } from '../services/organization.service';
import { MatModule } from '../appModules/mat/mat.module';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [MatModule,CommonModule,MatCheckbox,MatPaginator,MatSort],
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent implements OnInit {

  
  displayedColumns: string[] = [];
  userRole: string = '';
  dataSource = new MatTableDataSource<any>([]);
  selectedIds: number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('user_role') || '';
    this.displayedColumns = 
      this.userRole === 'SUPER'
      ? ['name', 'actions']
      : ['name']
  
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.organizationService.getOrganizations().subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  toggleOne(id: number) {
    this.selectedIds = this.selectedIds.includes(id)
      ? this.selectedIds.filter(x => x !== id)
      : [...this.selectedIds, id];
  }

  toggleAll() {
    this.selectedIds =
      this.selectedIds.length === this.dataSource.data.length
        ? []
        : this.dataSource.data.map(o => o.org_id);
  }

  isAllSelected() {
    return this.selectedIds.length === this.dataSource.data.length;
  }

  isIndeterminate() {
    return this.selectedIds.length > 0 && !this.isAllSelected();
  }

  bulkDelete() {
    console.log('Delete ids:', this.selectedIds);
  }

  addOrganization() {
    const dialogRef = this.dialog.open(OrganizationDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrganizations();   // ✅ reload AFTER dialog closes
      }
    });
    
  }

  deleteOrganization(id: number) {
    this.organizationService.deleteOrganization(id).subscribe(() => {
      this.loadOrganizations();
    });
  }

  editOrganization(org: any) {
    console.log(org)
    const dialogRef =this.dialog.open(OrganizationDialogComponent, {
      width: '300px',
      data: org,
    });
       dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadOrganizations();   // ✅ reload AFTER dialog closes
    }
  });
  }
}
