import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DISCOUNT_TYPES} from '../../../config/order-config';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';
import {generateString} from '../../../helpers/utils';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  discountForm: UntypedFormGroup = {} as any;
  dateMinDate: any;
  dateMaxDate: any;
  discountTypes = DISCOUNT_TYPES;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.discountForm = this.formBuilder.group({
      code: [''],
      type: [''],
      value: ['', [Validators.required]],
      validUntil: [''],
    });
  }

  initDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = new Date(today);
    maxDate.setDate(tomorrow.getDate() + 90);
    this.dateMinDate = tomorrow;
    this.dateMaxDate = maxDate;
  }

  generateCode() {
    const code: string = generateString(10).toUpperCase();
    console.log('code', code);
    this.discountForm.get('code')?.patchValue(code);
  }


  onSave() {
    if (!this.discountForm.valid) return;

    const discountData = {
      ...this.discountForm.value,
    };

    this.adminService.addNewDiscount(discountData).subscribe({
      next: (res) => {
        this.router.navigate(['admin', 'discounts']);
        // TODO subject push
      },
      error: (e) => {
        console.log('error ', e);
      },
    })

  }

}
