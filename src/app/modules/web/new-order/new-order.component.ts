import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {
  BASE_PRICE,
  MAX_SPACE_AREA,
  OWN_CLEANING_STUFF_PRICE, OWN_CLEANING_STUFF_PRICE_INCREASE, PRICE_HOUR_CONSTANT,
  STEP_OVER_MAX_SPACE,
  WINDOW_CLEANING_METER_PRICE
} from '../../../config/price-config';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {
  BATHROOMS,
  CLEANING_TYPES,
  DIRTY,
  FREQUENCY,
  HOME_TYPES,
  HOUSE_FLOORS,
  KITCHENS, MAX_CALENDAR_DAYS, MAX_HOURS_PER_LADY, MAX_WINDOWS_METERS,
  OWN_CLEANING_STUFF,
  ROOMS,
  TIMES,
  TOILETS,
  YARDAGE
} from '../../../config/order-config';
import {DatePipe} from '@angular/common';
import {AvailableTimesResItem, OrderMultiplicators, SummaryPriceItem} from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';
import {WEB_URLS} from "../../../config/web.config";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit, AfterViewInit {
  @ViewChild("block") block!: ElementRef;

  // FORMS
  orderForm: UntypedFormGroup = {} as any;
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
  multiplicators: OrderMultiplicators = {};
  homeType = HOME_TYPES[0].id;
  maxWindowsMeters = MAX_WINDOWS_METERS;
  priceTotalTopY!: number;

  // CALENDAR VALUES
  dateMinDate: any;
  dateMaxDate: any;
  availableCalendars: AvailableTimesResItem[] = [];

  // CALCULATED VALUES
  totalCleaningTime = 0;
  realCleaningTime = 0; // Kdyz se cas vydeli poctem uklizecek
  ladiesForTheJob = 1;
  calculatedSpace = 0; // Vypocitana vymera
  yardageOverPrice!: number;
  finalPrice = 0;
  nonDiscountPrice = 0;
  additions = {};
  extras = {};
  summaryOrderDetails = '';
  summaryTimeDetails = '';
  summaryPriceItems: SummaryPriceItem[] = [];
  extrasPriceItems: SummaryPriceItem[] = [];

  // FLAGS
  orderSendClicked = false;
  sendingOrder = false;
  errorOnSubmit = false;
  orderSentSuccessfully = false;
  onlyConfirmationMissing = false;
  hideMobilePriceBar = false;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe,
    private orderService: OrderService,
  ) {
    // TODO definovat prvni dostupny datum
    this.initDates();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.logScrolling(event);
  }

  ngOnInit(): void {
    this.initOrderFormValues();
    this.initUserFormValue();
    this.initExtrasFormValue();
    this.getAvailableTimes();
  }

  ngAfterViewInit(): void {
    // Getting price Y coord to hide price panel on mobile when scrolling down
    setTimeout(() => {
      const viewportOffset = this.block.nativeElement.getBoundingClientRect();
      this.priceTotalTopY = viewportOffset?.y || 0;
    }, 2000);
  }



  getAvailableTimesForDate() {

  }

  getAvailableTimes() {
    this.orderService.getAvailableTimes().subscribe(
      {
        next: (res) => {
          console.log('res', res)
          this.availableCalendars = res;
        },
        error: (e) => {
          console.log('error on sending order', e);
        },
      }
    )
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
      yardage: this.yardage[0].id,
      pets: '',
      time: [undefined, [Validators.required]],
      comments: '',
      address: ['', [Validators.required]],
      pscNumber: ['', [Validators.required]],
      confirmation: [false, [Validators.requiredTrue]],
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
    this.totalCleaningTime = this.nonDiscountPrice / PRICE_HOUR_CONSTANT;
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

  changeToilets(event: any) {
    const selectedValue = event.target.value;
    const item = TOILETS.find(t => t.id === selectedValue) || {} as any;
    this.additions = {...this.additions, toilets: item.addition};

    this.recalculatePrice();
  }

  /* CALENDAR AND TIME */

  onDateChange() {
    this.recalculatePrice();
    this.getAvailableTimesForDate();
  }

  changeTime() {
    this.recalculatePrice();
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

  // FIXME temp
  // Filtration of the given day, whether enable it in cal
  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    // Logic, if its available in at least one cal, then its enabled
    const theDate = d.toISOString().split('T')[0];
    return this.availableCalendars.some(cal => cal.days.some(day => day.date === theDate));
  };

  /* ----- */


  checkInvalidFields() {
    const invalids = this.findInvalidControls();

    this.onlyConfirmationMissing = invalids.length === 1 && invalids[0] === 'confirmation';
  }

  onOrderSubmit() {
    this.orderSendClicked = true;
    this.checkInvalidFields();
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
      cleaningDuration: Math.round(this.totalCleaningTime * 2) / 2,
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

  logScrolling(event: any) {
    this.hideMobilePriceBar = (event['srcElement'].scrollingElement.scrollTop + (window.screen?.height || 0)) > this.priceTotalTopY;
  }

}
