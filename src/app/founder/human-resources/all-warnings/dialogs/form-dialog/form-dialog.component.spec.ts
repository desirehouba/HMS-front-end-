import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogWarningComponent } from './form-dialog.component';

describe('FormDialogWarningComponent', () => {
  let component: FormDialogWarningComponent;
  let fixture: ComponentFixture<FormDialogWarningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDialogWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
