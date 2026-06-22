import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseSupplyDemandsDialogComponent } from './form-dialog.component';

describe('PurchaseSupplyDemandsDialogComponent', () => {
  let component: PurchaseSupplyDemandsDialogComponent;
  let fixture: ComponentFixture<PurchaseSupplyDemandsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseSupplyDemandsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSupplyDemandsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
