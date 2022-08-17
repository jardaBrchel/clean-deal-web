import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CleanDeal - profesionální úklid';
  isMenuOpened = false;

  constructor() {
  }

  onMenuOpen() {
    this.isMenuOpened = true;
  }

  onMenuClick() {
    this.isMenuOpened = false;
  }


}
