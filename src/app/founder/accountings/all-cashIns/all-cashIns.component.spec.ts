import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllCashInsComponent } from './all-cashIns.component';

describe('AllCashInsComponent', () => {
  let component: AllCashInsComponent;
  let fixture: ComponentFixture<AllCashInsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCashInsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCashInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
