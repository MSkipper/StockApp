// import { Injectable } from '@angular/core';
// import {Observable} from "rxjs";
// import { Http, Response } from '@angular/http';
//
// @Injectable()
// export class NavFiltersService {
//
//   public getSuggestions = (query: string) => {
//     const suggestionQueryUrl;
//
//     return this.http.get(suggestionQueryUrl).map(this.extractSuggestionData).catch(this.handleError);
//   }
//
//   constructor(private http: Http) {
//
//   }
//
//   private extractSuggestionData = (response: Response) => {
//     const body = response.json();
//     return body.query || { };
//   }
//
//   private handleError = (error: Response | any) => {
//     let errMsg: string;
//     if (error instanceof Response) {
//       const body = error.json() || '';
//       const err = body.error || JSON.stringify(body);
//       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//     } else {
//       errMsg = error.message ? error.message : error.toString();
//     }
//     return Observable.throw(errMsg);
//   }
//
// }
