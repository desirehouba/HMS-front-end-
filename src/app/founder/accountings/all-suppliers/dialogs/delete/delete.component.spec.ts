import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierDeleteDialogComponent } from './delete.component';

describe('SupplierDeleteDialogComponent', () => {
  let component: SupplierDeleteDialogComponent;
  let fixture: ComponentFixture<SupplierDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
