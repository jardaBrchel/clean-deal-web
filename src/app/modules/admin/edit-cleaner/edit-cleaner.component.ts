import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-cleaner',
  templateUrl: './edit-cleaner.component.html',
  styleUrls: ['./edit-cleaner.component.scss']
})
export class EditCleanerComponent implements OnInit {
  cleanerId!: string;
  cleanerForm: UntypedFormGroup = {} as any;
  timesForm: UntypedFormGroup = {} as any;
  times = [
    {
      id: 0,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    {
      id: 10,
    },
    {
      id: 11,
    },
    {
      id: 12,
    },
    {
      id: 13,
    },
    {
      id: 14,
    },
    {
      id: 15,
    },
    {
      id: 16,
    },
    {
      id: 17,
    },
    {
      id: 18,
    },
    {
      id: 19,
    },
    {
      id: 20,
    },
  ]

  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  fetchCleaner() {
    this.adminService.getCleanerDetails(this.cleanerId).subscribe(
      {
        next: (res) => {
          this.setFormData(res)
          console.log('details', res);
        },
        error: (e) => {
          console.log('error ', e);
        },

      }
    )
  }

  setFormData(data: any) {
     console.log('data', data)
    const days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
    this.cleanerForm.get('username')?.patchValue(data.username);
    this.cleanerForm.get('name')?.patchValue(data.name);
    this.cleanerForm.get('surname')?.patchValue(data.surname);
    this.cleanerForm.get('email')?.patchValue(data.email);
    this.cleanerForm.get('bankAccount')?.patchValue(data.bankAccount);

    days.forEach(day => {
      if (data[day]) {
        console.log('data[day]', data[day]);
        const [from, to] = data[day].split('-');
        this.timesForm.get(day + `From`)?.patchValue(from);
        this.timesForm.get(day + `To`)?.patchValue(to);
      }
    })

    console.log('this.cleanerForm', this.cleanerForm.value)
  }

  ngOnInit(): void {
    this.cleanerId = this.route.snapshot.paramMap.get('cleanerId') || '';
    this.fetchCleaner();

    console.log('this.cleanerId', this.cleanerId);
    this.cleanerForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      username: ['', [Validators.required]],
      password: [''],
      bankAccount: [''],
    });
    this.timesForm = this.formBuilder.group({
      moFrom: [''],
      moTo: [''],
      tuFrom: [''],
      tuTo: [''],
      weFrom: [''],
      weTo: [''],
      thFrom: [''],
      thTo: [''],
      frFrom: [''],
      frTo: [''],
      saFrom: [''],
      saTo: [''],
      suFrom: [''],
      suTo: [''],
    });

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

    const mo = this.getTimeFormatted(times.moFrom, times.moTo);
    const tu = this.getTimeFormatted(times.tuFrom, times.tuTo);
    const we = this.getTimeFormatted(times.weFrom, times.weTo);
    const th = this.getTimeFormatted(times.thFrom, times.thTo);
    const fr = this.getTimeFormatted(times.frFrom, times.frTo);
    const sa = this.getTimeFormatted(times.saFrom, times.saTo);
    const su = this.getTimeFormatted(times.suFrom, times.suTo);

    const cleanerData = {
      cleanerId: this.cleanerId,
      name: this.cleanerForm.value?.username,
      mo,
      tu,
      we,
      th,
      fr,
      sa,
      su,
    };

    // TODO save to DB

    this.adminService.editCleaner(cleanerData).subscribe({
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
