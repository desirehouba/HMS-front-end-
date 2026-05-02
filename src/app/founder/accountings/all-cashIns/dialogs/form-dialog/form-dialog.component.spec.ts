import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseOrdersDialogComponent } from './form-dialog.component';

describe('PurchaseOrdersDialogComponent', () => {
  let component: PurchaseOrdersDialogComponent;
  let fixture: ComponentFixture<PurchaseOrdersDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
