import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsDeleteDialogComponent } from './delete.component';

describe('ProductsDeleteDialogComponent', () => {
  let component: ProductsDeleteDialogComponent;
  let fixture: ComponentFixture<ProductsDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
