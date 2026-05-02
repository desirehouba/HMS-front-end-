import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllTypeRoomsComponent } from './all-typeRooms.component';

describe('AllTypeRoomsComponent', () => {
  let component: AllTypeRoomsComponent;
  let fixture: ComponentFixture<AllTypeRoomsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTypeRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTypeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
