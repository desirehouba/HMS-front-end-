import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTypeRoomComponent } from './add-typeRoom.component';

describe('AddTypeRoomComponent', () => {
  let component: AddTypeRoomComponent;
  let fixture: ComponentFixture<AddTypeRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
