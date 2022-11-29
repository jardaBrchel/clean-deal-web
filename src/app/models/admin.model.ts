export interface AdminUser {
  username?: string;
  roles?: string;
}

export interface Cleaner {
  cleanerId: string;
  email?: string;
  name: string;
  surname?: string;
  username: string;
  bankAccount: string;
  password?: string;
  mo?: string;
  tu?: string;
  we?: string;
  th?: string;
  fr?: string;
  sa?: string;
  su?: string;
  oddMo?: string;
  oddTu?: string;
  oddWe?: string;
  oddTh?: string;
  oddFr?: string;
  oddSa?: string;
  oddSu?: string;
  oddEvenWeeks: boolean;
  isVatFree?: boolean;
}

export enum DAYS {
  mo = 'mo',
  tu = 'tu',
  we = 'we',
  th = 'th',
  fr = 'fr',
  sa = 'sa',
  su = 'su',
}


export interface AdminOrdersRes {
  plannedOrders: AdminOrder[],
  historyOrders: AdminOrder[],
  canceledOrders: AdminOrder[],
}

export interface AdminClient {
  clientId: string;
  contactAddress: string;
  email: string;
  info: string;
  name: string;
  password: string;
  phone: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
  homes?: AdminHome[];
}

export interface AdminHome {
  homeId?: string;
  address?: string;
  bathrooms?: number;
  createdAt?: string;
  dirty?: string;
  homeType?: string;
  houseFloors?: number;
  info?: string;
  kitchens?: number;
  ownCleaningStuff?: boolean
  pets?: string;
  pscNumber?: string;
  rooms?: number
  toilets?: number
  updatedAt?: string;
  yardage?: string;
  city?: string;
  homeInfo?: string;
  client?: AdminClient;
}

export interface AdminOrder {
  orderId: number
  cleanersCount: number;
  cleaningDate: string;
  cleaningDuration: number;
  cleaningTime: string;
  cleaningType: string;
  clientId: string;
  comments: string;
  frequency: string;
  homeId: string;
  isConfirmed: boolean
  isPaid: boolean
  price: number;
  createdAt: string;
  updatedAt: string
  extras?: string;
  clientName?: string;
  homeName?: string;
  variableSymbol?: string;
  paymentMethod?: string;
}

export interface CleanerPlannedOrder extends AdminOrder {
  home: AdminHome;
}

export enum PAGE_TYPE {
  ORDER = 'order',
  CLIENT = 'client',
  HOME = 'home',
}

export interface OrderDataRes {
  order: AdminOrder,
  home: AdminHome,
  client: AdminClient,
  cleaner: Cleaner[],
}
