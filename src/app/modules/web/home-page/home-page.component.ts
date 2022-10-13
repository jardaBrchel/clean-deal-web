import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WEB_URLS} from "../../../config/web.config";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  webUrls = WEB_URLS;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToPrices() {
    this.router.navigate(['/', WEB_URLS.NEW_ORDER])
  }

}
