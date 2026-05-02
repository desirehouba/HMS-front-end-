import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllPayrollsComponent } from './all-payrolls.component';

describe('AllPayrollsComponent', () => {
  let component: AllPayrollsComponent;
  let fixture: ComponentFixture<AllPayrollsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPayrollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPayrollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
