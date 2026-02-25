import { Injectable } from '@angular/core';
import { Organization } from '../models/organization.model';
import { Site } from '../models/site.model';
import { Device } from '../models/device.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class MockBackendService {
  private organizations: Organization[] = [
  { id: 'org1', name: 'Acme Corp', description: 'Demo org', created_at: new Date().toISOString() },
  { id: 'org2', name: 'Beta LLC', description: 'Second org', created_at: new Date().toISOString() },
  { id: 'org3', name: 'Gamma Inc', description: 'Third org', created_at: new Date().toISOString() },
  { id: 'org4', name: 'Delta Co', description: 'Fourth org', created_at: new Date().toISOString() }
  ];

  private sites: Site[] = [
  { id: 'site1', organization_id: 'org1', name: 'HQ', location: 'NY', created_at: new Date().toISOString() },
  { id: 'site2', organization_id: 'org1', name: 'Remote Site', location: 'CA', created_at: new Date().toISOString() },
  { id: 'site3', organization_id: 'org2', name: 'Beta HQ', location: 'TX', created_at: new Date().toISOString() },
  { id: 'site4', organization_id: 'org3', name: 'Gamma Plant', location: 'FL', created_at: new Date().toISOString() }
  ];

  private devices: Device[] = [
  { id: 'dev1', site_id: 'site1', name: 'Camera 1', type: 'camera', status: 'online', cloudflare_url: '', last_seen: new Date().toISOString() },
  { id: 'dev2', site_id: 'site1', name: 'Sensor A', type: 'sensor', status: 'offline', cloudflare_url: '', last_seen: new Date().toISOString() },
  { id: 'dev3', site_id: 'site2', name: 'Camera 2', type: 'camera', status: 'online', cloudflare_url: '', last_seen: new Date().toISOString() },
  { id: 'dev4', site_id: 'site3', name: 'Gateway', type: 'gateway', status: 'unknown', cloudflare_url: '', last_seen: new Date().toISOString() }
  ];

  private users: User[] = [
  { id: 'u1', username: 'superadmin', role: 'super' },
  { id: 'u2', username: 'org1_admin', role: 'admin', organization_id: 'org1' },
  { id: 'u3', username: 'org1_ops', role: 'supervisor', organization_id: 'org1' },
  { id: 'u4', username: 'org2_admin', role: 'admin', organization_id: 'org2' },
  { id: 'u5', username: 'org3_ops', role: 'supervisor', organization_id: 'org3' }
  ];

  // Organizations
  listOrganizations(): Organization[] { return this.organizations; }
  getOrganization(id: string) { return this.organizations.find(o => o.id === id); }

  // Sites
  listSitesForOrg(orgId: string) { return this.sites.filter(s => s.organization_id === orgId); }

  // Devices
  listDevicesForSite(siteId: string) { return this.devices.filter(d => d.site_id === siteId); }

  // Users
  findUserByUsername(username: string) { return this.users.find(u => u.username === username); }
  listUsersForOrg(orgId: string) { return this.users.filter(u => u.organization_id === orgId); }
}
