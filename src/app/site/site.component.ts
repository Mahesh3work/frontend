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

import { SiteService } from '../services/site.service';
import { SiteDialogComponent } from './site-dialog/site-dialog.component';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-site',
  standalone: true,
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
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {

  displayedColumns: string[] = ['name', 'clientname' ,'actions'];
  dataSource = new MatTableDataSource<any>([]);

  clients: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private siteService: SiteService,
    private ClientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getSites();
    this.getClient()
  }

  getSites() {
    this.siteService.getSites().subscribe((res: any) => {
      this.dataSource.data = res.sites;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  addSite() {
    this.dialog.open(SiteDialogComponent, {
      width: '600px'
    }).afterClosed().subscribe(result => {
      if (result) this.getSites();
    });
  }

  editSite(site: any) {
    this.dialog.open(SiteDialogComponent, {
      width: '600px',
      data: site
    }).afterClosed().subscribe(result => {
      if (result) this.getSites();
    });
  }

  deleteSite(site: any) {
    debugger;
    const ok = confirm(`Delete site "${site.name}"?`);
    if (!ok) return;

    this.siteService.deleteSite(site.id).subscribe(() => {
      this.getSites();
    });
  }

  getClient(){
     this.ClientService.getClient().subscribe((res: any) => {
      this.clients = res.data.map((client: any) => ({ id: client.id, name: client.name }));
      console.log(this.clients)
    })
  }
  getClientNamebyId(id: number) {
    return this.clients.find((client: any) => client.id === id)?.name || 'Unknown';
}
}