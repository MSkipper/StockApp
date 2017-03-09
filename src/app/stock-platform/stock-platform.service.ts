import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class StockPlatformService {

  private defaultEndDate: string = new Date().toISOString().substring(0, 10);
  private defaultStartDate: string = new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().substring(0, 10);

  public queryHistoricalData = (symbol: string, startDate: string = this.defaultStartDate,
                              endDate: string = this.defaultEndDate): Observable<any> => {

    const historicalDataQuery = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol +
      '" and startDate = "' + startDate + '" and endDate = "' + endDate + '"';
    const url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(historicalDataQuery) +
      '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

    return this.http.get(url).map(this.extractHistoricalData).catch(this.handleError);
  }
  public queryCompanyData = (symbol: string) => {
    const financeDataQuery = 'select * from pm.finance where symbol = ' + symbol;
    const url = 'https://query.yahooapis.com/v1/yql?' + encodeURIComponent(financeDataQuery) +
        '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

    const headers = new Headers();
    StockPlatformService.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    } ).map(this.extractFinancialData).catch(this.handleError);
  }

  private static createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer 0c038dd27f90d9243405adad67f74b6671c93285');
  }

  constructor(private http: Http) {
  }

  private extractFinancialData = (response: Response) => {
    const body = response.json();
    return body.query || { };
  }

  private extractHistoricalData = (response: Response) => {
    const body = response.json();
    return body.query || { };
  }

  private handleError = (error: Response | any) => {
    console.log(error)
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
