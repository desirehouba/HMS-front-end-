import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteDialogHolidaysComponent } from './delete.component';

describe('DeleteDialogHolidaysComponent', () => {
  let component: DeleteDialogHolidaysComponent;
  let fixture: ComponentFixture<DeleteDialogHolidaysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
