import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css'],
  providers: []

})
export class NavFiltersComponent implements OnInit {
  selectedQueryType: string;
  exampleSymbolsList: Array<string> = ['YHOO', 'GOOG', 'DIS'];
  @Input() onQueryParamChange: (symbol: string) => void;

  constructor() {

  }

  onValueChange = () => {

  }

  onSymbolSelect = (selectedItem)  => {
    this.onQueryParamChange(selectedItem);
  }

  ngOnInit() {

  }

}
