import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllFee0sComponent } from './all-feeOs.component';

describe('AllFee0sComponent', () => {
  let component: AllFee0sComponent;
  let fixture: ComponentFixture<AllFee0sComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFee0sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFee0sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
