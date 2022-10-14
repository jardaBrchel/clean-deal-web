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
  days: CleanerAvailableDay[];
}

export interface CleanerAvailableDay {
  date: string; // yyyy-mm-dd
  from: number;
  to: number;
}

// MOCKS

export const TimesMock = [
  {
    name: 'Test',
    days: [
      {
        date: '2022-10-18',
        from: 8,
        to: 16,
      }
    ]
  }
]
