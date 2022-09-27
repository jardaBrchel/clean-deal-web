export interface AdminUser {
  username?: string;
  roles?: string;
}

export interface Cleaner {
  cleanerId: string;
  name: string;
  mo?: string;
  tu?: string;
  we?: string;
  th?: string;
  fr?: string;
  sa?: string;
  su?: string;
}
