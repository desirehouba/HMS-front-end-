import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRoomServiceComponent } from './add-roomService.component';

describe('AddRoomServiceComponent', () => {
  let component: AddRoomServiceComponent;
  let fixture: ComponentFixture<AddRoomServiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
