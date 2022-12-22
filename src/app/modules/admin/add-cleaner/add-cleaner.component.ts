import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';
import {CleanerDays} from '../../../models/cleaner.model';
import {getWeekNumber} from '../../../helpers/datetime.helper';
import {firstUpper} from '../../../helpers/utils';
import {CONTRACT_TYPES} from '../../../config/order-config';

@Component({
  selector: 'app-add-cleaner',
  templateUrl: './add-cleaner.component.html',
  styleUrls: ['./add-cleaner.component.scss']
})
export class AddCleanerComponent implements OnInit {
  cleanerForm: UntypedFormGroup = {} as any;
  // Is odd by default
  timesForm: UntypedFormGroup = {} as any;
  // For even weeks
  evenTimesForm: UntypedFormGroup = {} as any;
  times: any[] = [];
  cleanerDays = CleanerDays;
  currentWeek!: number;
  isWeekOdd = false;
  contractTypes = CONTRACT_TYPES;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private router: Router,
  ) {
    for (let i = 6; i <= 20; i++) {
      this.times.push({
        id: i,
      });
    }
    this.times.unshift({id: 0});

    this.currentWeek = getWeekNumber();
    this.isWeekOdd = this.currentWeek % 2 === 1;
  }

  ngOnInit(): void {
    this.cleanerForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      username: ['', [Validators.required]],
      password: [''],
      email: ['', [Validators.email]],
      bankAccount: [''],
      contractType: [this.contractTypes[0].id],
      oddEvenWeeks: [false, []],
      isVatFree: [false, []],
    });

    let timesForm: any = {};
    CleanerDays.forEach(day => {
      timesForm[day.id + 'From'] = [''];
      timesForm[day.id + 'To'] = [''];
    });
    this.timesForm = this.formBuilder.group(timesForm);
    this.evenTimesForm = this.formBuilder.group(timesForm);
  }

  getTimeFormatted(from: string, to: string) {
    return (from && to) ? `${from}-${to}` : undefined;
  }

  onSave() {
    if (!this.cleanerForm.valid) return;
    const times = this.timesForm.value;
    const evenTimes = this.evenTimesForm.value;

    const cleanerData = {
      ...this.cleanerForm.value,
    };

    CleanerDays.forEach(day => {
      cleanerData[day.id] = this.getTimeFormatted(times[day.id + 'From'], times[day.id + 'To']);
      if (this.cleanerForm.value.oddEvenWeeks) {
        cleanerData['even' + firstUpper(day.id)] = this.getTimeFormatted(evenTimes[day.id + 'From'], evenTimes[day.id + 'To']);
      }
    });

    this.adminService.addNewCleaner(cleanerData).subscribe({
      next: (res) => {
        this.router.navigate(['admin', 'cleaners']);
        // TODO subject push
      },
      error: (e) => {
        console.log('error ', e);
      },
    })

  }

}
