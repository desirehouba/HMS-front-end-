import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormBookingDialogComponent } from './form-dialog.component';

describe('FormBookingDialogComponent', () => {
  let component: FormBookingDialogComponent;
  let fixture: ComponentFixture<FormBookingDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBookingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
