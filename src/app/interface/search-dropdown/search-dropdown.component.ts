import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.css']
})
export class SearchDropdownComponent implements OnInit {

  @Input() private inputModel;
  @Input() private itemsList;
  @Input() private placeholder;
  @Input() private onValueChange;
  @Input() private onSelect;

  private dropdownHandlerClass = 'is-close';

  constructor() { }

  ngOnInit() {

  }

  hideDropdownArea(_event: Event) {
    this.dropdownHandlerClass = 'is-close';
  }

  openDropdown(_event: Event) {
    if (this.dropdownHandlerClass !== 'is-open') {
      this.dropdownHandlerClass = 'is-open';
    } else {
      this.dropdownHandlerClass = 'is-close';
    }
  }

  select(_event: Event, selectedItem: any) {
    if (selectedItem !== this.inputModel) {
      this.inputModel = selectedItem;
      this.onSelect(selectedItem)
    }
  }

  onChange(_event: Event) {
    this.onValueChange();
  }


}
