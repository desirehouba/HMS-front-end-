import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTypeInvoiceComponent } from './add-typeInvoice.component';

describe('AddTypeInvoiceComponent', () => {
  let component: AddTypeInvoiceComponent;
  let fixture: ComponentFixture<AddTypeInvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
