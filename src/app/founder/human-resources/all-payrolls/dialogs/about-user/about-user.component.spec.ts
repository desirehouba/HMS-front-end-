import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutPayrollComponent } from './about-user.component';

describe('AboutPayrollComponent', () => {
  let component: AboutPayrollComponent;
  let fixture: ComponentFixture<AboutPayrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
