import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSalaryAdvanceComponent } from './add-salaryAdvance.component';

describe('AddSalaryAdvanceComponent', () => {
  let component: AddSalaryAdvanceComponent;
  let fixture: ComponentFixture<AddSalaryAdvanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalaryAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalaryAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
