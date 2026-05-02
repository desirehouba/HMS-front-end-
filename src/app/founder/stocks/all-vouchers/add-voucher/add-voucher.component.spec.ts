import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddVouchersComponent } from './add-voucher.component';

describe('AddVouchersComponent', () => {
  let component: AddVouchersComponent;
  let fixture: ComponentFixture<AddVouchersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVouchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
