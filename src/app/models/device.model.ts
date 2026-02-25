export interface Device {
  id: string;
  site_id: string;
  name: string;
  type?: string;
  status?: 'online' | 'offline' | 'unknown';
  cloudflare_url?: string;
  last_seen?: string;
}
