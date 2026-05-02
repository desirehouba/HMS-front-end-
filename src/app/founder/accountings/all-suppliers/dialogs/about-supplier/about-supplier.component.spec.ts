import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutSupplierComponent } from './about-supplier.component';

describe('AboutSupplierComponent', () => {
  let component: AboutSupplierComponent;
  let fixture: ComponentFixture<AboutSupplierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
