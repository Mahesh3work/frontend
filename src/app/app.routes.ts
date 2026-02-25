import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { SiteComponent } from './site/site.component';
import { DevicesComponent } from './devices/devices.component';
import { roleGuard } from './guards/role.guard';
import { BoardcompComponent } from './boardcomp/boardcomp.component';
import { HadctComponent } from './components/hadct/hadct.component';
import { ClientComponent } from './client/client.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full' },
      { path: 'board', component: BoardcompComponent },

      {
        path: 'organizations',
        component: OrganizationsComponent,
        canActivate: [roleGuard],
        data: { roles: ['SUPER','PRODUCTION','DESIGN','SALES'] }
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard],
        data: { roles: ['SUPER', 'PRODUCTION','DESIGN','SALES'] }
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [roleGuard],
        data: { roles: ['SUPER', 'PRODUCTION','DESIGN','SALES'] }
      },
      {
        path: 'sites',
        component: SiteComponent,
        canActivate: [roleGuard],
        data: { roles: ['SUPER', 'PRODUCTION','DESIGN','SALES','CLIENT_ADMIN','CLIENT_OPERATOR'] }
      },
      {
        path: 'devices',
        component: DevicesComponent,
        canActivate: [roleGuard],
        data: { roles: ['SUPER', 'PRODUCTION','DESIGN','SALES','CLIENT_ADMIN','CLIENT_OPERATOR'] }
      },
      {
        path: 'forms',
        component: HadctComponent   
      }
    ]
  }
];
