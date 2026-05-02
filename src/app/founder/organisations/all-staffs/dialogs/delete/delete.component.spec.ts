import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaffDeleteDialogComponent } from './delete.component';

describe('StaffDeleteDialogComponent', () => {
  let component: StaffDeleteDialogComponent;
  let fixture: ComponentFixture<StaffDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
