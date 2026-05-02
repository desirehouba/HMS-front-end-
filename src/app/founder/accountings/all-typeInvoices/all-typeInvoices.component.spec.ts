import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllTypeInvoicesComponent } from './all-typeInvoices.component';

describe('AllTypeInvoicesComponent', () => {
  let component: AllTypeInvoicesComponent;
  let fixture: ComponentFixture<AllTypeInvoicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTypeInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTypeInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
