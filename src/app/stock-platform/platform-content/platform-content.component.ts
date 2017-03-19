import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {IQuote, IQueryHistoricalApiData} from '../query-data.interface';


@Component({
  selector: 'app-platform-content',
  templateUrl: './platform-content.component.html',
  styleUrls: ['./platform-content.component.css']
})
export class PlatformContentComponent implements OnInit, OnChanges {

  @Input() private queryData: IQueryHistoricalApiData;
  @Input() private companyInfoData: any;
  private linearGraphData: Array<IQuote>;
  private companyInfo: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.queryData) {
      this.linearGraphData = this.queryData.results.quote;
    }
    // if (this.companyInfoData) {
    //   this.companyInfo = this.companyInfoData.quoteSummary.results[0];
    // }

  }
}
