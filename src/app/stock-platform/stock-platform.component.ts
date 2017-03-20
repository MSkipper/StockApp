import { Component, OnInit } from '@angular/core';
import {StockPlatformService} from './stock-platform.service';
import {IQueryHistoricalApiData} from "./query-data.interface";

@Component({
  selector: 'app-stock-platform',
  templateUrl: './stock-platform.component.html',
  styleUrls: ['./stock-platform.component.css'],
  providers: [StockPlatformService]
})
export class StockPlatformComponent implements OnInit {

  private queryHistoricalData: IQueryHistoricalApiData;
  private companyInfoData: any;
  private isQueryLoading: boolean;

  private setNewQuery =  (symbol): void => {
    this.isQueryLoading = true;
    this.StockPlatformService.queryHistoricalData(symbol).subscribe(data => {
      this.queryHistoricalData = data;
      this.isQueryLoading = false;
    });

    // Problem with cross-origin
    // this.StockPlatformService.queryCompanyData(symbol).subscribe(data => {
    //   console.log(data)
    //   this.companyInfoData = data;
    // });
  }

  constructor(private StockPlatformService: StockPlatformService) {
  }

  ngOnInit() {
  }

}
