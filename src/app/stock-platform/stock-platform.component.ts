import { Component, OnInit } from '@angular/core';
import {StockPlatformService} from './stock-platform.service';

@Component({
  selector: 'app-stock-platform',
  templateUrl: './stock-platform.component.html',
  styleUrls: ['./stock-platform.component.css'],
  providers: [StockPlatformService]
})
export class StockPlatformComponent implements OnInit {

  private queryHistoryData: any;
  private queryCompanyData: any;
  private setNewQuery =  (symbol): void => {
    this.StockPlatformService.queryHistoricalData(symbol).subscribe(data => {
      this.queryHistoryData = data;
    });

  }


  constructor(private StockPlatformService: StockPlatformService) {

  }


  ngOnInit() {
  }

}
