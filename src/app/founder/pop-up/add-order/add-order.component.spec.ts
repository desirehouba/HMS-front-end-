import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddOrderFormDialogComponent } from './add-order.component';

describe('AddOrderFormDialogComponent', () => {
  let component: AddOrderFormDialogComponent;
  let fixture: ComponentFixture<AddOrderFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
