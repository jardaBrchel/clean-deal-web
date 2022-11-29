export interface CleanerUser {
  cleanerId?: string;
  name?: string;
  surname?: string;
  username?: string;
  bankAccount?: string;
}

export const CleanerDays = [
  {
    id: 'mo',
    label: 'Pondělí',
  },
  {
    id: 'tu',
    label: 'Úterý',
  },
  {
    id: 'we',
    label: 'Středa',
  },
  {
    id: 'th',
    label: 'Čtvrtek',
  },
  {
    id: 'fr',
    label: 'Pátek',
  },
  {
    id: 'sa',
    label: 'Sobota',
  },
  {
    id: 'su',
    label: 'Neděle',
  }
]
