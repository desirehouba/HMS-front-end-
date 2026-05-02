import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllVouchersComponent } from './all-vouchers.component';

describe('AllVouchersComponent', () => {
  let component: AllVouchersComponent;
  let fixture: ComponentFixture<AllVouchersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllVouchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
