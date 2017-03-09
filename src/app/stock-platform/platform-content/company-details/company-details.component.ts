import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  @Input() private companyData: any;

  constructor() { }

  ngOnInit() {
  }

}
