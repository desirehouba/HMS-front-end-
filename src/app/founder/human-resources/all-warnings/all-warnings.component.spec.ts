import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllWarningsComponent } from './all-warnings.component';

describe('AllWarningsComponent', () => {
  let component: AllWarningsComponent;
  let fixture: ComponentFixture<AllWarningsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
