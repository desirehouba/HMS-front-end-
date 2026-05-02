import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogRoomComponent } from './form-dialog.component';

describe('FormDialogRoomComponent', () => {
  let component: FormDialogRoomComponent;
  let fixture: ComponentFixture<FormDialogRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDialogRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
