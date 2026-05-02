import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddWarningComponent } from './add-warning.component';

describe('AddWarningComponent', () => {
  let component: AddWarningComponent;
  let fixture: ComponentFixture<AddWarningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
