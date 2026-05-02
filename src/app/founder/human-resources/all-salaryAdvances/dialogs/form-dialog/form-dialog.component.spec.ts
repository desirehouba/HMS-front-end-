import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormSalaryAdvanceDialogComponent } from './form-dialog.component';

describe('FormSalaryAdvanceDialogComponent', () => {
  let component: FormSalaryAdvanceDialogComponent;
  let fixture: ComponentFixture<FormSalaryAdvanceDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSalaryAdvanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSalaryAdvanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
