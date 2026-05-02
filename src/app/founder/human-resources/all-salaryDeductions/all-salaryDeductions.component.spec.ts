import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllSalaryDeductionsComponent } from './all-salaryDeductions.component';

describe('AllSalaryDeductionsComponent', () => {
  let component: AllSalaryDeductionsComponent;
  let fixture: ComponentFixture<AllSalaryDeductionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSalaryDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSalaryDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
