import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {IQuote} from '../../query-data.interface';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit, OnChanges {

  @Input() private historicalData: Array<IQuote>;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
