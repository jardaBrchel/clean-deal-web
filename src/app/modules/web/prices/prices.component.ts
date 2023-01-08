import {Component, OnInit} from '@angular/core';
import {
  BASE_PRICE,
  BATHROOM_PRICE, DIRTY_1_5_MULTIPLY, DIRTY_2_MULTIPLY, GENERAL_CLEANING_MULTIPLY,
  HOUSE_FLOOR_PRICE, INTRODUCTORY_CLEANING, INTRODUCTORY_CLEANING_LARGE,
  KITCHEN_PRICE, OWN_CLEANING_STUFF_PRICE,
  ROOM_PRICE,
  TOILET_PRICE, WINDOW_BLINDS_CLEANING_METER_PRICE, WINDOW_CLEANING_METER_PRICE
} from '../../../config/price-config';

interface PriceItem {
  name: string;
  price: number | string;
  description?: string;
  isPercentage?: boolean;
}

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  prices: PriceItem[] = [];
  extras: PriceItem[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.initPrices();

  }

  initPrices() {
    this.prices = [
      {
        name: 'Základní sazba úklidu',
        price: BASE_PRICE,
        description: 'V základní sazbě je obsažen běžný úklid jedné kuchyně, koupelny, chodby a jedné místnosti.'
      },
      {
        name: 'Patro navíc',
        price: HOUSE_FLOOR_PRICE,
      },
      {
        name: 'Koupelna navíc',
        price: BATHROOM_PRICE,
      },
      {
        name: 'Kuchyň navíc',
        price: KITCHEN_PRICE,
        description: 'Platí i pro kuchyňský kout'
      },
      {
        name: 'Místnost navíc',
        price: ROOM_PRICE,
      },
      {
        name: 'Samostatné WC',
        price: TOILET_PRICE,
      },
      {
        name: 'Čisticí prostředky',
        price: `${OWN_CLEANING_STUFF_PRICE} - 450`,
        description: 'Závislé na výměře uklízených prostor'
      },
      {
        name: 'Generální úklid',
        price: this.percentage(GENERAL_CLEANING_MULTIPLY),
        isPercentage: true,
        description: 'Násobek ceny úklidu'
      },
      {
        name: 'Střední znečištění prostorů',
        price: this.percentage(DIRTY_1_5_MULTIPLY),
        isPercentage: true,
        description: 'Násobek ceny úklidu'
      },
      {
        name: 'Silné znečištění prostorů',
        price: this.percentage(DIRTY_2_MULTIPLY),
        isPercentage: true,
        description: 'Násobek ceny úklidu'
      },
      {
        name: `Seznamovací úklid do 80 m<sup>2</sup>`,
        price: INTRODUCTORY_CLEANING,
        description: 'Platí pro první úklid v dané domácností. Ten je zpravidla delší, protože se naše dáma na úklid seznámit s tímto prostorem'
      },
      {
        name: `Seznamovací úklid nad 80 m<sup>2</sup>`,
        price: INTRODUCTORY_CLEANING_LARGE,
      },
    ];

    this.extras = [
      {
        name: `Umytí a leštění oken (m<sup>2</sup>)`,
        price: WINDOW_CLEANING_METER_PRICE,
      },
      {
        name: `Čištění žaluzií (m<sup>2</sup>)`,
        price: WINDOW_BLINDS_CLEANING_METER_PRICE,
      },
      ]
  }

  percentage(value: number) {
    return Math.round((value - 1) * 100);
  }


}
