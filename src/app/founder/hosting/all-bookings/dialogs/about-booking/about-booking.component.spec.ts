import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutBookingComponent } from './about-booking.component';

describe('AboutBookingComponent', () => {
  let component: AboutBookingComponent;
  let fixture: ComponentFixture<AboutBookingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
