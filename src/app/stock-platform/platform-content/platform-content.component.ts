import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-platform-content',
  templateUrl: './platform-content.component.html',
  styleUrls: ['./platform-content.component.css']
})
export class PlatformContentComponent implements OnInit, OnChanges {

  @Input() private queryData: any;
  private linearGraphData: any;
  private historicalData: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.queryData) {
      this.linearGraphData = this.queryData.results.quote;
    }
  }
}
