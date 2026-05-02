import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoomServicesDialogComponent } from './form-dialog.component';

describe('RoomServicesDialogComponent', () => {
  let component: RoomServicesDialogComponent;
  let fixture: ComponentFixture<RoomServicesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomServicesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomServicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
