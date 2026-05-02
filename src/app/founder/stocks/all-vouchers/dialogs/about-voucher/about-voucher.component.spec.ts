import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VouchersAboutVoucherComponent } from './about-voucher.component';

describe('VouchersAboutVoucherComponent', () => {
  let component: VouchersAboutVoucherComponent;
  let fixture: ComponentFixture<VouchersAboutVoucherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersAboutVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersAboutVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
