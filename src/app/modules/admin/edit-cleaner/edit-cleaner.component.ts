import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {getWeekNumber} from '../../../helpers/datetime.helper';
import {CleanerDays} from '../../../models/cleaner.model';
import {firstUpper} from '../../../helpers/utils';
import {CONTRACT_TYPES} from '../../../config/order-config';

@Component({
  selector: 'app-edit-cleaner',
  templateUrl: './edit-cleaner.component.html',
  styleUrls: ['./edit-cleaner.component.scss']
})
export class EditCleanerComponent implements OnInit {
  cleanerId!: string;
  cleanerForm: UntypedFormGroup = {} as any;
  timesForm: UntypedFormGroup = {} as any;
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
    private route: ActivatedRoute,
  ) {
    for (let i = 6; i <= 20; i++) {
      this.times.push({
        id: i,
      })
    }

    this.currentWeek = getWeekNumber();
    this.isWeekOdd = this.currentWeek % 2 === 1;
  }

  ngOnInit(): void {
    this.cleanerId = this.route.snapshot.paramMap.get('cleanerId') || '';

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

    this.fetchCleaner();
  }

  fetchCleaner() {
    this.adminService.getCleanerDetails(this.cleanerId).subscribe(
      {
        next: (res) => {
          this.setFormData(res)
        },
        error: (e) => {
          console.log('error ', e);
        },

      }
    )
  }

  setFormData(data: any) {
    this.cleanerForm.get('username')?.patchValue(data.username);
    this.cleanerForm.get('name')?.patchValue(data.name);
    this.cleanerForm.get('surname')?.patchValue(data.surname);
    this.cleanerForm.get('email')?.patchValue(data.email);
    this.cleanerForm.get('bankAccount')?.patchValue(data.bankAccount);
    this.cleanerForm.get('oddEvenWeeks')?.patchValue(data.oddEvenWeeks);
    this.cleanerForm.get('isVatFree')?.patchValue(data.isVatFree);
    this.cleanerForm.get('contractType')?.patchValue(data.contractType);

    CleanerDays.forEach(day => {
      if (data[day.id]) {
        const [from, to] = data[day.id].split('-');
        this.timesForm.get(day.id + `From`)?.patchValue(from);
        this.timesForm.get(day.id + `To`)?.patchValue(to);
      }
      if (data['even' + firstUpper(day.id)]) {
        const [from, to] = data['even' + firstUpper(day.id)].split('-');
        this.evenTimesForm.get(day.id + `From`)?.patchValue(from);
        this.evenTimesForm.get(day.id + `To`)?.patchValue(to);
      }
    })

  }

  getTimeFormatted(from: string, to: string) {
    if (from === '0' && to === '0') {
      return '';
    }
    return (from && to) ? `${from}-${to}` : undefined;
  }

  onSave() {
    if (!this.cleanerForm.valid) return;
    const times = this.timesForm.value;
    const oddTimes = this.evenTimesForm.value;

    const cleanerData = {
      ...this.cleanerForm.value,
      cleanerId: this.cleanerId,
    };

    CleanerDays.forEach(day => {
      cleanerData[day.id] = this.getTimeFormatted(times[day.id + 'From'], times[day.id + 'To']);
      if (this.cleanerForm.value.oddEvenWeeks) {
        cleanerData['even' + firstUpper(day.id)] = this.getTimeFormatted(oddTimes[day.id + 'From'], oddTimes[day.id + 'To']);
      }
    });

    this.adminService.editCleaner(cleanerData).subscribe({
      next: () => {
        this.router.navigate(['admin', 'cleaners']).then(() => window.location.reload());
      },
      error: (e) => {
        console.log('error ', e);
      },

    })
  }

}
