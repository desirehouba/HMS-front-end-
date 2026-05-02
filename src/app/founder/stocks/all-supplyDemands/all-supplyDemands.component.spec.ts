import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllSupplyDemandsComponent } from './all-supplyDemands.component';

describe('AllSupplyDemandsComponent', () => {
  let component: AllSupplyDemandsComponent;
  let fixture: ComponentFixture<AllSupplyDemandsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSupplyDemandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSupplyDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
