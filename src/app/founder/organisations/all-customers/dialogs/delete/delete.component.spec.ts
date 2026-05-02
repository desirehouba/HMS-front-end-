import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerDeleteDialogComponent } from './delete.component';

describe('CustomerDeleteDialogComponent', () => {
  let component: CustomerDeleteDialogComponent;
  let fixture: ComponentFixture<CustomerDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
