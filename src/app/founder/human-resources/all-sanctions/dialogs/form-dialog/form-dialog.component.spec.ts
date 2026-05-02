import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogSanctionComponent } from './form-dialog.component';

describe('FormDialogSanctionComponent', () => {
  let component: FormDialogSanctionComponent;
  let fixture: ComponentFixture<FormDialogSanctionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDialogSanctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
