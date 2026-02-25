import { Component, signal, inject, OnInit } from '@angular/core';
import { MatModule } from '../appModules/mat/mat.module';
import { RouterOutlet, RouterLink, RouterLinkActive ,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule,RouterOutlet,SidebarComponent,HeaderComponent,MatModule,MatMenuModule, RouterOutlet,CommonModule,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  sidebarOpen = signal(false);
  isMobile = signal(false);
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private router : Router){

  }
  ngOnInit(): void {
      this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile.set(result.matches);
      this.sidebarOpen.set(!result.matches);
    });
  }

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value);
  }
    closeSidebar() {
    if (this.isMobile()) {
      this.sidebarOpen.set(false);
    }
  }

  // signals for sidebar state
  // isMobile = false;
  userRole:string = localStorage.getItem('user_role') || '';
  userName: string = localStorage.getItem('username') || 'User';
  logout(){
    localStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
