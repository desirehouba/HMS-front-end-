import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllOmsComponent } from './all-oms.component';

describe('AllOmsComponent', () => {
  let component: AllOmsComponent;
  let fixture: ComponentFixture<AllOmsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
