import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {
  BATHROOMS,
  CLEANING_TYPES, DIRTY,
  FREQUENCY, FREQUENCY_ONETIME, FREQUENCY_WEEKLY,
  HOME_TYPES, HOUSE_FLOORS, KITCHENS, MAX_CALENDAR_DAYS,
  MAX_HOURS_PER_LADY, MAX_WINDOW_BLINDS_METERS, MAX_WINDOWS_METERS, orderFormItem, OWN_CLEANING_STUFF, PAYMENT_METHODS,
  PAYMENT_TRANSFER, ROOMS,
  TIMES, TOILETS, YARDAGE
} from '../../../config/order-config';
import {
  BASE_PRICE, MAX_SPACE_AREA,
  OWN_CLEANING_STUFF_PRICE,
  OWN_CLEANING_STUFF_PRICE_INCREASE,
  PRICE_HOUR_CONSTANT, STEP_OVER_MAX_SPACE, WINDOW_BLINDS_CLEANING_METER_PRICE, WINDOW_CLEANING_METER_PRICE
} from '../../../config/price-config';
import {
  AvailableTimesResItem,
  CleanerAvailableDay,
  OrderMultiplicators,
  SummaryPriceItem
} from '../../../models/order.model';
import {dateToYmdFormat} from '../../../helpers/datetime.helper';
import {WEB_URLS} from '../../../config/web.config';
import {DatePipe} from '@angular/common';
import {OrderService} from '../../../services/order.service';
import {Client} from '../../../models/client.model';
import {AdminHome, AdminOrder, OrderDataRes} from '../../../models/admin.model';
import {MatDatepicker} from '@angular/material/datepicker';
import {HelpService} from '../../../services/help.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Output() summaryPriceItemsChanged: EventEmitter<SummaryPriceItem[]> = new EventEmitter<SummaryPriceItem[]>();
  @Output() extrasPriceItemsChanged: EventEmitter<SummaryPriceItem[]> = new EventEmitter<SummaryPriceItem[]>();
  @Output() summaryTimeDetailsChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() realCleaningTimeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() ladiesForTheJobChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() finalPriceChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() repeatedPriceChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() orderSentSuccessfullyChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emailChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() orderSendClickedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() hideMobilePriceBarChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() clientData!: Client | null;
  @Input() homesData!: AdminHome[];
  @Input() orderData!: AdminOrder;
  @Input() isClientForm = false;
  @Input() isEditOrder = false;

  orderForm: UntypedFormGroup = {} as any;
  homesForm: UntypedFormGroup = {} as any;
  userForm: UntypedFormGroup = {} as any;
  extrasForm: UntypedFormGroup = {} as any;

  // CONSTANTS
  webUrls = WEB_URLS;
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
  yardage = YARDAGE;
  maxSpaceArea = MAX_SPACE_AREA;
  paymentMethods = PAYMENT_METHODS;
  multiplicators: OrderMultiplicators = {};
  homeType = HOME_TYPES[0].id;
  maxWindowsMeters = MAX_WINDOWS_METERS;
  maxWindowBlindsMeters = MAX_WINDOW_BLINDS_METERS;
  priceTotalTopY!: number;
  homes!: AdminHome[];

  // CALENDAR VALUES
  dateMinDate: any;
  dateMaxDate: any;
  availableCalendars: AvailableTimesResItem[] = [];
  availableTimes!: CleanerAvailableDay[];
  availableTimesOptions!: orderFormItem[]

  // CALCULATED VALUES
  totalCleaningTime = 0;
  realCleaningTime = 0; // Kdyz se cas vydeli poctem uklizecek
  ladiesForTheJob = 1;
  calculatedSpace = 0; // Vypocitana vymera
  yardageOverPrice!: number;
  finalPrice = 0;
  repeatedPrice = 0;
  nonDiscountPrice = 0;
  additions = {};
  extras = {};
  summaryOrderDetails = '';
  summaryTimeDetails = '';
  summaryPriceItems: SummaryPriceItem[] = [];
  extrasPriceItems: SummaryPriceItem[] = [];
  clientCity!: string;

  // FLAGS
  orderSendClicked = false;
  sendingOrder = false;
  errorOnSubmit = false;
  orderSentSuccessfully = false;
  onlyConfirmationMissing = false;
  hideMobilePriceBar = false;
  showNoDateCapacityModal = false;
  areAvailableDates = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe,
    private orderService: OrderService,
    private helpService: HelpService,
  ) {
    this.initDates();
  }

  ngOnInit(): void {
    this.initOrderFormValues();
    this.initUserFormValue();
    this.initExtrasFormValue();
    this.getAvailableTimes();
    this.initHomeFormValue();

    if (this.isClientForm) {
      // TODO prefill forms and get right price
      this.prefillHomeForms(this.homesData[0]);
    }

  }

  prefillOrderForms(order: AdminOrder) {
    this.orderForm.get('cleaningType')?.patchValue(order.cleaningType);
    this.orderForm.get('date')?.patchValue(new Date(order.cleaningDate));
    this.orderForm.get('time')?.patchValue(order.cleaningTime);
    this.userForm.get('paymentMethod')?.patchValue(order.cleaningTime);
    this.orderForm.controls['time']?.enable();
    this.changeCleaningType({target: {value: String(order.cleaningType)}});

    let extras = order.extras ? order.extras.split(',').filter(a => !!a).map(e => {
      const [key, val] = e.split(':');
      return {
        [key]: val,
      }
    }) : [];
    extras.forEach(e => {
      const key = Object.keys(e)[0];
      this.extrasForm.get(key)?.patchValue(e[key]);
      if (key === 'windows') {
        this.windowsChanged({target: {value: e[key]}});
      }
    })
  }

  prefillHomeForms(home: AdminHome) {
    this.orderForm.get('yardage')?.patchValue(String(home.yardage));
    this.orderForm.get('houseFloors')?.patchValue(String(home.houseFloors));
    this.orderForm.get('rooms')?.patchValue(String(home.rooms));
    this.orderForm.get('kitchens')?.patchValue(String(home.kitchens));
    this.orderForm.get('bathrooms')?.patchValue(String(home.bathrooms));
    this.orderForm.get('toilets')?.patchValue(String(home.toilets));
    this.changeYardage({target: {value: String(home.yardage)}})
    this.changeHouseFloors({target: {value: String(home.houseFloors)}})
    this.changeRooms({target: {value: String(home.rooms)}})
    this.changeKitchens({target: {value: String(home.kitchens)}})
    this.changeBathrooms({target: {value: String(home.bathrooms)}})
    this.changeToilets({target: {value: String(home.toilets)}})
    this.recalculatePrice();
  }

  prefillOrderValuesForEdit() {

  }

  getAvailableTimes() {
    this.orderService.getAvailableTimes(this.orderData?.orderId).subscribe(
      {
        next: (res) => {
          this.availableCalendars = res?.cleaners || [];
          this.checkAvailableDatesInCal();

          if (this.orderData) {
            this.prefillOrderForms(this.orderData);
          }
        },
        error: (e) => {
          console.log('error on sending order', e);
        },
      }
    )
  }

  datepickerOpened(pickerEl: any) {
    console.log('pickerEl', pickerEl);
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
      ownCleaningStuff: this.ownCleaningStuff[0].id,
      dirty: this.dirty[0].id,
      yardage: this.yardage[0].id,
      pets: '',
      homeInfo: '',
      comments: '',
      date: [undefined, [Validators.required]],
      time: [{value: undefined, disabled: true}, [Validators.required]],
      address: ['', !this.isClientForm ? [Validators.required] : []],
      pscNumber: ['', !this.isClientForm ? [Validators.required] : []],
      confirmation: [false, [Validators.requiredTrue]],
    });
    this.recalculatePrice();
  }


  initHomeFormValue() {
    this.homesForm = this.formBuilder.group({
      home: this.homesData ? this.homesData[0].homeId : '',
    });
  }

  initUserFormValue() {
    this.userForm = this.formBuilder.group({
      name: ['', !this.isClientForm ? [Validators.required] : []],
      surname: ['', !this.isClientForm ? [Validators.required] : []],
      email: ['', !this.isClientForm ? [Validators.required, Validators.email] : []],
      phone: ['', !this.isClientForm ? [Validators.required] : []],
      contactAddressMatchesCleaning: [false],
      contactAddress: ['', !this.isClientForm ? [Validators.required] : []],
      paymentMethod: [PAYMENT_TRANSFER, [Validators.required]],
    });
  }


  initExtrasFormValue() {
    this.extrasForm = this.formBuilder.group({
      windows: 0,
      windowBlinds: 0,
    });
  }

  getAdditionsSum(): number {
    const additions: any = this.additions;

    // Recalculate cleaning stuff
    if (additions['ownCleaningStuff']) {
      const selectedIndex = this.yardage.findIndex(y => y.id === this.orderForm.value['yardage']);
      const addition = OWN_CLEANING_STUFF_PRICE + (OWN_CLEANING_STUFF_PRICE_INCREASE * selectedIndex);
      additions['ownCleaningStuff'] = addition;
    }

    return Object.values(this.additions)
      ? (Object.values(this.additions)).reduce((a, b) => Number(a) + Number(b), 0) as number
      : 0;
  }

  recalculatePrice(
    {recalculateMaxSpace = true, recalculateOwnCleaningStuff = true} = {}) {
    recalculateMaxSpace && this.recalculateMaxSpace();
    let multiplicators: number[] = Object.values(this.multiplicators)
    let add: number = this.getAdditionsSum();
    add += (this.yardageOverPrice || 0);
    const extras: number = Object.values(this.extras)
      ? (Object.values(this.extras)).reduce((a, b) => Number(a) + Number(b), 0) as number
      : 0;

    this.finalPrice = BASE_PRICE;
    this.finalPrice += add;
    // finalPrice is the basic part here
    multiplicators = multiplicators.map(m => (m - 1) * this.finalPrice)
    multiplicators.forEach(m => this.finalPrice += m)
    this.finalPrice = Math.round(this.finalPrice);
    this.finalPrice += extras;

    // FIXME nonDP by mela byt jen bez frequency
    const mpsForBasePrice: number[] = Object.values({...this.multiplicators, frequency: 1});
    const selectedIndex = this.yardage.findIndex(y => y.id === this.orderForm.value['yardage']);
    const ocs = this.ownCleaningStuff.find(i => i.id === this.orderForm.value.ownCleaningStuff)?.addition;
    const ocsPrice = ocs ? ocs + (50 * selectedIndex) : 0;
    this.nonDiscountPrice = BASE_PRICE + add + extras - ocsPrice;
    mpsForBasePrice.forEach(m => this.nonDiscountPrice = m * this.nonDiscountPrice)

    this.checkSummaryOderDetails();
    this.checkSummaryTimeDetails();
    this.recalculateCleaningHours();
    this.recalculateCleanersCount();
    this.recalculateRealCleaningHours();
    this.recalculatePriceItems();
    this.recalculateRepeatedPrice();
    this.setTimesToFormField();
    this.checkAvailableDatesInCal();

    this.realCleaningTimeChanged.emit(this.realCleaningTime);
    this.ladiesForTheJobChanged.emit(this.ladiesForTheJob);
    this.finalPriceChanged.emit(this.finalPrice);
    this.repeatedPriceChanged.emit(this.repeatedPrice);
    this.summaryTimeDetailsChanged.emit(this.summaryTimeDetails);
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
    this.totalCleaningTime = this.nonDiscountPrice / PRICE_HOUR_CONSTANT;
  }

  recalculateRealCleaningHours() {
    const realCleaningTime = this.totalCleaningTime / this.ladiesForTheJob;
    this.realCleaningTime = Math.round(realCleaningTime * 2) / 2;
  }

  recalculateCleanersCount() {
    this.ladiesForTheJob = Math.ceil(this.totalCleaningTime / MAX_HOURS_PER_LADY);
  }

  recalculateMaxSpace() {
    this.calculatedSpace = 0;
    this.yardageOverPrice = null!;
    Object.keys(this.maxSpaceArea).forEach(space => {
      const count = this.orderForm.value[space];
      // @ts-ignore
      const maxSpace = this.maxSpaceArea[space];
      this.calculatedSpace += maxSpace * Number(count);
    })

    this.prefillYardage();
  }

  prefillYardage() {
    const yardage = this.yardage.find(
      yards => yards && yards.range && this.calculatedSpace >= yards.range[0] && this.calculatedSpace <= yards.range[1]
    );

    this.orderForm.get('yardage')?.patchValue(yardage?.id);
  }

  onPscChange(event: any) {
    const psc = (event?.target?.value || '').trim().replaceAll(' ', '');
    this.helpService.fetchAddress(psc).subscribe(
      {
        next: (res: any) => {
          this.clientCity = res.data.length ? res.data[0].NAZPOST : null;
          console.log('city ', this.clientCity);
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

  recalculateRepeatedPrice() {
    const item = FREQUENCY.find(t => t.id === this.orderForm.value.frequency) || {} as any;

    if (item.multiplication !== 1) {
      const monthMulti = item.id === 'WEEKLY' ? 4 : 2;
      this.repeatedPrice = this.finalPrice * monthMulti;
    } else {
      this.repeatedPrice = 0;
    }
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
          const selectedIndex = this.yardage.findIndex(y => y.id === this.orderForm.value['yardage']);
          item = this.ownCleaningStuff.find(i => i.id === this.orderForm.value.ownCleaningStuff);
          const addition = item?.addition ? item?.addition + (50 * selectedIndex) : 0;
          item = {
            ...item,
            addition,
          }
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

    if (!!this.yardageOverPrice) {
      const selectedIndex = this.yardage.findIndex(y => y.id === this.orderForm.value['yardage']);

      this.summaryPriceItems.push({
        name: 'Výměra ' + this.yardage[selectedIndex].label + ` m<sup>2</sup>`,
        price: `${this.yardageOverPrice} Kč`,
      })
    }

    Object.keys(this.extrasForm.value || {}).forEach((ek: string) => {
      let label = '', price;

      switch (ek) {
        case 'windows':
          label = `Mytí oken ${this.extrasForm.value.windows}m<sup>2</sup>`;
          price = this.extrasForm.value.windows * WINDOW_CLEANING_METER_PRICE;
          break;
        case 'windowBlinds':
          label = `Čištění žaluzií ${this.extrasForm.value.windowBlinds}m<sup>2</sup>`;
          price = this.extrasForm.value.windowBlinds * WINDOW_BLINDS_CLEANING_METER_PRICE;
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
          price = `${Math.round(((item?.multiplication || 1) - 1) * additionsSum)} Kč`;
          break
        case 'dirty':
          item = this.dirty.find(ct => ct.id === this.orderForm.value.dirty);
          name = item?.label! + ' znečištění';
          price = `${Math.round(((item?.multiplication || 1) - 1) * additionsSum)} Kč`;
          break
        case 'frequency':
          item = this.frequency.find(ct => ct.id === this.orderForm.value.frequency);
          name = item?.label!;
          price = `${Math.round(((item?.multiplication || 1) - 1) * additionsSum)} Kč`;
          break;
      }

      if (item?.multiplication !== 1) {
        this.summaryPriceItems.push({
          name: name,
          price: price,
        })
      }
    })

    this.summaryPriceItemsChanged.emit(this.summaryPriceItems);
    this.extrasPriceItemsChanged.emit(this.extrasPriceItems);
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

  changeHome(event: any) {
    const selectedValue = event.target.value;
    const homeData = this.homesData.find(hd => hd.homeId === selectedValue);
    this.prefillHomeForms(homeData as AdminHome);
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

    if (selectedValue === FREQUENCY_WEEKLY && this.orderForm.value['date']) {
      if (!this.dateFilter(this.orderForm.value['date'])) {
        this.resetDateAndTime();
      }
    }

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
    const selectedIndex = this.yardage.findIndex(y => y.id === this.orderForm.value['yardage']);
    const addition = item.addition ? item.addition + (50 * selectedIndex) : 0;
    this.additions = {...this.additions, ownCleaningStuff: addition};

    this.recalculatePrice({recalculateOwnCleaningStuff: false});
  }

  changeDirty(event: any) {
    const selectedValue = event.target.value;
    const item = DIRTY.find(t => t.id === selectedValue) || {} as any;
    this.multiplicators = {...this.multiplicators, dirty: item.multiplication};

    this.recalculatePrice();
  }

  changeYardage(event: any) {
    const value = event.target.value;
    const selectedIndex = this.yardage.findIndex(y => y.id === value);
    const maxIndex = this.yardage.findIndex(
      yards => yards && yards.range && this.calculatedSpace >= yards.range[0] && this.calculatedSpace <= yards.range[1]
    );

    if (selectedIndex > maxIndex) {
      this.yardageOverPrice = STEP_OVER_MAX_SPACE * (selectedIndex - maxIndex);
    } else {
      this.yardageOverPrice = null!;
    }

    this.recalculatePrice({recalculateMaxSpace: false});
  }

  windowsChanged(event: any) {
    const insertedValue = event.target.value;
    if (insertedValue > this.maxWindowsMeters) {
      this.extrasForm.get('windows')?.patchValue(this.maxWindowsMeters);
    }
    const windowsPrice = WINDOW_CLEANING_METER_PRICE * insertedValue;
    this.extras = {...this.extras, windows: windowsPrice};

    this.recalculatePrice();
  }

  windowBlindsChanged(event: any) {
    const insertedValue = event.target.value;
    if (insertedValue > this.maxWindowBlindsMeters) {
      this.extrasForm.get('windowBlinds')?.patchValue(this.maxWindowBlindsMeters);
    }
    const windowBlindsPrice = WINDOW_BLINDS_CLEANING_METER_PRICE * insertedValue;
    this.extras = {...this.extras, windowBlinds: windowBlindsPrice};

    this.recalculatePrice();
  }

  changeToilets(event: any) {
    const selectedValue = event.target.value;
    const item = TOILETS.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, toilets: item.addition};

    this.recalculatePrice();
  }

  changeContactAddressMatch() {
    const checkboxVal = this.userForm.value.contactAddressMatchesCleaning;
    if (checkboxVal) {
      this.userForm.controls['contactAddress']?.setValidators([]);
      this.userForm.controls['contactAddress']?.disable();
    } else {
      this.userForm.controls['contactAddress']?.setValidators([Validators.required]);
      this.userForm.controls['contactAddress']?.enable();
    }
  }

  /* CALENDAR AND TIME */

  getAvailableTimesForDate(date: Date): CleanerAvailableDay[] {
    if (!date) return [];
    const theDate = dateToYmdFormat(date);
    const times = this.availableCalendars
      .map(cal => ({...cal.days.find(day => day.date === theDate), cleanerId: cal.cleanerId}))
      .filter(day => !!day)
      .filter(day => day.from && day.to) as CleanerAvailableDay[];
    return times;
  }

  getTimeOptionsFromAvailableTimes(availableTimes: CleanerAvailableDay[]): orderFormItem[] {
    const neededHours = Math.ceil(this.realCleaningTime);
    const timeStarts: string[] = [];
    availableTimes.forEach((time: CleanerAvailableDay) => {
      // TODO check offHours
      const steps = time.to - time.from + 1 - neededHours;
      if (!steps) return;
      for (let i = 0; i < steps; i++) {
        const pushTime = time.from + i;
        // console.log('pushTime', pushTime);
        if (time.offHours?.includes(pushTime)) continue;
        timeStarts.push(String(pushTime));
      }
    })

    return [...TIMES.filter(time => timeStarts.includes(time.id))];
  }

  getTimeOptionsFromAvailableTimesMulti(availableTimes: CleanerAvailableDay[], cleaners: number): orderFormItem[] {
    // Vratit pro dany datum casy, kde pro uklizecky existuje prunik casu
    const neededHours = Math.ceil(this.realCleaningTime);
    // times je pole polí dostupnych casu pro dane datum
    let times: any[] = [];

    availableTimes.forEach(time => {
      const timeStarts: string[] = [];
      const steps = time.to - time.from + 1 - neededHours;
      if (!steps || steps < 1) return;
      for (let i = 0; i < steps; i++) {
        timeStarts.push(String(time.from + i));
      }
      times.push(timeStarts)
    })

    // pokud jsou dostupne casy uz ted mensi, nema smysl pokracovat, nesplnim kapacitu
    if (times.length < cleaners) return [];

    const allTimes = [...new Set([].concat(...times))];

    let commonTimes: any[] = [];
    allTimes.forEach((aTime: string) => {
      const isIn = times.filter(t => t.includes(aTime)).length >= cleaners;
      if (isIn) {
        commonTimes.push(aTime);
      }
    })

    return [...TIMES.filter(time => commonTimes.includes(time.id))];
  }

  setTimesToFormField() {
    this.availableTimes = this.getAvailableTimesForDate(this.orderForm.value.date);

    this.availableTimesOptions = this.ladiesForTheJob > 1
      ? this.getTimeOptionsFromAvailableTimesMulti(this.availableTimes, this.ladiesForTheJob)
      : this.getTimeOptionsFromAvailableTimes(this.availableTimes);

    if (this.availableTimesOptions.length === 0 && !!this.orderForm.value.date) {
     this.resetDateAndTime();
    }
  }

  resetDateAndTime() {
    this.orderForm.controls['time']?.patchValue(null);
    this.orderForm.controls['date']?.patchValue(null);
    this.checkSummaryTimeDetails();
    this.doShowNoDateCapacityModal();
  }

  onDateChange() {
    this.orderForm.controls['time']?.disable();
    this.recalculatePrice();
    this.orderForm.controls['time']?.enable();
    this.orderForm.controls['time']?.patchValue(this.availableTimesOptions.length === 1 ? this.availableTimesOptions[0].id : null);
    this.changeTime();
  }

  changeTime() {
    this.recalculatePrice();
  }

  changeEmail() {
    this.emailChanged.emit(this.userForm.value['email'])
  }

  initDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = new Date(today);
    maxDate.setDate(tomorrow.getDate() + MAX_CALENDAR_DAYS);
    this.dateMinDate = tomorrow;
    this.dateMaxDate = maxDate;
  }

  checkAvailableDatesInCal() {
    this.areAvailableDates = this.availableCalendars.map(ac => ac.days).flat().map(d => d.date).some(d => {
      const [year, month, day] = d.split('-');
      const theDate = new Date();
      theDate.setMonth(Number(month) - 1);
      theDate.setFullYear(Number(year));
      theDate.setDate(Number(day));
      theDate.setHours(12);
      return this.dateFilter(theDate);
    });
  }

  // Filtration of the given day, whether enable it in cal
  // Available according to cleaners and time capacity
  dateFilter = (d: any, isYmdFormat = false): boolean => {
    if (!d) return false;
    const theDate = dateToYmdFormat(d);
    let isDateInCleaners: boolean;

    if (this.orderForm.value.frequency === FREQUENCY_WEEKLY) {
      // Pokud ma termin volny uklizecka, co maka na tydenni bazi
      const inWeeklyCleaners = this.availableCalendars.filter(cal => !cal.oddEvenWeeks && cal.days.some(day => day.date === theDate)).length > 0;
      let nextWeek = new Date(d);
      nextWeek.setDate(d.getDate() + 7);
      const theDateNextWeek = dateToYmdFormat(nextWeek);
      // Pokud ma uklizecka s S/L tydny volny termin v obou tydnech
      const inOddEvenCleaners = this.availableCalendars
        .filter(cal =>
          cal.oddEvenWeeks
          && cal.days.some(day => day.date === theDate)
          && cal.days.some(day => day.date === theDateNextWeek))
        .length > 0;

      isDateInCleaners = inWeeklyCleaners || inOddEvenCleaners;
    } else {
      // Pokud nejaky calendar ma v days dany den
      isDateInCleaners = this.availableCalendars.filter(cal => cal.days.some(day => day.date === theDate)).length > 0;
    }

    const availableTimes = this.getAvailableTimesForDate(d);
    // Pokud nema from a to, pak rovnou skipnout
    if (!availableTimes.length) {
      return false;
    }
    let isDateHavingCapacity;

    if (this.ladiesForTheJob > 1) {
      isDateHavingCapacity = this.getTimeOptionsFromAvailableTimesMulti(availableTimes, this.ladiesForTheJob);
    } else {
      isDateHavingCapacity = this.getTimeOptionsFromAvailableTimes(availableTimes);
    }

    return isDateInCleaners && !!isDateHavingCapacity.length;
  };

  /* ----- */


  checkInvalidFields() {
    const invalids = this.findInvalidControls();

    this.onlyConfirmationMissing = invalids.length === 1 && invalids[0] === 'confirmation';
  }

  getCleanersIdsForOrder(): string[] {
    const time = Number(this.orderForm.value.time);
    return this.availableTimes
      .filter(at => time >= at.from && time < at.to)
      .map(at => at.cleanerId)
      .slice(0, this.ladiesForTheJob) as string[];
  }

  onOrderSubmit() {
    this.orderSendClicked = true;
    this.orderSendClickedChanged.emit(this.orderSendClicked);
    this.checkInvalidFields();
    if (!this.orderForm.valid || !this.userForm.valid || !!this.sendingOrder) {
      // this.orderSendClicked = false;
      return;
    }

    const cleanerId = this.getCleanersIdsForOrder();
    const cleanDate = new Date(this.orderForm.value.date);
    cleanDate.setHours(12);

    const ownCleaningStuff = this.orderForm.value?.ownCleaningStuff === 'yes';
    const contactAddress = this.userForm.value?.contactAddressMatchesCleaning === true
      ? `${this.orderForm.value?.address}, ${this.orderForm.value?.pscNumber} ${this.clientCity}`
      : this.userForm.value?.contactAddress;
    const data = {
      ...this.orderForm.value,
      ...this.userForm.value,
      date: cleanDate,
      price: this.finalPrice,
      ownCleaningStuff,
      cleaningDuration: Math.round((this.totalCleaningTime / this.ladiesForTheJob) * 2) / 2,
      extras: this.getExtrasItem(),
      cleanersCount: this.ladiesForTheJob,
      cleanerId: cleanerId,
      contactAddress: contactAddress,
      email: this.userForm.value['email'] || this.clientData?.email,
      homeId: this.homesForm.value['home'],
      city: this.clientCity,
    };
    this.sendingOrder = true;

    if (!!this.orderData) {
      this.editOrder(data);
    } else {
      this.addNewOrder(data);
    }

  }

  addNewOrder(data: any) {
    this.orderService.addNewOrderFromWeb(data).subscribe(
      {
        next: (res) => {
          this.orderSentSuccessfully = true;
          this.orderSentSuccessfullyChanged.emit(this.orderSentSuccessfully);
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

  editOrder(data: any) {
    this.orderService.editOrder(data, this.orderData.orderId).subscribe(
      {
        next: (res) => {
          this.orderSentSuccessfully = true;
          this.orderSentSuccessfullyChanged.emit(this.orderSentSuccessfully);
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.orderForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  doShowNoDateCapacityModal() {
    this.showNoDateCapacityModal = true;
  }

  doHideNoDateCapacityModal() {
    this.showNoDateCapacityModal = false;
  }


}
