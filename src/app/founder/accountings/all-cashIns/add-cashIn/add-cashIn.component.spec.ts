import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCashInComponent } from './add-cashIn.component';

describe('AddCashInComponent', () => {
  let component: AddCashInComponent;
  let fixture: ComponentFixture<AddCashInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCashInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCashInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
