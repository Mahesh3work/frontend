import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, MatButtonModule, RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 
userRole = (localStorage.getItem('user_role') || '').trim();
  isOpen = input(false);
  navClick = output<void>();
  sidebarToggle = output<void>();

  isCollapsed = signal(false);

  onNavClick() {
    this.navClick.emit();
  }

  toggleSidebar() {
    this.isCollapsed.update((value) => !value);
    this.sidebarToggle.emit();
  }

  
}
