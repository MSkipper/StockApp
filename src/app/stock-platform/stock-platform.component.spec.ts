import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPlatformComponent } from './stock-platform.component';

describe('StockPlatformComponent', () => {
  let component: StockPlatformComponent;
  let fixture: ComponentFixture<StockPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
