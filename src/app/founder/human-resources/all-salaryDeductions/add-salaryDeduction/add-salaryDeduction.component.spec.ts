import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSalaryDeductionComponent } from './add-salaryDeduction.component';

describe('AddSalaryDeductionComponent', () => {
  let component: AddSalaryDeductionComponent;
  let fixture: ComponentFixture<AddSalaryDeductionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalaryDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalaryDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
