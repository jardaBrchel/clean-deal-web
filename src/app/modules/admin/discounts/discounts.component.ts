import {Component, OnInit} from '@angular/core';
import {Discount} from '../../../models/admin.model';
import {AdminService} from '../../../services/admin.service';
import {DISCOUNT_TYPES} from '../../../config/order-config';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  discounts: Discount[] = [];

  constructor(
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.adminService.getDiscounts().subscribe(
      {
        next: (discounts: Discount[]) => {
          this.discounts = discounts
        },
        error: (e) => {
        },
      }
    );
  }

  getDiscountType(type: string): string {
    return DISCOUNT_TYPES.find(t => t.id === type)?.label || '';
  }

  deleteDiscount(discountId: string) {
    this.adminService.deleteDiscount(discountId).subscribe(
      {
        next: (res) => {
          // Cleaner Deleted
          window.location.reload();
        },
        error: (e) => {
        },
      }
    )
  }

}
