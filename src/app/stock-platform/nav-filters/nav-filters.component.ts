import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css'],
  providers: []

})
export class NavFiltersComponent implements OnInit {
  selectedQueryType: string;
  exampleSymbolsList: Array<string> = ['YHOO', 'GOOG', 'DIS'];
  @Output() onQueryParamChange = new EventEmitter();

  constructor() {

  }

  onValueChange = () => {

  }

  onSymbolSelect = (selectedItem)  => {
    this.onQueryParamChange.emit(selectedItem);
  }

  ngOnInit() {

  }

}
