import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalaryDeductionsDeleteDialogComponent } from './delete.component';

describe('SalaryDeductionsDeleteDialogComponent', () => {
  let component: SalaryDeductionsDeleteDialogComponent;
  let fixture: ComponentFixture<SalaryDeductionsDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryDeductionsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDeductionsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
