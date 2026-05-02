import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HolidaysFormDialogComponent } from './form-dialog.component';

describe('HolidaysFormDialogComponent', () => {
  let component: HolidaysFormDialogComponent;
  let fixture: ComponentFixture<HolidaysFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
