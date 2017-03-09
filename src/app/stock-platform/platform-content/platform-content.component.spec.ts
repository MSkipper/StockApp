import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformContentComponent } from './platform-content.component';

describe('PlatformContentComponent', () => {
  let component: PlatformContentComponent;
  let fixture: ComponentFixture<PlatformContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
