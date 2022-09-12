import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss']
})
export class WebLayoutComponent implements OnInit {
  isMenuOpened = false;

  constructor() { }

  ngOnInit(): void {
  }


  onMenuOpen() {
    this.isMenuOpened = true;
  }

  onMenuClick() {
    this.isMenuOpened = false;
  }

}
