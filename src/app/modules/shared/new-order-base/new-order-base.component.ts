import { Component, OnInit } from '@angular/core';
import {SummaryPriceItem} from '../../../models/order.model';

@Component({
  selector: 'app-new-order-base',
  templateUrl: './new-order-base.component.html',
  styleUrls: ['./new-order-base.component.scss']
})
export class NewOrderBaseComponent implements OnInit {
  orderSentSuccessfully = false;
  orderSendClicked = false;
  showNoDateCapacityModal = false;
  email!: string;
  summaryTimeDetails = '';
  realCleaningTime = 0; // Kdyz se cas vydeli poctem uklizecek
  ladiesForTheJob = 1;
  finalPrice = 0;
  repeatedPrice = 0;
  summaryPriceItems: SummaryPriceItem[] = [];
  extrasPriceItems: SummaryPriceItem[] = [];
  priceTotalTopY!: number;
  hideMobilePriceBar = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSummaryPriceItemsChanged(value: any) {
    this.summaryPriceItems = value;
  }

  onExtrasPriceItemsChanged(value: any) {
    this.extrasPriceItems = value;
  }

  onRealCleaningTimeChanged(value: any) {
    this.realCleaningTime = value;
  }

  onLadiesForTheJobChanged(value: any) {
    this.ladiesForTheJob = value;
  }

  onFinalPriceChanged(value: any) {
    this.finalPrice = value;
  }

  onRepeatedPriceChanged(value: any) {
    this.repeatedPrice = value;
  }

  onOrderSentSuccessfullyChanged(value: any) {
    this.orderSentSuccessfully = value;
  }

  onOrderSendClickedChanged(value: any) {
    this.orderSendClicked = value;
  }

  onSummaryTimeDetailsChanged(value: any) {
    this.summaryTimeDetails = value;
  }

  onEmailChanged(value: any) {
    this.email = value;
  }

  onHideMobilePriceBarChanged(value: any) {
    this.hideMobilePriceBar = value;
  }

}
