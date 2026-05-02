import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllDisbursementsComponent } from './all-disbursements.component';

describe('AllDisbursementsComponent', () => {
  let component: AllDisbursementsComponent;
  let fixture: ComponentFixture<AllDisbursementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDisbursementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDisbursementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
