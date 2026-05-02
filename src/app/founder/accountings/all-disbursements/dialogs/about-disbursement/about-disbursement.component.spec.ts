import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutDisbursementComponent } from './about-disbursement.component';

describe('AboutDisbursementComponent', () => {
  let component: AboutDisbursementComponent;
  let fixture: ComponentFixture<AboutDisbursementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDisbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
