import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK,} from 'angular-calendar';
import {addHours, startOfDay,} from 'date-fns';
import {CalendarColors} from './colors.config';
import {CustomDateFormatter} from './custom-date-formatter.provider';
import {Client} from '../../../models/client.model';
import {AdminOrder} from '../../../models/admin.model';

@Component({
  selector: 'app-events-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class EventsCalendarComponent implements OnInit {
  @Input() cleanings: AdminOrder[] = [];
  @Input() vacations: any[] = [];
  view: CalendarView = CalendarView.Week;
  locale: string = 'cs';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.mapCleanings();
    this.mapVacations();
  }

  mapCleanings() {
    const events = this.cleanings.map(c => ({
      start: addHours(startOfDay(new Date(c.cleaningDate)), Number(c.cleaningTime)),
      end: addHours(startOfDay(new Date(c.cleaningDate)), Number(c.cleaningTime) + (c.cleaningDuration / c.cleanersCount)),
      title: 'Úklid ' + c.orderId,
      color: {...CalendarColors['blue']},
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      cssClass: 'cleaning',
    } as CalendarEvent))

    this.events = [...this.events, ...events];
  }

  mapVacations() {
    console.log('this.vacations', this.vacations);
    const events = this.vacations.map(c => ({
      start: addHours(startOfDay(new Date(c.vacationDate)), Number(c.from)),
      end: addHours(startOfDay(new Date(c.vacationDate)), Number(c.to)),
      title: 'Dovolená',
      color: {...CalendarColors['orange']},
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      cssClass: 'cleaning',
    } as CalendarEvent))

    this.events = [...this.events, ...events];
  }

  handleEvent(action: string, event: CalendarEvent): void {
  }

  changeDate(date: Date) {
    this.viewDate = date;
  }

}
