import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrdersDeleteDialogComponent } from './delete.component';

describe('OrdersDeleteDialogComponent', () => {
  let component: OrdersDeleteDialogComponent;
  let fixture: ComponentFixture<OrdersDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
