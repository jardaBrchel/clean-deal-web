import {Component, OnInit} from '@angular/core';
import {HelpService} from './services/help.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CleanDeal - profesionální úklid';
  isMenuOpened = false;

  constructor(
    private helpService: HelpService,
  ) {
  }

  ngOnInit() {
    this.helpService.setConfigs();
  }

  onMenuOpen() {
    this.isMenuOpened = true;
  }

  onMenuClick() {
    this.isMenuOpened = false;
  }


}
