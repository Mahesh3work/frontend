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

import { ClientService } from '../services/client.service';
import { ClienDialogComponent } from './clien-dialog/clien-dialog.component';

@Component({
  selector: 'app-client',
  imports: [
    CommonModule,

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
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {


   displayedColumns: string[] = ['name', 'actions'];
    dataSource = new MatTableDataSource<any>([]);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private dialog: MatDialog,
      private ClientService: ClientService
    ) {}
  
    ngOnInit(): void {
      this.getClient();
    }
  
    getClient() {
      this.ClientService.getClient().subscribe((res: any) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  
    applyFilter(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      this.dataSource.filter = value.trim().toLowerCase();
    }
  
    addclient() {
      this.dialog.open(ClienDialogComponent, {
        width: '600px'
      }).afterClosed().subscribe(result => {
        if (result) this.getClient();
      });
    }
  
    // editSite(site: any) {
    //   this.dialog.open(SiteDialogComponent, {
    //     width: '600px',
    //     data: site
    //   }).afterClosed().subscribe(result => {
    //     if (result) this.getSites();
    //   });
    // }
  
    deleteClient(client: any) {
      debugger;
      const ok = confirm(`Delete site "${client.name}"?`);
      if (!ok) return;
  
      this.ClientService.deleteClient(client.id).subscribe(() => {
        this.getClient();
      });
    }

}
