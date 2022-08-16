import {Component, OnInit} from '@angular/core';
import {BASE_PRICE} from '../../../config/price-config';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  BATHROOMS,
  CLEANING_TYPES, FREQUENCY,
  HOUSE_FLOORS, KITCHENS,
  OBJECT_TYPE_HOUSE,
  OBJECT_TYPES,
  ROOMS, TIMES, TOILETS
} from '../../../config/order-config';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  finalPrice = 0;
  orderForm: FormGroup = {} as any;
  userForm: FormGroup = {} as any;
  addressForm: FormGroup = {} as any;
  cleaningTypes = CLEANING_TYPES;
  objectTypes = OBJECT_TYPES;
  houseFloors = HOUSE_FLOORS;
  frequency = FREQUENCY;
  rooms = ROOMS;
  kitchens = KITCHENS;
  bathrooms = BATHROOMS;
  toilets = TOILETS;
  times = TIMES;
  multiplicators = {};
  additions = {};
  objectType = OBJECT_TYPES[0].id;
  objectTypeHouse = OBJECT_TYPE_HOUSE;
  summaryOrderDetails = '';
  summaryTimeDetails = '';
  dateMinDate = new Date(2022,7,2);

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.initOrderFormValues();
    this.initUserFormValue();
  }

  initOrderFormValues() {
    this.orderForm = this.formBuilder.group({
      cleaningType: this.cleaningTypes[0].id,
      objectType: this.objectTypes[0].id,
      houseFloors: this.houseFloors[0].id,
      frequency: this.frequency[0].id,
      rooms: this.rooms[0].id,
      kitchens: this.kitchens[0].id,
      bathrooms: this.bathrooms[0].id,
      toilets: this.toilets[0].id,
      date: new Date(),
      time: '',
      comments: '',
    });
    this.recalculatePrice();
  }

  initUserFormValue() {
    this.userForm = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      phone: '',
    });
  }

  recalculatePrice() {
    const multiplicators: number[] = Object.values(this.multiplicators)
    const add: number = Object.values(this.additions)
      ? (Object.values(this.additions)).reduce((a, b) => Number(a) + Number(b), 0) as number
      : 0;
    this.finalPrice = BASE_PRICE;
    multiplicators.forEach(m => this.finalPrice = m * this.finalPrice)
    this.finalPrice += add;

    this.checkSummaryOderDetails();
    this.checkSummaryTimeDetails();
    console.log('form', this.orderForm.value)
  }

  checkSummaryOderDetails() {
    const objectType = OBJECT_TYPES.find(f => f.id === this.orderForm.value?.objectType)?.label;
    const frequency = FREQUENCY.find(f => f.id === this.orderForm.value?.frequency)?.label;

    this.summaryOrderDetails = `${objectType}, ${frequency}`;
  }

  checkSummaryTimeDetails() {
    const orderDate = this.orderForm.value?.date;
    const formattedDate = this.datePipe.transform(orderDate, 'd.M.yyyy')
    const time = TIMES.find(f => f.id === this.orderForm.value?.time)?.label;

    this.summaryTimeDetails = (orderDate && time) ? `${formattedDate} v ${time}` : '';
  }

  changeCleaningType(event: any) {
    const selectedValue = event.target.value;
    const item = CLEANING_TYPES.find(t => t.id === selectedValue) || {} as any;
    this.multiplicators = {...this.multiplicators, cleaningType: item.multiplication};
    this.recalculatePrice();
  }

  changeObjectType(event: any) {
    const selectedValue = event.target.value;
    const item = OBJECT_TYPES.find(t => t.id === selectedValue) || {} as any;
    this.objectType = item.id;

    if (this.objectType === this.objectTypeHouse) {
      this.additions = {...this.additions, houseFloors: HOUSE_FLOORS[0].addition};
    } else {
      this.additions = {...this.additions, houseFloors: 0};
    }

    this.recalculatePrice();
  }

  changeHouseFloors(event: any) {
    const selectedValue = event.target.value;
    const item = HOUSE_FLOORS.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, houseFloors: item.addition};

    this.recalculatePrice();
  }

  changeFrequency(event: any) {
    const selectedValue = event.target.value;
    const item = FREQUENCY.find(t => t.id === selectedValue) || {} as any;
    this.multiplicators = {...this.multiplicators, frequency: item.multiplication};

    this.recalculatePrice();
  }

  changeRooms(event: any) {
    const selectedValue = event.target.value;
    const item = ROOMS.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, rooms: item.addition};

    this.recalculatePrice();
  }

  changeKitchens(event: any) {
    const selectedValue = event.target.value;
    const item = KITCHENS.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, kitchens: item.addition};

    this.recalculatePrice();
  }

  changeBathrooms(event: any) {
    const selectedValue = event.target.value;
    const item = BATHROOMS.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, bathrooms: item.addition};

    this.recalculatePrice();
  }

  changeToilets(event: any) {
    const selectedValue = event.target.value;
    const item = TOILETS.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, toilets: item.addition};

    this.recalculatePrice();
  }

  changeTime() {
    this.recalculatePrice();
  }

  onDateChange() {
    this.recalculatePrice();
  }

  onOrderSubmit() {
    // TODO send an order
  }

}
