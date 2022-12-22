export interface OrderMultiplicators {
  frequency?: number,
  cleaningType?: number,
  dirty?: number,
}

export interface SummaryPriceItem {
  name: string;
  price: string;
}

export interface AvailableTimesResItem {
  name: string;
  cleanerId: string;
  oddEvenWeeks: boolean;
  days: CleanerAvailableDay[];
}

export interface AvailableTimesRes {
  cleaners: AvailableTimesResItem[];
}

export interface CleanerAvailableDay {
  date: string; // yyyy-mm-dd
  from: number;
  to: number;
  offHours?: number[];
  cleanerId?: string;
}

export const ExtrasMap = [
  {
    id: 'windows',
    label: 'Okna',
    units: `m<sup>2</sup>`
  },
  {
    id: 'windowBlinds',
    label: 'Žaluzie',
    units: `m<sup>2</sup>`
  },
];

// MOCKS

export const TimesMock = [
  {
    name: 'Test',
    days: [
      {
        date: '2022-10-18',
        from: 8,
        to: 16,
      },
      {
        date: '2022-10-23',
        from: 12,
        to: 16,
      }
    ]
  }
]
