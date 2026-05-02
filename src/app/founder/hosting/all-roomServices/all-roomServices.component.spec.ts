import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllRoomServicesComponent } from './all-roomServices.component';

describe('AllRoomServicesComponent', () => {
  let component: AllRoomServicesComponent;
  let fixture: ComponentFixture<AllRoomServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRoomServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRoomServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
