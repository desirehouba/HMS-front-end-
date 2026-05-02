import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutSalaryDeductionComponent } from './about-salaryDeduction.component';

describe('AboutSalaryDeductionComponent', () => {
  let component: AboutSalaryDeductionComponent;
  let fixture: ComponentFixture<AboutSalaryDeductionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSalaryDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSalaryDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
