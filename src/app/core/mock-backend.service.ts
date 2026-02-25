
// src/app/core/mock-backend.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class MockBackendService implements InMemoryDbService {
  createDb() {
    const organizations = [
      { id: 1, name: 'Org A', description: 'First org' },
      { id: 2, name: 'Org B', description: 'Second org' },
    ];

    const sites = [
      { id: 1, orgId: 1, name: 'Site A1' },
      { id: 2, orgId: 1, name: 'Site A2' },
      { id: 3, orgId: 2, name: 'Site B1' },
    ];

    const devices = [
      { id: 1, siteId: 1, name: 'Device 1', status: 'Running' },
      { id: 2, siteId: 2, name: 'Device 2', status: 'Stopped' },
    ];

    return { organizations, sites, devices };
  }
}
