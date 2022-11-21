import {Component, OnInit} from '@angular/core';
import {HelpService} from './services/help.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CleanDeal - profesionální úklid';

  constructor(
    private helpService: HelpService,
  ) {
  }

  ngOnInit() {
    this.helpService.setConfigs();
  }

}
