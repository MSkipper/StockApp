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

  openDropdown(_event: Event) {
    if (this.dropdownHandlerClass !== 'is-open') {
      this.dropdownHandlerClass = 'is-open';
    } else {
      this.dropdownHandlerClass = 'is-close';
    }
  }

  select(_event: Event, selectedItem: any) {
    this.inputModel = selectedItem;
    this.onSelect(selectedItem)
    this.dropdownHandlerClass = 'is-close';
  }

  onChange(_event: Event) {
    this.onValueChange();
  }


}
