import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddProductsComponent } from './add-product.component';

describe('AddProductsComponent', () => {
  let component: AddProductsComponent;
  let fixture: ComponentFixture<AddProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
