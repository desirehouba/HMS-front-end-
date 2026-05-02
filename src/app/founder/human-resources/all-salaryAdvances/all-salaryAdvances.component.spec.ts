import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllSalaryAdvancesComponent } from './all-salaryAdvances.component';

describe('AllSalaryAdvancesComponent', () => {
  let component: AllSalaryAdvancesComponent;
  let fixture: ComponentFixture<AllSalaryAdvancesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSalaryAdvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSalaryAdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
