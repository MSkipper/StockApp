import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  @Input() private companyInfo: any;
  private address: string
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.companyInfo) {
      this.address = this.companyInfo.assetProfile.address1d
    }
  }

}
