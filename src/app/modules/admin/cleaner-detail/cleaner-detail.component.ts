import { Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cleaner-detail',
  templateUrl: './cleaner-detail.component.html',
  styleUrls: ['./cleaner-detail.component.scss']
})
export class CleanerDetailComponent implements OnInit {
  cleanerId!: string;
  cleaner: any;

  // VACATION VALUES
  vacationForm: UntypedFormGroup = {} as any;
  dateMinDate: any;
  dateMaxDate: any;
  vacationTimes: any[] = [];
  savingVacation = false;
  vacationAdded = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.cleanerId = this.route.snapshot.paramMap.get('cleanerId') || '';
    this.initDates();
    this.fetchCleaner();
    this.initVacationFormValues();
  }

  initDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = new Date(today);
    maxDate.setDate(tomorrow.getDate() + 90);
    this.dateMinDate = tomorrow;
    this.dateMaxDate = maxDate;
    this.vacationTimes = [];

    for (let i = 6; i <= 20; i++) {
      this.vacationTimes.push({
        id: i,
      })
    }
  }

  onDateChange() {

  }

  onAddVacation() {
    if (this.savingVacation) return;

    this.savingVacation = true;
    const vacDate = new Date(this.vacationForm.value.date);
    vacDate.setHours(12);

    const data = {
      cleanerId: this.cleanerId,
      vacationDate: vacDate,
      from: Number(this.vacationForm.value.from),
      to: Number(this.vacationForm.value.to),
    }

    this.adminService.addCleanerVacation(data).subscribe(
      {
        next: (res) => {
          this.savingVacation = false;
          this.vacationAdded = true;
          this.cleaner.vacations = [...this.cleaner.vacations, res];
          this.clearVacationForm();
        },
        error: (e) => {
          console.log('error ', e);
          this.savingVacation = false;
        },
      }
    )

    console.log('data', data);
  }

  removeOrder(orderId: number) {
    console.log('orderId', orderId);
    this.adminService.removeOrder(orderId).subscribe(
      {
        next: (res) => {
          this.cleaner.orders = [...this.cleaner.orders.filter((v: any) => v.orderId !== orderId)];
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

  removeVacation(id: number) {
    this.adminService.removeCleanerVacation(id).subscribe(
      {
        next: (res) => {
          this.cleaner.vacations = [...this.cleaner.vacations.filter((v: any) => v.id !== id)];
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

  clearVacationForm() {
    this.vacationForm.controls['date']?.patchValue(null);
    this.vacationForm.controls['from']?.patchValue(null);
    this.vacationForm.controls['to']?.patchValue(null);
  }

  fetchCleaner() {
    this.adminService.getCleanerInfo(this.cleanerId).subscribe(
      {
        next: (res) => {
          this.cleaner = res;
          console.log('details', res);
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

  initVacationFormValues() {
    this.vacationForm = this.formBuilder.group({
      date: [undefined, [Validators.required]],
      from: [''],
      to: [''],
    });
  }


}
