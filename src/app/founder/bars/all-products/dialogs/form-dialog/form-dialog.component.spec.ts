import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsDialogComponent } from './form-dialog.component';

describe('ProductsDialogComponent', () => {
  let component: ProductsDialogComponent;
  let fixture: ComponentFixture<ProductsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
