import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoomServicesDeleteDialogComponent } from './delete.component';

describe('RoomServicesDeleteDialogComponent', () => {
  let component: RoomServicesDeleteDialogComponent;
  let fixture: ComponentFixture<RoomServicesDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomServicesDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomServicesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
