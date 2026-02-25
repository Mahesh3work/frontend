export type Role = 'super' | 'admin' | 'supervisor' | 'user';

export interface User {
  id: string;
  organization_id?: string; // super user may not belong to a specific org
  username: string;
  role: Role;
  created_at?: string;
}

