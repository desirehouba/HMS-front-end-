import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaffFormDialogComponent } from './form-dialog.component';

describe('StaffFormDialogComponent', () => {
  let component: StaffFormDialogComponent;
  let fixture: ComponentFixture<StaffFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
