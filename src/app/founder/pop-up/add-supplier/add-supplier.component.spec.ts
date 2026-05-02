import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSupplierFormDialogComponent } from './add-supplier.component';

describe('AddSupplierFormDialogComponent', () => {
  let component: AddSupplierFormDialogComponent;
  let fixture: ComponentFixture<AddSupplierFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
