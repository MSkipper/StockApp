import { TestBed, inject } from '@angular/core/testing';

import { StockPlatformService } from './stock-platform.service';

describe('StockPlatformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockPlatformService]
    });
  });

  it('should ...', inject([StockPlatformService], (service: StockPlatformService) => {
    expect(service).toBeTruthy();
  }));
});
