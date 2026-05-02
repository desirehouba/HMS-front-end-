import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSupplyDemandComponent } from './add-supplyDemand.component';

describe('AddSupplyDemandComponent', () => {
  let component: AddSupplyDemandComponent;
  let fixture: ComponentFixture<AddSupplyDemandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplyDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplyDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
