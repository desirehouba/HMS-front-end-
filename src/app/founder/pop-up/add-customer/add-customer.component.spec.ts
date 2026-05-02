import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCustomerFormDialogComponent } from './add-customer.component';

describe('AddCustomerFormDialogComponent', () => {
  let component: AddCustomerFormDialogComponent;
  let fixture: ComponentFixture<AddCustomerFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
