import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NewOrderBaseComponent} from '../../shared/new-order-base/new-order-base.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss', '../../shared/new-order-base/new-order-base.component.scss']
})
export class NewOrderComponent extends NewOrderBaseComponent implements OnInit, AfterViewInit {
  @ViewChild("block") block!: ElementRef;

  constructor(
  ) {
    super();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.logScrolling(event);
  }

  ngAfterViewInit(): void {
    // Getting price Y coord to hide price panel on mobile when scrolling down
    setTimeout(() => {
      const viewportOffset = this.block.nativeElement.getBoundingClientRect();
      this.priceTotalTopY = viewportOffset?.y || 0;
    }, 2000);
  }


  logScrolling(event: any) {
    this.hideMobilePriceBar = (event['srcElement'].scrollingElement.scrollTop + (window.screen?.height || 0)) > this.priceTotalTopY;
  }


}
