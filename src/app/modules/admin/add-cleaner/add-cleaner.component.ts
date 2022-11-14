import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-cleaner',
  templateUrl: './add-cleaner.component.html',
  styleUrls: ['./add-cleaner.component.scss']
})
export class AddCleanerComponent implements OnInit {
  cleanerForm: UntypedFormGroup = {} as any;
  timesForm: UntypedFormGroup = {} as any;
  times = [
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
  ) { }

  ngOnInit(): void {
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
      ...this.cleanerForm.value,
      mo,
      tu,
      we,
      th,
      fr,
      sa,
      su,
    };

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
