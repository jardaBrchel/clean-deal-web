import { Component, OnInit } from '@angular/core';
import {SummaryPriceItem} from '../../../models/order.model';
import {INTRODUCTORY_CLEANING, INTRODUCTORY_CLEANING_LARGE} from '../../../config/price-config';

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
  introCleaningTime = 0;
  ladiesForTheJob = 1;
  finalPrice = 0;
  fullPrice = 0; // Nezlevneny uklid, dulezity pro opakovane uklidy
  yardage!: string;
  repeatedPrice = 0;
  summaryPriceItems: SummaryPriceItem[] = [];
  extrasPriceItems: SummaryPriceItem[] = [];
  priceTotalTopY!: number;
  hideMobilePriceBar = false;
  introCleanPrice!: number;

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

  onIntroCleaningTimeChanged(value: any) {
    this.introCleaningTime = value;
  }

  onLadiesForTheJobChanged(value: any) {
    this.ladiesForTheJob = value;
  }

  onFinalPriceChanged(value: any) {
    this.finalPrice = value;
  }

  onFullPriceChanged(value: any) {
    this.fullPrice = value;
  }

  onYardageChanged(value: any) {
    this.yardage = value;
    this.introCleanPrice = Number(value) > 80 ? INTRODUCTORY_CLEANING_LARGE : INTRODUCTORY_CLEANING;
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
