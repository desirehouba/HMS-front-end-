import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutSalaryAdvanceComponent } from './about-salaryAdvance.component';

describe('AboutSalaryAdvanceComponent', () => {
  let component: AboutSalaryAdvanceComponent;
  let fixture: ComponentFixture<AboutSalaryAdvanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSalaryAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSalaryAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
