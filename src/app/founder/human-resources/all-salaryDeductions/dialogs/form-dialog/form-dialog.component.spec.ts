import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormSalaryDeductionDialogComponent } from './form-dialog.component';

describe('FormSalaryDeductionDialogComponent', () => {
  let component: FormSalaryDeductionDialogComponent;
  let fixture: ComponentFixture<FormSalaryDeductionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSalaryDeductionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSalaryDeductionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
