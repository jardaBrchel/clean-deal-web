import {
  BATHROOM_PRICE,
  HOUSE_FLOOR_PRICE,
  KITCHEN_PRICE,
  OWN_CLEANING_STUFF_PRICE,
  ROOM_PRICE,
  TOILET_PRICE
} from './price-config';

export interface orderFormItem {
  label: string;
  id: string;
  multiplication?: number;
  addition?: number;
}


export const CLEANING_TYPES: orderFormItem[] = [
  {
    id: 'BASIC_CLEANING',
    label: 'Standardní úklid',
    multiplication: 1,
  },
  {
    id: 'GENERAL_CLEANING',
    label: 'Generální úklid',
    multiplication: 1.9,
  },
]

export const FREQUENCY: orderFormItem[] = [
  {
    id: 'ONETIME',
    label: 'Jednorázově',
    multiplication: 1,
  },
  {
    id: 'WEEKLY',
    label: 'Jednou týdně',
    multiplication: 0.8,
  },
  {
    id: 'TWICE_A_MONTH',
    label: 'Dvakrát za měsíc',
    multiplication: 0.9,
  },
]

export const HOUSE_FLOORS: orderFormItem[] = [
  {
    id: '1',
    label: '1',
    addition: HOUSE_FLOOR_PRICE,
  },
  {
    id: '2',
    label: '2',
    addition: 2 * HOUSE_FLOOR_PRICE,
  },
  {
    id: '3',
    label: '3',
    addition: 3 * HOUSE_FLOOR_PRICE,
  },
  {
    id: '4',
    label: '4',
    addition: 4 * HOUSE_FLOOR_PRICE,
  },
]

export const ROOMS: orderFormItem[] = [
  {
    id: '1',
    label: '1',
    addition: 0,
  },
  {
    id: '2',
    label: '2',
    addition: ROOM_PRICE,
  },
  {
    id: '3',
    label: '3',
    addition: 2 * ROOM_PRICE,
  },
  {
    id: '4',
    label: '4',
    addition: 3 * ROOM_PRICE,
  },
  {
    id: '5',
    label: '5',
    addition: 4 * ROOM_PRICE,
  },
  {
    id: '6',
    label: '6',
    addition: 5 * ROOM_PRICE,
  },
]

export const KITCHENS: orderFormItem[] = [
  {
    id: '1',
    label: '1',
    addition: 0,
  },
  {
    id: '2',
    label: '2',
    addition: KITCHEN_PRICE,
  },
]

export const BATHROOMS: orderFormItem[] = [
  {
    id: '1',
    label: '1',
    addition: 0,
  },
  {
    id: '2',
    label: '2',
    addition: BATHROOM_PRICE,
  },
  {
    id: '3',
    label: '3',
    addition: 2 * BATHROOM_PRICE,
  },
  {
    id: '4',
    label: '4',
    addition: 3 * BATHROOM_PRICE,
  },
]

export const TOILETS: orderFormItem[] = [
  {
    id: '0',
    label: '0',
    addition: 0,
  },
  {
    id: '1',
    label: '1',
    addition: TOILET_PRICE,
  },
  {
    id: '2',
    label: '2',
    addition: 2 * TOILET_PRICE,
  },
  {
    id: '3',
    label: '3',
    addition: 3 * TOILET_PRICE,
  },
]

export const OWN_CLEANING_STUFF: orderFormItem[] = [
  {
    id: 'yes',
    label: 'Ano',
    addition: 0,
  },
  {
    id: 'no',
    label: 'Ne',
    addition: OWN_CLEANING_STUFF_PRICE,
  },
]

export const DIRTY: orderFormItem[] = [
  {
    id: '1',
    label: 'Mírné',
    multiplication: 1,
  },
  {
    id: '2',
    label: 'Silné',
    multiplication: 1.5,
  },
]

export const HOME_TYPE_HOUSE = 'HOUSE';
export const HOME_TYPE_FLAT = 'FLAT';

export const HOME_TYPES: orderFormItem[] = [
  {
    id: HOME_TYPE_FLAT,
    label: 'Byt',
  },
  {
    id: HOME_TYPE_HOUSE,
    label: 'Dům',
  },
]


export const TIMES: any[] = [
  {
    id: '8',
    label: '8:00 - 9:00',
  },
  {
    id: '9',
    label: '9:00 - 10:00',
  },
  {
    id: '10',
    label: '10:00 - 11:00',
  },
  {
    id: '11',
    label: '11:00 - 12:00',
  },
  {
    id: '12',
    label: '12:00 - 13:00',
  },
  {
    id: '13',
    label: '13:00 - 14:00',
  },
  {
    id: '14',
    label: '14:00 - 15:00',
  },
  {
    id: '15',
    label: '15:00 - 16:00',
  },
  {
    id: '16',
    label: '16:00 - 17:00',
  },
]
