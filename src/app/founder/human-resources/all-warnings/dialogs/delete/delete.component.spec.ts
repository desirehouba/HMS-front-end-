import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteDialogWarningComponent } from './delete.component';

describe('DeleteDialogWarningComponent', () => {
  let component: DeleteDialogWarningComponent;
  let fixture: ComponentFixture<DeleteDialogWarningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
