import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutCustomerComponent } from './about-customer.component';

describe('AboutCustomerComponent', () => {
  let component: AboutCustomerComponent;
  let fixture: ComponentFixture<AboutCustomerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
