import { TestBed, inject } from '@angular/core/testing';

import { NavFiltersService } from './nav-filters.service';

describe('NavFiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavFiltersService]
    });
  });

  it('should ...', inject([NavFiltersService], (service: NavFiltersService) => {
    expect(service).toBeTruthy();
  }));
});
