import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';

import { StockPlatformComponent } from './stock-platform/stock-platform.component';
import { NavFiltersComponent } from './stock-platform/nav-filters/nav-filters.component';
import { PlatformContentComponent } from './stock-platform/platform-content/platform-content.component';
import { CompanyDetailsComponent } from './stock-platform/platform-content/company-details/company-details.component';
import { LinearChartComponent } from './stock-platform/platform-content/linear-chart/linear-chart.component';
import { CandlestickChartComponent } from './stock-platform/platform-content/candlestick-chart/candlestick-chart.component';
import { StockTableComponent } from './stock-platform/platform-content/stock-table/stock-table.component';
import { FooterComponent } from './footer/footer.component';
import { SearchDropdownComponent } from './interface/search-dropdown/search-dropdown.component';


@NgModule({
  declarations: [
    AppComponent,
    StockPlatformComponent,
    NavFiltersComponent,
    PlatformContentComponent,
    CompanyDetailsComponent,
    LinearChartComponent,
    CandlestickChartComponent,
    StockTableComponent,
    FooterComponent,
    SearchDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
