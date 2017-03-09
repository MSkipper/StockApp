import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit, OnChanges {

  @Input() private historicalData;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
