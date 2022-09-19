import {Component, OnInit} from '@angular/core';
import {BASE_PRICE, WINDOW_CLEANING_METER} from '../../../config/price-config';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {
  BATHROOMS,
  CLEANING_TYPES, FREQUENCY,
  HOUSE_FLOORS, KITCHENS,
  HOME_TYPE_HOUSE,
  HOME_TYPES,
  ROOMS, TIMES, TOILETS, OWN_CLEANING_STUFF, DIRTY
} from '../../../config/order-config';
import {DatePipe} from '@angular/common';
import {OrderMultiplicators, SummaryPriceItem} from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  finalPrice = 0;
  nonDiscountPrice = 0;
  orderForm: UntypedFormGroup = {} as any;
  userForm: UntypedFormGroup = {} as any;
  addressForm: UntypedFormGroup = {} as any;
  extrasForm: UntypedFormGroup = {} as any;
  cleaningTypes = CLEANING_TYPES;
  homeTypes = HOME_TYPES;
  houseFloors = HOUSE_FLOORS;
  frequency = FREQUENCY;
  rooms = ROOMS;
  kitchens = KITCHENS;
  bathrooms = BATHROOMS;
  toilets = TOILETS;
  times = TIMES;
  ownCleaningStuff = OWN_CLEANING_STUFF;
  dirty = DIRTY;
  multiplicators: OrderMultiplicators = {};
  additions = {};
  extras = {};
  homeType = HOME_TYPES[0].id;
  homeTypeHouse = HOME_TYPE_HOUSE;
  summaryOrderDetails = '';
  summaryTimeDetails = '';
  dateMinDate;
  totalCleaningTime = 0;
  realCleaningTime = 0; // Kdyz se cas vydeli poctem uklizecek
  priceHourConstant = 350;
  maxHoursForOneLady = 6;
  maxWindowsMeters = 20;
  ladiesForTheJob = 1;
  summaryPriceItems: SummaryPriceItem[] = [];
  extrasPriceItems: SummaryPriceItem[] = [];

  // FLAGS
  orderSendClicked = false;
  sendingOrder = false;
  errorOnSubmit = false;
  orderSentSuccessfully = false;

  // EXTRAS


  constructor(
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe,
    private orderService: OrderService,
  ) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.dateMinDate = tomorrow;
  }

  ngOnInit(): void {
    this.initOrderFormValues();
    this.initUserFormValue();
    this.initExtrasFormValue();
  }

  initOrderFormValues() {
    this.orderForm = this.formBuilder.group({
      cleaningType: this.cleaningTypes[0].id,
      homeType: this.homeTypes[0].id,
      houseFloors: this.houseFloors[0].id,
      frequency: this.frequency[0].id,
      rooms: this.rooms[0].id,
      kitchens: this.kitchens[0].id,
      bathrooms: this.bathrooms[0].id,
      toilets: this.toilets[0].id,
      date: this.dateMinDate,
      ownCleaningStuff: this.ownCleaningStuff[0].id,
      dirty: this.dirty[0].id,
      pets: '',
      time: [undefined, [Validators.required]],
      comments: '',
      address: ['', [Validators.required]],
      pscNumber: ['', [Validators.required]],
    });
    this.recalculatePrice();
  }

  initUserFormValue() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  initExtrasFormValue() {
    this.extrasForm = this.formBuilder.group({
      windows: 0,
    });
  }

  getAdditionsSum(): number {
    return Object.values(this.additions)
      ? (Object.values(this.additions)).reduce((a, b) => Number(a) + Number(b), 0) as number
      : 0;
  }

  recalculatePrice() {
    let multiplicators: number[] = Object.values(this.multiplicators)
    const add: number = this.getAdditionsSum();
    const extras: number = Object.values(this.extras)
      ? (Object.values(this.extras)).reduce((a, b) => Number(a) + Number(b), 0) as number
      : 0;

    this.finalPrice = BASE_PRICE;
    this.finalPrice += add;
    // finalPrice is the basic part here
    // FIXME convert to additions, multiply basic part
    console.log('multiplicators', multiplicators);
    console.log('this.finalPrice', this.finalPrice);
    multiplicators = multiplicators.map(m => (m - 1) * this.finalPrice)
    console.log('multiplicators', multiplicators);
    multiplicators.forEach(m => this.finalPrice += m)
    this.finalPrice = Math.round(this.finalPrice);
    this.finalPrice += extras;

    // FIXME nonDP by mela byt jen bez frequency
    const mpsForBasePrice: number[] = Object.values({...this.multiplicators, frequency: 1});
    this.nonDiscountPrice = BASE_PRICE + add + extras;
    mpsForBasePrice.forEach(m => this.nonDiscountPrice = m * this.nonDiscountPrice)

    this.checkSummaryOderDetails();
    this.checkSummaryTimeDetails();
    this.recalculateCleaningHours();
    this.recalculateCleanersCount();
    this.recalculatePriceItems();
  }

  checkSummaryOderDetails() {
    const homeType = HOME_TYPES.find(f => f.id === this.orderForm.value?.homeType)?.label;
    const frequency = FREQUENCY.find(f => f.id === this.orderForm.value?.frequency)?.label;

    this.summaryOrderDetails = `${homeType} - ${frequency}`;
  }

  checkSummaryTimeDetails() {
    const orderDate = this.orderForm.value?.date;
    const formattedDate = this.datePipe.transform(orderDate, 'd.M.yyyy')
    const time = TIMES.find(f => f.id === this.orderForm.value?.time)?.label;

    this.summaryTimeDetails = (orderDate && time) ? `${formattedDate} v ${time}` : '';
  }

  recalculateCleaningHours() {
    // TODO Az bude Karcher, tak poladit hodiny kdyz budou nastavena okna, pac tam to bude nepomer
    this.totalCleaningTime = this.nonDiscountPrice / this.priceHourConstant;
  }

  recalculateCleanersCount() {
    this.ladiesForTheJob = Math.ceil(this.totalCleaningTime / this.maxHoursForOneLady);
    this.realCleaningTime = this.totalCleaningTime / this.ladiesForTheJob;
  }

  recalculatePriceItems() {
    this.summaryPriceItems = [{
      name: 'Základní sazba úklidu',
      price: BASE_PRICE + ' Kč',
    }];
    this.extrasPriceItems = [];

    Object.keys(this.additions).forEach((ak: string) => {
      let item, label = '';

      switch (ak) {
        case 'houseFloors':
          item = this.houseFloors.find(i => i.id === this.orderForm.value.houseFloors);
          label = item?.id + ' patra';
          break;
        case 'bathrooms':
          item = this.bathrooms.find(i => i.id === this.orderForm.value.bathrooms);
          label = item?.id + ' koupelny';
          break;
        case 'kitchens':
          item = this.kitchens.find(i => i.id === this.orderForm.value.kitchens);
          label = item?.id + ' kuchyně';
          break;
        case 'rooms':
          item = this.rooms.find(i => i.id === this.orderForm.value.rooms);
          label = item?.id + ' místnosti';
          break;
        case 'toilets':
          item = this.toilets.find(i => i.id === this.orderForm.value.toilets);
          label = item?.id + ` ${Number(item?.id) === 1 ? 'toaleta' : 'toalety'}`;
          break;
        case 'ownCleaningStuff':
          item = this.ownCleaningStuff.find(i => i.id === this.orderForm.value.ownCleaningStuff);
          label = 'Čisticí prostředky';
          break;
      }


      if (!!item && item?.addition != 0) {
        this.summaryPriceItems.push({
          name: label,
          price: `${item?.addition || 0} Kč`,
        })
      }
    })
    Object.keys(this.extrasForm.value || {}).forEach((ek: string) => {
      let label = '', price;

      switch (ek) {
        case 'windows':
          label = `Mytí oken ${this.extrasForm.value.windows}m<sup>2</sup>`;
          price = this.extrasForm.value.windows * WINDOW_CLEANING_METER;
          break;
      }

      if (!!price && price != 0) {
        this.extrasPriceItems.push({
          name: label,
          price: `${price} Kč`,
        })
      }
    })

    Object.keys(this.multiplicators).forEach((mk: string) => {
      let item, name = '', price = '';
      const additionsSum = Math.round(this.getAdditionsSum() + BASE_PRICE);

      switch (mk) {
        case 'cleaningType':
          item = this.cleaningTypes.find(ct => ct.id === this.orderForm.value.cleaningType);
          name = item?.label!;
          console.log('additionsSum', additionsSum);
          console.log('item', item);
          price =  `${Math.round(((item?.multiplication || 1) -1) * additionsSum)} Kč`;
          break
        case 'dirty':
          item = this.dirty.find(ct => ct.id === this.orderForm.value.dirty);
          name = item?.label! + ' znečištění';
          price =  `${Math.round(((item?.multiplication || 1) -1) * additionsSum)} Kč`;
          break
        case 'frequency':
          item = this.frequency.find(ct => ct.id === this.orderForm.value.frequency);
          name = item?.label!;
          price =  `${Math.round(((item?.multiplication || 1) -1) * additionsSum)} Kč`;
          break;
      }

      if (item?.multiplication === 1) return;
      this.summaryPriceItems.push({
        name: name,
        price: price,
      })
    })
  }

  getExtrasItem(): string {
    let res = '';

    Object.keys(this.extrasForm.value).forEach(
      key => {
        if (!(this.extrasForm.value[key] > 0)) return;
        res += `${key}:${this.extrasForm.value[key]},`;
      }
    );

    return res;
  }

  changeCleaningType(event: any) {
    const selectedValue = event.target.value;
    const item = CLEANING_TYPES.find(t => t.id === selectedValue) || {} as any;
    this.multiplicators = {...this.multiplicators, cleaningType: item.multiplication};
    this.recalculatePrice();
  }

  changeHomeType(event: any) {
    const selectedValue = event.target.value;
    const item = HOME_TYPES.find(t => t.id === selectedValue) || {} as any;
    this.homeType = item.id;

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

  changeOwnCleaningStuff(event: any) {
    const selectedValue = event.target.value;
    const item = OWN_CLEANING_STUFF.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, ownCleaningStuff: item.addition};

    this.recalculatePrice();
  }

  changeDirty(event: any) {
    const selectedValue = event.target.value;
    const item = DIRTY.find(t => t.id === selectedValue) || {} as any;
    this.multiplicators = {...this.multiplicators, dirty: item.multiplication};

    this.recalculatePrice();
  }

  windowsChanged(event: any) {
    const insertedValue = event.target.value;
    if (insertedValue > this.maxWindowsMeters) {
      this.extrasForm.get('windows')?.patchValue(this.maxWindowsMeters);
    }
    const windowsPrice = WINDOW_CLEANING_METER * insertedValue;
    this.extras = {...this.extras, windows: windowsPrice};

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
    this.orderSendClicked = true;
    if (!this.orderForm.valid || !this.userForm.valid || !!this.sendingOrder) {
      // this.orderSendClicked = false;
      return;
    }
    const ownCleaningStuff = this.orderForm.value?.ownCleaningStuff === 'yes';
    const data = {
      ...this.orderForm.value,
      ...this.userForm.value,
      price: this.finalPrice,
      ownCleaningStuff,
      cleaningDuration: this.totalCleaningTime,
      extras: this.getExtrasItem(),
      cleanersCount: this.ladiesForTheJob,
    };
    this.sendingOrder = true;

    this.orderService.addNewOrderFromWeb(data).subscribe(
      {
        next: (res) => {
          this.orderSentSuccessfully = true;
          this.errorOnSubmit = false;
          this.sendingOrder = false;
          window.scrollTo(0, 0);
        },
        error: (e) => {
          console.log('error on sending order', e);
          this.errorOnSubmit = true;
          this.sendingOrder = false;
        },
        complete: () => {
        }
      }
    )
  }

}
